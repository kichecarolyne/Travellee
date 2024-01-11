from flask import Flask, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)

# Connect to MongoDB
app.config["MONGO_URI"] = "mongodb://localhost:27017/mydatabase"
mongo = PyMongo(app)

# Define collections
destinations = mongo.db.Destination
hotels = mongo.db.Hotel

# Endpoint to insert destinations
@app.route('/insert-destinations', methods=['POST'])
def insert_data():
    destinations_data = [
        {
            "id": 1,
            "image": 'https://i.imgur.com/UhbkKcy.png',
            "title": 'Great Barrier Reef',
            "description": 'The Great Barrier Reef is a site of remarkable variety and beauty on the north-east coast of Australia.',
            "location": 'Australia',
            "category": 'Nature',
            "ratings": [4.7, 4.5, 4.8],
            "comments": ['Breathtaking coral!', 'Unforgettable snorkeling.', 'Amazing marine life.']
        },
        {
            "id": 2,
            "image": 'https://i.imgur.com/6reje4u.png',
            "title": 'Grand Canyon',
            "description": 'An all-ages experience, with lookouts at the canyon rim, tours, programs, museums, dining, shopping and more.',
            "location": 'Arizona',
            "category": 'Nature',
            "ratings": [4.6, 4.2, 4.5],
            "comments": ['Spectacular views!', 'Great hiking trails.', 'Awesome rock formations.']
        },
        {
        "id": 3,
        "image": "https://i.imgur.com/ucvuwOD.png",
        "title": "Victoria Falls",
        "description": "One of the most spectacular waterfalls and it really is quite a sight to behold.",
        "location": "Zimbabwe",
        "category": "Nature",
        "ratings": [4.8, 4.6, 4.7],
        "comments": ["Awe-inspiring!", "Powerful waterfall.", "Mesmerizing rainbow views."]
        },
        {
            "id": 4,
            "image": "https://i.imgur.com/f8GBuyu.png",
            "title": "Maasai Mara",
            "description": "World-famous for hosting the epic Great Migration, the Masai Mara welcomes 1.5 million wildebeests onto its sprawling savannahs each July through October.",
            "location": "Kenya",
            "category": "Wildlife",
            "ratings": [4.5, 4.8, 4.3],
            "comments": ["Incredible wildlife!", "Unique safari experience.", "Majestic landscapes."]
        },
        {
            "id": 5,
            "image": "https://i.imgur.com/S49U8C3.png",
            "title": "Kanha",
            "description": "The national park is being popularized as the Tiger reserve and interestingly is being declared as one of the finest wildlife areas in the world.",
            "location": "India",
            "category": "Wildlife",
            "ratings": [4.2, 4.5, 4.0],
            "comments": ["Tiger spotting!", "Birdwatcher’s paradise.", "Peaceful surroundings."]
        },
        {
            "id": 6,
            "image": "https://i.imgur.com/DPw9OSE.png",
            "title": "Serengeti",
            "description": "Serengeti National Park is a World Heritage Site teeming with wildlife.",
            "location": "Tanzania",
            "category": "Wildlife",
            "ratings": [4.7, 4.9, 4.5],
            "comments": ["Great migration!", "Lush landscapes.", "Exceptional game drives."]
        },
        {
            "id": 7,
            "image": "https://i.imgur.com/ezdQ7oR.png",
            "title": "Pyramids of Giza",
            "description": "The pyramids of Giza were royal tombs built for three different pharaohs.",
            "location": "Egypt",
            "category": "Historical site",
            "ratings": [4.6, 4.8, 4.7],
            "comments": ["Ancient wonders!", "Fascinating history.", "Must-visit archaeological site."]
        },
        {
            "id": 8,
            "image": "https://i.imgur.com/RWRahAQ.png",
            "title": "The Colosseum",
            "description": "The largest ancient amphitheater ever built, and is still the largest standing amphitheater in the world, despite its age.",
            "location": "Rome",
            "category": "Historical site",
            "ratings": [4.9, 4.7, 4.8],
            "comments": ["Iconic structure!", "Rich history.", "Impressive architecture."]
        },
        {
            "id": 9,
            "image": "https://i.imgur.com/Ql9GUDS.png",
            "title": "Machu Picchu",
            "description": "It is also called the Flavian Amphitheatre. It is an elliptical structure made of stone, concrete, and tuff, and it stands four stories tall at its highest point.",
            "location": "Peru",
            "category": "Historical site",
            "ratings": [4.8, 4.6, 4.9],
            "comments": ["Lost city!", "Breathtaking views.", "Mystical atmosphere."]
        },
        {
            "id": 10,
            "image": "https://i.imgur.com/XSSTICO.png",
            "title": "Cape Santa Maria",
            "description": "Cape Santa Maria (CSM) Beach Resort, located at the northern tip of Long Island in the Southern Bahamas is famous for its warm hospitality, and spectacular beaches.",
            "location": "Bahamas",
            "category": "Beach",
            "ratings": [4.6, 4.7, 4.5],
            "comments": ["Beautiful sandy beaches!", "Friendly staff.", "Relaxing atmosphere."]
        },

        {
            "id": 11,
            "image": 'https://i.imgur.com/GjkFaoF.png',
            "title": 'COMO Cocoa Island',
            "description": 'An intimate, romantic resort with 33 overwater villas above a turquoise lagoon.',
            "location": 'Maldives',
            "category": 'Beach',
            "ratings": [4.8, 4.9, 4.7],
            "comments": ['Overwater villas are amazing!', 'Crystal clear waters.', 'Perfect for honeymoon.']
        },
        {
            "id": 12,
            "image": 'https://i.imgur.com/p7mvNWM.png',
            "title": 'Natadola',
            "description": 'Natadola Beach, located on Fiji main island of Viti Levu, is the most beautiful white-sand beach in Fiji.',
            "location": 'Fiji',
            "category": 'Beach',
            "ratings": [4.5, 4.6, 4.4],
            "comments": ['White sand paradise!', 'Great for water activities.', 'Scenic views.']
        },
        {
            "id": 13,
            "image": 'https://i.imgur.com/aTFVie9.png',
            "title": 'Zanzibar Beaches',
            "description": 'Zanzibar Island is one of the top beach holiday destinations in the world raked as the number one in Africa.',
            "location": 'Zanzibar',
            "category": 'Beach',
            "ratings": [4.7, 4.5, 4.8],
            "comments": ['Exotic beaches!', 'Rich cultural experience.', 'Delicious seafood.']
        },
        {
            "id": 14,
            "image": 'https://i.imgur.com/qgIKulE.png',
            "title": 'Mount Cook',
            "description": 'It is alpine in the purest sense - with skyscraping peaks, glaciers and permanent snow fields, all set under a star-studded sky.',
            "location": 'New Zealand',
            "category": 'Camping',
            "ratings": [4.6, 4.8, 4.5],
            "comments": ['Stunning alpine scenery!', 'Great hiking trails.', 'Unforgettable stargazing.']
        },
        {
            "id": 15,
            "image": 'https://i.imgur.com/GZ3k8Dw.png',
            "title": 'Vancouver Island',
            "description": 'Experience world-class whale watching, birding, and fishing, or just let your worries drift away in the waves of the Pacific.',
            "location": 'British Columbia',
            "category": 'Camping',
            "ratings": [4.5, 4.7, 4.6],
            "comments": ['Whale watching paradise!', 'Nature at its best.', 'Relaxing by the Pacific.']
        },

        {
        "id": 16,
        "image": "https://i.imgur.com/DiMOndx.png",
        "title": "The Swiss Alps",
        "description": "The Swiss Alps has 48 mountain peaks which are over 4,000m, as well as countless lakes and an extraordinary variety of flora and fauna.",
        "location": "Europe",
        "category": "Camping",
        "ratings": [4.8, 4.9, 4.7],
        "comments": ["Scenic mountain landscapes!", "Perfect for hiking.", "Quaint alpine villages."]
        },
        {
            "id": 17,
            "image": "https://i.imgur.com/6NSXdo4.png",
            "title": "Kumano Kodo",
            "description": "A network of pilgrimage trails through the southern Kansai region.",
            "location": "Japan",
            "category": "Hiking",
            "ratings": [4.7, 4.5, 4.8],
            "comments": ["Historical pilgrimage!", "Beautiful trail routes.", "Spiritual journey."]
        },
        {
            "id": 18,
            "image": "https://i.imgur.com/OZxw2UB.png",
            "title": "Pacific Crest Trail",
            "description": "A long-distance hiking and equestrian trail closely aligned with the highest portion of the Cascade and Sierra Nevada mountain ranges.",
            "location": "US",
            "category": "Hiking",
            "ratings": [4.6, 4.8, 4.7],
            "comments": ["Epic long-distance hike!", "Scenic mountain views.", "Challenging yet rewarding."]
        },
        {
            "id": 19,
            "image": "https://i.imgur.com/MVyuVuY.png",
            "title": "Mount Kilimanjaro",
            "description": "It is the largest free-standing mountain rise in the world, meaning it is not part of a mountain range.",
            "location": "Tanzania",
            "category": "Hiking",
            "ratings": [4.5, 4.6, 4.4],
            "comments": ["Epic hiking experience!", "Breath-taking views.", "Challenging but rewarding."]
        },
        {
            "id": 20,
            "image": "https://i.imgur.com/skZrm04.png",
            "title": "Zermatt",
            "description": "The vacation destination is a car-free zone, has preserved its original character and offers nearly unlimited possibilities as far as excursions are concerned.",
            "location": "Switzerland",
            "category": "Skiing",
            "ratings": [4.7, 4.8, 4.6],
            "comments": ["Skiing paradise!", "Quaint car-free village.", "Scenic mountain landscapes."]
        },
        {
            "id": 21,
            "image": "https://i.imgur.com/0rpPz5p.png",
            "title": "Whistler",
            "description": "A pedestrian-friendly Village is nestled at the base of the Whistler Blackcomb Mountains and the allure of imminent adventure amplifies its festive atmosphere.",
            "location": "British Columbia",
            "category": "Skiing",
            "ratings": [4.8, 4.9, 4.7],
            "comments": ["Adventurous skiing!", "Vibrant pedestrian village.", "Snow-covered wonderland."]
        },
        {
            "id": 22,
            "image": "https://i.imgur.com/ye5gV7K.png",
            "title": "Vail",
            "description": "Vail is one of the most popular and iconic ski resorts.",
            "location": "US",
            "category": "Skiing",
            "ratings": [4.6, 4.7, 4.5],
            "comments": ["Iconic ski resort!", "Skiing for all levels.", "Après-ski fun."]
        },
        {
            "id": 23,
            "image": "https://i.imgur.com/HM99zIi.png",
            "title": "Paris",
            "description": "Paris has been an important center of politics, commerce, art, music, revolution, and war throughout the world for hundreds and hundreds of years.",
            "location": "France",
            "category": "Cultural site",
            "ratings": [4.7, 4.9, 4.8],
            "comments": ["City of lights!", "Rich cultural heritage.", "Art and history everywhere."]
        },
        {
            "id": 24,
            "image": "https://i.imgur.com/IGMLBAk.png",
            "title": "Milan",
            "description": "A city of culture, fashion, design capital, and financial hub.",
            "location": "Italy",
            "category": "Cultural site",
            "ratings": [4.6, 4.8, 4.7],
            "comments": ["Fashion capital!", "Design and art lovers paradise.", "Financial and cultural hub."]
        },
        {
            "id": 25,
            "image": "https://i.imgur.com/Z9b6dvz.png",
            "title": "Dubai",
            "description": "The city is increasingly in demand as a luxury tourist destination for travelers from all corners of the globe.",
            "location": "UAE",
            "category": "Cultural site",
            "ratings": [4.8, 4.9, 4.7],
            "comments": ["Modern luxury!", "Architectural marvels.", "Cultural diversity."]
        }

]
    try:
        inserted_destinations = destinations.insert_many(destinations_data)
        return jsonify(message='Destinations inserted successfully', data=inserted_destinations.inserted_ids), 200
    except Exception as e:
        return jsonify(message='Error inserting destinations', error=str(e)), 500

