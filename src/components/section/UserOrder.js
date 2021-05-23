import React, { Component } from 'react';
import '../css/UserOrder.css'

class UserOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: [
                { number: '6453453', status: 'in progress', date: '24.05.2021', sum: '35€' },
                { number: '5654546', status: 'completed', date: '15.05.2021', sum: '45€' },
                { number: '6345545', status: 'completed', date: '14.05.2021', sum: '25€' },
                { number: '6574345', status: 'completed', date: '23.04.2021', sum: '15€' }
            ]
        }
    }

    renderTableData() {
        return this.state.orders.map((order, index) => {
            const { number, status, date, sum } = order
            return (
                <tr key={number}>
                    <td>{number}</td>
                    <td>{status}</td>
                    <td>{date}</td>
                    <td>{sum}</td>
                </tr>
            )
        })
    }

    renderTableHeader() {
        let header = Object.keys(this.state.orders[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    render() {
        return (
            <div>
                <h1 id='title'>Orders</h1>
                <table id='order'>
                    <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default UserOrder
