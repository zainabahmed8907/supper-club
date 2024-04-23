import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Modal,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import CloseCircle from "public/images/offers/close-drawer.png";
import Image from "next/image";
import { InputAdornment } from "@mui/material";
import MailIcon from "public/images/pricing/sms.png";
import ArrowLeft from "public/images/pricing/arrow-left.svg";
import * as yup from "yup";
import WarningIcon from "public/images/pricing/warning.svg";
import { useDispatch } from "react-redux";
import { forgotPassword } from "@/store/services/auth.service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
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
  input: {
    borderRadius: "8px",
  },
}));
const errorPill = {
  background:
    "linear-gradient(0deg, rgba(195, 157, 99, 0.05) 0%, rgba(195, 157, 99, 0.05) 100%), #FFF",
  padding: "1rem",
  borderRadius: "12px",
};
export default function ForgotPasswordModal({
  handleClose,
  open,
  handleSignInOpen,
  handleVerifyModalOpen,
}) {
  const rootRef = React.useRef(null);
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const isSubmitDisabled = Object.values(formData).some(
    (value) => value === ""
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const resetPasswordSchema = yup.object().shape({
    email: yup.string().email("Invalid email"),
  });

  const handleResetPassword = async (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ ...formData }));

    try {
      await resetPasswordSchema.validate(formData, { abortEarly: false });
      // Validation successful, implement your sign-up logic here
      setErrors({});
      if (Object.keys(errors).length == 0) {
        setLoading(true);
        setTimeout(() => {
          // After the operation is complete, reset loading to false
          setLoading(false);
          // Your logic for form submission here
        }, 4000);
      }
      handleVerifyModalOpen();
      handleClose();
    } catch (validationErrors) {
      const errorsObject = {};
      validationErrors.inner.forEach((error) => {
        errorsObject[error.path] = error.message;
      });
      setErrors(errorsObject);
    }
  };

  return (
    <div>
      <Modal
        className={`xl: 2xl:h-40${classes.modal}`}
        disablePortal
        disableEnforceFocus
        disableAutoFocus
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
        <Box sx={{ ...style, width: 464 }}>
          <div className="flex justify-end cursor-pointer">
            <Image src={CloseCircle} alt="" onClick={handleClose} />
          </div>

          <div className="flex justify-center items-center flex-wrap">
            {errors?.email?.length > 0 && (
              <div className="mr-3 mb-2 flex" style={errorPill}>
                <Image src={WarningIcon} alt="warning" className="mr-3" />
                <p className="text-base">{errors.email}</p>
              </div>
            )}
          </div>
          <p className="xl:text-2xl text-xl font-medium mt-5 text-center">
            Forgot Password?
          </p>

          <p className="xl:text-sm font-xs mt-3 text-center font-normal">
            No worries, we’ll send you reset instructions
          </p>

          <div className="pt-7">
            <form onSubmit={handleResetPassword} className="px-10">
              <TextField
                labelText=""
                id="email"
                placeholder="Email"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Image src={MailIcon} alt="" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root   ": {
                    borderRadius: "8px !important",
                    backgroundColor: "#F9FAFA",
                    width: "22rem",

                    marginBottom: "1rem",
                    border: errors.email?.length > 0 ? "1px solid #D93F21" : "",
                  },
                  "@media screen and (max-width:1120px)": {
                    "& .MuiOutlinedInput-root   ": {
                      width: "18rem",
                    },
                  },
                }}
              />

              <Button
                type="submit"
                className={`mt-8 w-full h-12 ${
                  !isSubmitDisabled ? "bg-primary" : "bg-primaryDisabled"
                }
                                text-white rounded-3xl
                                `}
                disabled={isSubmitDisabled}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <p className="capitalize text-sm">Reset Password</p>
                )}
              </Button>
            </form>
            <div className="text-center mt-7 flex justify-center lg:pb-10">
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
          </div>
        </Box>
      </Modal>
    </div>
  );
}
