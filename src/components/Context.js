import React, {Component} from 'react';
import fire from '../firebase';
export const DataContext = React.createContext();

export class DataProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }
    getData = () => {
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
            this.setState({ products: prodArry })
        })
    }
    componentDidMount() {
        this.getData();
    }

    render() {
        const {products} = this.state;
        return (
            <DataContext.Provider value={{products}}>
                {this.props.children}
            </DataContext.Provider>
        );
    }
}

