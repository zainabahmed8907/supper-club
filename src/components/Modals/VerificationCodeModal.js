import {
  Box,
  Button,

  Modal,
  TextField,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import CloseCircle from "public/images/offers/close-drawer.png";
import Image from "next/image";
import ArrowLeft from "public/images/pricing/arrow-left.svg";
import { useDispatch, useSelector } from "react-redux";
import { verificationCode } from "@/store/services/auth.service";
import {
  usePathname,
 
} from "next/navigation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: 5,

  "@media screen and (max-width:1120px)": {
    top: "50%",
    paddingBottom: "10%",
    width: "400px",
    margin: "20px",
    left: "45%",
  },
};
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5.5rem",
    borderRadius: 8, // Adjust the value to your preference
  },
  container: {
    display: "flex",
    gap: theme.spacing(1),
  },
  inputBox: {
    width: "64px",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "4px",

    "@media screen and (max-width:1120px)": {
      width: "74px",
    },
  },
  input: {
    borderRadius: "8px",
  },
}));

export default function VerificationCodeModal({
  handleClose,
  open,
  handleSignInOpen,
  handleResetPasswordOpen,
}) {
  const rootRef = React.useRef(null);

  const { code } = useSelector((state) => state.user);
  const classes = useStyles();
  const v_code = code?.split("");
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    digit1: v_code[0],
    digit2: v_code[1],
    digit3: v_code[2],
    digit4: v_code[3],
    digit5: v_code[4],
  });
  const inputRefs = {
    digit1: useRef(null),
    digit2: useRef(null),
    digit3: useRef(null),
    digit4: useRef(null),
    digit5: useRef(null),
  };

  const getNextFieldName = (fieldName) => {
    const fieldOrder = ["digit1", "digit2", "digit3", "digit4", "digit5"];
    const currentIndex = fieldOrder.indexOf(fieldName);
    const nextIndex = currentIndex + 1;
    return nextIndex < fieldOrder.length ? fieldOrder[nextIndex] : fieldName;
  };

  const handleInputChange = (event, fieldName) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));

    if (value && inputRefs[fieldName].current) {
      inputRefs[fieldName].current.blur();
      inputRefs[getNextFieldName(fieldName)].current.focus();
    }
  };

  const isSubmitEnabled = Object.values(formData).some((value) => value === "");


  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(verificationCode(code));
    handleResetPasswordOpen();
    handleClose();

    try {
      await signUpSchema.validate(formData, {
        abortEarly: false,
      });
      handleClose();
      setErrors({});
    } catch (validationErrors) {}
  };

  return (
    <div>
      <Modal
        className={`xl: 2xl:h-40${classes.modal}`}
        disablePortal
        disableEnforceFocus
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        container={() => rootRef.current}
        closeAfterTransition
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Box sx={{ ...style, width: 464, height: 454 }}>
          <div className="flex justify-end cursor-pointer">
            <Image src={CloseCircle} alt="" onClick={handleClose} />
          </div>

          <div className="flex justify-center items-center flex-wrap"></div>
          <p className="xl:text-2xl text-xl font-medium mt-5 text-center">
            Email Verification Code
          </p>

          <p className="xl:text-sm font-xs mt-3 text-center font-normal">
            Enter the code we just sent on your email
          </p>

          <div className="mt-7 px-12">
            <form onSubmit={handleSubmit}>
              <div className={classes.container}>
                {code.split("").map((value, index) => {
                  return (
                    <TextField
                      key={index}
                      className={classes.inputBox}
                      variant="outlined"
                      size="small"
                      placeholder="-"
                      name="code"
                      value={value}
                      inputRef={inputRefs}
                      onChange={(e) => handleInputChange(e, value)}
                      inputProps={{
                        maxLength: 1,
                        style: { textAlign: "center" },
                      }}
                    />
                  );
                })}
              </div>

              <Button
                type="submit"
                className={`mt-10 w-full h-12 ${
                  !isSubmitEnabled ? "bg-primary" : "bg-primaryDisabled"
                }
                                text-white rounded-3xl
                                `}
                disabled={isSubmitEnabled}
              >
                <p className="capitalize text-sm">Verify and Proceed</p>
              </Button>
            </form>

            <div className="text-center mt-7 flex justify-center">
              <Image src={ArrowLeft} alt="arrow left" className="mr-2" />
              <span
                className="underline font-bold cursor-pointer"
                onClick={() => {
                  handleClose();
                  handleSignInOpen();
                }}
              >
                Go back to Login{" "}
              </span>
            </div>
            <div className="mt-8 flex justify-center">
              <p className="text-gray600 text-sm mr-2">Didn`t get the code?</p>
              <p className="text-sm font-medium">Resend</p>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
