import axios from "axios";
import setJWToken from "../utils/setJWToken";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import jwt_decode from 'jwt-decode'

export const createNewUser = (newUser,history) => async dispatch => {
    try {
        await axios.post("/api/users/register",newUser);
        dispatch({
            type:GET_ERRORS,
            payload:{}
        })
        history.push("/login");
    } catch (error) {
        dispatch({
            type:GET_ERRORS,
            payload:error.response.data
        })
    }
}

export const login=(LoginRequest)=>async dispatch=>{
    try {
        let res=await axios.post("/api/users/login",LoginRequest);
        let {token}=res.data;
        // Set token to localstorage
        localStorage.setItem("jwtToken",token);
        // Set token in header
        setJWToken(token);
        // decode token on React
        const decoded=jwt_decode(token);
        // Set current user
        dispatch({
            type:SET_CURRENT_USER,
            payload:decoded
        })

    } catch (error) {
        dispatch({
            type:GET_ERRORS,
            payload:error.response.data
        })
    }
}

export const logout=()=>dispatch=>{
    setJWToken(false);
    localStorage.removeItem("jwtToken");
    dispatch({
        type:SET_CURRENT_USER,
        payload:{}
    })
}