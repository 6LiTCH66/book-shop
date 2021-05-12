import React, {Component} from 'react';
import '../css/Login.css'
class Login extends Component {
    render() {
        return (
            <div className="login-wrapper">
                <h1>Please Login</h1>
                <div className="loginContainer">
                    <label className="labels">Email</label>
                    <input type="text" className="login-input"/>
                    <label className="labels">Password</label>
                    <input type="password" className="login-input"/>
                    <div className="buttons">
                        <button className="login-button">Login</button>
                        <button className="login-button">Registration</button>
                    </div>

                </div>

            </div>
        );
    }
}

export default Login;
