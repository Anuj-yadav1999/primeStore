import React from 'react'
import './Checkout.css'
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider'
import Subtotal from './Subtotal';

function Checkout() {
    const [{ cart, user }, dispatch] = useStateValue();

    return (
        <div className='checkout'>
            <div className='checkout__up'>
                <Subtotal />
            </div>
            <div className='checkout__bottom'>
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
    )
}

export default Checkout
