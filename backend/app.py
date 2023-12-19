from flask import Flask, request, jsonify
from flask_mongoengine import MongoEngine
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from models import BlogPost, Destination, Hotel, User, Itinerary

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


def insert_data():
    # Insert a Destination
    destination = Destination(name='Destination 1', ratings=[4, 5], comments=[{'user': 'User1', 'text': 'Beautiful scenery'}])
    destination.save()

    # Insert a Hotel
    hotel = Hotel(name='Hotel 1', ratings=[4, 5], comments=[{'user': 'User1', 'text': 'Amazing service!'}])
    hotel.save()

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

def perform_search(query):
    return [destination for destination in destinations_data if query.lower() in destination["name"].lower()]

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

@app.route('/api/search')
def search():
    query = request.args.get('q', '')

    # Perform a search query in data source
    results = perform_search(query)

    return jsonify(results)

@app.route('/api/destination/<int:destination_id>')
def get_destination(destination_id):
    # Retrieve destination details by ID
    destination = next((d for d in destinations_data if d['id'] == destination_id), None)

    if destination:
        return jsonify(destination)
    else:
        return jsonify({"error": "Destination not found"}), 404


@app.route('/api/hotel/<int:hotel_id>')
def get_hotel(hotel_id):
    # Retrieve hotel details by ID
    hotel = next((h for h in hotels_data if h['id'] == hotel_id), None)

    if hotel:
        return jsonify(hotel)
    else:
        return jsonify({"error": "Hotel not found"}), 404


@app.route('/api/blogpost/<int:blogpost_id>')
def get_blogpost(blogpost_id):
    # Retrieve blogpost details by ID
    blogpost = next((b for b in blogpost_data if b['id'] == blogpost_id), None)

    if blogpost:
        return jsonify(blogpost)
    else:
        return jsonify({"error": "Blogpost not found"}), 404

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


@app.route('/api/favorite/destination/<int:destination_id>', methods=['POST'])
@jwt_required()
def favorite_destination(destination_id):
    user = get_current_user()
    destination = Destination.objects(id=destination_id).first()

    if user and destination:
        if destination not in user.favorite_destinations:
            user.update(push__favorite_destinations=destination)
            user.save()
            return jsonify({'message': 'Destination favorited successfully'}), 200
        else:
            return jsonify({'message': 'Destination already favorited'}), 400
    else:
        return jsonify({'error': 'Invalid user or destination'}), 404


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


@app.route('/api/favorite/hotel/<int:hotel_id>', methods=['POST'])
@jwt_required()
def favorite_hotel(hotel_id):
    user = get_current_user()
    hotel = Hotel.objects(id=hotel_id).first()

    if user and hotel:
        if hotel not in user.favorite_hotels:
            user.update(push__favorite_hotels=hotel)
            user.save()
            return jsonify({'message': 'Hotel favorited successfully'}), 200
        else:
            return jsonify({'message': 'Hotel already favorited'}), 400
    else:
        return jsonify({'error': 'Invalid user or hotel'}), 404


@app.route('/api/itineraries', methods=['GET'])
@jwt_required()
def get_itineraries():
    current_user = get_jwt_identity()
    itineraries = Itinerary.objects(user=current_user)
    return jsonify(itineraries), 200

@app.route('/api/itineraries', methods=['POST'])
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

@app.route('/api/itineraries/<string:itinerary_id>', methods=['PUT'])
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

@app.route('/api/itineraries/<string:itinerary_id>', methods=['DELETE'])
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
@app.route('/api/blogposts/<string:postId>', methods=['DELETE'])
def delete_blog_post(postId):
    try:
        deleted_blog_post = BlogPost.objects(id=postId).delete()

        if not deleted_blog_post:
            return jsonify({'error': 'Blog post not found'}), 404

        return jsonify({'message': 'Blog post deleted successfully', 'blogPost': deleted_blog_post}), 200

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Internal Server Error'}), 500


@app.route('/api/favorite/blogpost/<string:blogpost_id>', methods=['POST'])
@jwt_required()
def favorite_blogpost(blogpost_id):
    user = get_current_user()
    blogpost = BlogPost.objects(id=blogpost_id).first()

    if user and blogpost:
        if blogpost not in user.favorite_blog_posts:
            user.update(push__favorite_blog_posts=blogpost)
            user.save()
            return jsonify({'message': 'Blog post favorited successfully'}), 200
        else:
            return jsonify({'message': 'Blog post already favorited'}), 400
    else:
        return jsonify({'error': 'Invalid user or blog post'}), 404



if __name__ == "__main__":
    insert_data()
   # app.run(debug=True)

