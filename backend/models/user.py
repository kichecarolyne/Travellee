from flask_mongoengine import MongoEngine


db = MongoEngine()



class User(db.Document):
    email = db.StringField(required=True)
    name = db.StringField(required=True)
    phone = db.StringField(required=True)
    password = db.StringField(required=True)
    cpassword = db.StringField(required=True)
    tokens = db.ListField(db.DictField())
    favorite_destinations = db.ListField(db.ReferenceField('Destination'))
    favorite_hotels = db.ListField(db.ReferenceField('Hotel'))
    favorite_blog_posts = db.ListField(db.ReferenceField('BlogPost'))
    meta = {
        'collection': 'User'
    }
