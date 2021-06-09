import React, {useRef, useState} from 'react';
import {useAuth} from "../AuthContext";
import {useHistory} from "react-router-dom";
import {Alert, AlertTitle} from "@material-ui/lab";
import { db, fireStorage } from '../../firebase';

export default function Registration (props) {
    const fName = useRef();
    const sName = useRef();
    const regEmail = useRef();
    const regPassword = useRef();
    const regConfPassword = useRef();
    const {registration} = useAuth();
    const [error, setError] = useState('')
    const [url, setUrl] = useState()
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    fireStorage.ref("bookImage").child("nonUser.jpg").getDownloadURL().then(url =>{
        setUrl(url)
    })

    async function handleSubmit(e){
        e.preventDefault();
        if(regPassword.current.value !== regConfPassword.current.value){
            return setError("Password do not match!!!")
        }
        if (fName.current.value === ""){
            return setError("Enter your name!!!")
        }
        if (sName.current.value === ""){
            return setError("Enter your last name!!!")
        }

        try{
            setError("")
            setLoading(true)
            await registration(regEmail.current.value, regPassword.current.value)
                .then(async function (data){
                    await db.collection("users").doc(data.user.uid).set({
                        name: fName.current.value,
                        secondname: sName.current.value,
                        email: regEmail.current.value,
                        userPhoto: url
                    })
                })
            history.push('/')
        }
        catch(err) {
            setError(err.message);
            setLoading(false)

        }

    }
    return (
        <form className="login-wrapper" onSubmit={handleSubmit}>
            <h1>Registration</h1>
            <div className="errorMsg">
                {error && <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>}
            </div>
            <div className="loginContainer">
                <label className="labels">First Name</label>
                <input type="text" className="login-input" ref={fName}/>

                <label className="labels">Second Name</label>
                <input type="text" className="login-input" ref={sName}/>

                <label className="labels">Email</label>
                <input type="text" className="login-input" ref={regEmail}/>

                <label className="labels">Password</label>
                <input type="password" className="login-input" ref={regPassword}/>

                <label className="labels">Confirm your password</label>
                <input type="password" className="login-input" ref={regConfPassword}/>

                <div className="buttons">
                    <button className="login-button"  disabled={loading} type="submit">Registration</button>
                    <p className="HaveAcc">Have an account ?
                        <span onClick={()=>{props.setState({show:true})}} className="signin">Sign in</span>
                    </p>
                </div>
            </div>
        </form>
    );
}
