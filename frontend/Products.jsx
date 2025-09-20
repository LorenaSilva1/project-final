import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch("http://produtos:5001/products") // nome do container do backend
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(console.error);
  };

  const handleAddProduct = () => {
    if (!name || !price) return;
    fetch("http://produtos:5001/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price: parseFloat(price) }),
    })
      .then((res) => res.json())
      .then(() => {
        setName("");
        setPrice("");
        fetchProducts();
      })
      .catch(console.error);
  };

  return (
    <div>
      <h1>Produtos</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Nome do produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={handleAddProduct}>Adicionar Produto</button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Selecione um produto: </label>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          {products.length === 0 ? (
            <option>Carregando...</option>
          ) : (
            products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))
          )}
        </select>
      </div>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
