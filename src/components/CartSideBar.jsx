import React, { useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { getCartThunk, purchaseCart } from '../store/slices/cartproducts.slice';
import './styles/CartContainer.css'

const CartSideBar = ({ show, handleClose }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(getCartThunk())
    }, [])


    return (
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ul key={cart.id} className='cart-wrapper'>
                    {
                        cart.map(product => (
                            <li onClick={() => navigate(`products/${product.id}`)} className='cart-container'>
                                <span>Name:</span> {product.title} <br />
                                <span>Brand:</span> {product.brand} <br />
                                <span>Quantity:</span> {product.productsInCart.quantity} <br />
                                <span>price:</span> {product.price}$
                            </li>
                        ))
                    }
                </ul>
                <div className="purchaseContainer">
                    <Button onClick={() => dispatch(purchaseCart())}>purchase</Button>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default CartSideBar;