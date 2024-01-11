from flask_mongoengine import MongoEngine


db = MongoEngine()



class Hotel(db.Document):
    image = db.StringField(required=True)
    title = db.StringField(required=True)
    description = db.StringField()
    location = db.StringField()
    category = db.StringField()
    ratings = db.ListField(db.IntField())
    comments = db.ListField(db.DictField())
    users_who_favorited = db.ListField(db.ReferenceField('User'))
    meta = {
        'collection': 'Hotel'
    }
