from flask_mongoengine import MongoEngine


db = MongoEngine()



class Favorite(db.Document):
    user_id = db.StringField(required=True)
    post_id = db.ObjectIdField(required=True)
    meta = {
        'collection': 'Favorite'
    }