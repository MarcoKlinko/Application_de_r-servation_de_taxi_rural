
import uuid

class User:
    def __init__(self, name, phone):
        self.id = str(uuid.uuid4())
        self.name = name
        self.phone = phone

    def to_dict(self):
        return {"id": self.id, "name": self.name, "phone": self.phone}

class Taxi:
    def __init__(self, driver, location, available=True):
        self.id = str(uuid.uuid4())
        self.driver = driver
        self.location = location
        self.available = available

    def to_dict(self):
        return {
            "id": self.id,
            "driver": self.driver,
            "location": self.location,
            "available": self.available
        }

class Booking:
    def __init__(self, user_id, taxi_id, status="pending"):
        self.id = str(uuid.uuid4())
        self.user_id = user_id
        self.taxi_id = taxi_id
        self.status = status

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "taxi_id": self.taxi_id,
            "status": self.status
        }

class Payment:
    def __init__(self, booking_id, amount, status="pending"):
        self.id = str(uuid.uuid4())
        self.booking_id = booking_id
        self.amount = amount
        self.status = status

    def to_dict(self):
        return {
            "id": self.id,
            "booking_id": self.booking_id,
            "amount": self.amount,
            "status": self.status
        }