/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import toast from "react-hot-toast";
import { PiSignOutBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ApiFunction from "../api/apiFuntions";
import { setLogout } from "../redux/loginForm";

const NavHeader = ({ broken, setToggled, toggled }) => {
  const [currentPage, setCurrentPage] = useState("/dashboard");
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = ApiFunction();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLogout());
    toast.success("Logout Successful");
    navigate("/auth/login", { replace: true });
  };

  const HandleToggled = () => {
    setToggled(!toggled);
  };


  return (
    <>
      <Navbar
        expand="lg"
        sticky="top"
        className="p-3 shadow-sm w-full bg_white text_black"
        id="navbar"
        style={{ zIndex: 99 }}
      >
        <Container fluid className="flex justify-between items-center">
          {/* H1 Tag at the Start */}
          <h3 className="text-2xl poppins_medium text_darkprimary d-none d-lg-block">
            Dashboard
          </h3>
          <button className="poppins_medium text-lg flex gap-2 items-center hover:text-red-600" onClick={handleLogout}>
            {
              <PiSignOutBold
                color="red"
                className=""
                size={23}
              />
            }
            Sign Out
          </button>
          
        </Container>
      </Navbar>
    </>
  );
};

export default NavHeader;
