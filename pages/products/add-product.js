import React, { useState } from 'react';

const AddProduct = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);

    const handleSubmitForm = async (ev) => {
        ev.preventDefault();

        if (title === "" || price === "") {
            alert("Fill both of fields!");
            return;
        }

        const newProduct = { title, price }

        const response = await fetch("../api/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        });
        if (response.status === 201) {
            const data = await response.json();
            setTitle("");
            setPrice("");
            console.log(data.message);
            handleShowUsers();
        }
    }

    const handleShowUsers = async () => {
        const response = await fetch("../api/product");
        if (response.status === 200) {
            const data = await response.json();
            setProducts(data.products);
        }
    }

    const handleGetProductPrice = async (productId) => {
        const response = await fetch(`../api/${productId}`);
        if (response.status === 200) {
            const data = await response.json();
            setCurrentProduct(data.product);
        }
    }

    return (
        <div className="full-page">
            {currentProduct && (
                <div>
                    Price:&nbsp;
                    <span className="text-success">{Number(currentProduct.price).toLocaleString()}</span>
                </div>
            )}
            <form className="d-flex flex-column align-items-center mt-4 mb-2 fs-5" onSubmit={handleSubmitForm}>
                <input type="text" className="custom-input my-2" placeholder="Title"
                    value={title} onChange={(ev) => setTitle(ev.target.value)} />
                <input type="number" className="custom-input my-2" placeholder="Price" min="1"
                    value={price} onChange={(ev) => setPrice(ev.target.value)} />
                <button type="submit" className="btn btn-dark px-4 mt-3">Add</button>
            </form>
            <button className="fs-5 mt-5 btn btn-success" onClick={handleShowUsers}
                disabled={products.length > 0}>
                Show Products
            </button>
            <div className="mt-4 fs-5">
                {products.length > 0 ? (
                    <ul className="p-0">
                        {products.map(p => (
                            <li key={`${p.title}_${Math.random()}`} className="pointer"
                                onClick={() => handleGetProductPrice(p.id)}>
                                {p.title} - {Number(p.price).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="fw-bold text-success">Press the button to see the products!</div>
                )}
            </div>
        </div>
    );
}

export default AddProduct;
