import React, { useEffect, useState } from "react";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [vendas, setVendas] = useState([]);
  const [clienteId, setClienteId] = useState("");
  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState(1);

  
  useEffect(() => {
    fetch("http://produtos:5001/products")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  
  useEffect(() => {
    fetch("http://clientes:5002/clients")
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => console.error("Erro ao buscar clientes:", err));
  }, []);

  
  const carregarVendas = () => {
    fetch("http://vendas:5003/sales")
      .then((res) => res.json())
      .then((data) => setVendas(data))
      .catch((err) => console.error("Erro ao buscar vendas:", err));
  };

  useEffect(() => {
    carregarVendas();
  }, []);

  
  const criarVenda = (e) => {
    e.preventDefault();
    if (!clienteId || !produtoId || quantidade < 1) return;

    fetch("http://vendas:5003/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cliente_id: parseInt(clienteId),
        produto_id: parseInt(produtoId),
        quantidade: parseInt(quantidade),
      }),
    })
      .then((res) => res.json())
      .then(() => {
        carregarVendas();
        setClienteId("");
        setProdutoId("");
        setQuantidade(1);
      })
      .catch((err) => console.error("Erro ao cadastrar venda:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Controle de Vendas</h1>

      <h2>Produtos</h2>
      <ul>
        {produtos.length === 0 ? (
          <li>Carregando produtos...</li>
        ) : (
          produtos.map((p) => (
            <li key={p.id}>
              {p.nome} - {p.descricao} - R${p.valor}
            </li>
          ))
        )}
      </ul>

      <h2>Clientes</h2>
      <ul>
        {clientes.length === 0 ? (
          <li>Carregando clientes...</li>
        ) : (
          clientes.map((c) => (
            <li key={c.id}>
              {c.nome} - {c.telefone}
            </li>
          ))
        )}
      </ul>

      <h2>Vendas</h2>
      <ul>
        {vendas.length === 0 ? (
          <li>Carregando vendas...</li>
        ) : (
          vendas.map((v) => (
            <li key={v.id}>
              ClienteID: {v.cliente_id}, ProdutoID: {v.produto_id}, Quantidade:{" "}
              {v.quantidade}
            </li>
          ))
        )}
      </ul>

      <h2>Cadastrar Venda</h2>
      <form onSubmit={criarVenda}>
        <label>Cliente: </label>
        <select
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
          required
        >
          <option value="">Selecione</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>

        <label> Produto: </label>
        <select
          value={produtoId}
          onChange={(e) => setProdutoId(e.target.value)}
          required
        >
          <option value="">Selecione</option>
          {produtos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </select>

        <label> Quantidade: </label>
        <input
          type="number"
          value={quantidade}
          min="1"
          onChange={(e) => setQuantidade(e.target.value)}
          required
        />

        <button type="submit">Cadastrar Venda</button>
      </form>
    </div>
  );
}

export default App;
