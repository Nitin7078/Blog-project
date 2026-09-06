import React from "react";
import authservive from "../../appwrite/auth.js";
import { useDispatch } from "react-redux";
import {logout} from "../../store/authslice.js"

function Logout(){
    const dispatch = useDispatch();
    const logouthandler = async () => {
        authservive.logout().then((res) => {
            dispatch(logout());
        });
    };
    return (
        <button onClick={logouthandler}>logout</button>
    )
}

export default Logout;