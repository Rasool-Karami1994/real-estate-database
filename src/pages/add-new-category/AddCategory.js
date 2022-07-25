import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./AddCategory.css";
import Input from "../../Components/Input";
import { useCategoryContextActions } from "../../context/category-context/CategoryProvider";
import { IoIosArrowBack } from "react-icons/io";

const validationSchema = Yup.object({
  title: Yup.string().required("عنوان الزامیست!"),
});

const AddCategory = () => {
  const initialValues = {
    numberHandel: 1,
    title: "",
  };
  const redirector = () => {
    navigate("/");
  };
  const navigate = useNavigate();
  const dispatch = useCategoryContextActions();

  const onSubmit = (values) => {
    function addCategoryToLocalStorage() {
      // Parse any JSON previously stored in allEntries
      var existingEntries = JSON.parse(localStorage.getItem("category"));
      if (existingEntries == null) existingEntries = [];

      localStorage.setItem("category", JSON.stringify(values));
      // Save allEntries back to local storage
      existingEntries.push(values);
      localStorage.setItem("category", JSON.stringify(existingEntries));
    }
    console.log(values);
    dispatch({ type: "ADD_TO_CATEGORIES", payload: values });
    toast.success(`${values.title} اضافه شد`);
    addCategoryToLocalStorage();
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
      <button onClick={redirector} className="back-button">
        <IoIosArrowBack />
      </button>
      <form onSubmit={formik.handleSubmit}>
        <h2 className="form-h2"> ایجاد دسته بندی جدید</h2>
        <p className="form-text">لطفا عنوان دسته بندی را وارد کنید</p>

        <Input
          label="عنوان دسته بندی"
          name="title"
          formik={formik}
          type="text"
        />

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

export default AddCategory;
