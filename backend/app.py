from flask import Flask, request, jsonify
from flask_mongoengine import MongoEngine
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from models import BlogPost, Destination, Hotel, User, Itinerary
from mongoengine import Document, StringField, ReferenceField, ListField
from bson import ObjectId


app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'db': 'mydatabase',
    'host': 'localhost',
    'port': 27017,
    'connect': True
}

jwt = JWTManager(app)
app.config['JWT_SECRET_KEY'] = 'my-secret-key'

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


db = MongoEngine(app)
bcrypt = Bcrypt(app)


ratings_and_comments = []

def insert_data():
    # Insert a BlogPost
    blog_post = BlogPost(title='My Second Blog Post', content='This is the content of the blog post.', author='Author1')
    blog_post.save()

    # Insert an Itinerary
    itinerary = Itinerary(user='user@example.com', title='My Itinerary', description='This is my travel plan.')
    itinerary.save()

    # Insert a User
    hashed_pw = bcrypt.generate_password_hash('onehashed_password').decode('utf-8')
    user = User(email='user@example.com', name='John Wick', phone='3412567890', password=hashed_pw, cpassword=hashed_pw, tokens=[])
    user.save()

insert_data()

def insert_destinations():
    destinations_data = [  # List of destination data
        {
            "image": "url_to_image_1",
            "title": "Destination 1",
            "description": "Description for Destination 1",
            "location": "Location 1",
            "category": "Category 1",
            "ratings": [4, 5],
            "comments": [{"user": "User1", "comment": "Great place!"}],
            "users_who_favorited": [],
        },
    ]

    for data in destinations_data:
        destination = Destination(**data)
        destination.save()
        print(f"Inserted {destination.title}")


def insert_hotels():
    hotels_data = [
        {
            "image": "url_to_image_1",
            "title": "Hotel 1",
            "description": "Description for Hotel 1",
            "location": "Location 1",
            "category": "Category 1",
            "ratings": [4.5, 5],
            "comments": [{"user": "User1", "comment": "Great service!"}],
            "users_who_favorited": [],
        },
    ]

    for data in hotels_data:
        hotel = Hotel(**data)
        hotel.save()
        print(f"Inserted {hotel.title}")



# Search functions
def perform_search(query):
    """
    Perform a search based on the provided query.
    """
    results = [item for item in data if query.lower() in item['title'].lower() or query.lower() in item['content'].lower()]
    return results

def perform_hotel_search(query):
    hotels = Hotel.objects.search_text(query).limit(10)
    return hotels

def perform_destination_search(query):
    destinations = Destination.objects.search_text(query).limit(10)
    return destinations

def perform_blog_search(query):
    blogpost = BlogPost.objects.search_text(query).limit(10)
    return blogpost


class Favorite(Document):
    """
    Represents a favorite post for a user.
    """
    user_id = StringField(required=True)
    post_id = StringField(required=True)
    
    @classmethod
    def is_favorite(cls, user_id, post_id):
        """
        Check if a post is a favorite for a given user.
        """
        return cls.objects(user_id=user_id, post_id=post_id).first() is not None

    @classmethod
    def add_favorite(cls, user_id, post_id):
        """
        Add a post to favorites for a given user.
        """
        favorite = cls(user_id=user_id, post_id=post_id)
        favorite.save()
        return favorite

    @classmethod
    def remove_favorite(cls, user_id, post_id):
        """
        Remove a post from favorites for a given user.
        """
        favorite = cls.objects(user_id=user_id, post_id=post_id).first()
        if favorite:
            favorite.delete()
            return True
        return False


@app.route('/')
def hello_world():
    return 'Hello world!'

# User registration
@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        email = data.get('email')
        name = data.get('name')
        phone = data.get('phone')
        password = data.get('password')
        cpassword = data.get('cpassword')

        # Check for existing user
        if User.objects(email=email).first() or User.objects(name=name).first() or User.objects(phone=phone).first():
            return jsonify({'error': 'Email, Name, or Phone Number already exists'}), 401

        # Check password matching
        if password != cpassword:
            return jsonify({'error': 'Passwords do not match'}), 401

        # Check password strength
        if len(password) < 8:
            return jsonify({'error': 'Password must be at least 8 characters long'}), 401

        hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')

        user = User(email=email, name=name, phone=phone, password=hashed_pw, cpassword=hashed_pw, tokens=[])
        user.save()

        # Create an access token using Flask-JWT-Extended
        token = create_access_token(identity=user.email)
        user.tokens.append({'token': token})
        user.save()

        return jsonify({'token': token}), 201

    except Exception as e:
        # Log the exception for debugging
        app.logger.error(f"Error during registration: {str(e)}")
        return jsonify({'error': f'Internal Server Error: {str(e)}'}),

