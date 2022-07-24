import React from "react";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";

import "./SideBar.css";
import { useCategoryContext } from "../../context/category-context/CategoryProvider";
const SideBar = () => {
  const { categories, total } = useCategoryContext();
  return (
    <div className="side-bar-container">
      <button className="side-bar-btn">
        <Link to="/addcategory">
          <span className="side-bar-span">
            <GoPlus />
          </span>
          ایجاد دسته بندی
        </Link>
      </button>
      <button className="side-bar-btn">
        <Link to="/additem">
          <span className="side-bar-span">
            <GoPlus />
          </span>
          ثبت ملک جدید
        </Link>
      </button>
      <div>
        <span className="category-length-badge">{total}</span>
        <h4 className="side-bar-text">دسته بندی ها</h4>
      </div>
      <div className="category-items-container">
        {categories.map((category) => (
          <div className="side-bar-category-box" key={category.title}>
            <div className="side-bar-category-items">
              <p>10</p>
              <p>{category.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
