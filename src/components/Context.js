import React, {useContext, useEffect, useState} from 'react';
import fire from '../firebase';
import {useAuth} from "./AuthContext";

const DataContext = React.createContext();

export function useProducts(){
    return useContext(DataContext)
}

export function DataProvider ({children}) {
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState(0)
    const [userCart, setUserCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const {currentUser} = useAuth();

    const [getUsers, setUsers] = useState([]);
    const [UserRating, setUserRating] = useState(0);
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
    }

    return (
        <DataContext.Provider value={productValue}>
            {children}
        </DataContext.Provider>
    );
}

