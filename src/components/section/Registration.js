import React, {Component} from 'react';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            fName: "",
            sName: "",
            regEmail: "",
            regPassword: "",
            regConfPassword: "",
        }
    }

    handleChange(event, field){
        this.setState({[field]: event.target.value});
    }

    handleSubmit(){
        // TODO
    }

    render() {
        return (
            <div className="login-wrapper">
                <h1>Registration</h1>
                <div className="loginContainer">
                    <label className="labels">First Name</label>
                    <input type="text" className="login-input" value={this.state.fName}
                           onChange={(event) => this.handleChange(event, "fName")} />

                    <label className="labels">Second Name</label>
                    <input type="text" className="login-input" value={this.state.sName}
                           onChange={(event) => this.handleChange(event, "sName")}/>

                    <label className="labels">Email</label>
                    <input type="text" className="login-input" value={this.state.regEmail}
                           onChange={(event) => this.handleChange(event, "regEmail")}/>

                    <label className="labels">Password</label>
                    <input type="password" className="login-input" value={this.state.regPassword}
                           onChange={(event) => this.handleChange(event, "regPassword")}/>

                    <label className="labels">Confirm your password</label>
                    <input type="password" className="login-input" value={this.state.regConfPassword}
                           onChange={(event) => this.handleChange(event, "regConfPassword")}/>

                    <div className="buttons">
                        <button className="login-button" onClick={this.handleSubmit.bind(this)}>Registration</button>
                        <p className="HaveAcc">Have an account ?
                            <span onClick={()=>{this.props.setState({show:true})}} className="signin">Sign in</span>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Registration;
