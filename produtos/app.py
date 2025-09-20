from flask import Flask, request, jsonify

app = Flask(__name__)

# Lista de produtos de teste
produtos = [
    {"id": 1, "nome": "Produto 1", "descricao": "Descrição 1", "valor": 10.0},
    {"id": 2, "nome": "Produto 2", "descricao": "Descrição 2", "valor": 20.0}
]

# Listar produtos
@app.route('/products', methods=['GET'])
def listar_produtos():
    return jsonify(produtos)

# Adicionar produto
@app.route('/products', methods=['POST'])
def adicionar_produto():
    data = request.json
    produto = {
        "id": len(produtos) + 1,
        "nome": data.get("nome"),
        "descricao": data.get("descricao"),
        "valor": data.get("valor")
    }
    produtos.append(produto)
    return jsonify(produto), 201

if __name__ == "__main__":
    # importante: host=0.0.0.0 para aceitar conexões de fora do container
    app.run(host="0.0.0.0", port=5001, debug=True)
