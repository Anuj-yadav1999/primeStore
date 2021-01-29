import React from 'react'
import './Product.css'
import { useStateValue } from './StateProvider'

function Product({id, title, image, price, rating}) {
    const [{}, dispatch] = useStateValue();

    const addToCart = () => {
        //dispatch an action
        dispatch({
            type: 'ADD_TO_CART',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating, rating,
            },
        });
    }

    return (
        <div className='product'>
            <div className='product__info'>
                <p>{title}</p>
                <p className='product__price'>
                    <small>$</small>
                    <strong>{price}</strong>
                    <div className='product__rating'>
                    {
                        Array(rating).fill().map((_) => ( <p>⭐</p> ))
                    }
                </div>
                </p>
                
            </div>
            <img src={image} alt=''></img>

            <button onClick={addToCart}>Add to Basket</button>
        </div>
    )
}

export default Product
