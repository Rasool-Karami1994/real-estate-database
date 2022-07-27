import "./HamMenuSidebar.css";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import {
  useCategoryContext,
  useCategoryContextActions,
} from "../../context/category-context/CategoryProvider";
import { useItemContext } from "../../context/items-context/ItemProvider";

const HamMenuSidebar = (setSidebarMenuShow) => {
  const { categories, total } = useCategoryContext();
  const { properties } = useItemContext();
  const dispatch = useCategoryContextActions();

  const navigate = useNavigate();

  useEffect(() => {
    const savedProperties = JSON.parse(localStorage.getItem("category")) || [];
    dispatch({
      type: "LOAD_CATEGORIES",
      payload: { categories: savedProperties },
    });
  }, []);
  const closeMenuHandler = () => {
    navigate("/");
  };

  return (
    <div className="menu-side-bar-container">
      <div className="close-section">
        <button className="menu-close-btn" onClick={closeMenuHandler}>
          <span>
            <IoIosCloseCircle />
            بستن
          </span>
        </button>
      </div>
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
      <div className="sidebar-title-container">
        <h4 className="side-bar-text">دسته بندی ها</h4>
        <span className="category-length-badge">{total}</span>
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

export default HamMenuSidebar;
