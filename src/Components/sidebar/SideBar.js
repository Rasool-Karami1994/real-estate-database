import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";

import "./SideBar.css";
import {
  useCategoryContext,
  useCategoryContextActions,
} from "../../context/category-context/CategoryProvider";
import { useItemContext } from "../../context/items-context/ItemProvider";
const SideBar = () => {
  const { categories, total } = useCategoryContext();
  const { properties } = useItemContext();
  const dispatch = useCategoryContextActions();
  useEffect(() => {
    const savedProperties = JSON.parse(localStorage.getItem("category")) || [];
    dispatch({
      type: "LOAD_CATEGORIES",
      payload: { categories: savedProperties },
    });
  }, []);

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
        {categories.map((category, index) => (
          <div className="side-bar-category-box" key={index}>
            <div className="side-bar-category-items">
              <p>
                {
                  properties.filter(
                    (item) => item.selectedCategory === category.title
                  ).length
                }
              </p>
              <p>{category.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
