import React, {Component} from 'react';
import Registration from "./Registration";
import '../css/Login.css'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state ={
            show: true,
            logEmail: "",
            logPassword: ""
        }
    }

    clearInputs(){
        this.setState({logEmail: ""})
        this.setState({logPassword: ""})
    }

    handleChange(event, field){
        this.setState({[field]: event.target.value})
    }
    handleSubmit(){
        // TODO
        this.clearInputs()
    }

    render() {
        return (
            <div>
                {
                    this.state.show ?
                        <div className="login-wrapper">
                            <h1>Please Login</h1>
                            <div className="loginContainer">
                                <label className="labels">Email</label>
                                <input type="text" className="login-input"  value={this.state.logEmail}
                                       onChange={(event) => this.handleChange(event, "logEmail")}/>

                                <label className="labels">Password</label>
                                <input type="password" className="login-input" value={this.state.logPassword}
                                       onChange={(event) => this.handleChange(event, "logPassword")}/>

                                <div className="buttons">
                                    <button className="login-button" onClick={this.handleSubmit.bind(this)}>Login</button>
                                    <button className="login-button" onClick={()=>{this.setState({show:!this.state.show})}}>
                                        Registration
                                    </button>
                                </div>
                            </div>
                        </div>
                        :
                        <Registration setState={state => this.setState(state)}/>
                }
            </div>
        );
    }
}

export default Login;
