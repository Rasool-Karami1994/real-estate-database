import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Input";
import { useItemContextActions } from "../../context/items-context/ItemProvider";
import SelectComponent from "../../Components/SelectComponent";
import CategoryProvider, {
  useCategoryContext,
} from "../../context/category-context/CategoryProvider";
const validationSchema = Yup.object({
  name: Yup.string().required("نام را وارد کنید"),
  phoneNumber: Yup.string()
    .required("شماره تلفن الزامیست")
    .matches(/^[0-9]{11}$/, "شماره نامعتبر است"),
  propertySize: Yup.string().required("متراژ را وارد کنید"),
  price: Yup.string().required("قیمت را وارد کنید"),
  description: Yup.string(),
  selectedCategory: Yup.string(),
});

const AddItem = () => {
  const { categories } = useCategoryContext();
  const options = categories.map((o) => {
    return { label: o.title, value: o.title };
  });
  const initialValues = {
    name: "",
    phoneNumber: "",
    price: "",
    propertySize: "",
    selectedCategory: "",
    description: "",
    numberHandel: 1,
  };
  const navigate = useNavigate();
  const dispatch = useItemContextActions();

  const onSubmit = (values) => {
    function addItemToLocalStorage() {
      // Parse any JSON previously stored in allEntries
      var existingEntries = JSON.parse(localStorage.getItem("properties"));
      if (existingEntries == null) existingEntries = [];

      localStorage.setItem("properties", JSON.stringify(values));
      // Save allEntries back to local storage
      existingEntries.push(values);
      localStorage.setItem("properties", JSON.stringify(existingEntries));
    }
    console.log(values);
    dispatch({ type: "ADD_TO_PROPERTIES", payload: values });
    toast.success(`${values.title} اضافه شد`);
    addItemToLocalStorage();
    navigate("/");
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  return (
    <div className="page-container">
      <form onSubmit={formik.handleSubmit}>
        {categories.length < 1 ? (
          <h4 className="warning">لطفا ابتدا دسته بندی جدیدی را ایجاد کنید</h4>
        ) : (
          ""
        )}
        <h2 className="form-h2"> وارد کردن ملک جدید</h2>
        <p className="form-text">لطفا اطلاعات ملک را وارد کنید</p>

        <Input label="عنوان ملک" name="name" formik={formik} type="text" />

        <Input
          label="شماره همراه"
          name="phoneNumber"
          formik={formik}
          type="phoneNumber"
        />
        <Input label="قیمت ملک" name="price" formik={formik} type="number" />
        <Input
          label="متراژ"
          name="propertySize"
          formik={formik}
          type="number"
        />
        <Input label="توضیحات" name="description" formik={formik} type="text" />

        {options.length < 2 ? (
          <Input
            label="نام دسته بندی را وارد کنید"
            name="selectedCategory"
            formik={formik}
            type="text"
          />
        ) : (
          <SelectComponent
            id="select-input-field"
            formik={formik}
            name="selectedCategory"
            options={options}
          />
        )}

        <button
          type="submit"
          disabled={!formik.isValid}
          className={!formik.isValid ? "disabeled-btn" : "form-btn"}
        >
          افزودن
        </button>
      </form>
    </div>
  );
};

export default AddItem;
