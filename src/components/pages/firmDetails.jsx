import { useSelector } from "react-redux";
import { Button, Divider } from "antd";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Container, Form, Input, Label } from "reactstrap";

export default function FirmDetails() {
  const [firmImageURL, setFirmImageURL] = useState("");
  const [profileImageURL, setProfileImageURL] = useState(""); // New state for profile image
  const details = useSelector((state) => state.firmAndCompanyDetail.details);

  const {
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firmImage: "",
      firmName: "", // These will be overwritten by reset
      firmPhone: "",
      firmEmail: "",
      firmAddress: "",
      firmRegistration: "",
      firmCategory: "",
      profileImage: "",
      firstname: "",
      lastname: "",
      address: "",
      contact: "",
      email: "",
    },
  });

  useEffect(() => {
    reset({
      firmImage: details.firmImage,
      firmName: details.firmName,
      firmPhone: details.firmPhone,
      firmEmail: details.firmEmail,
      firmAddress: details.firmAddress,
      firmRegistration: details.firmRegistration,
      firmPackage: details.firmPackage,
      profileImage: details.profileImage,
      firstname: details.firstname,
      lastname: details.lastname,
      address: details.address,
      contact: details.contact,
      email: details.email,
    });

    // Handle the firm image
    if (details.firmImage && details.firmImage.length > 0) {
      const file = details.firmImage;
      setFirmImageURL(file);
    } else {
      setFirmImageURL("");
    }

    // Handle the profile image
    if (details.profileImage && details.profileImage.length > 0) {
      const file = details.profileImage;
      setProfileImageURL(file);
    } else {
      setProfileImageURL("");
    }

    return () => {
      if (firmImageURL) {
        URL.revokeObjectURL(firmImageURL);
      }
      if (profileImageURL) {
        URL.revokeObjectURL(profileImageURL);
      }
    };
  }, [details, reset]);

  return (
    <>
      <main className="min-h-screen inter_regular add-firm text-sm lg:container p-2 p-md-4 mx-auto">
        <Container className="px-4 md:px-5 py-4 bg_white my-3 border rounded-lg border-white w-full">
          <div className="flex justify-between items-center">
            <div className="">
              <h4 className="text_darkprimary text-[16px] xs:text-xl lg:text-xl inter_medium">
                Good morning, Jake
              </h4>
              <p className="text-[#7C8493] text-xs md:text-sm ">
                Here is the firm information
              </p>
            </div>
            <button className="px-3 xs:px-4 py-2 text-xs xs:text-sm bg_dark text_white rounded-md">
              Edit
            </button>
          </div>
        </Container>
        <Container className="firm-detail inter_regular px-4 md:px-5 py-4 bg_white my-3 border rounded-lg border-white w-full">
          <div className="w-full  md:flex ">
            <div className="w-full md:w-[40%]">
              <h4 className="text-[#202430] inter_medium">Firm Information</h4>
              <p className="text-[#5E6675] text-sm ">
                This is the information of the client
              </p>
            </div>
            <Form className="w-full md:w-[60%] ">
              <div className="flex items-center py-3 md:w-[80%] lg:w-[60%] ml-auto mb-3 px-3  rounded-lg text-sm bg-[#F2F2F2]">
                <Label
                  className="form-label text-sm mr-3 inter_medium"
                  for="firmImage"
                >
                  Image
                </Label>
                <Controller
                  id="firmImage"
                  name="firmImage"
                  control={control}
                  render={({ field }) => (
                    <>
                      {firmImageURL ? (
                        <img
                          src={firmImageURL}
                          alt="Firm Image"
                          className="rounded-full "
                          style={{ width: '50px', height: '50px' }} // Adjust your image styles as necessary
                        />
                      ) : (
                        <p>No image uploaded</p>
                      )}
                    </>
                  )}
                />

              </div>
              <div className="flex items-center md:w-[80%] lg:w-[60%] ml-auto mb-3 px-3 py-1 rounded-lg text-sm bg-[#F2F2F2]">
                <Label
                  className="form-label text-sm inter_medium"
                  for="firmName"
                >
                  Name
                </Label>
                <Controller
                  id="firmName"
                  name="firmName"
                  defaultValue
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Name"
                      invalid={errors.firmName && true}
                    />
                  )}
                />
              </div>
              <div className="flex items-center md:w-[80%] lg:w-[60%] ml-auto mb-3 px-3 py-1 rounded-lg text-sm bg-[#F2F2F2]">
                <Label
                  className="form-label text-sm inter_medium"
                  for="firmEmail"
                >
                  Email
                </Label>
                <Controller
                  id="firmEmail"
                  name="firmEmail"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Email"
                      invalid={errors.firmEmail && true}
                    />
                  )}
                />
              </div>
              <div className="flex items-center md:w-[80%] lg:w-[60%] ml-auto mb-3 px-3 py-1 rounded-lg text-sm bg-[#F2F2F2]">
                <Label
                  className="form-label text-sm inter_medium"
                  for="firmPhone"
                >
                  Phone
                </Label>
                <Controller
                  id="firmPhone"
                  name="firmPhone"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Phone"
                      invalid={errors.firmPhone && true}
                    />
                  )}
                />
              </div>
              <div className="flex items-center md:w-[80%] lg:w-[60%] ml-auto mb-3 px-3 py-1 rounded-lg text-sm bg-[#F2F2F2]">
                <Label
                  className="form-label text-sm inter_medium"
                  for="firmAddress"
                >
                  Address
                </Label>
                <Controller
                  id="firmAddress"
                  name="firmAddress"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Address"
                      invalid={errors.firmAddress && true}
                    />
                  )}
                />
              </div>
              <div className="flex items-center md:w-[80%] lg:w-[60%] ml-auto mb-3 px-3 py-1 rounded-lg text-sm bg-[#F2F2F2]">
                <Label
                  className="form-label text-sm inter_medium"
                  for="firmRegistration"
                >
                  Reg. No
                </Label>
                <Controller
                  id="firmRegistration"
                  name="firmRegistration"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Reg. No"
                      invalid={errors.firmRegistration && true}
                    />
                  )}
                />
              </div>
              <div className="flex items-center md:w-[80%] lg:w-[60%] ml-auto mb-3 px-3 py-1 rounded-lg text-sm bg-[#F2F2F2]">
                <Label
                  className="form-label text-sm inter_medium"
                  for="firmPackage"
                >
                  Package
                </Label>
                <Controller
                  id="firmPackage"
                  name="firmPackage"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Package"
                      invalid={errors.firmPackage && true}
                    />
                  )}
                />
              </div>
            </Form>
          </div>
          <Divider />
          <div className="w-full md:flex mt-5">
            <div className="w-full my-4 md:w-[40%]">
              <h4 className="text-[#202430] inter_medium">Admin Info</h4>
              <p className="text-[#5E6675] text-sm ">
                This is the information of the client
              </p>
            </div>
            <Form className="w-full md:w-[60%] ">
              <div className="flex items-center md:w-[80%] lg:w-[60%] ml-auto mb-3 px-3 py-3 rounded-lg text-sm bg-[#F2F2F2]">
                <Label
                  className="form-label mr-3 text-sm inter_medium"
                  for="profileImage"
                >
                  Image
                </Label>
                <Controller
                  id="profileImage"
                  name="profileImage"
                  control={control}
                  render={({ field }) => (
                    <>
                      {profileImageURL ? (
                        <img
                          src={profileImageURL}
                          alt="Profile Image"
                          className="rounded-full ml-3 my-2"
                          style={{ width: '50px', height: '50px' }} // Adjust your image styles as necessary
                        />
                      ) : (
                        <p>No image uploaded</p>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="flex items-center md:w-[80%] lg:w-[60%] ml-auto mb-3 px-3 py-1 rounded-lg text-sm bg-[#F2F2F2]">
                <Label
                  className="form-label text-sm inter_medium"
                  for="firstname"
                >
                  First Name
                </Label>
                <Controller
                  id="firstname"
                  name="firstname"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter First Name"
                      invalid={errors.firstname && true}
                    />
                  )}
                />
              </div>
              <div className="flex items-center md:w-[80%] lg:w-[60%] ml-auto mb-3 px-3 py-1 rounded-lg text-sm bg-[#F2F2F2]">
                <Label
                  className="form-label text-sm inter_medium"
                  for="lastname"
                >
                  Last Name
                </Label>
                <Controller
                  id="lastname"
                  name="lastname"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Last Name"
                      invalid={errors.lastname && true}
                    />
                  )}
                />
              </div>
              <div className="flex items-center md:w-[80%] lg:w-[60%] ml-auto mb-3 px-3 py-1 rounded-lg text-sm bg-[#F2F2F2]">
                <Label className="form-label text-sm inter_medium" for="email">
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
                    />
                  )}
                />
              </div>
              <div className="flex items-center md:w-[80%] lg:w-[60%] ml-auto mb-3 px-3 py-1 rounded-lg text-sm bg-[#F2F2F2]">
                <Label
                  className="form-label text-sm inter_medium"
                  for="contact"
                >
                  Contact
                </Label>
                <Controller
                  id="contact"
                  name="contact"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Contact"
                      invalid={errors.contact && true}
                    />
                  )}
                />
              </div>
              <div className="flex items-center md:w-[80%] lg:w-[60%] ml-auto mb-3 px-3 py-1 rounded-lg text-sm bg-[#F2F2F2]">
                <Label
                  className="form-label text-sm inter_medium"
                  for="address"
                >
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
              </div>

              <div className="text-end">
                <Button
                  type="submit"
                  className="mt-2 text-center ml-auto text_white bg_primary border-0 text-[inter_medium] w-[7rem] md:w-[10rem] lg:w-[12rem] h-[2.7rem] md:h-[3rem] lg:h-[3.3rem]"
                >
                  Save
                </Button>
              </div>
            </Form>
          </div>
        </Container>
      </main>
    </>
  );
}
