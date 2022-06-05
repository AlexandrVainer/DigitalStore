/* eslint-disable no-undef */
import React, { useState, useEffect, Fragment } from 'react';
import "./Products.css";
import ReadOnlyRow from './ReadOnlyRow';
import EditableRow from './EditableRow';
import { GetProducts, SaveProduct } from '../DataAccessLayer';



function EnterProducts(props) {

    const [Products, SetProducts] = useState([]);
    const [addFormData, SetAddFormData] = useState({ nameProduct: '', picture: '', price: '' });
    const [editProductId, SetEditProductId] = useState(null);
    const [editFormData, SetEditFormData] = useState({ nameProduct: '', picture: '', price: '' });
    const [lastId, SetLastId] = useState(0);
    const [nameProduct, SetNameProduct] = useState("");
    const [picture, SetPicture] = useState("");
    const [price, SetPrice] = useState("");



    const SetNewDataProducts = () => {
        var Products = [
            { "id": 1, "nameProduct": "LED Smart TV 50", "picture": "LED Smart TV 50.jpg", "price": "2100" },
            { "id": 2, "nameProduct": "iphone 12", "picture": "iphone-12.png", "price": "3400" },
            { "id": 3, "nameProduct": "galaxyA32", "picture": "galaxyA32.jpg", "price": "800" },
        ]
        Products.forEach(e => {
            SaveProduct(e);
        });
        SetProducts(Products);
        SetLastId(Products.length + 1)
    }

    const GetDataProducts = () => {
        var Products = GetProducts();
        if (Products.length === 0) {
            SetNewDataProducts();
        }
        else {
            SetProducts(Products);
            SetLastId(Products.length + 1)
        }
    }


    useEffect(() => {
        GetDataProducts();
    }, [])

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        let fieldValue = event.target.value;
        if (fieldName === "nameProduct")
            SetNameProduct(fieldValue);
        if (fieldName === "picture")
            SetPicture(fieldValue);
        if (fieldName === "price")
            SetPrice(fieldValue);
        if (fieldName === "picture") {
            var x = fieldValue.lastIndexOf('\\') + 1;
            var y = fieldValue.length - fieldValue.lastIndexOf('\\') - 1;
            fieldValue = fieldValue.substr(x, y);
        }
        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;
        SetAddFormData(newFormData);
    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        SetLastId(Products.length + 1);

        let newProduct = {
            id: lastId,
            nameProduct: addFormData.nameProduct,
            picture: addFormData.picture,
            price: addFormData.price
        }

        const newProducts = [...Products, newProduct];
        SetProducts(newProducts);
        SaveProduct(newProduct);
        SetNameProduct("");
        SetPicture("");
        SetPrice("");
    }

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedProduct = {
            id: editProductId,
            nameProduct: editFormData.nameProduct,
            picture: editFormData.picture,
            price: editFormData.price
        }

        const newProduct = [...Products];

        const index = Products.findIndex((Product) => Product.id === editProductId);

        newProduct[index] = editedProduct;

        SetProducts(newProduct);
        SaveProduct(editedProduct);
        SetEditProductId(null);
    }

    const handleEditClick = (event, Product) => {
        event.preventDefault();
        SetEditProductId(Product.id);

        const formValues = {
            id: Product.id,
            nameProduct: Product.nameProduct,
            picture: Product.picture,
            price: Product.price
        };

        SetEditFormData(formValues);
    }

    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute('name');
        let fieldValue = event.target.value;
        if (fieldName === "picture") {
            var x = fieldValue.lastIndexOf('\\') + 1;
            var y = fieldValue.length - fieldValue.lastIndexOf('\\') - 1;
            fieldValue = fieldValue.substr(x, y);
        }

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        SetEditFormData(newFormData);
    }

    const handleEditChange = (event, Product) => {
        ProductProduct.nameProduct = event.target.value;
    }

    const handleCancelClick = () => {
        SetEditProductId(null);
    }

    const handleDeleteClick = (ProductId) => {
        const newProducts = [...Products];
        const index = Products.findIndex((Product) => Product.id === ProductId);
        newProducts.splice(index, 1);

        SetProducts(newProducts);
    }

    return (
        <div className='app-container'>
            <form onSubmit={handleEditFormSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Picture</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Products.map((product) => (
                            <Fragment>
                                {editProductId === product.id ? (
                                    <EditableRow
                                        Product={product}
                                        editFormData={editFormData}
                                        handleEditFormChange={handleEditFormChange}
                                        handleCancelClick={handleCancelClick}
                                    />
                                ) : (
                                    <ReadOnlyRow
                                        Product={product}
                                        handleEditClick={handleEditClick}
                                        handleDeleteClick={handleDeleteClick}
                                    />)}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </form>
            <h2>Add a new product</h2>
            <form onSubmit={handleAddFormSubmit}>
                <input
                    type="text"
                    name='nameProduct'
                    required='required'
                    placeholder='Enter a product'
                    onChange={handleAddFormChange}
                    value={nameProduct}
                />
                <input
                    type="file"
                    name='picture'
                    required='required'
                    placeholder='Choice a picture'
                    onChange={handleAddFormChange}
                    accept=".png, .jpg, .jpeg"
                    value={picture}
                />
                <input
                    type="number"
                    name='price'
                    required='required'
                    placeholder='Enter a price'
                    onChange={handleAddFormChange}
                    value={price}
                />
                <button type='submit'>Add</button>
            </form>
        </div>
    )
}

export default EnterProducts;
