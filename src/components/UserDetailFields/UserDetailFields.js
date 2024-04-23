import { Suspense } from "react";
import UserDetails from "../UserDetails/UserDetails";
import {
  MenuItem,
  Select,
  FormControl,
  InputAdornment,
  TextField,
} from "@mui/material";
import { MaskedField } from "../MaskInput/MaskInput";
import { IMaskInput } from "react-imask";

function UserDetailFields({
  formData,
  handleInputChange,
  user,
  isSubmitDisabled,
  handleUpdate,
  setPasswordSettingsView,
  validPhoneNumberMessage,
  handleImageChange,
  file,
  image,
}) {
  return (
    <div
      className="mt-1 bg-white min-h-[780px]
     h-[780px] overflow-scroll 2xl:w-[66rem] lg:w-[60rem] lg:overflow-x-auto 2xl:overflow-x-hidden  lg:ml-0 mx-4  m-auto"
    >
      <form onSubmit={handleUpdate}>
        <div className="flex  lg:flex-row flex-col-reverse ">
          <div className="md:flex lg:block md:justify-center">
            <div className="flex lg:flex-row flex-col gap-8">
              <div className="flex flex-col lg:ml-5 ml-3  xl:pt-5 lg:mt-5 mt-5">
                <label className="mb-2 font-bold text-base">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  defaultValue={user?.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter First Name"
                  className="outline-none border-2 bg-secondary border-secondary50 xl:w-76 lg:w-[14rem] xss:w-[19.75rem] xs:w-[22.8rem]  p-3 rounded-lg text-base font-normal"
                />
              </div>

              <div className="flex flex-col lg:ml-0  ml-3 xl:ml-0 xl:pt-5 lg:mt-5 mb-5">
                <label className="mb-2 font-bold text-base">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  onChange={handleInputChange}
                  defaultValue={user?.lastName}
                  value={formData.lastName}
                  placeholder="Enter Last Name"
                  className="outline-none border-2 bg-secondary border-secondary50  xl:w-76 lg:w-[14rem]
                   xss:w-[19.75rem] xs:w-[22.8rem] p-3 rounded-lg text-base font-normal"
                />
              </div>
            </div>

            <div className="flex lg:flex-row flex-col gap-8">
              <div className="flex flex-col lg:ml-5 ml-3  xl:pt-5 lg:mt-5 mt-5">
                <label className="mb-2 font-bold text-base">Display Name</label>
                <input
                  type="text"
                  name="fullName"
                  onChange={handleInputChange}
                  defaultValue={user?.fullName}
                  value={formData.fullName}
                  placeholder="Enter Display Name"
                  className="outline-none border-2 bg-secondary border-secondary50
                    xl:w-76 lg:w-[14rem] xss:w-[19.75rem] xs:w-[22.8rem] p-3 rounded-lg text-base font-normal"
                />
              </div>

              <div className="flex flex-col lg:ml-0 ml-3 xl:pt-5 lg:mt-5 ">
                <label className="mb-2 font-bold text-base">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  defaultValue={user?.email}
                  disabled
                  placeholder="Enter Email"
                  className="outline-none border-2 bg-secondary border-secondary50   
                  xl:w-76 lg:w-[14rem] xss:w-[19.75rem] xs:w-[22.8rem] p-3 rounded-lg text-base font-normal"
                />
              </div>
            </div>

            <div className="flex lg:flex-row flex-col lg:ml-0 ml-3 gap-8">
              <div className="flex flex-col lg:ml-5 xl:pt-5 lg:mt-5 mt-8">
                <label className="mb-2 font-bold text-base">Phone</label>

                <IMaskInput
                  mask="+000-00-0000000"
                  value={formData.phone}
                  defaultValue={user?.phone}
                  onChange={handleInputChange}
                  name="phone"
                  className="outline-none border-2 bg-secondary border-[#E0E1E1] 
                  xl:w-76 lg:w-[14rem] xss:w-[19.75rem] xs:w-[22.8rem]  p-3 rounded-lg text-base font-normal"
                  sx={{
                    borderRadius: "8px",
                    border: "1px solid #E0E1E1",
                    background: "#F9FAFA",
                    outline: "none",
                  }}
                  variant="standard"
                />

                <div className=" xl:w-72 lg:w-[14rem] xss:w-[19.75rem] xs:w-[22.8rem] text-red-700">
                  {validPhoneNumberMessage}
                </div>
              </div>

              <div className="flex flex-col lg:ml-0 xl:pt-5 ml-0 lg:mt-5 mt-2">
                <label className="mb-4 font-bold text-base">Gender</label>
                <FormControl
                  sx={{
                    mt: -1,
                    width: 300,
                    "@media screen and (max-width:768px)": {
                      width: 400,
                    },
                    "@media screen and (max-width:1024px)": {
                      width: 227,
                    },
                  }}
                  className=" xss:w-[19.75rem] xs:w-[22.8rem]  xl:w-76 lg:w-[14rem]"
                >
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    name="gender"
                    onChange={handleInputChange}
                    value={formData.gender}
                    defaultValue={user?.gender}
                    sx={{
                      height: 50,
                      borderRadius: "8px",
                      border: "1px solid #E0E1E1",
                      background: "#F9FAFA",
                    }}
                  >
                    <MenuItem value={"female"}>Female</MenuItem>
                    <MenuItem value={"male"}>Male</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="flex lg:flex-row flex-col gap-8">
              <div className="flex flex-col lg:ml-5  ml-3 xl:pt-5 lg:mt-5 mt-8">
                <label className="mb-4 font-bold text-base">Country</label>

                <FormControl
                  sx={{
                    mt: -1,
                    width: 300,
                    "@media screen and (max-width:768px)": {
                      width: 300,
                    },
                    "@media screen and (max-width:1024px)": {
                      width: 227,
                    },
                  }}
                  className=" xss:w-[19.75rem] xs:w-[22.8rem]  xl:w-76 lg:w-[14rem]"
                >
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    name="country"
                    value={formData.country}
                    defaultValue={user?.country}
                    onChange={handleInputChange}
                    sx={{
                      height: 50,
                      borderRadius: "8px",
                      border: "1px solid #E0E1E1",
                      background: "#F9FAFA",
                    }}
                  >
                    <MenuItem value={"Abu Dhabi"}>Abu Dhabi</MenuItem>
                    <MenuItem value="Dubai">Dubai</MenuItem>
                    <MenuItem value="Sharjah">Sharjah</MenuItem>
                    <MenuItem value="Ajman">Ajman</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="flex flex-col lg:ml-0 ml-3  xl:pt-5 lg:mt-5 mt-1">
                <label className="mb-2 font-bold text-base">
                  Nationality (Optional)
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  defaultValue={user?.nationality}
                  onChange={handleInputChange}
                  placeholder="American, Bahraini etc"
                  className="outline-none border-2 bg-secondary border-secondary50 xl:w-76 lg:w-[14rem] xss:w-[19.75rem] xs:w-[22.8rem]  p-3 rounded-lg text-base font-normal"
                />
              </div>
            </div>
            <div className="flex flex-col  lg:ml-5  ml-3 xl:pt-5 lg:mt-5 mt-8">
              <label className="mb-2 font-bold text-base">Street Address</label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                defaultValue={user?.streetAddress}
                onChange={handleInputChange}
                placeholder="House number and street name"
                className="outline-none border-2 bg-secondary border-secondary50 xl:w-[39.5rem] lg:w-[30.5rem]  xss:w-[19.75rem] xs:w-[22.8rem]   p-3 rounded-lg text-base font-normal"
              />
            </div>

            <div className="flex lg:flex-row flex-col gap-8">
              <div className="flex flex-col lg:ml-5 ml-3 xl:pt-5 lg:mt-5 mt-8">
                <label className="mb-2 font-bold text-base">Town/City</label>
                <input
                  type="text"
                  name="city"
                  defaultValue={user?.city}
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Town, city, etc."
                  className="outline-none border-2 bg-secondary border-secondary50 xl:w-76 lg:w-[14rem] xss:w-[19.75rem] xs:w-[22.8rem]  p-3 rounded-lg text-base font-normal"
                />
              </div>

              <div className="flex flex-col lg:ml-0 ml-3 xl:pt-5 lg:mt-5 mt-5">
                <label className="mb-2 font-bold text-base">
                  Apartment (Optional)
                </label>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  defaultValue={user?.apartment}
                  placeholder="Apartment, suite, unit, etc."
                  className="outline-none border-2 bg-secondary border-secondary50 xl:w-76 lg:w-[14rem] xss:w-[19.75rem] xs:w-[22.8rem]  p-3 rounded-lg text-base font-normal"
                />
              </div>
            </div>
          </div>

          <Suspense fallback={null}>
            <UserDetails
              image={image}
              hanndleImageChange={handleImageChange}
              file={file}
              formData={formData}
            />
          </Suspense>
        </div>

        <div className="lg:flex flex-col lg:flex-row items-center lg:ml-5 ml-3 xl:pt-5 lg:mt-5 mt-5  mb-20 ">
          <div className="xl:w-80 lg:h-[3rem] block w-[10rem]">
            <button
              type="submit"
              className={`   ${
                !isSubmitDisabled ? "bg-primary" : "bg-primaryDisabled"
              } lg:w-52  rounded-3xl p-3 text-white text-lg lg:mt-0 mt-5 px-5 py-2`}
              disabled={isSubmitDisabled}
            >
              Save Changes
            </button>
          </div>
          <div className="pl-3 pt-4 lg:mt-0">
            <button
              onClick={() => setPasswordSettingsView(true)}
              className=" text-primary underline text-base font-bold"
            >
              Change Password?
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserDetailFields;
