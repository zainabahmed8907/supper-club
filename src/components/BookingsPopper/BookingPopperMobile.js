import {
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Paper,
} from "@mui/material";

export default function BookingsPopper({
  anchorEl,
  open,
  handleClose,
  handleBookingDetailsModalOpen,
  handleResceduleModalOpen,
  handleCancelModalOpen,
}) {
  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      role={undefined}
      placement="bottom-start"
      transition
      disablePortal
      className="w-[9rem]"
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom-start" ? "bottom-start" : "left bottom",
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={open}
                id="composition-menu"
                aria-labelledby="composition-button"
              >
                <MenuItem
                  className="text-xs hover:text-primary"
                  onClick={()=>{
                    handleBookingDetailsModalOpen();
                    handleClose();
                  }}
                >
                  <p>View Details</p>
                </MenuItem>
                <MenuItem
                  onClick={()=>{
                    handleResceduleModalOpen();
                    handleClose();
                  }}
                  className="text-xs"
                >
                  Reschedule
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    handleCancelModalOpen();
                  }}
                  className="text-xs"
                >
                  Cancel booking
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}
