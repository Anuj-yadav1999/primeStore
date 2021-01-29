import React from 'react'
import { useStateValue } from './StateProvider'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { cartTotal } from './reducer'
import { useHistory } from 'react-router-dom'

function Subtotal() {
    const history = useHistory();
    const [{ cart }] = useStateValue();

    return (
        <div className='subtotal'>
                <CurrencyFormat 
                        renderText = {(value) => (
                            <>
                                <p>
                                    Subtotal ({cart.length} items): <strong>{` ${value}`}</strong>
                                </p>
                                {/* <small className='subtotal__gift'>
                                    <input type='checkbox' /> This order contains a gift
                                </small> */}
                            </>
                        )}

                        decimalScale={2}
                        value={cartTotal((cart))}
                        displayType={'text'}
                        thousandSeperator={true}
                        prefix={'$'}
                />
                <button onClick={e => history.push('/payment')}>Buy Now</button>
        </div>
    )
}

export default Subtotal
