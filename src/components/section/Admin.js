import React, {useRef, useState} from 'react';
import '../css/Admin.css'
import {fireStorage} from '../../firebase';
import fire from '../../firebase'

export default function Admin(){

    const adminTitle = useRef();
    const adminDescrip = useRef();
    const adminPrice = useRef();
    const adminArea = useRef();
    const [image, setImage] = useState("");

    function checkForm() {
        if (adminTitle.current.value !== "" &&
            adminDescrip.current.value !== "" &&
            adminPrice.current.value > 0 &&
            image.name &&
            adminArea.current.value !== ""){
            const uploadTask = fireStorage.ref(`bookImage/${image.name}`).put(image)
            uploadTask.on(
                "state_changed",
                snapshot => {},
                error => {
                    console.log(error)
                },
                () => {
                    fireStorage.ref("bookImage").child(image.name).getDownloadURL().then(url => {
                        fire.database().ref("products").push({
                            content: adminArea.current.value,
                            description: adminDescrip.current.value,
                            image: url,
                            price: adminPrice.current.value,
                            quantity: 1,
                            title: adminTitle.current.value
                        })
                    })
                }
            )
        }
        else {
            alert("Fill in all the gaps!!!")
        }
    }

    return(
        <div className="adminWrapper">
            <h1>Hello, admin</h1>
            <div className="adminContainer">
                <label className="adminLabels">Title</label>
                <input type="text" className="adminInputs" ref={adminTitle} required/>
                <br/>
                <label className="adminLabels">Description</label>
                <input type="text" className="adminInputs" ref={adminDescrip} required/>
                <br/>
                <label className="adminLabels">Price</label>
                <input type="number" className="adminInputs" ref={adminPrice} required/>
                <br/>
                <label className="adminLabels">Image</label>
                <input type="file" className="adminImgInput" accept="image/*" onChange={(e) => {setImage(e.target.files[0])}}/>
                <br/>
                <label className="adminLabels">Content</label>
                <textarea className="adminTextarea" maxLength="850" minLength="455" ref={adminArea} required></textarea>
                <button className="adminBtn" type="submit" onClick={() => checkForm()}>Add book</button>
            </div>
        </div>
    )
}


