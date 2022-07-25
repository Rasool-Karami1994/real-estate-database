import {
  useItemContext,
  useItemContextActions,
} from "../../context/items-context/ItemProvider";
import "./MainPage.css";
import { MdDelete } from "react-icons/md";
import { AiFillCaretDown } from "react-icons/ai";

// import { CgSearch } from "react-icons/cg";
const MainPage = () => {
  const dispatch = useItemContextActions();
  const changeHandler = (e) => {
    console.log(e.target.value);
  };
  const deleteHandler = (item) => {
    dispatch({ type: "REMOVE_PROPERTIES", payload: item });
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
                  <p className="item-titles">حذف</p>
                ) : (
                  <button
                    className="item-btn-delete"
                    onClick={() => deleteHandler(item)}
                  >
                    <MdDelete />
                  </button>
                )}
                {!item.name ? (
                  <p className="item-titles">جزئیات</p>
                ) : (
                  <button className="item-btn">
                    <AiFillCaretDown />
                  </button>
                )}
              </div>
            ))}
      </div>
    </div>
  );
};

export default MainPage;