# Endpoint to insert hotels
@app.route('/insert-hotels', methods=['POST'])
def insert_data():
    hotels_data = [
        {
        "id": 1,
        "image": "https://i.imgur.com/TV8Upi7.png",
        "title": "Equinox Hotel NYC",
        "description": "Expect luxury accommodation created for optimum rest...",
        "location": "New York City",
        "category": "Hotel",
        "ratings": [4.5, 5, 4],
        "comments": ["Great stay!", "Wonderful experience.", "Excellent service."]
        },
        {
            "id": 2,
            "image": "https://i.imgur.com/K5PkOJA.png",
            "title": "The Oberoi Amarvillas Hotel",
            "description": "Located just 600 metres from the Taj Mahal.",
            "location": "Agra",
            "category": "Hotel",
            "ratings": [4, 4.5, 3.5],
            "comments": ["Beautiful view!", "Comfortable rooms.", "Friendly staff."]
        },
        {
            "id": 3,
            "image": "https://i.imgur.com/utOrMeB.png",
            "title": "Atlantis The Royal",
            "description": "The hotel is home to 795 rooms, suites, and signature penthouses.",
            "location": "Dubai",
            "category": "Hotel",
            "ratings": [4.2, 4.8, 4.5],
            "comments": ["Stunning architecture!", "Luxurious amenities.", "Great dining options."]
        },
        {
            "id": 4,
            "image": "https://i.imgur.com/SGviteB.png",
            "title": "Four Seasons Hotel",
            "description": "A luxury hotel and a soothing oasis of superb interiors right in the heart of the City.",
            "location": "Mexico",
            "category": "Hotel",
            "ratings": [4.7, 5, 4.5],
            "comments": ["Top-notch service!", "Beautiful surroundings.", "Relaxing atmosphere."]
        },
        {
            "id": 5,
            "image": "https://i.imgur.com/86Z7TRk.png",
            "title": "Hotel Hanalei",
            "description": "Enjoy plenty of special experiences throughout your stay at no extra cost.",
            "location": "Hawaii",
            "category": "Resort",
            "ratings": [4.5, 4.2, 4.8],
            "comments": ["Paradise on Earth!", "Family-friendly.", "Great recreational activities."]
        },
        {
            "id": 6,
            "image": "https://i.imgur.com/DkBuSPR.png",
            "title": "Eden Rock",
            "description": "Enjoy a terrific range of activities at Eden Rock – St Barths. This from gyming and training to relaxing on gorgeous white sandy beaches to watersports and boat trips. Plus art and music and gourmet all-day dining and super shopping.",
            "location": "St.Barths",
            "category": "Resort",
            "ratings": [4.8, 5, 4.6],
            "comments": ["Luxury at its best!", "Scenic views.", "Unforgettable experience."]
        },
        {
            "id": 7,
            "image": "https://i.imgur.com/3r3JXyc.png",
            "title": "Elewana Camp",
            "description": "Elewana crafts authentic and memorable safari experiences, providing the highest quality of luxury and comfort.",
            "location": "Kenya",
            "category": "Camp",
            "ratings": [4.5, 4.2, 4.7],
            "comments": ["Wildlife paradise!", "Knowledgeable guides.", "Comfortable accommodations."]
        },
        {
            "id": 8,
            "image": "https://i.imgur.com/TWB5YBN.png",
            "title": "Cottar Camp",
            "description": "The 1920s Camp provides the romance of safari under cream canvas tents.",
            "location": "Kenya",
            "category": "Camp",
            "ratings": [4.3, 4.8, 4.5],
            "comments": ["Vintage charm!", "Immersive safari experience.", "Delicious campfire meals."]
        },
        {
            "id": 9,
            "image": "https://i.imgur.com/PlORcYw.png",
            "title": "Aruba Mara Camp",
            "description": "Aruba Mara camp consists of over 10 spacious and comfortable tents raised on a wooden deck overlooking Talek River reflecting traditional building styles with modern comfort.",
            "location": "Kenya",
            "category": "Camp",
            "ratings": [4.6, 4.5, 4.2],
            "comments": ["Riverside tranquility!", "Safari adventure.", "Friendly staff."]
        }

]


    try:
        inserted_hotels = hotels.insert_many(hotels_data)
        return jsonify(message='Hotels inserted successfully', data=inserted_hotels.inserted_ids), 200
    except Exception as e:
        return jsonify(message='Error inserting hotels', error=str(e)), 500
