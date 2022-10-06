import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getProductsThunk } from '../../store/slices/product.slice';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import '../styles/ProductCard.css';
import '../styles/HomeInput.css';

const Home = () => {
    const navigate = useNavigate()
    const productList = useSelector(state => state.product)
    const [categories, setCategories] = useState([])
    const [productsFiltered, setProductsFiltered] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [showFilter, setShowFilter] = useState(false)
    useEffect(() => {
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories))
    }, [])

    useEffect(() => {
        setProductsFiltered(productList)
    }, [productList])

    const filterCategory = (category) => {
        const filtered = productList.filter(product => product.category.id === category) //filtering the category by id
        setProductsFiltered(filtered)
        console.log(filtered)
    }

    const searchProduct = () => {
        alert("Buscando")
        const filtered = productList.filter(product => product.title.toLowerCase().includes(searchValue.toLowerCase()))
        setProductsFiltered(filtered)
    }

    const showFilters = () =>{
        setShowFilter(!showFilter)
    }

    return (
        <div>
            <div className="inputWrapper">
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Search product"
                        onChange={e => setSearchValue(e.target.value)}
                        value={searchValue}
                    />
                    <Button variant="primary"
                        id="button-addon2"
                        onClick={searchProduct}
                    >
                        Button
                    </Button>
                </InputGroup>
                <button className="showFilter" onClick={() => showFilters()}><box-icon name='filter-alt'></box-icon>Filters</button>
                <div className={showFilter ? "filterContainer active" : "filterContainer"}>
                    <button className="closeFilters" onClick={() => setShowFilter(false)}>X</button>
                    <h2>Filters</h2>
                {
                    categories.map(category => (
                        <Button key={category.id} onClick={() => filterCategory(category.id)} variant="primary">
                            {category.name}
                        </Button>
                    ))
                }
                </div>
            </div>
            <div className="productWrapper">
                <ul >
                    {
                        productsFiltered.map(products => (
                            <li key={products.id} className="productCard">
                                <div className='imageWrapper'>
                                    <img src={products.productImgs[0]}
                                        alt=""
                                        className="product-Img"
                                        onClick={() => navigate(`/products/${products.id}`)}
                                    />
                                </div>
                                <div
                                    className="detailsWrapper"
                                    onClick={() => navigate(`/products/${products.id}`)}
                                >
                                    <h3 className="productName">{products.title}</h3>
                                    <h3 className="productPrice"><small>price</small><br />${products.price}</h3>
                                </div>
                                <button className="addToCart-btn"><box-icon name='cart-add'></box-icon></button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default Home;