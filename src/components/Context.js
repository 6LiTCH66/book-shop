import React, {useContext, useEffect, useState} from 'react';
import fire from '../firebase';
import {useAuth} from "./AuthContext";
import {db} from '../firebase'

const DataContext = React.createContext();

export function useProducts(){
    return useContext(DataContext)
}

export function DataProvider ({children}) {
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState(0)
    const [userCart, setUserCart] = useState([]);
    const [userOrder, setUserOrder] = useState([])

    const [totalAmount, setTotalAmount] = useState(0);
    const {currentUser} = useAuth();

    const [getUsers, setUsers] = useState([]);
    const [UserRating, setUserRating] = useState(0);

    const [userData, setUserData] = useState([])
    const [userTotalAmount, setUserTotalAmount] = useState(0)


    const orderTime = new Date().toLocaleString().slice(0, 10);
    const min = 1000000
    const max = 7000000
    const rand = Math.floor(min + Math.random() * (max - min));

    var rating = 0;

    if (getUsers === null){
        rating = 0;
    }
    else {
        rating = UserRating / Object.keys(getUsers).length
    }

    function getUsersRating(detailId){
        fire.database().ref("products/" + detailId + "/users-rate/").on("value", (snapshot) =>{
            var totalRating = 0;
            snapshot.forEach((child)=> {
                totalRating += child.val().rating
            })
            setUserRating(totalRating)
            setUsers(snapshot.val())
        })
    }



    async function getUserData(){
        const subscriber = await db.collection("users").doc(currentUser.uid).onSnapshot(doc => {
            if (!doc.data()){
                setUserData([])
            }else {
                setUserData({
                    name: doc.data().name,
                    secondname: doc.data().secondname,
                    userPhoto: doc.data().userPhoto
                })
            }
        })
        return subscriber
    }



    function getUserCart(){
        if(currentUser){
            fire.database().ref("cart/"+ currentUser.uid + "/products").on('value', (snapshot) => {
                var userCartArray = []
                snapshot.forEach((child) => {
                    userCartArray.push({
                        productId: child.key,
                        id: child.val().id,
                        title: child.val().title,
                        image: child.val().image,
                        price: child.val().price,
                        quantity: child.val().quantity,
                        description: child.val().description,
                        content: child.val().content
                    })
                })
                setUserCart(userCartArray)
            })
        }
        else {
            setUserCart([])
        }
    }

    function getData(){
        fire.database().ref('products').on('value', (snapshot) => {
            var prodArry = []
            snapshot.forEach((child)=>{
                prodArry.push({
                    id: child.key,
                    title: child.val().title,
                    image: child.val().image,
                    description: child.val().description,
                    content: child.val().content,
                    price: child.val().price,
                    quantity: child.val().quantity
                })
            })
            setProducts(prodArry)
        })
    }

    function addToCart(product){
        if (currentUser) {
            const findDuplicated = userCart.find(item => product.id === item.id)
            if (findDuplicated) {
                fire.database().ref("cart/" + currentUser.uid + "/products/" + findDuplicated.productId).update({
                    quantity: findDuplicated.quantity += 1
                })
            } else {
                fire.database().ref("cart/" + currentUser.uid + "/products").push(product)
            }
        }
    }

    function confirmOrder(total){
        if (currentUser){
            fire.database().ref("order/" + currentUser.uid + "/products").push({
                totalAmount: total,
                time: orderTime,
                orderNumber: rand,
                status: "completed"
            })
            fire.database().ref("cart/" + currentUser.uid + "/products").remove()
        }
    }

    function getUserOrder(){
        if (currentUser){
            fire.database().ref("order/" + currentUser.uid + "/products").on("value", (snapshot) => {
                const orderArr = []
                var totalAmount = 0
                snapshot.forEach((child) => {
                    totalAmount += child.val().totalAmount
                    orderArr.push({
                        id: child.key,
                        totalAmount: child.val().totalAmount,
                        time: child.val().time,
                        orderNumber: child.val().orderNumber,
                        status: child.val().status
                    })
                })
                setUserTotalAmount(totalAmount)
                setUserOrder(orderArr)
            })
        }
    }

    function getQuantity(){
        if (currentUser) {
            fire.database().ref("cart/" + currentUser.uid + "/products").on('value', (snapshot) => {
                var countQuantity = 0;
                var totalAmount = 0;
                snapshot.forEach((child) => {
                    countQuantity += child.val().quantity;
                    totalAmount += child.val().price * child.val().quantity
                })
                setQuantity(countQuantity)
                setTotalAmount(totalAmount)
            })
        }
        else {
            setQuantity(0)
            setTotalAmount(0)
        }
    }

    function increaseItem(product){
        if (currentUser){
            fire.database().ref("cart/" + currentUser.uid + "/products/" + product.productId).update({
                quantity: product.quantity += 1
            })
        }
    }
    function decreaseItem(product){
        if(currentUser){
            if(product.quantity > 1){
                fire.database().ref("cart/" + currentUser.uid + "/products/" + product.productId).update({
                    quantity: product.quantity -= 1
                })
            }
        }
    }
    function deleteItem(product){
        if (currentUser){
            fire.database().ref("cart/" + currentUser.uid + "/products/" + product.productId).remove();
        }
    }

    useEffect(() => {
        getData();
        //getUserCart()
    }, [])


    useEffect(()=>{
        getQuantity();
    })

    const productValue ={
        products,
        userCart,
        addToCart,
        quantity,
        increaseItem,
        decreaseItem,
        deleteItem,
        totalAmount,
        setUserCart,
        getUserCart,
        rating,
        getUsersRating,
        confirmOrder,
        getUserOrder,
        userOrder,
        getUserData,
        userData,
        userTotalAmount
    }

    return (
        <DataContext.Provider value={productValue}>
            {children}
        </DataContext.Provider>
    );
}

