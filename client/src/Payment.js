import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import CurrencyFormat from 'react-currency-format';
import { CardElement ,useElements, useStripe } from '@stripe/react-stripe-js';
import { cartTotal } from './reducer';
import { useStateValue } from './StateProvider';
import axios from './axios';

function Payment() {
    const [{cart, user}, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    const [id, setId] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [payID, setPayId] = useState(0);

    useEffect(() => {
        //generate the special stripe secret
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                headers: {"Access-Control-Allow-Origin": "*"},
                //Stripe accepts the total in a currency subunits
                url: `/payments/create?total=${cartTotal(cart) * 100}`
            });
            setClientSecret(response.data.clientSecret);
        }

        getClientSecret();
    }, [cart]);

    console.log("the secret is >>>>> ",clientSecret);

    const handleSubmit = async (e) => {
        //do all the stripe stuff
        e.preventDefault();
        setProcessing(true);

        const payload = 
                await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardElement)
                    }
                }).then(() => {

            let cost = Math.floor((Math.random() * 1000000) + 1);
            setPayId(cost);
            console.log(payID);
            console.log(cart);
            if(!window.localStorage.getItem("username")){
                return history.replace('/');
            }
            fetch('http://localhost:4000/store',{
                    method: 'POST',
                    mode: 'cors',
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        cart: cart,
                        payId: payID,
                        username: window.localStorage.getItem("username")
                    })
                })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(error => console.error(error))

            setPayId(0);
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_CART'
            })

            history.replace('/orders');
        })
    }

    const emptyValues = () => {
        setId('');
        setImage('');
        setPrice('');
        setRating(0);
        setTitle('');
        // setPayId(0);
    }

    const handleChange = e => {
        //listen for changes in the card element
        //and display any errors as the customer types their card details
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

    return (
        <div className='payment'>
            <div className='payment_container'>
                <h1>
                    Checkout ( 
                        {<Link to='/checkout'> {cart?.length} itmes</Link>}
                        )
                </h1>

                {/* {payment section} */}
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment_address'>
                        <p>{user?.email}</p>
                        <p>123, Delhi Road</p>
                        <p>New Delhi Area</p>
                    </div>
                </div>

                {/* {reviewing items} */}
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className='payment_items'>
                        {cart.map(item => (
                            <CheckoutProduct 
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>  

                {/* {payment method} */}
                <div className='payment_section'>
                    <div className='payment_title'>
                        Payment Method
                    </div>
                    <div className='payment_details'>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className='payment_priceContainer'>
                                <CurrencyFormat 
                                    renderText = {(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                decimalScale={2}
                                value={cartTotal((cart))}
                                displayType={'text'}
                                thousandSeperator={true}
                                prefix={'$'}
                                />

                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {/* {Errors} */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default Payment
