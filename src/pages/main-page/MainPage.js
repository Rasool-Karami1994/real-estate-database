import {
  useItemContext,
  useItemContextActions,
} from "../../context/items-context/ItemProvider";
import "./MainPage.css";
import { MdDelete } from "react-icons/md";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { useCategoryContext } from "../../context/category-context/CategoryProvider";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const dispatch = useItemContextActions();
  const { properties } = useItemContext();
  const [isShow, setIsShow] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [selectOptionValue, setSelectOptionValue] = useState("");
  const [priceSelectOptionValue, setPriceSelectOptionValue] = useState("");
  const { categories } = useCategoryContext();
  const navigate = useNavigate();

  const getFilteredProperties = () => {
    return properties
      .filter((p) =>
        priceSelectOptionValue === "" ||
        priceSelectOptionValue === "mostExpensive"
          ? properties.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
          : properties.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      )
      .filter(
        (p) =>
          selectOptionValue === "" || selectOptionValue === p.selectedCategory
      )
      .filter(
        (p) =>
          searchValue === "" ||
          p.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase())
      );
  };
  const changeHandler = (e) => {
    setSearchValue(e.target.value);
  };
  const menuHandler = () => {
    navigate("/sidebarmenu");
  };

  const selectOptionHandler = (e) => {
    setSelectOptionValue(e.target.value);
  };
  const priceSelectOptionHandler = (e) => {
    setPriceSelectOptionValue(e.target.value);
  };

  const deleteHandler = (item) => {
    dispatch({ type: "REMOVE_PROPERTIES", payload: item });
    toast.success(`${item.name} حذف شد`);
  };

  const showDetailes = () => {
    setIsShow(true);
  };
  const unShowDetailes = () => {
    setIsShow(false);
  };

  const CategoryFilterOptions = [
    { label: "فیلتر براساس دسته بندی ها", value: "" },
  ].concat(
    categories.map((o) => {
      return { label: o.title, value: o.title };
    })
  );
  const PriceFilterOptions = [{ label: "فیلتر براساس قیمت", value: "" }].concat(
    [
      {
        label: "گرانترین",
        value: "mostExpensive",
      },
      {
        label: "ارزانترین",
        value: "cheapest",
      },
    ]
  );

  useEffect(() => {
    const savedProperties =
      JSON.parse(localStorage.getItem("properties")) || [];
    dispatch({
      type: "LOAD_PROPERTIES",
      payload: { properties: savedProperties },
    });
  }, []);
  return (
    <div className="main-page-container">
      <div className="main-page-container">
        <div className="first-section-container">
          <button
            className="hum-menu-btn"
            title="برای باز شدن منو کلیک کنید"
            onClick={menuHandler}
          >
            <HiMenu />
          </button>
          <input
            className="search-box"
            type="text"
            onChange={changeHandler}
            value={searchValue}
            placeholder="دنبال مورد خاصی هستی؟"
          ></input>
        </div>
        <div className="property-items-title">
          <div className="filter-options">
            <select
              name="filter"
              id="filter-select"
              onChange={selectOptionHandler}
            >
              {CategoryFilterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              className="second-select-option"
              name="filter"
              id="filter-select"
              onChange={priceSelectOptionHandler}
            >
              {PriceFilterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="property-container"></div>
        <div className="property-items-title">
          <p className="item-titles">عنوان</p>
          <p className="item-titles">قیمت</p>
          <p className="item-titles">دسته بندی</p>

          <p className="item-titles">
            جزئیات
            {!isShow ? (
              <button className="item-btn" onClick={showDetailes}>
                <span>
                  <AiFillCaretDown />
                </span>
              </button>
            ) : (
              <button className="item-btn" onClick={unShowDetailes}>
                <span>
                  <AiFillCaretUp />
                </span>
              </button>
            )}
          </p>
        </div>
        <div className="property-container">
          {getFilteredProperties().map((item, index) => (
            <div key={index} className="property-items">
              {!item.name ? (
                <p className="item-titles">عنوان</p>
              ) : (
                <p className="item-details">{item.name}</p>
              )}
              {!item.name ? (
                <p className="item-titles">قیمت</p>
              ) : (
                <p className="item-details">{item.price} </p>
              )}
              {!item.name ? (
                <p className="item-titles">قیمت</p>
              ) : (
                <p className="item-details">{item.selectedCategory}</p>
              )}

              {!item.name ? (
                ""
              ) : (
                <button
                  className="item-btn-delete"
                  onClick={() => deleteHandler(item)}
                >
                  <MdDelete />
                </button>
              )}
              {!item.name ? (
                <p className="item-titles">
                  جزئیات
                  {!isShow ? (
                    <button className="item-btn" onClick={showDetailes}>
                      <span>
                        <AiFillCaretDown />
                      </span>
                    </button>
                  ) : (
                    <button className="item-btn" onClick={unShowDetailes}>
                      <span>
                        <AiFillCaretUp />
                      </span>
                    </button>
                  )}
                </p>
              ) : (
                isShow && (
                  <div className="description-preview">{item.description}</div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
