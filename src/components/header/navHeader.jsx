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

  const menuItems = [
    {
      pageTitle: "Dashboard",
      path: "/dashboard",
    },
    {
      pageTitle: "Subscriptions",
      path: "/companies/subscription",
    },
    {
      pageTitle: "Subscription and transactions",
      path: "/companies/transaction",
    },
    {
      pageTitle: "Companies/firms",
      path: "/firm/all",
    },
    {
      pageTitle: "Companies/firms",
      path: "/firm/active",
    },
    {
      pageTitle: "Companies/firms",
      path: "/firm/inactive",
    },
    {
      pageTitle: "Companies/firms",
      path: "/firm/trail",
    },
    {
      pageTitle: "Companies/firms",
      path: "/companies/addfirm",
    },
    {
      pageTitle: "firm details",
      path: "/companies/firmdetails",
    },
    {
      pageTitle: "Packages",
      path: "/packages",
    },
    {
      pageTitle: "Staff Management",
      path: "/employee",
    },
    {
      pageTitle: "Staff Management",
      path: "/staff/add",
    },
    {
      pageTitle: "Staff Management",
      path: "/staff/roles",
    },
    {
      pageTitle: "Staff Management",
      path: "/staff/roles/create-role",
    },
    {
      pageTitle: "FAQs",
      path: "/category-faq",
    },
    {
      pageTitle: "Support",
      path: "/support",
    },
    {
      pageTitle: "Terms & Conditions",
      path: "/terms",
    },
    {
      pageTitle: "Privacy & Policy",
      path: "/privacy",
    },
    {
      pageTitle: "FAQs",
      path: "/faq",
    },
    {
      pageTitle: "Billing",
      path: "/manage/subscription",
    },
    {
      pageTitle: "Analytics",
      path: "/analytics",
    },
    {
      pageTitle: "Revenue",
      path: "/revenue",
    },
    {
      pageTitle: "Firm Clients",
      path: "/clients",
    },
    {
      pageTitle: "Chat",
      path: "/chat",
    },
    {
      pageTitle: "Reviews",
      path: "/reviews",
    },
    {
      pageTitle: "Firm/Email",
      path: "/email/firms",
    },
    {
      pageTitle: "Email Settings",
      path: "/email/setting",
    },
    {
      pageTitle: "Landing Page Setting",
      path: "/settings",
    },
  ];

  useEffect(() => {
    const findPageTitle = () => {
      let pageTitle = "Dashboard";

      menuItems.forEach((item) => {
        if (item.path === location.pathname) {
          pageTitle = item.pageTitle;
        }
      });

      setCurrentPage(pageTitle);
    };

    findPageTitle();
  }, [location.pathname]);

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
            {currentPage}
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