# User login endpoint
@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        # Check if the user exists and the password is correct
        user = User.objects(email=email).first()

        if user and bcrypt.check_password_hash(user.password, password):
            access_token = create_access_token(identity=email)
            return jsonify({'success': True, 'token': access_token}), 200
        else:
            return jsonify(message='Invalid credentials'), 401

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Internal Server Error'}), 500


# Protected route
@app.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
    
# Protected API endpoint for user logout
@app.route('/api/logout', methods=['POST'])
def logout():
    try:
        current_user = request.user
        return jsonify({'message': 'Logout successful'}), 200

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Internal Server Error'}), 500


# Destination
@app.route('/api/destination/<int:destination_id>')
def get_destination(destination_id):
    # Retrieve destination details by ID
    destination = next((d for d in destinations_data if d['id'] == destination_id), None)

    if destination:
        return jsonify(destination)
    else:
        return jsonify({"error": "Destination not found"}), 404


# Destination rating endpoint
@app.route('/api/destinations/<string:hotelId>/rate', methods=['POST'])
def rate_destination(destinationId):
    try:
        data = request.get_json()
        rating = data.get('rating')

        destination = Destination.objects(id=destinationId).first()

        if not destination:
            return jsonify({'error': 'Destination not found'}), 404

        destination.update(push__ratings=rating)
        destination.reload()

        return jsonify({'message': 'Rating added successfully', 'destination': destination}), 200

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Internal Server Error'}), 500

# Destination commenting endpoint
@app.route('/api/destinations/<string:destinationId>/comment', methods=['POST'])
def comment_destination(destinationId):
    try:
        data = request.get_json()
        text = data.get('text')
        user = data.get('user')

        destination = Destination.objects(id=destinationId).first()

        if not destination:
            return jsonify({'error': 'Destination not found'}), 404

        destination.update(push__comments={'user': user, 'text': text})
        destination.reload()

        return jsonify({'message': 'Comment added successfully', 'destination': destination}), 200

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Internal Server Error'}), 500


# Hotel
@app.route('/api/hotel/<int:hotel_id>')
def get_hotel(hotel_id):
    # Retrieve hotel details by ID
    hotel = next((h for h in hotels_data if h['id'] == hotel_id), None)

    if hotel:
        return jsonify(hotel)
    else:
        return jsonify({"error": "Hotel not found"}), 404


# Hotel rating endpoint
@app.route('/api/hotels/<string:hotelId>/rate', methods=['POST'])
def rate_hotel(hotelId):
    try:
        data = request.get_json()
        rating = data.get('rating')

        hotel = Hotel.objects(id=hotelId).first()

        if not hotel:
            return jsonify({'error': 'Hotel not found'}), 404

        hotel.update(push__ratings=rating)
        hotel.reload()

        return jsonify({'message': 'Rating added successfully', 'hotel': hotel}), 200

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Internal Server Error'}), 500

# Hotel commenting endpoint
@app.route('/api/hotels/<string:hotelId>/comment', methods=['POST'])
def comment_hotel(hotelId):
    try:
        data = request.get_json()
        text = data.get('text')
        user = data.get('user')

        hotel = Hotel.objects(id=hotelId).first()

        if not hotel:
            return jsonify({'error': 'Hotel not found'}), 404

        hotel.update(push__comments={'user': user, 'text': text})
        hotel.reload()

        return jsonify({'message': 'Comment added successfully', 'hotel': hotel}), 200

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Internal Server Error'}), 500


# Itinerary
@app.route('/api/itinerary', methods=['GET'])
@jwt_required()
def get_itineraries():
    current_user = get_jwt_identity()
    itineraries = Itinerary.objects(user=current_user)
    return jsonify(itineraries), 200

