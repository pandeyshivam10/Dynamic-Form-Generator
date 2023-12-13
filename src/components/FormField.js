
import React, { useState } from "react";

const FormField = ({ field, onRemoveField, onChangeField }) => {
  const { label, type, options } = field;
  const [radio, setRadio] = useState("");

  const handleRadio = (selectedOption) => {
    const updatedRadio = radio.includes(selectedOption)
      ? radio.filter((option) => option !== selectedOption)
      : [...radio, selectedOption];

    setRadio(updatedRadio);
    onChangeField({ value: updatedRadio });
  };

  const renderField = () => {
    switch (type) {
      case "text":
        return (
          <input
            type="text"
            className="input"
            value={field.value}
            onChange={(e) => onChangeField({ value: e.target.value })}
          />
        );
      case "textarea":
        return (
          <textarea
            className="textarea"
            value={field.value}
            onChange={(e) => onChangeField({ value: e.target.value })}
          />
        );
      case "dropdown":
        return (
          <div>
            <select
              value={field.value}
              onChange={(e) =>
                onChangeField({ value: e.target.value, options })
              }
              className="select"
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div>
              {options.map((option, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const updatedOptions = [...options];
                      updatedOptions[index] = e.target.value;
                      onChangeField({
                        options: updatedOptions,
                        value: field.value,
                      });
                    }}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() =>
                onChangeField({ options: [...options, ""], value: field.value })
              }
              className="addOptionButton"
            >
              Add Option
            </button>
            <button
              onClick={() =>
                onChangeField({
                  options: options.slice(0, -1),
                  value: field.value,
                })
              }
              className="removeOptionButton"
            >
              Remove Option
            </button>
          </div>
        );
        case "radio":
  return (
    <div>
      {options.map((option, index) => (
        <div key={index} className="roundCheckboxWrapper">
          <input
            type="checkbox"
            id={`checkbox-${index}`}
            value={option}
            checked={field.value === option}
            onChange={() => onChangeField({ value: option })}
            className="roundCheckboxInput"
          />
          <label htmlFor={`checkbox-${index}`} className="roundCheckboxLabel">
            {option}
          </label>
          <input
            type="text"
            value={option}
            onChange={(e) => {
              const updatedOptions = [...options];
              updatedOptions[index] = e.target.value;
              onChangeField({
                options: updatedOptions,
                value: field.value,
              });
            }}
          />
        </div>
      ))}
      <button
        onClick={() => onChangeField({ options: [...options, ""], value: field.value })}
        className="addOptionButton"
      >
        Add Option
      </button>
      <button
        onClick={() => onChangeField({ options: options.slice(0, -1), value: field.value })}
        className="removeOptionButton"
      >
        Remove Option
      </button>
    </div>
  );

      case "checkbox":
        return (
          <div>
            {options.map((option, index) => (
              <div key={index} className="SquareCheckboxWrapper">
                <input
                  type="checkbox"
                  value={option}
                  checked={radio.includes(option)}

                  onChange={() => handleRadio(option)}
                  // className="SquareCheckboxInput"
                />
                <label>{option}</label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const updatedOptions = [...options];
                    updatedOptions[index] = e.target.value;
                    onChangeField({
                      options: updatedOptions,
                      value: field.value,
                    });
                  }}
                />
              </div>
            ))}
            <button
              onClick={() =>
                onChangeField({ options: [...options, ""], value: field.value })
              }
              className="addOptionButton"
            >
              Add Option
            </button>
            <button
              onClick={() =>
                onChangeField({
                  options: options.slice(0, -1),
                  value: field.value,
                })
              }
              className="removeOptionButton"
            >
              Remove Option
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fieldContainer">
      <label className="label">{label}</label>
      {renderField()}
      <button className="removeButton" onClick={() => onRemoveField(label)}>
        Remove
      </button>
    </div>
  );
};

export default FormField;
