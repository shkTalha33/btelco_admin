/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { setFirmAndCompanyDetail } from "../../slice/firmAndCompanyDetails";

import {
  Button,
  Card,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
} from "reactstrap";
import * as Yup from "yup";
import FileUpload from "../dashboard/FileUpload.js";
import CreateRole from "./createRole.jsx";
import { IoAdd } from "react-icons/io5";
import { eye, eyeoff } from "../icons/icon.jsx";
import { Modal } from "react-bootstrap";
import { handleError } from "../api/errorHandler.js";
import { uploadFile } from "../api/uploadFile.jsx";
import ApiFunction from "../api/apiFuntions.js";
import {
  addStaff,
  checkStaffEmail,
  getStaff,
  updateStaff,
} from "../api/ApiRoutesFile.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setAllStaff, setAndUpdateStaff } from "../redux/staff.js";
import toast from "react-hot-toast";
import debounce from "debounce";
import ButtonComponent from "../common/ButtonComponent.jsx";

export default function AddStaff() {
  const navigate = useNavigate();

  const onError = (errors) => {
    // console.error("Validation Errors:", errors);
  };

  const [staffFileLoading, setStaffFileLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [roles, setRoles] = useState([]);
  const { post, put } = ApiFunction();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const selectedStaffId = searchParams.get(`selectedStaff`);
  const currentPage = searchParams.get(`page`);

  const allStaff = useSelector((state) => state.staff.allStaff);

  const selectedStaff = allStaff.find(
    (staff) => staff?._id === selectedStaffId
  );

  const getAllEmployees = debounce(async () => {
    await post(`${getStaff}${currentPage}`)
      .then((result) => {
        dispatch(setAllStaff(result?.staff));
      })
      .catch((err) => {
      });
  }, 300);

  useEffect(() => {
    if (selectedStaffId) {
      if (allStaff.length === 0) {
        getAllEmployees();
      }
    }
  }, []);

  const schema = Yup.object().shape({
    fname: Yup.string().required("Admin Firstname is required"),
    lname: Yup.string().required("Admin Last Name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: selectedStaff
      ? Yup.string()
      : Yup.string().required("Password is required"),
    profile: Yup.mixed().required("An image is required"),
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

  const handleFileChange = async (event, setter) => {
    const selectedFile = event.target?.files[0];
    setStaffFileLoading(true);
    await uploadFile(selectedFile)
      .then((result) => {
        setValue(setter, result?.data?.image);
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setStaffFileLoading(false);
      });
    return selectedFile ? event.target?.files : null;
  };

  const onSubmit = async (data) => {
    setIsLoading(true);

    let staffData = { ...data, roles };

    if (
      staffData?.password.trim()?.length > 0 &&
      staffData?.password.trim().length < 8
    ) {
      toast.error("Password must contain at least 8 characters");
      setIsLoading(false);
      return;
    }

    if (selectedStaff && staffData?.password.trim()?.length === 0) {
      const { password, ...rest } = staffData;
      staffData = rest;
    }

    const apiEndpoint = selectedStaff
      ? `${updateStaff}${selectedStaffId}`
      : addStaff;
    const apiMethod = selectedStaff ? put : post;

    try {
      const result = await apiMethod(apiEndpoint, staffData);
      if (result?.success) {
        dispatch(setAndUpdateStaff(result.staff));
        toast.success(result.message);
        navigate("/employee");
        reset();
        setRoles([]);
      }
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveRole = (role) => {
    setRoles((prevRoles) => {
      let updatedRoles = prevRoles.filter((key) => key !== role);

      if (role === "staff-list") {
        updatedRoles = updatedRoles.filter(
          (r) =>
            r !== "staff-create" && r !== "staff-edit" && r !== "staff-delete"
        );
      }

      if (role === "package-list") {
        updatedRoles = updatedRoles.filter(
          (r) =>
            r !== "package-create" &&
            r !== "package-edit" &&
            r !== "package-delete"
        );
      }

      if (role === "faqs-list") {
        updatedRoles = updatedRoles.filter(
          (r) => r !== "faqs-create" && r !== "faqs-edit" && r !== "faqs-delete"
        );
      }

      if (role === "firm-list") {
        updatedRoles = updatedRoles.filter(
          (r) => r !== "firm-create" && r !== "firm-edit" && r !== "firm-delete"
        );
      }

      return updatedRoles;
    });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleStaffEmailOnBlur = async (value) => {
    if (!value) {
      return;
    }

    if (!isValidEmail(value)) {
      setError("email", {
        type: "manual",
        message: "Please enter a valid email address.",
      });
      return;
    }

    if (selectedStaff && selectedStaff?.email) {
      if (selectedStaff?.email === value) {
        return;
      }
    }

    await post(checkStaffEmail, { email: value })
      .then((result) => {
        clearErrors("email", null);
      })
      .catch((err) => {
        setError("email", {
          type: "manual",
          message: err?.response?.data?.message || err?.message,
        });
        handleError(err);
      });
  };

  useEffect(() => {
    if (selectedStaff) {
      setValue("fname", selectedStaff?.fname);
      setValue("lname", selectedStaff?.lname);
      setValue("email", selectedStaff?.email);
      setValue("profile", selectedStaff?.profile);
      setRoles(selectedStaff?.roles);
    }
  }, [selectedStaff]);

  return (
    <>
      <main className="min-h-screen poppins_regular add-firm text-sm lg:container p-2 p-md-4 mx-auto add_staff">
        <Container
          fluid
          className="px-2 px-md-4 py-4 bg_white my-3 border rounded-lg border-white w-full"
        >
          <h4 className="poppins_medium mb-4" style={{ color: "#151D48" }}>
            {selectedStaff ? "Update Staff" : "Add Staff"}
          </h4>
          <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="d-flex flex-column gap-2 w-100"
          >
            <div className="d-flex w-100 gap-x-5 flex-wrap flex-md-nowrap md:items-center justify-between">
              <FileUpload
                label="Profile Image"
                control={control}
                name="profile"
                imageUrl={profile}
                fileLoading={staffFileLoading}
                handleFileChange={(e) => handleFileChange(e, "profile")}
                error={errors.profile}
              />
              <div className="w-100 mb-3">
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
            </div>
            <div className="d-flex w-100 gap-x-5 flex-wrap flex-md-nowrap align-items-center justify-between">
              <div className="w-100 mb-3">
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
              <div className="w-100 mb-3">
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
                      {...field}
                      placeholder="Enter Email"
                      onBlur={(e) => {
                        field.onChange(e);
                        handleStaffEmailOnBlur(e.target.value);
                      }}
                      invalid={errors.email && true}
                    />
                  )}
                />
                {errors.email && (
                  <FormFeedback>{errors.email.message}</FormFeedback>
                )}
              </div>
            </div>
            <div className="d-flex w-100 gap-x-5 flex-wrap flex-md-nowrap align-items-end justify-between">
              <div className="w-full md:w-[50%] mb-3 position-relative">
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
              <div className="w-full md:w-[50%] mb-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="bg_primary text_white rounded-md py-[0.65rem] text-center poppins_medium w-full text-[1.1rem] flex gap-2 justify-center items-center"
                >
                  {selectedStaff ? (
                    "Update Roles"
                  ) : (
                    <>
                      <IoAdd size={30} /> Add Roles
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-end mt-1">
              <div className="flex flex-wrap w-full md:w-[48.5%]">
                {roles.length > 0 && (
                  <div className="d-flex flex-wrap gap-2">
                    {roles.map((role, index) => (
                      <span
                        key={index}
                        className="bg-[#F5F5F5] px-[0.5rem] py-[0.3rem] rounded text_dark"
                        style={{
                          display: "inline-block",
                          fontSize: "0.75rem",
                          cursor: "pointer",
                        }}
                        onClick={() => handleRemoveRole(role)}
                      >
                        {role}
                        <span
                          className="ms-2"
                          style={{
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                          onClick={() => handleRemoveRole(role)}
                        >
                          &times;
                        </span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="ml-auto">
              <ButtonComponent
                loading={isLoading}
                btnText={selectedStaff ? "Update" : "Submit"}
              />
            </div>
          </Form>
        </Container>
        <Modal
          show={isModalOpen}
          onHide={() => {
            setIsModalOpen(false);
          }}
          size="lg"
          centered
          className="!p-0"
        >
          <div className="p-2 p-md-4">
            <CreateRole
              setRoles={setRoles}
              roles={roles}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </Modal>
      </main>
    </>
  );
}
