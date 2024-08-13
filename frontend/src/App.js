import React from "react";
import Banner from "./Banner";
import Dashboard from "./Dashboard";
import { BannerProvider } from "./BannerContext";
import './App.css'

const App = () => {
  return (
    <div className="app">
      <BannerProvider>
        <Banner />
        <Dashboard />
      </BannerProvider>
      <h2>Site may take few minutes to respond, please be patient ...</h2>
    </div>
  );
};

export default App;
