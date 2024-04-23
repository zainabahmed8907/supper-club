"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

// import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";

import ProfileDropDown from "../ProfileDropDown/ProfileDropDown";
import CloseImg from "/public/images/drawer/close-circle.svg";
import { logout } from "@/store/reducers/user.slice";
import LogoutImg from "/public/images/dashboard/logout-home.svg";
import { useRouter } from "next/navigation";

const NavBar = ({ showLogin }) => {
  // Navbar toggle
  const usePathName = usePathname();
  const dispatch = useDispatch();

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  const [menuEl, setMenuEl] = useState(false);
  const handleMenuClick = (event) => {
    setMenuEl(!menuEl);
  };

  const handleMenuClose = () => {
    setMenuEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { auth, user } = useSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };
  const handleDropDownClick = () => {
    setAnchorEl(!anchorEl);
  };

  const handleDropDownClose = () => {
    setAnchorEl(null);
  };
  // console.log(auth, user);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const route=useRouter();

  const signout = () => {
    dispatch(logout());
    route.push("/");
  };
  return (
    <>
      <header
        className={`header left-0  ${
          usePathName == "/" ? "top-8" : "top-0"
        } z-40 flex w-full items-center h-20 ${
          sticky
            ? "bg-footerBg dark:shadow-sticky-dark sticky z-[9999]  shadow-sticky backdrop-blur-sm transition"
            : `absolute ${
                usePathName == "/" ? " bg-transparent" : "bg-footerBg"
              }`
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link
                href="/"
                className={`header-logo block w-full ${
                  sticky ? "py-5 lg:py-2" : "py-8"
                } `}
              >
                <Image
                  src="/images/logo/logo-white.svg"
                  alt="logo"
                  width={30}
                  height={30}
                  className="w-full dark:hidden"
                  loading="lazy"
                />
                <Image
                  src="/images/logo/logo-white.svg"
                  alt="logo"
                  width={30}
                  height={30}
                  className="hidden w-full dark:block"
                  loading="lazy"
                />
              </Link>
            </div>
            <div className="flex w-full items-center justify-end px-4">
              <div>
                <button
                  onClick={toggleDrawer}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "opacity-0 " : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                <nav
                  className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white px-6 
                  py-4 duration-300 dark:border-body-color/20  lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:block hidden
                  lg:p-0 lg:opacity-100 ${
                    navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }`}
                >
                  <ul className="block lg:flex lg:space-x-12">
                    {menuData.map((menuItem, index) => (
                      <li key={index} className="group relative">
                        {menuItem.path ? (
                          <Link
                            href={menuItem.path}
                            className={`flex py-2 text-base leading-[24px] lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                              usePathName === menuItem.path
                                ? "text-primary dark:text-[#FFFFFF]"
                                : "lg:text-white hover:text-primary dark:text-white/70 dark:hover:text-white"
                            }`}
                          >
                            {menuItem.title}
                          </Link>
                        ) : (
                          <>
                            <div className="flex cursor-pointer items-center justify-between py-2 pr-5 text-base text-[#FFFFFF] group-hover:text-primary dark:text-white/70 dark:group-hover:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6">
                              <span className="pr-2">
                                <svg
                                  width="10"
                                  height="8"
                                  viewBox="0 0 10 8"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M4.99529 7.99023L0.669544 0.497818L9.32104 0.497818L4.99529 7.99023Z"
                                    fill="#C39D63"
                                  />
                                </svg>
                              </span>
                              <p
                                onClick={() => handleSubmenu(index)}
                                className="pr-10"
                              >
                                {menuItem.title}
                              </p>
                            </div>
                            <div
                              className={`submenu relative left-0 top-full rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                                openIndex === index ? "block" : "hidden"
                              }`}
                            >
                              {menuItem.submenu.map((submenuItem, index) => (
                                <Link
                                  href={submenuItem.path}
                                  key={index}
                                  className="block rounded py-2.5 text-sm text-black hover:text-primary dark:text-white/70 dark:hover:text-white lg:px-3"
                                >
                                  {submenuItem.title}
                                </Link>
                              ))}
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {auth ? (
                <>
                  <div
                    className="lg:flex w-[10rem] items-center mr-28 cursor-pointer  hidden ml-10"
                    onClick={handleDropDownClick}
                  >
                    <div className="mr-2">
                      <Avatar>{user?.fullName?.charAt(0) || "U"}</Avatar>
                    </div>
                    <div>
                      <div>
                        <p className="text-white text-sm font-medium">
                          {user?.fullName}
                        </p>
                      </div>
                      <div>
                        <p className="text-white text-xs">{user?.email}</p>
                      </div>
                    </div>
                    <span className="pr-2">
                      <svg
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.99529 7.99023L0.669544 0.497818L9.32104 0.497818L4.99529 7.99023Z"
                          fill="#C39D63"
                        />
                      </svg>
                    </span>
                  </div>
                  <ProfileDropDown
                    open={open}
                    handleClose={handleDropDownClick}
                    anchorEl={anchorEl}
                  />
                </>
              ) : (
                showLogin && (
                  <div className="lg:flex items-center justify-end pr-16 lg:pr-0 ml-5 hidden">
                    <Link
                      href="/login"
                      className="ease-in-up shadow-btn hover:shadow-btn-hover bg-primary px-2 xs:px-4  py-3 text-xs sm:text-sm md:text-base font-medium text-white transition duration-300 hover:bg-buttonHover md:px-9 lg:px-6 xl:px-14 rounded-full"
                    >
                      Login
                    </Link>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onOpen={toggleDrawer}
          variant="temporary"
          style={{ zIndex: 10000, height: "100vh" }}
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 240,
              boxSizing: "border-box",
            },
            display: {
              sm: "block",
              lg: "none",
            },
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {auth && (
            <div className="w-full h-44 bg-dark flex justify-center flex-col items-center">
              <div onClick={() => setDrawerOpen(false)}>
                <CloseIcon
                  sx={{ color: "white" }}
                  className="right-2 absolute top-2"
                />
              </div>
             <Link href="/profile" className="m-auto w-full flex justify-center flex-col items-center">
             <Avatar className="w-20 h-20 bg-primary" alt="avatar">
                {user?.fullName?.split(" ")[0]?.charAt(0) +
                  " " +
                  user?.fullName?.split(" ")[1]?.charAt(0)}
              </Avatar>
              <p className="text-white mt-2">{user?.fullName}</p>

              <p className="text-white text-sm">{user?.email}</p></Link>
            </div>
          )}
          {!auth && (
            <div
              className="flex justify-end items-center mt-4 mr-4"
              onClick={() => setDrawerOpen(false)}
            >
              <Image src={CloseImg} width={30} height={30} alt="close icon" />
            </div>
          )}
          <List
            sx={{
              width: "100%",
              maxWidth: 240,
              bgcolor: "background.paper",
              marginTop: "0.8rem",
            }}
            component="nav"
          >
            {menuData.map((text, index) => (
              <ListItem className="flex-column text-center" key={index}>
                <ListItemButton className="flex justify-center">
                  <Link
                    href={`${text.path}`}
                    className={`${
                      usePathName === text?.path
                        ? "text-dark underline decoration-2 decoration-primary underline-offset-8 dark:text-[#FFFFFF]"
                        : "lg:text-white hover:text-primary dark:text-white/70 dark:hover:text-white"
                    }`}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <ListItemText primary={text.title} />
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
            <div className="relative flex justify-center mt-6">
              <div
                className="cursor-pointer flex items-center justify-center"
                onClick={handleMenuClick}
              >
                <p className="pr-2">English</p>{" "}
                <svg
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.99529 7.99023L0.669544 0.497818L9.32104 0.497818L4.99529 7.99023Z"
                    fill="#C39D63"
                  />
                </svg>
              </div>
              {menuEl && (
                <div className="absolute top-full  mt-1 bg-white  rounded-md shadow-lg">
                  <div className="py-1">
                    <div
                      className="cursor-pointer px-4 py-2 hover:bg-gray focus:bg-gray-dark"
                      onClick={handleMenuClick}
                    >
                      العربية
                    </div>
                    <div
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      onClick={handleMenuClick}
                    >
                      English
                    </div>
                  </div>
                </div>
              )}
            </div>
          </List>
          <div className="flex flex-col justify-end h-96 items-center">
            {!auth ? (
              <Link
                onClick={() => setDrawerOpen(false)}
                href="/login"
                className="ease-in-up shadow-btn hover:shadow-btn-hover bg-primary px-2 xs:px-4 
                   py-3 text-base font-medium text-white transition duration-300
                    hover:bg-buttonHover rounded-full text-center w-52 flex justify-center"
              >
                Login
              </Link>
            ) : (
              <Button
                onClick={() => {
                  setDrawerOpen(false);
                  signout();
                }}
                className="ease-in-up shadow-btn hover:shadow-btn-hover bg-primary px-2 xs:px-4 
               py-3 text-base font-medium text-white transition duration-300
                hover:bg-buttonHover rounded-full text-center w-52 flex justify-center"
              >
                <Image src={LogoutImg} alt="" className="mr-2" /> <p>Log out</p>
              </Button>
            )}
          </div>
        </Drawer>
      </header>
    </>
  );
};

export default NavBar;
