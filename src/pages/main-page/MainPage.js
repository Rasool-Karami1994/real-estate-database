import {
  useItemContext,
  useItemContextActions,
} from "../../context/items-context/ItemProvider";
import "./MainPage.css";
import { MdDelete } from "react-icons/md";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import { toast } from "react-toastify";
import { useState } from "react";

const MainPage = () => {
  const dispatch = useItemContextActions();
  const { properties } = useItemContext();
  const [isShow, setIsShow] = useState();
  const [searchValue, setSearchValue] = useState("");

  const changeHandler = (e) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
    dispatch({
      type: "FILTER_PROPERTIES",
      payload: {
        name: searchValue,
        phoneNumber: "",
        price: "",
        propertySize: "",
        selectedCategory: "",
        description: "",
        numberHandel: 1,
      },
    });
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
  // useEffect(() => {
  //   const savedProperties =
  //     JSON.parse(localStorage.getItem("properties")) || [];
  //   console.log(savedProperties);
  //   dispatch({
  //     type: "LOAD_PROPERTIES",
  //     payload: { properties: savedProperties },
  //   });
  // }, []);
  return (
    <div className="main-page-container">
      <input
        className="search-box"
        type="text"
        onChange={changeHandler}
        value={searchValue}
        placeholder="دنبال مورد خاصی هستی؟"
      ></input>
      <div className="property-container">
        {properties.length < 2
          ? ""
          : properties.map((item) => (
              <div key={item.name} className="property-items">
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
                  <p className="item-titles">دسته بندی</p>
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
                    <div className="description-preview">
                      {item.description}
                    </div>
                  )
                )}
              </div>
            ))}
      </div>
    </div>
  );
};

export default MainPage;
