from flask import Flask, request, session, jsonify
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
import jwt
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
CORS(app)

# Configuration for MongoDB
app.config['MONGO_URI'] = 'mongodb+srv://new_user2:ojg9exOJ3lLV2ugV@cluster0.jxnz7i7.mongodb.net/travelblog'
mongo = PyMongo(app)

# Configuration for Flask-Bcrypt
bcrypt = Bcrypt(app)

# Configuration for Flask-JWT-Extended
app.config['JWT_SECRET_KEY'] = 'my-secret-key'
jwt = JWTManager(app)

# User registration endpoint
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()

    if 'username' not in data or 'password' not in data:
        return jsonify({"error": "Missing username or password"}), 400

    username = data['username']
    password = data['password']

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = {
        'username': username,
        'password': hashed_password
    }

    mongo.db.users.insert_one(new_user)

    return jsonify({"message": "User registered successfully"}), 201

# User login endpoint
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    if 'username' not in data or 'password' not in data:
        return jsonify({"error": "Missing username or password"}), 400

    username = data['username']
    password = data['password']

    user = mongo.db.users.find_one({'username': username})

    if user and bcrypt.check_password_hash(user['password'], password):
        access_token = create_access_token(identity=username)
        return jsonify({"token": access_token}), 200

    return jsonify({"error": "Invalid credentials"}), 401

# Protected API endpoint for user logout
@app.route('/api/logout', methods=['POST'])
@jwt_required()
def logout():
    current_user = get_jwt_identity()
    # Perform any additional logout logic if needed
    return jsonify({"message": "Logout successful"}), 200

# Protected API endpoint to create a new blog post
@app.route('/api/blogposts', methods=['POST'])
@jwt_required()
def create_blog_post():
    data = request.get_json()

    if 'title' not in data or 'content' not in data or 'author' not in data:
        return jsonify({"error": "Missing title, content, or author"}), 400

    title = data['title']
    content = data['content']
    author = data['author']

    new_blog_post = {
        'title': title,
        'content': content,
        'author': author,
        'likes': 0,
        'comments': [],
        'shares': 0
    }

    mongo.db.blogposts.insert_one(new_blog_post)

    return jsonify(new_blog_post), 201

# Protected API endpoint to get all blog posts
@app.route('/api/blogposts', methods=['GET'])
@jwt_required()
def get_all_blog_posts():
    blog_posts = list(mongo.db.blogposts.find())
    return jsonify(blog_posts), 200

# Like a blog post
@app.route('/api/blogposts/<post_id>/like', methods=['POST'])
def like_blog_post(post_id):
    post = mongo.db.blogposts.find_one_and_update(
        {'_id': int(post_id)},
        {'$inc': {'likes': 1}},
        return_document=True
    )
    return jsonify({'likes': post['likes']}), 200

# Comment on a blog post
@app.route('/api/blogposts/<post_id>/comment', methods=['POST'])
def comment_on_blog_post(post_id):
    data = request.get_json()

    if 'text' not in data or 'author' not in data:
        return jsonify({"error": "Missing text or author for comment"}), 400

    text = data['text']
    author = data['author']

    post = mongo.db.blogposts.find_one_and_update(
        {'_id': int(post_id)},
        {'$push': {'comments': {'text': text, 'author': author}}},
        return_document=True
    )

    return jsonify(post), 200

# Share a blog post
@app.route('/api/blogposts/<post_id>/share', methods=['POST'])
def share_blog_post(post_id):
    post = mongo.db.blogposts.find_one_and_update(
        {'_id': int(post_id)},
        {'$inc': {'shares': 1}},
        return_document=True
    )
    return jsonify({'shares': post['shares']}), 200

if __name__ == '__main__':
    app.run(debug=True)
