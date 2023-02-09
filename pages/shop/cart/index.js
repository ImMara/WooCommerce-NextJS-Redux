import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addToCart, decrementQuantity, incrementByAmount, incrementQuantity, removeFromCart} from "@/store/cartSlice";

function Index(props) {

    const cart = useSelector(state => state.cart.in)
    const dispatch = useDispatch()

    return (
            <div className="container mt-5">
                <div className="row justify-content-center align-item-center">
                    <div className="col-8 bg-light p-3">
                        <h1>Cart</h1>
                        { cart.map((item,index)=>(
                            <div className="mb-3">
                                <img src={item.image} style={{maxHeight:"100px"}} alt=""/>
                                <h3>{item.name}</h3>
                                <h3>{item.price}</h3>
                                <h3><button onClick={()=> dispatch(incrementQuantity(index))}>+</button>{item.quantity}<button onClick={()=>dispatch(decrementQuantity(index))}>-</button></h3>
                                <button onClick={()=>{
                                    dispatch(removeFromCart(index))
                                } }>Remove</button>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
    );
}

export default Index;