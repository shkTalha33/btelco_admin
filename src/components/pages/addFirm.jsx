/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

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
import { setPackages } from "../redux/pricingPackage.js";
import debounce from "debounce";
import {
  checkAdminEmail,
  checkFirmEmail,
  checkFirmPhone,
  createFirm,
  getCompanies,
  getPackages,
  updateFirm,
} from "../api/ApiRoutesFile.jsx";
import { handleError } from "../api/errorHandler.js";
import ApiFunction from "../api/apiFuntions.js";
import { uploadFile } from "../api/uploadFile.jsx";
import { eye, eyeoff } from "../icons/icon.jsx";
import toast from "react-hot-toast";
import { addAndUpdateFirm, setAllFirms } from "../redux/firm.js";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import HashLoader from "react-spinners/HashLoader.js";

const AddFirm = () => {
  const dispatch = useDispatch();

  const { get, post, put } = ApiFunction();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const firmId = searchParams.get("firm");
  const currentPage = searchParams.get("page");

  const allFirmData = useSelector((state) => state.firm.allFirms) || [];
  const packages = useSelector((state) => state.pricingPackage.packages) || [];
  const selectedFirm = allFirmData.find((firm) => firm?._id === firmId);

  const [isLoading, setIsLoading] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const [isPackagesLoading, setIsPackagesLoading] = useState(true);
  const [firmLogoLoading, setFirmLogoLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onError = (errors) => {
    toast.error("Fill all the fields correctly");
  };

  const schema = Yup.object().shape({
    name: Yup.string().required("Firm Name is required"),
    phone: Yup.string().required("Firm Phone Number is required"),
    address: Yup.string().required("Firm Address is required"),
    package: Yup.string().required("Package is required"),
    email: selectedFirm ? Yup.string() : Yup.string().required("Email is required").email("Email is invalid"),
    registration: Yup.string()
      .required("Firm Registration is required")
      .matches(
        /^[a-zA-Z0-9]{1,8}$/,
        "Registration must be 1-8 characters long and only contain numbers or alphabets"
      ),

    firm_logo: Yup.string().required("Firm Logo is required"),
    profile: Yup.string().required("Profile Image is required"),

    adminfname: Yup.string().required("First Name is required"),
    adminlname: Yup.string().required("Last Name is required"),
    adminemail: Yup.string()
      .required("Email is required")
      .email("Email is invalid"),
    password: firmId
      ? Yup.string()
      : Yup.string()
          .min(6, "Password must be 6 atleast characters")
          .required("Password is required"),
  });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    clearErrors,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const firm_logo = watch("firm_logo");
  const profile = watch("profile");
  // const package = watch("package");

  const handleFirmPhoneOnBlur = async (value) => {
    if (!value) {
      return;
    }

    if (value.length < 10) {
      setError("phone", {
        type: "manual",
        message: "Please enter a valid phone number.",
      });
      return;
    }
    await post(checkFirmPhone, { phone: value })
      .then((result) => {
        clearErrors("phone", null);
      })
      .catch((err) => {
        setError("phone", {
          type: "manual",
          message: err?.response?.data?.message || err?.message,
        });
        handleError(err);
      });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFirmEmailOnBlur = async (value) => {
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

    if (selectedFirm && selectedFirm?.email) {
      if (selectedFirm?.email === value) {
        return;
      }
    }

    await post(checkFirmEmail, { email: value })
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

  const handleAdminEmailOnBlur = async (value) => {
    if (!value) {
      return;
    }

    if (!isValidEmail(value)) {
      setError("adminemail", {
        type: "manual",
        message: "Please enter a valid email address.",
      });
      return;
    }

    if (selectedFirm && selectedFirm?.admin?.email) {
      if (selectedFirm?.admin?.email === value) {
        return;
      }
    }
    await post(checkAdminEmail, { email: value })
      .then((result) => {
        clearErrors("adminemail", null);
      })
      .catch((err) => {
        setError("adminemail", {
          type: "manual",
          message: err?.response?.data?.message || err?.message,
        });
        handleError(err);
      });
  };

  const onSubmit = async (data) => {
    if (selectedFirm) {
      setIsLoading(true);
      await put(`${updateFirm}${firmId}`, data)
        .then((result) => {
          if (result.success) {
            dispatch(addAndUpdateFirm(result?.firm));
            toast.success(result?.message);
            navigate(-1, { replace: true });
          }
          reset();
        })
        .catch((err) => {
          handleError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(true);
      await post(createFirm, data)
        .then((result) => {
          if (result?.success) {
            dispatch(addAndUpdateFirm(result?.firm));
            navigate(-1, { replace: true });
            toast.success(result?.message);
          }
        })
        .catch((err) => {
          handleError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
      reset();
    }
  };

  const handleFileChange = async (event, setter) => {
    const selectedFile = event.target?.files[0];
    if (setter === "firm_logo") {
      setFirmLogoLoading(true);
    } else if (setter === "profile") {
      setProfileLoading(true);
    }
    await uploadFile(selectedFile)
      .then((result) => {
        setValue(setter, result?.data?.image);
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        if (setter === "firm_logo") {
          setFirmLogoLoading(false);
        } else if (setter === "profile") {
          setProfileLoading(false);
        }
      });
    return selectedFile ? event.target?.files : null;
  };

  useEffect(() => {
    if (selectedFirm) {
      setValue("name", selectedFirm?.name);
      setValue("email", selectedFirm?.email);
      setValue("address", selectedFirm?.address);
      setValue("firm_logo", selectedFirm?.firm_logo);
      setValue("profile", selectedFirm?.admin?.profile);
      setValue("phone", selectedFirm?.phone);
      setValue("registration", selectedFirm?.registration);
      setValue("package", selectedFirm?.package?._id);
      setValue("adminfname", selectedFirm?.admin?.fname);
      setValue("adminlname", selectedFirm?.admin?.lname);
      setValue("adminemail", selectedFirm?.admin?.email);
      setValue("status", selectedFirm?.status);
    }
  }, [selectedFirm]);

  const getAllPackages = debounce(async () => {
    await get(getPackages)
      .then((result) => {
        if (result.success) {
          dispatch(setPackages(result?.packages));
        }
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setIsPackagesLoading(false);
      });
  }, 300);

  useEffect(() => {
    getAllPackages();
  }, []);

  const getAllCompanies = debounce(async () => {
    await post(`${getCompanies}/${currentPage}`)
      .then((result) => {
        if (result?.success) {
          dispatch(setAllFirms(result?.users));
        }
      })
      .catch((err) => {
      });
  }, 300);

  useEffect(() => {
    if (firmId) {
      if (allFirmData.length === 0) {
        getAllCompanies();
      }
    }
  }, []);

  return (
    <>
      <main className="poppins_regular add-firm text-sm lg:container p-[0.5rem] md:p-4 mx-auto">
        <Container
          fluid
          className=" px-2 px-md-5 py-4 bg_white my-3 border rounded-lg border-white w-full"
        >
          <h4 className="poppins_medium mb-4" style={{ color: "#151D48" }}>
            {selectedFirm ? "Update Firm" : "Add Firm"}
          </h4>
          <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="d-flex flex-column gap-2 w-100"
          >
            <div className="d-flex w-100 gap-x-5 flex-wrap flex-md-nowrap md:items-center justify-between">
              <FileUpload
                label="Logo Of Firm"
                control={control}
                name="firm_logo"
                imageUrl={firm_logo}
                fileLoading={firmLogoLoading}
                handleFileChange={(e) => handleFileChange(e, "firm_logo")}
                error={errors.firm_logo}
              />

              <div className="w-100 mb-3">
                <Label className="form-label" for="name">
                  Name of Firm
                </Label>
                <Controller
                  id="name"
                  name="name"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Name"
                      invalid={errors.name && true}
                    />
                  )}
                />
                {errors.name && (
                  <FormFeedback>{errors.name.message}</FormFeedback>
                )}
              </div>
            </div>
            <div className="d-flex w-100 gap-x-5 flex-wrap flex-md-nowrap align-items-center justify-between">
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
                      disabled = {selectedFirm && true}
                      {...field}
                      placeholder="Enter Email"
                      invalid={errors.email && true}
                      onBlur={(e) => {
                        field.onChange(e);
                        handleFirmEmailOnBlur(e.target.value);
                      }}
                    />
                  )}
                />
                {errors.email && (
                  <FormFeedback>{errors.email.message}</FormFeedback>
                )}
              </div>
              <div className="w-100 mb-3">
                <Label className="form-label" for="phone">
                  Phone Number
                </Label>
                <div className="phoneNumber">
                  <Controller
                    id="phone"
                    name="phone"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <PhoneInput
                        {...field}
                        country={"us"} // Set default country
                        onBlur={(e) => {
                          field.onChange(e);
                          handleFirmPhoneOnBlur(e.target.value);
                        }}
                        inputClass={`form-control ${
                          errors.phone ? "is-invalid" : ""
                        }`}
                        disableDropdown={false} // Example prop to control dropdown
                        placeholder="Enter phone number"
                      />
                    )}
                  />
                  {errors.phone && (
                    <FormFeedback>{errors.phone.message}</FormFeedback>
                  )}
                </div>
              </div>
            </div>
            <div className="d-flex w-100 gap-x-5 flex-wrap flex-md-nowrap align-items-center justify-between">
              <div className="w-100 mb-3">
                <Label className="form-label" for="address">
                  Address
                </Label>
                <Controller
                  id="address"
                  name="address"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Address"
                      invalid={errors.address && true}
                    />
                  )}
                />
                {errors.address && (
                  <FormFeedback>{errors.address.message}</FormFeedback>
                )}
              </div>
              <div className="w-100 mb-3">
                <Label className="form-label" for="registration">
                  Firm Registration
                </Label>
                <Controller
                  id="registration"
                  name="registration"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Registration"
                      invalid={errors.registration && true}
                    />
                  )}
                />
                {errors.registration && (
                  <FormFeedback>{errors.registration.message}</FormFeedback>
                )}
              </div>
            </div>

            <div
              className={`d-flex 
              w-100 
               gap-x-5 flex-wrap flex-md-nowrap align-items-center justify-between`}
            >
              <div
                className={`${
                  selectedFirm ? "w-100 mb-3" : "w-full md:w-[49%]"
                }`}
              >
                <Label className="form-label" for="package">
                  Assign Packages
                </Label>
                <Controller
                  id="package"
                  name="package"
                  control={control}
                  render={({ field }) => (
                    <Input
                      className="text-sm"
                      type="select"
                      {...field}
                      invalid={errors.package && true}
                    >
                      <option className="text-sm" value="">
                        Select Package
                      </option>
                      {packages.map((packageItem) => {
                        return (
                          <option
                            className="text-sm"
                            value={packageItem?._id}
                            key={packageItem?._id}
                          >
                            {packageItem?.name}
                          </option>
                        );
                      })}
                    </Input>
                  )}
                />
                {errors.package && (
                  <FormFeedback>{errors.package.message}</FormFeedback>
                )}
              </div>
              {/* {selectedFirm && (
                <div
                  className={`${
                    selectedFirm ? "w-100 mb-3" : "w-full md:w-[97.5%]"
                  }`}
                >
                  <Label className="form-label" for="status">
                    Status
                  </Label>
                  <Controller
                    id="status"
                    name="status"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="text-sm"
                        type="select"
                        {...field}
                        invalid={errors.status && true}
                      >
                        <option className="text-sm" value="">
                          Select Status
                        </option>
                        <option className="text-sm" value="online">
                          Online
                        </option>
                        <option className="text-sm" value="inactive">
                          Inactivate
                        </option>
                        <option className="text-sm" value="deactivated">
                          Deactivated
                        </option>
                        <option className="text-sm" value="deleted">
                          Deleted
                        </option>
                      </Input>
                    )}
                  />
                  {errors.status && (
                    <FormFeedback>{errors.status.message}</FormFeedback>
                  )}
                </div>
              )} */}
            </div>
          </Form>
        </Container>
        <Container
          fluid
          className="px-2 px-md-5 py-4 bg_white my-3 border rounded-lg border-white w-full"
        >
          <h4 className="poppins_medium mb-4" style={{ color: "#151D48" }}>
            {selectedFirm ? "Updated Admin" : "Add Admin"}
          </h4>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="d-flex flex-column gap-2 w-100"
          >
            <div className="d-flex w-100 gap-x-5 flex-wrap flex-md-nowrap md:items-center justify-between">
              <FileUpload
                label="Profile Image"
                control={control}
                name="profile"
                imageUrl={profile}
                fileLoading={profileLoading}
                handleFileChange={(e) => handleFileChange(e, "profile")}
                error={errors.profile}
              />
              {/* Submit button */}
              <div className="w-100 mb-3">
                <Label className="form-label" for="adminfname">
                  First Name
                </Label>
                <Controller
                  id="adminfname"
                  name="adminfname"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter First Name"
                      invalid={errors.adminfname && true}
                    />
                  )}
                />
                {errors.adminfname && (
                  <FormFeedback>{errors.adminfname.message}</FormFeedback>
                )}
              </div>
            </div>

            <div className="d-flex w-100 gap-x-5 flex-wrap flex-md-nowrap align-items-center justify-between">
              <div className="w-100 mb-3">
                <Label className="form-label" for="adminlname">
                  Last Name
                </Label>
                <Controller
                  id="adminlname"
                  name="adminlname"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Last Name"
                      invalid={errors.adminlname && true}
                    />
                  )}
                />
                {errors.adminlname && (
                  <FormFeedback>{errors.adminlname.message}</FormFeedback>
                )}
              </div>
              <div className="w-100 mb-3">
                <Label className="form-label" for="adminemail">
                  Email
                </Label>
                <Controller
                  id="adminemail"
                  name="adminemail"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Email"
                      invalid={errors.adminemail && true}
                      onBlur={(e) => {
                        field.onChange(e);
                        handleAdminEmailOnBlur(e.target.value);
                      }}
                    />
                  )}
                />
                {errors.adminemail && (
                  <FormFeedback>{errors.adminemail.message}</FormFeedback>
                )}
              </div>
            </div>

            {selectedFirm && !togglePassword ? (
              <div className="flex justify-start items-center w-full">
                <button
                  className="w-full md:w-[49%] bg_primary text_white py-[0.5rem] px-[5rem] rounded-md"
                  onClick={() => setTogglePassword((prev) => !prev)}
                >
                  Change Password
                </button>
              </div>
            ) : (
              <div className="d-flex w-100 gap-x-5 flex-wrap flex-md-nowrap align-items-center justify-between">
                <div className="w-full md:w-[49%] mb-3 position-relative">
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
            )}

            <div className="ml-auto">
              <Button
                type="submit"
                disabled={isLoading}
                className={`mt-2 text-center bg_primary border-0 text-[poppins_regular] md:w-[14rem] md:h-[3.3rem] hover_primary_color ${
                  isLoading ? "cursor-default" : "cursor-pointer"
                }`}
              >
                {isLoading ? (
                  <HashLoader  className="mx-auto"   color="#fff" size={16} />
                ) : selectedFirm ? (
                  "Update"
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </Form>
        </Container>
      </main>
    </>
  );
};
export default AddFirm;
