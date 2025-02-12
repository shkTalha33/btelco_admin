/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */

// React and related hooks
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

// Form handling and validation
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// UI Components
import {
  Button,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
} from "reactstrap";
import Modal from "react-bootstrap/Modal";

// Icons
import { eye, eyeoff } from "../icons/icon.jsx";

// Utilities
import toast from "react-hot-toast";

// API and Redux actions
import { checkAdminEmail, createAdmin } from "../api/ApiRoutesFile.jsx";
import { handleError } from "../api/errorHandler.js";
import { uploadFile } from "../api/uploadFile.jsx";
import ApiFunction from "../api/apiFuntions.js";

// Components
import FileUpload from "../dashboard/FileUpload.js";
import { Divider } from "antd";
import { useDispatch } from "react-redux";
import { addFirmAdmin } from "../redux/firm.js";
import HashLoader from "react-spinners/HashLoader.js";

export default function AddAdmin({ currentFirm, showModal, setShowModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { post } = ApiFunction();

  const schema = Yup.object().shape({
    profile: Yup.string().required("Profile Image is required"),
    fname: Yup.string().required("First Name is required"),
    lname: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email is invalid"),
    password: Yup.string()
      .min(6, "Password must be 6 atleast characters")
      .required("Password is required"),
  });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const profile = watch("profile");

  const onSubmit = async (data) => {
    setIsLoading(true);
    await post(`${createAdmin}${currentFirm}`, data)
      .then((result) => {
        if (result?.success) {
          dispatch(addFirmAdmin(result?.user));
          toast.success(result?.message);
          setShowModal(false);
        }
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setIsLoading(false);
        setShowModal(false);
      });
    reset();
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const handleAdminEmailOnBlur = async (value) => {
    if (!value) {
      return
    }
    if (!isValidEmail(value)) {
      clearErrors("email", {
        type: "manual",
        message: "Please enter a valid email address.",
      });
      return;
    }

    await post(checkAdminEmail, { email: value })
      .then((result) => {
        setError("adminemail", null);
      })
      .catch((err) => {
        setError("adminemail", {
          type: "manual",
          message: err?.response?.data?.message || err?.message,
        });
        handleError(err);
      });
  };

  const handleFileChange = async (event, setter) => {
    const selectedFile = event.target?.files[0];
    setProfileLoading(true);
    await uploadFile(selectedFile)
      .then((result) => {
        setValue(setter, result?.data?.image);
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setProfileLoading(false);
      });
    return selectedFile ? event.target?.files : null;
  };

  const handleClose = () => setShowModal(false);

  return (
    <main className="lg:container p-[0.5rem] md:p-4 mx-auto">
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleClose} // Add this handler
      >
        <Modal.Body>
          <Container
            fluid
            className="px-[0.3rem] px-md-5 py-[1rem] bg_white  md:my-3 border rounded-lg border-white w-full"
          >
            <h4
              className="inter_medium text-center text-[1.25rem] md:text-[1.75rem]"
              style={{ color: "#151D48" }}
            >
              Add Admin
            </h4>
            <Divider className="mt-[1rem] mb-[1.5rem]" />
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="d-flex flex-column gap-1 w-100"
            >
              <FileUpload
                label="Profile Image"
                control={control}
                name="profile"
                imageUrl={profile}
                fileLoading={profileLoading}
                handleFileChange={(e) => handleFileChange(e, "profile")}
                error={errors.profile}
              />
              <div className="d-flex w-100 gap-x-5 flex-wrap flex-lg-nowrap align-items-center justify-between">
                <div className="w-100 mb-1">
                  <Label className="form-label" for="fname">
                    First Name
                  </Label>
                  <Controller
                    id="fname"
                    name="fname"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter First Name"
                        invalid={errors.fname && true}
                      />
                    )}
                  />
                  {errors.fname && (
                    <FormFeedback>{errors.fname.message}</FormFeedback>
                  )}
                </div>
                <div className="w-100 mb-1">
                  <Label className="form-label" for="lname">
                    Last Name
                  </Label>
                  <Controller
                    id="lname"
                    name="lname"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter Last Name"
                        invalid={errors.lname && true}
                      />
                    )}
                  />
                  {errors.lname && (
                    <FormFeedback>{errors.lname.message}</FormFeedback>
                  )}
                </div>
              </div>
              <div className="d-flex w-100 gap-x-5 flex-wrap flex-lg-nowrap align-items-center justify-between">
                <div className="w-100 mb-1">
                  <Label className="form-label" for="adminemail">
                    Email
                  </Label>
                  <Controller
                    id="email"
                    name="email"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter Email"
                        invalid={errors.email && true}
                        onBlur={(e) => {
                          field.onChange(e);
                          handleAdminEmailOnBlur(e.target.value);
                        }}
                      />
                    )}
                  />
                  {errors.email && (
                    <FormFeedback>{errors.email.message}</FormFeedback>
                  )}
                </div>
                <div className="w-100 mb-1 position-relative">
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
                          className={`h-12 custom-input pe-0 ${
                            errors.password ? "is-invalid" : ""
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
              </div>
              <div className="ml-auto">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`mt-2 text-center bg_primary border-0 text-[poppins_regular] w-[14rem] h-[3.3rem] hover_primary_color ${
                    isLoading ? "cursor-default" : "cursor-pointer"
                  }`}
                >
                  {isLoading ? <HashLoader  className="mx-auto"   color="#fff" size={16} /> : "Submit"}
                </Button>
              </div>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </main>
  );
}
