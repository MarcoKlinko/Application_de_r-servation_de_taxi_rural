from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

# Initialiser Firebase
cred = credentials.Certificate("projet6-23a1a.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

app = Flask(__name__)

@app.route('/')
def index():
    return "🚕 API de Réservation de Taxi"

# 1. Réserver un taxi
@app.route('/reserver', methods=['POST'])
def reserver_taxi():
    data = request.get_json()
    #Donner necessaire 

    db.collection('reservations').add(data)
    return jsonify({"message": "Réservation effectuée"}), 201


# 2. Lister les réservations d’un utilisateur
@app.route('/historique/<user_id>', methods=['GET'])
def historique(user_id):
    docs = db.collection('reservations').where('user_id', '==', user_id).stream()
    result = [{doc.id: doc.to_dict()} for doc in docs]
    return jsonify(result), 200

# 3. Lister les réservations en attente pour les chauffeurs
@app.route('/taxis/reservations', methods=['GET'])
def reservations_en_attente():
    docs = db.collection('reservations').where('status', '==', 'en_attente').stream()
    result = [{doc.id: doc.to_dict()} for doc in docs]
    return jsonify(result), 200

# 4. Authentification
@app.route('/auth', methods=['POST'])
def auth():
    data = request.get_json()

    #Donner necessaire 
    user_id = data.get('user_id')
    mdp = data.get('mdp')

    # Vérifie que le client existe avec ce user_id et ce mot de passe
    docs = db.collection('client') \
            .where('user_id', '==', user_id) \
            .where('mdp', '==', mdp) \
            .stream()

    clients = [doc.to_dict() for doc in docs]

    if clients:
        return jsonify({"message": "Connexion réussie", "client": clients[0]}), 200
    else:
        return jsonify({"message": "Identifiants invalides"}), 401

# 5 ajout taxi

@app.route('/ajouter_taxi', methods=['POST'])
def ajouter_taxi():
    try:
        data = request.get_json()
        taxi_id = data.get('id')
        if not taxi_id:
            return jsonify({"error": "Champ 'id' requis"}), 400
        
        db.collection('taxis').document(taxi_id).set(data)
        return jsonify({"message": "✅ Taxi ajouté avec succès"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 6 Ajout client

@app.route('/ajouter_client', methods=['POST'])
def ajouter_client():
    try:
        data = request.get_json()

        # Validation minimale
        client_id = data.get('id')
        nom = data.get('nom')
        email = data.get('email')
        mdp = data.get('mdp')
        telephone = data.get('telephone')

        if not all([client_id, nom, email,mdp, telephone]):
            return jsonify({"error": "Champs manquants"}), 400

        # Enregistrement dans Firestore
        db.collection('utilisateurs').document(client_id).set(data)

        return jsonify({"message": "✅ Client ajouté avec succès"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 7 ajout reservation

@app.route('/reserver', methods=['POST'])
def reserver():
    try:
        data = request.get_json()

        # Extraire les champs requis
        res_id = data.get('id')  # ou génère automatiquement
        utilisateur_id = data.get('utilisateurId')
        taxi_id = data.get('taxiId')
        point_depart = data.get('pointDepart')
        point_arrivee = data.get('pointArrivee')
        heure = data.get('heureReservation') or datetime.now().isoformat()

        if not all([res_id, utilisateur_id, taxi_id, point_depart, point_arrivee]):
            return jsonify({"error": "Champs manquants"}), 400

        reservation_data = {
            "id": res_id,
            "utilisateurId": utilisateur_id,
            "taxiId": taxi_id,
            "etat": "en attente",
            "pointDepart": point_depart,
            "pointArrivee": point_arrivee,
            "heureReservation": heure
        }

        db.collection('reservations').document(res_id).set(reservation_data)

        return jsonify({"message": "✅ Réservation ajoutée"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 8 accept reserer

@app.route('/accepter_reservation', methods=['POST'])
def accepter_reservation():
    try:
        data = request.get_json()
        res_id = data.get("id")

        if not res_id:
            return jsonify({"error": "ID de réservation manquant"}), 400

        # Récupérer la réservation
        reservation_ref = db.collection("reservations").document(res_id)
        reservation_doc = reservation_ref.get()

        if not reservation_doc.exists:
            return jsonify({"error": "Réservation introuvable"}), 404

        reservation_data = reservation_doc.to_dict()
        taxi_id = reservation_data["taxiId"]

        # Mettre à jour la réservation
        reservation_ref.update({
            "etat": "acceptée"
        })

        # Mettre à jour le taxi concerné
        taxi_ref = db.collection("taxis").document(taxi_id)
        taxi_ref.update({
            "statut": "occupé"
        })

        return jsonify({"message": f"✅ Réservation {res_id} acceptée et taxi {taxi_id} mis à jour"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 9 Liste taxis

@app.route('/taxis', methods=['GET'])
def lister_taxis():
    try:
        taxis_ref = db.collection('taxis').stream()
        result = []

        for doc in taxis_ref:
            taxi_data = doc.to_dict()
            taxi_data['id'] = doc.id  # pour inclure l’ID du document
            result.append(taxi_data)

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 10 liste client 

@app.route('/clients', methods=['GET'])
def lister_clients():
    try:
        clients_ref = db.collection('utilisateurs').stream()
        result = []

        for doc in clients_ref:
            client_data = doc.to_dict()
            client_data['id'] = doc.id  # ajoute l’ID du document
            result.append(client_data)

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

#11 ajout paiment

@app.route('/paiements', methods=['GET'])
def lister_paiements():
    try:
        paiements_ref = db.collection('paiements').stream()
        result = []

        for doc in paiements_ref:
            paiement_data = doc.to_dict()
            paiement_data['id'] = doc.id  # ajoute l’ID Firestore (res1, res2, etc.)
            result.append(paiement_data)

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
# 12 ajout paiment

@app.route('/ajouter_paiement', methods=['POST'])
def ajouter_paiement():
    try:
        data = request.get_json()

        id_reservation = data.get('idReservation')
        montant = data.get('montant')
        statut = data.get('statut', 'non payé')  # valeur par défaut

        if not all([id_reservation, montant]):
            return jsonify({"error": "Champs 'idReservation' et 'montant' requis"}), 400

        paiement_data = {
            "idReservation": id_reservation,
            "montant": montant,
            "statut": statut
        }

        # L'ID du document sera le même que l'idReservation
        db.collection('paiements').document(id_reservation).set(paiement_data)

        return jsonify({"message": "✅ Paiement ajouté avec succès"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 13 modifier payment 

@app.route('/modifier_paiement', methods=['POST'])
def modifier_paiement():
    try:
        data = request.get_json()

        id_reservation = data.get('idReservation')
        nouveau_statut = data.get('statut')
        nouveau_montant = data.get('montant')

        if not id_reservation:
            return jsonify({"error": "Champ 'idReservation' requis"}), 400

        paiement_ref = db.collection('paiements').document(id_reservation)

        if not paiement_ref.get().exists:
            return jsonify({"error": "Paiement introuvable"}), 404

        updates = {}
        if nouveau_statut:
            updates['statut'] = nouveau_statut
        if nouveau_montant:
            updates['montant'] = nouveau_montant

        if not updates:
            return jsonify({"error": "Aucune mise à jour à effectuer"}), 400

        paiement_ref.update(updates)

        return jsonify({"message": f"✅ Paiement {id_reservation} mis à jour avec succès"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)