import React from 'react';
import {HashRouter as Router} from "react-router-dom";
import Header from "./components/Header";
import Section from "./components/Section";
import {DataProvider} from "./components/Context";

function App() {
  return (
      <DataProvider>
        <div className="app">
          <Router>
            <Header/>
            <Section/>
          </Router>
        </div>
      </DataProvider>
  );
}

export default App;
