import React, { useState} from "react";
import FormField from "./FormField";

const FormGenerator = () => {
  const [formFields, setFormFields] = useState([]);
  const [formConfig, setFormConfig] = useState({});

  const addField = (type, label, data = "") => {
    const newField = {
      label,
      type,
      value: data,
      options: type === "dropdown" ? ["Option 1", "Option 2"] : [],
    };
    setFormFields([...formFields, newField]);
  };

  const removeField = (label) => {
    const updatedFields = formFields.filter((field) => field.label !== label);
    setFormFields(updatedFields);
  };

  const handleChange = (label, value) => {
    const updatedFields = formFields.map((field) =>
      field.label === label ? { ...field, ...value } : field
    );
    setFormFields(updatedFields);
  };

  const handleButtonClicked = (type) => {
    const newLabel = prompt(`Enter the label for the new ${type} field:`);
    if (newLabel) {
      addField(type, newLabel);
    }
  };

  const buttonsConfig = [
    { type: "text", label: "Add Text Input" },
    { type: "textarea", label: "Add Textarea" },
    { type: "dropdown", label: "Add Dropdown" },
    { type: "checkbox", label: "Add Checkbox" },
    { type: "radio", label: "Add Radio Button" },
  ];

  const handleSubmit = () => {
    const formData = formFields.reduce((data, field) => {
      data[field.label] = field.type === "checkbox" ? field.value : field.value;
      return data;
    }, {});

    const jsonString = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "formData.json";
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSaveConfig = () => {
    setFormConfig({ fields: formFields });
    console.log("Form configuration saved:", formConfig);
  };

  return (
    <div className="formContainer">
      {formFields.map((field) => (
        <FormField
          key={field.label}
          field={field}
          onRemoveField={removeField}
          onChangeField={(value) => handleChange(field.label, value)}
        />
      ))}
      <div className="buttonContainer">
        {buttonsConfig.map(({ type, label }) => (
          <button
            key={type}
            type="button"
            onClick={() => handleButtonClicked(type)}
            className="addButton"
          >
            {label}
          </button>
        ))}
      </div>
      <br />
      <br />
      <button onClick={handleSaveConfig} className="saveConfigButton">
        Save Form Config
      </button>
      <br />
      <button type="button" className="submitButton" onClick={handleSubmit}>
        Download JSON File
      </button>
    </div>
  );
};

export default FormGenerator;
