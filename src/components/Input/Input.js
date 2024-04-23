'use client';
import React from "react";
import { FormControl, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function CustomInput(props) {
  const {
    formControlProps,
    labelText,
    id,
    inputProps = {},
    InputProps,
    error,
    type,
    variant = "standard",
    helperText,
    placeholder = "",
    inputClasses = "",
    formClasses = "",
    margin,
    onBlur,
    onChange,
    value
  } = props;

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }


  const textFieldInputProps = {
    ...InputProps
  }
  if (type === "password") {
    textFieldInputProps.endAdornment = (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
        >
          {showPassword ? <VisibilityOff className="fill-[#7E7E7E]"/> : <Visibility className="fill-[#7E7E7E]"/>}
        </IconButton>
      </InputAdornment>
    )
  }

  if (onBlur) {
    inputProps.onBlur = onBlur;
  }

  return (
    <FormControl fullWidth {...formControlProps} className={formClasses}>
      <TextField
        className={inputClasses}
        error={error}
        id={id}
        label={labelText}
        defaultValue=""
        helperText={error ? helperText : ""}
        variant={variant}
        type={showPassword ? 'text' : type}
        placeholder={placeholder}
        margin={margin}
        onChange={onChange}
        fullWidth
        {...inputProps}
        InputProps={textFieldInputProps}
        value={value}
      />
    </FormControl>
  );
}
