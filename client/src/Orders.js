import React, { useEffect, useState } from 'react';
import './Orders.css';
// import Order from './Order';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { useHistory } from "react-router-dom";

function Orders() {
    const history = useHistory();
    const [{cart, user}, dispatch] = useStateValue();
    const [orders, setOrders] = useState(null);

    useEffect(async() => {
        if(window.localStorage.getItem("username")){
            const res = await fetch(`http://localhost:4000/getstore`, {
                method: 'POST',
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: window.localStorage.getItem("username")
                })
            })
            .then(re => re.json())
            .then(re =>  re)
            .catch(error => console.log(error));
            // debugger
            setOrders(res);
            console.log("orders---", orders);
        } else {
            history.push('/');
        }
    }, []);

    return (
        <div className='orders'>
            <h1>Your orders</h1>
            <div className='orders_order'>
                {orders?.map(order => (
                    // <Order order={order} />
                    <CheckoutProduct id= {order.id} title = { order.title} price={order.price} image={order.image} rating={order.rating} hideButton={true} />
                ))}
            </div>
        </div>
    )
}

export default Orders
