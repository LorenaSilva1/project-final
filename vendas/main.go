package main

import (
    "encoding/json"
    "net/http"
    "sync"
)

type Venda struct {
    ID        int `json:"id"`
    ClienteID int `json:"cliente_id"`
    ProdutoID int `json:"produto_id"`
    Quantidade int `json:"quantidade"`
}

var vendas []Venda
var idCounter = 1
var mutex = &sync.Mutex{}

func listarVendas(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(vendas)
}

func adicionarVenda(w http.ResponseWriter, r *http.Request) {
    var venda Venda
    err := json.NewDecoder(r.Body).Decode(&venda)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    mutex.Lock()
    venda.ID = idCounter
    idCounter++
    vendas = append(vendas, venda)
    mutex.Unlock()
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(venda)
}

func main() {
    http.HandleFunc("/sales", func(w http.ResponseWriter, r *http.Request) {
        if r.Method == "GET" {
            listarVendas(w, r)
        } else if r.Method == "POST" {
            adicionarVenda(w, r)
        } else {
            w.WriteHeader(http.StatusMethodNotAllowed)
        }
    })
    http.ListenAndServe(":5003", nil)
}
