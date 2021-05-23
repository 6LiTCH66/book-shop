import Registration from "./Registration";
import '../css/Login.css'
import React, {useRef, useState} from 'react';
import {useAuth} from "../AuthContext";
import {Alert, AlertTitle} from "@material-ui/lab";
import {useHistory} from "react-router-dom";

export default function Login () {
    const [show, setShow] = useState(true)
    const logEmail = useRef();
    const logPassword = useRef();

    const [error, setError] = useState('')
    const {login} = useAuth();
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();

        try{
            setError("");
            setLoading(true)
            await login(logEmail.current.value, logPassword.current.value)
            history.push('/')
        }
        catch(err){
            setError(err.message);
            setLoading(false)
        }
    }

    return (
        <div>
            {
                show ?
                    <form className="login-wrapper" onSubmit={handleSubmit}>
                        <h1>Please Login</h1>
                        <div className="errorMsg">
                            {error && <Alert severity="error">
                                <AlertTitle>Something went wrong please try again</AlertTitle>
                                {error}
                            </Alert>}
                        </div>
                        <div className="loginContainer">
                            <label className="labels">Email</label>
                            <input type="text" className="login-input" ref={logEmail} required/>

                            <label className="labels">Password</label>
                            <input type="password" className="login-input" ref={logPassword} required/>

                            <div className="buttons">
                                <button className="login-button" disabled={loading} type="submit">Login</button>
                                <button className="login-button" type="button" onClick={()=>{setShow(false)}}>
                                    Registration
                                </button>
                            </div>

                        </div>
                    </form>
                    :
                    <Registration setState={state => setShow(state)}/>
            }
        </div>
    );
}

