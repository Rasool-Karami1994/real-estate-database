const SelectComponent = ({ formik, name, options }) => {
  return (
    <div className="form-control">
      <select {...formik.getFieldProps(name)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {formik.errors[name] && formik.touched[name] && (
        <p className="error">{formik.errors[name]}</p>
      )}
    </div>
  );
};

export default SelectComponent;
