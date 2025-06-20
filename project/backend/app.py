
from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid

app = Flask(__name__)
CORS(app)

# In-memory data stores (replace with Firebase in production)
users = {}
taxis = {}
bookings = {}

@app.route('/users', methods=['POST'])
def register_user():
    data = request.json
    user_id = str(uuid.uuid4())
    users[user_id] = {"id": user_id, "name": data["name"], "phone": data["phone"]}
    return jsonify(users[user_id]), 201

@app.route('/taxis', methods=['GET'])
def get_taxis():
    # Return all available taxis
    available = [taxi for taxi in taxis.values() if taxi["available"]]
    return jsonify(available)

@app.route('/bookings', methods=['POST'])
def create_booking():
    data = request.json
    booking_id = str(uuid.uuid4())
    bookings[booking_id] = {
        "id": booking_id,
        "user_id": data["user_id"],
        "taxi_id": data["taxi_id"],
        "status": "pending"
    }
    # Mark taxi as unavailable
    taxis[data["taxi_id"]]["available"] = False
    return jsonify(bookings[booking_id]), 201

@app.route('/bookings/<booking_id>/cancel', methods=['POST'])
def cancel_booking(booking_id):
    if booking_id in bookings:
        bookings[booking_id]["status"] = "cancelled"
        taxis[bookings[booking_id]["taxi_id"]]["available"] = True
        return jsonify({"message": "Booking cancelled"})
    return jsonify({"error": "Booking not found"}), 404

@app.route('/payments', methods=['POST'])
def make_payment():
    data = request.json
    # Simulate payment processing
    return jsonify({"status": "success", "booking_id": data["booking_id"]})

# Dummy data for testing
@app.before_first_request
def setup():
    taxis["taxi1"] = {"id": "taxi1", "driver": "Ali", "available": True, "location": "village center"}
    taxis["taxi2"] = {"id": "taxi2", "driver": "Fatou", "available": True, "location": "market"}

if __name__ == '__main__':
    app.run(debug=True)