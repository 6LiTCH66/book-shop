import React from 'react';
import {HashRouter as Router} from "react-router-dom";
import Header from "./components/Header";
import Section from "./components/Section";
import { DataProvider } from "./components/Context";
import { AuthProvider, useAuth } from "./components/AuthContext";
import AdminHeader from "./components/AdminHeader";

function App() {
    const {currentUser} = useAuth();

  return (
      <DataProvider>
          <div className="app">
              <Router>
                  {currentUser && currentUser.email === "admin@admin.com" ? (
                      <div>
                          <AdminHeader/>
                          <Header/>
                      </div>

                  ):(
                      <Header/>
                  )}
                  <Section/>


              </Router>
          </div>
      </DataProvider>


  );
}

export default App;
