import React, { useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Велосипед", price: 1000, count: 1 },
    { id: 2, name: "Самокат", price: 700, count: 1 },
    { id: 3, name: "Ролики", price: 1300, count: 2 },
    { id: 4, name: "Сноуборд", price: 19000, count: 4 },
  ]);

  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");

  const addProduct = () => {
    if (newProductName && newProductPrice) {
      setProducts([
        ...products,
        {
          id: Date.now(),
          name: newProductName,
          price: parseInt(newProductPrice),
          count: 1,
        },
      ]);
      setNewProductName("");
      setNewProductPrice("");
    }
  };

  const increaseCount = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id && product.count < 25
          ? { ...product, count: product.count + 1 }
          : product
      )
    );
  };

  const decreaseCount = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, count: product.count - 1 }
          : product
      ).filter((product) => product.count > 0)
    );
  };

  const removeProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="App">
      <h1>Управление товарами</h1>
      <div className="add-product">
        <input
          type="text"
          value={newProductName}
          placeholder="Название товара"
          onChange={(e) => setNewProductName(e.target.value)}
        />
        <input
          type="number"
          value={newProductPrice}
          placeholder="Цена товара"
          onChange={(e) => setNewProductPrice(e.target.value)}
        />
        <button onClick={addProduct}>Добавить товар</button>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>Цена: {product.price}₽</p>
            <div className="count-controls">
              <button onClick={() => decreaseCount(product.id)}>-</button>
              <span>{product.count}</span>
              <button onClick={() => increaseCount(product.id)}>+</button>
            </div>
            <button className="delete-button" onDoubleClick={() => removeProduct(product.id)}>
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
