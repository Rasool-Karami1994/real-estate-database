import React from "react";
import { useItemContext } from "../../context/items-context/ItemProvider";
import "./MainPage.css";
// import { CgSearch } from "react-icons/cg";

const MainPage = () => {
  const changeHandler = (e) => {
    console.log(e.target.value);
  };
  const { properties } = useItemContext();
  return (
    <div className="main-page-container">
      <input
        className="search-box"
        type="text"
        onChange={changeHandler}
        placeholder="دنبال مورد خاصی هستی؟"
      ></input>
      <div className="property-container">
        {properties.map((item) => (
          <div className="property-items">
            <p>{item.name}</p>
            <p>{item.price}</p>
            <p>{item.propertySize}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
