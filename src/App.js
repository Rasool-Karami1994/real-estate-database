import React from "react";
import "./App.css";
import Layout from "./layout/Layout";
import { Route, Routes } from "react-router-dom";
import routes from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CategoryProvider from "./context/category-context/CategoryProvider";
import ItemProvider from "./context/items-context/ItemProvider";

const App = () => {
  return (
    <div className="App">
      <CategoryProvider>
        <ItemProvider>
          <Layout>
            <Routes>
              {routes.map((route, index) => (
                <Route {...route} key={index}></Route>
              ))}
            </Routes>
          </Layout>
          <ToastContainer />
        </ItemProvider>
      </CategoryProvider>
    </div>
  );
};

export default App;
