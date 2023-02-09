import { createSlice } from '@reduxjs/toolkit'
import {useEffect, useState} from "react";
import {cookies} from "next/headers";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        // get persistent cart
        in: [],
    },
    reducers: {
        addToCart: (state,action) => {
            // TODO verify if item is already in cart
            // verify if item is already in cart
            //
            if(state.in.find(item => item.id === action.payload.id)){
                 state.in.find(item => item.id === action.payload.id).quantity += 1
             }else{
                 state.in.push(action.payload)
             }
        },
        removeFromCart: (state,action) => {
            state.in.splice(action.payload,1)
        },
        incrementQuantity: (state,action) => {
            // TODO verify if quantity is greater than stock
            state.in[action.payload].quantity += 1
        },
        decrementQuantity: (state,action) => {
            // TODO verify if quantity is greater than stock
            if(state.in[action.payload].quantity === 1) return;
            state.in[action.payload].quantity -= 1
        }
    }
})

// Action creators are generated for each case reducer function
export const { addToCart,removeFromCart,incrementQuantity,decrementQuantity } = cartSlice.actions

export default cartSlice.reducer
