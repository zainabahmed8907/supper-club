import { FormControl, TextField } from "@mui/material";
import React from "react";

import { IMaskMixin } from "react-imask";

const MaskedTextField = IMaskMixin(
  ({ inputRef, defaultValue, style, formControlProps, ...otherProps }) => {
    const formProps = {
      fullWidth: true,
      className: otherProps.formClasses,
      ...formControlProps,
    };
    delete formProps.formClasses
    const inputProps = {
      className: otherProps.inputClasses,
      ...otherProps,
    };
    delete inputProps.inputClasses
    delete inputProps.formClasses
    return (
      <FormControl
        {...formProps}
      >
        <TextField {...inputProps} inputRef={inputRef} type="text" style={style} />
      </FormControl>
    );
  }
);

const MaskedField = ({ name, label, style, onChange, value, ...otherProps }) => {
  return (
    <MaskedTextField
      id={name}
      name={name}
      label={label}
      value={value}
      style={style}
      onAccept={(value) => onChange({ target: { name: name, value } })}
      {...otherProps}
    />
  );
};

export { MaskedField };

