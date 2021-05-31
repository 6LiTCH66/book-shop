import React, {Component} from 'react';
import '../css/Profile.css'

class Profile extends Component {
    render() {
        return (
            <div className="main-inf">
                <div className="inf">
                    <h1>My profile</h1>
                    <br>
                    </br>
                    <div className="label-1">
                        <label className='label-1-text'>Email:</label> <a>Test</a> <br></br>
                        <label className='label-1-text'>Password:</label>  <a>Te**</a> <br></br>
                        <label className='label-1-text'>First name:</label> <a>Test</a><br></br>
                        <label className='label-1-text'>Last name:</label> <a>Test-1</a><br></br>
                        <label className='label-1-text'>Phone number:</label>  <a>+372 test</a><br></br>
                    </div>
                    <button className="log-button">Change password</button><button className="login-button">Change information</button>
                    <br>
                    </br>
                    <hr>
                    </hr>
                    <h1>My orders</h1>
                    <p>3 последние заказа</p>
                    <button className="login-button">More details</button>
                    <hr>
                    </hr>
                    <h1><strong><p>Expenses: -40.99$</p></strong></h1>
                </div>
                <div className="main-prof">
                    <img src="https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1440,w_2560,x_0,y_0/dpr_1.5/c_limit,w_1044/fl_lossy,q_auto/v1531451526/180712-Weill--The-Creator-of-Pepe-hero_uionjj" width="450" height="400"></img>
                    <br>
                    </br>
                    <div className="prof-button">
                        <button className="login-button">Add picture</button>
                        <h2>Balance</h2>
                        <h2>0.00$</h2>
                        <button className="login-button">Logout</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
