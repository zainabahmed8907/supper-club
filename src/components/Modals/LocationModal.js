import { Modal, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRef, useState } from "react";
import LocationIcon from "public/images/offers/locationIcon.svg";
import CloseCircle from "public/images/offers/close-drawer.png";
import GPSIcon from "public/images/offers/gps.svg";
import Image from "next/image";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: 3,

  "@media screen and (max-width:1120px)": {
    paddingBottom: "10%",
    width: "400px",
    margin: "20px",
    left: "40%",
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
}));

function LocationModal({ open, handleClose }) {
  const rootRef = useRef(null);

  const classes = useStyles();
  const [location, setLocation] = useState([]);
  const [error, setError] = useState(null);

  const handleLocateMeClick = () => {
    if (!navigator.permissions) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        if (permissionStatus.state === "granted") {
          getCurrentLocation();
        } else if (permissionStatus.state === "prompt") {
          permissionStatus.onchange = () => {
            if (permissionStatus.state === "granted") {
              getCurrentLocation();
            }
          };
        } else {
          setError("Geolocation permission denied.");
        }
      });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation([latitude, longitude]);
      },
      (error) => {
        console.error("Error getting location:", error.message);
        setLocation("Unable to retrieve location");
      }
    );
  };

  return (
    <Modal
      className={`xl: 2xl:h-40${classes.modal}`}
      disablePortal
      disableEnforceFocus
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      container={() => rootRef.current}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Box sx={{ ...style, width: 664 }}>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src={LocationIcon}
              alt="location icon"
              width={30}
              height={30}
              className="mr-4"
            />
            <p className="lg:text-2xl text-sm  font-bold">
              Select Your Exact Location
            </p>
          </div>

          <div onClick={handleClose} className="cursor-pointer">
            <Image src={CloseCircle} alt="close" width={20} height={20} />
          </div>
        </div>

        <div className="mt-6">
          <p className="text-base font-normal ml-2">
            Providing your current location ensures more accurate searches and
            enables personalised recommendations.
          </p>
        </div>

        <div className="mt-7 flex relative">
          <input
            type="text"
            className="flex-1 outline-none w-full rounded-full border-2 border-inputBorder px-6 py-2"
            placeholder="Select your location"
            value={location}
            readOnly
          />
          <div
            className="absolute top-50 right-5 translate-y-3 flex cursor-pointer"
            onClick={handleLocateMeClick}
          >
            <Image
              src={GPSIcon}
              alt="gps"
              width={20}
              height={20}
              className="mr-2"
            />
            <p className="text-sm font-bold">Locate Me</p>
          </div>
        </div>

        {/* {location.length > 0 && <MapContainer center={location} zoom={23} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={location}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>} */}
      </Box>
    </Modal>
  );
}

export default LocationModal;