@app.route('/api/itinerary', methods=['POST'])
@jwt_required()
def create_itinerary():
    try:
        data = request.get_json()
        title = data.get('title')
        description = data.get('description')

        current_user = get_jwt_identity()
        user = User.objects(email=current_user).first()

        itinerary = Itinerary(title=title, description=description, user=user)
        itinerary.save()

        return jsonify({'message': 'Itinerary created successfully', 'itinerary': itinerary}), 201

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/api/itinerary/<string:itinerary_id>', methods=['PUT'])
@jwt_required()
def update_itinerary(itinerary_id):
    try:
        data = request.get_json()
        title = data.get('title')
        description = data.get('description')

        itinerary = Itinerary.objects(id=itinerary_id).first()

        if not itinerary:
            return jsonify({'error': 'Itinerary not found'}), 404

        # Update only the provided fields
        if title:
            itinerary.title = title
        if description:
            itinerary.description = description

        # Save the updated itinerary
        itinerary.save()

        return jsonify({'message': 'Itinerary updated successfully', 'itinerary': itinerary}), 200

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/api/itinerary/<string:itinerary_id>', methods=['DELETE'])
@jwt_required()
def delete_itinerary(itinerary_id):
    try:
        deleted_itinerary = Itinerary.objects(id=itinerary_id).delete()

        if not deleted_itinerary:
            return jsonify({'error': 'Itinerary not found'}), 404

        return jsonify({'message': 'Itinerary deleted successfully', 'itinerary': deleted_itinerary}), 200

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Internal Server Error'}), 500


# Blog post
blogposts = [
    {"_id": ObjectId("5f0a556cc9e77c6d1cfb2bb4"), "title": "Blog Post 1"},
]


@app.route('/api/blogpost/<int:blogpost_id>')
def get_blogpost(blogpost_id):
    # Retrieve blogpost details by ID
    blogpost = next((b for b in blogpost_data if b['id'] == blogpost_id), None)

    if blogpost:
        return jsonify(blogpost)
    else:
        return jsonify({"error": "Blogpost not found"}), 404


# Create a new blog post
@app.route('/api/blogposts', methods=['POST'])
def create_blog_post():
    try:
        data = request.get_json()
        title = data.get('title')
        content = data.get('content')
        author = data.get('author')

        if not title or not content:
            return jsonify({'error': 'Title and content are required'}), 400


        new_blog_post = BlogPost(title=title, content=content, author=author, likes=0, comments=[], shares=0)
        new_blog_post.save()

        return jsonify({'message': 'Blog post created successfully', 'blogPost': new_blog_post}), 201

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Internal Server Error'}), 500

# Get all blog posts
@app.route('/api/blogposts', methods=['GET'])
def get_all_blog_posts():
    try:
        blog_posts = BlogPost.objects()
        return jsonify(blog_posts), 200

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Internal Server Error'}), 500

# Get a specific blog post by ID
@app.route('/api/blogposts/<string:postId>', methods=['GET'])
def get_blog_post_by_id(postId):
    try:
        blog_post = BlogPost.objects(id=postId).first()

        if not blog_post:
            return jsonify({'error': 'Blog post not found'}), 404

        return jsonify(blog_post), 200

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Internal Server Error'}), 500

# Update a specific blog post by ID
@app.route('/api/blogposts/<string:postId>', methods=['PUT'])
def update_blog_post(postId):
    try:
        data = request.get_json()
        title = data.get('title')
        content = data.get('content')
        author = data.get('author')

        # Fetch the existing blog post
        existing_blog_post = BlogPost.objects(id=postId).first()

        if not existing_blog_post:
            return jsonify({'error': 'Blog post not found'}), 404

        # Update only the provided fields
        if title:
            existing_blog_post.title = title
        if content:
            existing_blog_post.content = content
        if author:
            existing_blog_post.author = author

        # Save the updated blog post
        existing_blog_post.save()

        return jsonify({'message': 'Blog post updated successfully', 'blogPost': existing_blog_post}), 200

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Internal Server Error'}), 500


# Delete a specific blog post by ID
@app.route('/api/blogposts/<string:post_id>', methods=['DELETE'])
def delete_blogpost(post_id):
    try:
        # Validate ObjectId
        if not ObjectId.is_valid(post_id):
            return jsonify({'error': 'Invalid ObjectId'}), 400

        result = mongo.db.blogposts.delete_one({'_id': ObjectId(post_id)})

        if result.deleted_count == 0:
            return jsonify({'error': 'Blog post not found'}), 404

        return jsonify({'message': 'Blog post deleted successfully'}), 200

    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal Server Error'}), 500


