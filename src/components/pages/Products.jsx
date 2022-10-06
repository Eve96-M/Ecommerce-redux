import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../styles/ProductDetail.css'
import Carousel from 'react-bootstrap/Carousel'
import { addCartThunk } from '../../store/slices/cartproducts.slice';
const Products = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const productList = useSelector((state) => state.product)

    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()
    const productDetail = productList.find(product => product.id === Number(id))
    const relatedProduct = productList.filter(product => product.category.id === productDetail.category.id)

    const addToCart = () => {
        alert("Añadiendo" + quantity)
        const product = {
            id: id,
            quantity: quantity
        }
        dispatch(addCartThunk(product))
    }

    useEffect(() => {
        setQuantity(1)
    }, [id])

    return (
        <div>
            <div className='productDetail-container'>
                <div className='img-Container'>
                    <Carousel variant="dark">
                        <Carousel.Item >
                            <img
                                className="d-block w-100"
                                src={productDetail?.productImgs[0]}
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={productDetail?.productImgs[1]}
                                alt="Second slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={productDetail?.productImgs[2]}
                                alt="Third slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className='detail-Container'>
                    <h3 className='detailTitle'>{productDetail?.title}</h3>
                    <p className='detailDescriptionDesktop'>{productDetail?.description}</p>
                    <div className='btn-cont'>
                        <div className='price'>
                            <h3 className='priceText'><small>price</small><br />${productDetail?.price}</h3>
                        </div>
                        <div className='quantity'>
                            <button className='minus' onClick={() => setQuantity(quantity - 1)} disabled={quantity === 1}>-</button>
                            <div className='productCount'>{quantity}</div>
                            <button className='plus' onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                    </div>
                    <button className='addBtn' onClick={() => addToCart()}>Add to cart<box-icon name='cart-add'></box-icon></button>
                    <p className='detailDescription'>{productDetail?.description}</p>
                </div>
            </div>
            <div className='productWrapper'>
                <ul>
                    {
                        relatedProduct.map(product => (
                            <li className='productCard' key={product.id}>
                                <div className='imageWrapper'>
                                    <img src={product.productImgs[0]}
                                        alt=""
                                        className="product-Img"
                                        onClick={() => navigate(`/products/${product.id}`)}
                                    />
                                </div>
                                <div
                                    className="detailsWrapper"
                                    onClick={() => navigate(`/products/${product.id}`)}
                                >
                                    <Link to={`/products/${product.id}`} className="productName">{product.title}</Link>
                                    <h3 className="productPrice"><small>price</small><br />${product.price}</h3>
                                </div>
                                
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default Products;