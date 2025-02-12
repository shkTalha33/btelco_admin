/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  companies,
  dashboard,
  pages,
  setting,
  staff,
  support,
  valixLogoWhite,
  BtelcoLogo
} from "../icons/icon";

import { useSelector } from "react-redux";
import { decryptData } from "../api/encrypted";
import { useAuth } from "../authRoutes/useAuth";
import ApiFunction from "../api/apiFuntions";

const SidebarMenu = ({ children, setToggled, toggled, setBroken }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedLink, setSelectedLink] = useState("0");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = useAuth();
  const { userData } = ApiFunction();

  const handleLinkClick = (itemId, path) => {
    setSelectedLink(itemId);
    setToggled(false);
    setShow(false);
    navigate(path);
  };

  const isChildPath = (parentPath, childPath) => {
    return childPath.startsWith(parentPath);
  };

  const userRoles = userData?.roles;

  let menuItems = [
    {
      image: dashboard,
      items: "Dashboard",
      path: "/dashboard",
      key: ["dashboard"],
    },
    {
        image: companies,
        items: "Blogs Management",
        path: null,
        key: ["blogs"],
        subItems: [
          {
            label: "Blogs",
            path: "/blog/management",
          },
          {
            label: "Blog Categories",
            path: "/blog/category",
          },
        ],
      },
      {
        image: companies,
        items: "Service Management",
        path: null,
        key: ["service"],
        subItems: [
          {
            label: "Services",
            path: "/service/management",
          },
          {
            label: "Service Categories",
            path: "/service/category",
          },
          {
            label: "Service Header",
            path: "/service/header",
          },
        ],
      },
    // {
    //   image: companies,
    //   items: "Firm Management",
    //   path: null,
    //   key: ["firm-list", "firm-create", "firm-edit", "firm-delete"],
    //   subItems: [
    //     {
    //       label: "All Firms",
    //       path: "/firm/all",
    //     },
    //     {
    //       label: "Firm Trail",
    //       path: "/firm/trail",
    //     },
    //     {
    //       label: "Active Firm",
    //       path: "/firm/active",
    //     },
    //     {
    //       label: "InActive Firm",
    //       path: "/firm/inactive",
    //     },
    //   ],
    // },
    // {
    //   image: emailConfigurationlFirm,
    //   items: "Header",
    //   path: "/lead/management",
    // },
    // {
    //   image: companies,
    //   items: "Reporting & Analytics",
    //   path: null,
    //   key: ["reporting"],
    //   subItems: [
    //     {
    //       label: "Analytics",
    //       path: "/analytics",
    //     },
    //     {
    //       label: "Revenue",
    //       path: "/revenue",
    //     },
    //     {
    //       label: "Firm Clients",
    //       path: "/clients",
    //     },
    //   ],
    // },
    // {
    //   image: staff,
    //   items: "Staff Management",
    //   path: null,
    //   key: ["staff-list", "staff-create", "staff-edit", "staff-delete"],
    //   subItems: [
    //     {
    //       label: "Employee",
    //       path: "/employee",
    //     },
    //     // {
    //     //   label: "Roles and Premission",
    //     //   path: "/staff/roles",
    //     // },
    //   ],
    // },
    // {
    //   image: staff,
    //   items: "Billing",
    //   path: null,
    //   key: ["billing"],
    //   subItems: [
    //     {
    //       label: "Manage Subscriptions",
    //       path: "/manage/subscription",
    //     },
    //     {
    //       // image: pages,
    //       label: "Packages",
    //       path: "/packages",
    //       // key: ["package-list", "package-create", "package-edit", "package-delete"],
    //     },
    //   ],
    // },
    // {
    //   image: staff,
    //   items: "FAQs",
    //   path: null,
    //   key: ['faqs-list', 'faqs-create', 'faqs-edit', 'faqs-delete'],
    //   subItems: [
    //     {
    //       label: "Faq Categories",
    //       path: "/category-faq",
    //     },
    //     {
    //       label: "Faq List",
    //       path: "/faq",
    //     },
    //   ],
    // },

    // {
    //   image: support,
    //   items: "Chat & Notifications",
    //   path: null,
    //   key: ["support"],
    //   subItems: [
    //     {
    //       label: "Customer Support",
    //       path: "/support",
    //     },
    //     // {
    //     //   label: "Reviews",
    //     //   path: "/reviews",
    //     // },
    //     {
    //       label: "Email Firms",
    //       path: "/email/firms",
    //     },
    //   ],
    // },
    // {
    //   image: support,
    //   items: "Static Pages",
    //   path: null,
    //   key: ["static"],
    //   subItems: [
    //     // {
    //     //   label: "Chat Support",
    //     //   path: "/chat",
    //     // },
    //     {
    //       label: "Terms & Conditions",
    //       path: "/terms",
    //     },
    //     {
    //       label: "Privacy & Policy",
    //       path: "/privacy",
    //     },
    //   ],
    // },
    // {
    //   image: setting,
    //   items: "System Setting",
    //   path: null,
    //   key: ["settings"],
    //   subItems: [
    //     {
    //       label: "Email Setting",
    //       path: "/email/setting",
    //     },
    //   ],
    // },
  ];

  if (userRoles) {
    menuItems = menuItems.filter(menu => {
      if (menu?.key) {
        const hasRole = userRoles.some(role => menu.key.includes(role));
        return hasRole;
      }
      return true;
    });
  }

  return (
    <>
      {isLogin ? (
        <div className="flex h-screen bg_dark ">
          <div className="h-screen relative bg_dark" style={{ zIndex: 999 }}>
            <Sidebar
              className="bg_dark"
              width="280px"
              style={{ height: "100%", zIndex: 999 }}
              collapsed={collapsed}
              toggled={toggled}
              backgroundColor="bg_dark"
              onBackdropClick={() => {
                setToggled(false);
                setShow(false);
              }}
              onBreakPoint={setBroken}
              breakPoint="lg"
            >
              <div
                className="scrolbar"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "auto",
                  height: "100%",
                  paddingTop: "1rem",
                }}
              >
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => {
                      navigate("/dashboard");
                    }}
                    className=""
                  >
                    <img
                      src={BtelcoLogo}
                      alt="valix Logo White"
                      width={"120px"}
                    />
                  </button>
                </div>
                <Menu className="container mx-auto flex flex-col bg_dark justify-between h-full mt-4 ">
                  <div>
                    <p
                      style={{ width: "90%", margin: "auto", fontSize: "17px" }}
                      className="text-secondary archivo_bold mb-2"
                    >
                      General
                    </p>
                    {menuItems.map((item, i) => (
                      <Fragment key={i}>
                        {item.subItems ? (
                          <SubMenu
                            label={item.items}
                            icon={
                              <img
                                src={item.image}
                                width="22px"
                                alt={item.items}
                              />
                            }
                            className={`w-full bg_dark text_white mb-2`}
                          >
                            {item.subItems.map((subItem, j) => (
                              <MenuItem
                                key={`${i}-${j}`}
                                onClick={() =>
                                  handleLinkClick(`${i}-${j}`, subItem.path)
                                }
                                component={<Link to={subItem.path} />}
                                className={`w-full archivo_regular dashboard-submenu-items text_white  mb-2  rounded-lg ${isChildPath(subItem.path, location.pathname)
                                  ? "bg_primary bg-red-600 text_white archivo_semibold"
                                  : "text_white"
                                  }`}
                              >
                                {subItem.label}
                              </MenuItem>
                            ))}
                          </SubMenu>
                        ) : (
                          <MenuItem
                            style={{ borderRadius: "20px", margin: "auto" }}
                            key={i}
                            onClick={() =>
                              handleLinkClick(i.toString(), item.path)
                            }
                            component={<Link to={item.path} />}
                            className={` mb-2 dashboard-menu-items rounded-lg  ${isChildPath(item.path, location.pathname)
                              ? "bg_primary text_white archivo_semibold"
                              : "text_white"
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              {/* {isChildPath(item.path, location.pathname) ? ( */}
                              <img
                                style={{ height: "auto", width: "22px" }}
                                src={item.image}
                                alt=""
                              />
                              {/* ) : (
                                <img
                                  style={{ height: "auto", width: "25px" }}
                                  src={item.image}
                                  alt=""
                                />
                              )} */}
                              <div className="archivo_regular text">
                                {item.items}
                              </div>
                            </div>
                          </MenuItem>
                        )}
                      </Fragment>
                    ))}
                  </div>
                </Menu>
              </div>
            </Sidebar>
          </div>
          <main
            className="w-full overflow-auto"
            style={{ backgroundColor: "#F3F3F9" }}
          >
            {children}
          </main>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default SidebarMenu;
