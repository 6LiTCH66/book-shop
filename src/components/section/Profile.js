import React, {useEffect, useState} from 'react';
import '../css/Profile.css'
import {useAuth} from "../AuthContext";
import {useHistory} from "react-router-dom";
import {useProducts} from "../Context";
import {db, fireStorage} from '../../firebase'

export default function Profile() {
    const {currentUser, logout} = useAuth();
    const {getUserData, userData, userTotalAmount} = useProducts()
    const [image, setImage] = useState("");

    let history = useHistory();

    useEffect(() => {
        getUserData()
    }, [])

    async function Logout(){
        try {
            await logout()
            history.push("/")
        }
        catch (error){
            alert(error)
        }
    }

    function onSaveImage(){
        if (image){
            const uploadTask = fireStorage.ref(`usersPhotos/${image.name}`).put(image)
            uploadTask.on(
                "state_changed",
                snapshot => {},
                error => {
                    console.log(error)
                },
                () => {
                    fireStorage.ref("usersPhotos").child(image.name).getDownloadURL().then(url => {
                        db.collection("users").doc(currentUser.uid).update({
                            userPhoto: url
                        })
                    })
                }
            )
        }
        else {
            alert("Choose the picture!")
        }

    }


    function toOrders(){
        history.push("/order");
    }
    return (
        <div className="container">
            <div className="main-prof">
                <img src={currentUser ? userData.userPhoto: ""}></img>
                <div className="prof-button">
                    <input type="file" id="UserImage" hidden accept="image/*" onChange={(e) => {setImage(e.target.files[0])}}/>
                    <label htmlFor="UserImage" id="add-image">Add picture</label>
                    <h2>Spending</h2>
                    <h2>{userTotalAmount}$</h2>
                    <button className="log-button" onClick={() => onSaveImage()}>Save Image</button>
                    <button className="log-button" onClick={Logout}>Logout</button>
                </div>
            </div>
            <div className="inf">
                <h1 className="myProfile">Profile information</h1>
                <div className="label-1">
                    <p className="label-1-text"><strong>Email: </strong>{currentUser ? currentUser.email : "null"}</p>
                    <p className="label-1-text"><strong>First name: </strong>{currentUser ? userData.name: "null"}</p>
                    <p className="label-1-text"><strong>Last name: </strong>{currentUser ? userData.secondname: "null"}</p>
                </div>
                <div className="my-orders">
                    <h1>My orders</h1>
                    <p>Latest orders</p>
                    <button className="log-button" onClick={toOrders}>My Orders</button>
                </div>

            </div>
        </div>
    );
}

