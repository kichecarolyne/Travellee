from flask_mongoengine import MongoEngine


db = MongoEngine()



class BlogPost(db.Document):
    title = db.StringField(required=True)
    content = db.StringField(required=True)
    author = db.StringField(required=True)
    likes = db.IntField(default=0)
    comments = db.ListField(db.DictField())
    shares = db.IntField(default=0)
    meta = {
        'collection': 'Blogpost'
    }
