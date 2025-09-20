from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Product

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)


with app.app_context():
    db.create_all()
    if Product.query.count() == 0:
        db.session.add_all([
            Product(name="Produto A", price=10.0),
            Product(name="Produto B", price=15.5),
            Product(name="Produto C", price=7.25)
        ])
        db.session.commit()


@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{'id': p.id, 'name': p.name, 'price': p.price} for p in products])

@app.route('/products', methods=['POST'])
def add_product():
    data = request.json
    new_product = Product(name=data['name'], price=data['price'])
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'message': 'Produto adicionado'}), 201

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
