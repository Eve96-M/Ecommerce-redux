import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../../store/slices/purchases.slice';
import '../styles/Purchases.css'

const Purchases = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const purchases = useSelector(state => state.purchases)
    useEffect(() => {
        dispatch(getPurchasesThunk)
    }, [])


    return (
        <div>
            <h1 className="purchasesTitle">Purchases</h1>
            <ul className='purchases-list'>
                {
                    purchases.map(purchase => (
                        <li key={purchase.id} className='purchasesContainer'>
                            <h4 className='date'>{purchase.createdAt}</h4>
                            {purchase.cart.products.map(products => (
                                <div key={products.id} className="product" >
                                    <h5 onClick={() => navigate(`/products/${products.id}`)} className="productData">
                                        <span>Product:</span> {products.title} <br />
                                        <span>Quantity:</span> {products.productsInCart.quantity} <br />
                                        <span>Price:</span> {products.price} <br />
                                        <span>status:</span> {products.productsInCart.status}
                                    </h5>
                                </div>
                            ))}

                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Purchases;