# Search Endpoints
@app.route('/api/search', methods=['GET'])
def search():
    query = request.args.get('q')  # Get the 'q' query parameter from the request
    if not query:
        return jsonify({'error': 'Query parameter is required!'}), 400
    
    # Perform a search in your MongoDB collections (e.g., BlogPost, Destination, Hotel)
    blog_results = perform_blog_search(query)
    hotel_results = perform_hotel_search(query)
    destination_results = perform_destination_search(query)
    
    # Combine results from different collections if needed
    combined_results = {
        'blogs': blog_results,
        'hotels': hotel_results,
        'destinations': destination_results
    }
    
    return jsonify(combined_results), 200



@app.route('/api/search/hotels', methods=['GET'])
def search_hotels():
    query = request.args.get('q', '')
    results = perform_hotel_search(query)
    
    hotels_list = []
    for hotel in results:
        hotels_list.append({
            'name': hotel.name,
            'description': hotel.description,
            'ratings': hotel.ratings,
            'comments': hotel.comments,
        })
    
    return jsonify(hotels_list)

@app.route('/api/search/destinations', methods=['GET'])
def search_destinations():
    query = request.args.get('q', '')
    results = perform_destination_search(query)
    
    destinations_list = []
    for destination in results:
        destinations_list.append({
            'name': destination.name,
            'description': destination.description,
            'location': destination.location,
        })
    
    return jsonify(destinations_list)

@app.route('/api/search/blogs', methods=['GET'])
def search_blogs():
    query = request.args.get('q', '')
    results = perform_blog_search(query)
    
    blogs_list = []
    for blog in results:
        blogs_list.append({
            'title': blog.title,
            'content': blog.content,
            'author': blog.author,
            'tags': blog.tags,
        })
    
    return jsonify(blogs_list)


# Favorites
def get_current_user_id():
    return get_jwt_identity()

@app.route('/api/favorite/destination/<destination_id>', methods=['POST'])
@jwt_required()
def favorite_destination(destination_id):
    try:
        current_user_id = get_jwt_identity()
        user = User.objects.get(id=current_user_id)
        
        if Favorite.is_favorite(user_id, destination_id):
            return jsonify({"message": "Destination already favorited"}), 400

        Favorite.add_favorite(user_id, destination_id)
        
        return jsonify({"message": "Destination favorited successfully"}), 200

    except Exception as e:
        return jsonify({'error': 'Internal Server Error', 'details': str(e)}), 500

@app.route('/api/favorite/hotel/<hotel_id>', methods=['POST'])
@jwt_required()
def favorite_hotel(hotel_id):
    try:
        current_user_id = get_jwt_identity()
        user = User.objects.get(id=current_user_id)
        
        if Favorite.is_favorite(user_id, hotel_id):
            return jsonify({"message": "Hotel already favorited"}), 400

        Favorite.add_favorite(user_id, hotel_id)
        
        return jsonify({"message": "Hotel favorited successfully"}), 200

    except Exception as e:
        return jsonify({'error': 'Internal Server Error', 'details': str(e)}), 500

@app.route('/api/favorite/blog/<blog_id>', methods=['POST'])
@jwt_required()
def favorite_blog(blog_id):
    try:
        current_user_id = get_jwt_identity()
        user = User.objects.get(id=current_user_id)
        
        if Favorite.is_favorite(user_id, blog_id):
            return jsonify({"message": "Blog already favorited"}), 400

        Favorite.add_favorite(user_id, blog_id)
        
        return jsonify({"message": "Blog favorited successfully"}), 200

    except Exception as e:
        return jsonify({'error': 'Internal Server Error', 'details': str(e)}), 500


app.route('/api/submitRatingAndComment', methods=['POST'])
def submit_rating_and_comment():
    # Extract data from the request
    data = request.json
    rating = data.get('rating')
    comment = data.get('comment')
    authToken = data.get('authToken')


    # Basic validation
    if not rating or not comment or not authToken:
        return jsonify({'status': 'error', 'message': 'Missing required data'}), 400

    if not is_valid_auth_token(authToken):
        return jsonify({'status': 'error', 'message': 'Invalid authentication'}), 401

    # Store the rating and comment)
    ratings_and_comments.append({'rating': rating, 'comment': comment})

    return jsonify({'status': 'success', 'rating': rating, 'comment': comment}), 200

def is_valid_auth_token(token):
    return True




if __name__ == "__main__":
   # insert_data()
    app.run(debug=True)

