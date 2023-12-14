from flask import Flask, request, jsonify
from flask_mongoengine import MongoEngine
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from flask_bcrypt import Bcrypt
from models import BlogPost, Product, User
import jwt

app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'db': 'mydatabase',
    'host': 'localhost',
    'port': 27017,
    'connect': True
}

jwt = JWTManager(app)


app.config['JWT_SECRET_KEY'] = 'my-secret-key'


db = MongoEngine(app)
bcrypt = Bcrypt(app)


def insert_data():
    # Insert a Product
    product = Product(name='Product 2', ratings=[4, 5], comments=[{'user': 'User1', 'text': 'Great product'}])
    product.save()

    # Insert a BlogPost
    blog_post = BlogPost(title='My Second Blog Post', content='This is the content of the blog post.', author='Author1')
    blog_post.save()

    # Insert a User
    user = User(email='user@example.com', name='John Wick', phone='3412567890', password='onehashed_password', cpassword='onehashed_password', tokens=[{'token': 'token123'}])
    user.save()


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

        # Check password strength (you can customize this according to your requirements)
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

        if not email or not password:
            return jsonify({'error': 'Missing email or password'}), 400

        user = User.objects(email=email).first()

        if not user or not bcrypt.check_password_hash(user.password, password):
            return jsonify({'error': 'Invalid credentials'}), 401

        token = jwt.encode({'email': email}, JWT_SECRET_KEY)
        user.tokens[0]['token'] = token
        user.save()

        return jsonify({'token': token}), 200

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Internal Server Error'}), 500

# Protected API endpoint for user logout
@app.route('/api/logout', methods=['POST'])
def logout():
    try:
        current_user = request.user
        # Perform any additional logout logic if needed
        return jsonify({'message': 'Logout successful'}), 200

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Internal Server Error'}), 500

# Product rating endpoint
@app.route('/api/products/<string:productId>/rate', methods=['POST'])
def rate_product(productId):
    try:
        data = request.get_json()
        rating = data.get('rating')

        product = Product.objects(id=productId).first()

        if not product:
            return jsonify({'error': 'Product not found'}), 404

        product.update(push__ratings=rating)
        product.reload()

        return jsonify({'message': 'Rating added successfully', 'product': product}), 200

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Internal Server Error'}), 500

# Product commenting endpoint
@app.route('/api/products/<string:productId>/comment', methods=['POST'])
def comment_product(productId):
    try:
        data = request.get_json()
        text = data.get('text')
        user = data.get('user')

        product = Product.objects(id=productId).first()

        if not product:
            return jsonify({'error': 'Product not found'}), 404

        product.update(push__comments={'user': user, 'text': text})
        product.reload()

        return jsonify({'message': 'Comment added successfully', 'product': product}), 200

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

# Start the server
if __name__ == "__main__":
    insert_data()
   # app.run(debug=True)

