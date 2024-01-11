from flask_mongoengine import MongoEngine


db = MongoEngine()



class BlogPost(db.Document):
    title = db.StringField(required=True)
    content = db.StringField(required=True)
    author = db.StringField(required=True)
    tags = db.ListField(db.StringField())
    likes = db.IntField(default=0)
    comments = db.ListField(db.DictField())
    shares = db.IntField(default=0)
    users_who_favorited = db.ListField(db.ReferenceField('User'))
    meta = {
        'collection': 'Blogpost'
    }
