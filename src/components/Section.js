import React, {Component} from 'react';
import Products from './section/Products';
import Details from "./section/Details";
import {Route, Switch} from 'react-router-dom';

class Section extends Component {
    render() {
        return (
            <section>
                <Switch>
                    <Route path="/product" component={Products} exact/>
                    <Route path="/product/:id" component={Details}/>
                </Switch>
            </section>
        );
    }
}

export default Section;
