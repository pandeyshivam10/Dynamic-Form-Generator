
import React, { useState, useRef } from "react";
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
    { type: "radio", label: "Add Radio Button" },
    { type: "checkbox", label: "Add CheckBox" },
  ];

  const handleSubmit = () => {
    const jsonString = JSON.stringify(formConfig, null, 2);
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
    const savedConfig = { fields: formFields };
    setFormConfig(savedConfig);
  };

  const fileInputRef = useRef(null);

  const handleLoadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleLoadConfig = (event) => {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const loadedConfig = JSON.parse(e.target.result);
          console.log(loadedConfig.fields);
          setFormFields(loadedConfig.fields);
        } catch (error) {
          console.error("Error loading form configuration:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
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
      <div className="formContainer card">
        {formFields.map((field) => (
          <FormField
            key={field.label}
            field={field}
            onRemoveField={removeField}
            onChangeField={(value) => handleChange(field.label, value)}
          />
        ))}
      </div>
      <div className="buttonclass">
        <button onClick={handleSaveConfig} className="buttons saveConfigButton">
          Save Form Config
        </button>
        <input
          type="file"
          accept=".json"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleLoadConfig}
        />
        <button type="button" className="buttons submitButton" onClick={handleSubmit}>
          Download JSON File
        </button>
        <button
          type="button"
          className="buttons LoadButton"
          onClick={handleLoadButtonClick}
        >
          Load Form Config
        </button>
      </div>


    </>
  );
};

export default FormGenerator;
