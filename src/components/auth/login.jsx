import { yupResolver } from "@hookform/resolvers/yup";
import { Divider } from "antd";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormFeedback, Input, Label } from "reactstrap";
import * as Yup from "yup";
import ApiFunction from "../api/apiFuntions";
import { login, staffLogin } from "../api/ApiRoutesFile";
import { handleError } from "../api/errorHandler";
import { eye, eyeoff, valixLogo } from "../icons/icon";
import { setLogin, setToken, setUserData } from "../redux/loginForm";
import HashLoader from "react-spinners/HashLoader";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isStaffLogin, setIsStaffLogin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const [isStaffLoading, setIsStaffLoading] = useState(false);
  const navigate = useNavigate();
  const { post } = ApiFunction();
  const dispatch = useDispatch();

  const onError = (errors) => {
    // console.error("Validation Errors:", errors);
  };

  const schema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const apiData = {
      email: (data?.email).toLowerCase(),
      password: data?.password,
    };
    const apiEndpoint =  login;
    setIsAdminLoading(true)
    await post(apiEndpoint, apiData)
      .then((result) => {
        if (result.success) {
          // const userEncrypt = encryptData(result?.user);
          dispatch(setLogin(true));
          dispatch(setUserData(result?.user));
          dispatch(setToken(result?.token));
          toast.success(result?.message || "Login Successfully!");
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setIsAdminLoading(false);
      });
  };

  return (
    <div className="w-full h-screen overflow-hidden flex flex-row login inter_regular">
      <div className="d-none flex justify-center d-md-flex flex-col items-start w-full lg:w-1/2 relative login-bg ">
        <div className="mr-auto relative px-5">
          <img
            src={valixLogo}
            alt="valix-logo"
            width={"100px"}
            height={"90px"}
            className="object-cover"
          />
        </div>
        <div>
          <p className="login-logo-text text_white poppins_medium px-5 py-2">
            This accounting firm offers streamlined, personalized financial
            services, specializing in tax returns, VAT, and payroll management.
            With a user-friendly platform, clients can track progress in
            real-time, communicate directly with accountants, and manage
            payments seamlessly. We ensure accuracy, transparency, and
            efficiency for all your accounting needs..
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 h-full overflow-y-scroll justify-center items-center p-4">
        <div
          className="items-center justify-center m-auto flex"
          style={{ minHeight: "90vh", maxWidth: "600px" }}
        >
          <div className="border border-white p-xl-4 w-[100%]">
            <h2 className="inter_semibold mb-0 md:mb-auto text-3xl lg:text-4xl text_black">
              Login
            </h2>
            <p className="text_secondary max-md:text-sm inter_regular my-2 mb-5">
              Login to your account
            </p>

            <Form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="d-flex flex-column gap-2 w-full"
            >
              {/* Email Field */}
              <div className="w-full mb-3">
                <Label className="form-label" for="email">
                  Email
                </Label>
                <Controller
                  id="email"
                  name="email"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      className="h-12 custom-input"
                      {...field}
                      placeholder="Enter Email"
                      invalid={errors.email ? true : false}
                    />
                  )}
                />
                {errors.email && (
                  <FormFeedback>{errors.email.message}</FormFeedback>
                )}
              </div>

              {/* Password Field */}
              <div className="w-100 mb-3 position-relative">
                <Label className="form-label" for="password">
                  Password
                </Label>
                <div className="position-relative d-flex align-items-center">
                  <Controller
                    id="password"
                    name="password"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <Input
                        type={showPassword ? "text" : "password"}
                        className={`h-12 custom-input pe-0 ${errors.password ? "is-invalid" : ""
                          }`}
                        {...field}
                        placeholder="Enter Password"
                      />
                    )}
                  />
                  <span
                    className="position-absolute end-0 me-3 cursor-pointer"
                    style={{
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 2, // Make sure the icon is above other elements but does not interfere with error message
                      right: "20px", // Adjust spacing to prevent overlap
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <img
                        src={eyeoff}
                        alt="Hide Password"
                        width={25}
                        style={{ marginRight: "10px" }}
                      />
                    ) : (
                      <img
                        src={eye}
                        alt="Show Password"
                        width={25}
                        style={{ marginRight: "10px" }}
                      />
                    )}
                  </span>
                </div>
                {errors.password && (
                  <FormFeedback
                    className="d-block mt-2"
                    style={{ zIndex: 1, position: "relative" }}
                  >
                    {errors.password.message}
                  </FormFeedback>
                )}
              </div>
              <div className="flex items-center flex-col justify-center gap-[0.3rem]">
                <button
                  disabled={isStaffLoading || isAdminLoading}
                  onClick={() => setIsStaffLogin(false)}
                  className={`${!isStaffLogin
                    ? "bg_primary text_white"
                    : "bg_white text_primary "
                    } inter_medium rounded-md border border_primary px-[1.5rem] py-[0.5rem] w-full`}
                >
                  {isAdminLoading ? <HashLoader  className="mx-auto" color="#fff" size={18} /> : "Login"}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
