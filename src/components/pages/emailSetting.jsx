/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";
import * as Yup from "yup";
import ApiFunction from "../api/apiFuntions";
import { emailConfigureCreate } from "../api/ApiRoutesFile";
import toast from "react-hot-toast";
import { handleError } from "../api/errorHandler";
import VerifyEmail from "../common/verifyEmail";
import ButtonComponent from "../common/ButtonComponent";

export default function EmailSetting() {
  const navigate = useNavigate();

  const onError = (errors) => {
    // console.error("Validation Errors:", errors);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [currentMailer, setCurrentMailer] = useState("");
  const { post } = ApiFunction();

  const schema = Yup.object().shape({
    mailer: Yup.string().required("Mailer is required"),
    host:
      currentMailer !== "gmail" && Yup.string().required("Host is required"),
    port:
      currentMailer !== "gmail" && Yup.string().required("Port is required"),
    auth_user: Yup.string()
      .required("Email is required")
      .email("Email is invalid"),
    auth_pass: Yup.string()
      .min(8, "Password must be atleast 8 charcters")
      .required("Password is required"),
    secure:
      currentMailer !== "gmail" &&
      Yup.boolean().required("Encryption is required"),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    let { verifyemail, ...emailConfigData } = data;
    if (currentMailer === "gmail") {
      const { mailer, auth_user, auth_pass } = data;
      emailConfigData = { mailer, auth_user, auth_pass };
    }
    setIsLoading(true);
    await post(emailConfigureCreate, emailConfigData)
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
        }
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setIsLoading(false);
        reset();
      });
  };

  const handleMailer = (e) => {
    setCurrentMailer(e.target.value);
  };

  return (
    <>
      <main className="min-h-screen poppins_regular add-firm text-sm lg:container p-2 p-md-4 mx-auto">
        <Container
          fluid
          className="px-4 md:px-5 py-4 bg_white my-3 border rounded-lg border-white w-full"
        >
          <h4
            className="poppins_medium mb-4 text_darkprimary"
            style={{ color: "#151D48" }}
          >
            Email Configuration
          </h4>
          <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="d-flex flex-column gap-2 w-100"
          >
            <Row className="items-center justify-between">
              <Col md="6" className="mb-3">
                <Label className="form-label" for="mailer">
                  Mailer
                </Label>
                <Controller
                  id="mailer"
                  name="mailer"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      onClick={(e) => {
                        handleMailer(e);
                      }}
                      {...field}
                      type="select"
                      invalid={errors.mailer && true}
                    >
                      <option value="">Select Mailer</option>
                      <option value="gmail">Gmail</option>
                      <option value="outlook">Outlook</option>
                    </Input>
                  )}
                />
                {errors.mailer && (
                  <FormFeedback>{errors.mailer.message}</FormFeedback>
                )}
              </Col>
              <Col md="6" className="mb-3">
                <Label className="form-label" for="auth_user">
                  Email
                </Label>
                <Controller
                  id="auth_user"
                  name="auth_user"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Email"
                      invalid={errors.auth_user && true}
                    />
                  )}
                />
                {errors.auth_user && (
                  <FormFeedback>{errors.auth_user.message}</FormFeedback>
                )}
              </Col>
              <Col md="6" className="mb-3">
                <Label className="form-label" for="auth_pass">
                  Password
                </Label>
                <Controller
                  id="auth_pass"
                  name="auth_pass"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Password"
                      invalid={errors.auth_pass && true}
                    />
                  )}
                />
                {errors.auth_pass && (
                  <FormFeedback>{errors.auth_pass.message}</FormFeedback>
                )}
              </Col>
              {currentMailer !== "gmail" && (
                <>
                  <Col md="6" className="mb-3">
                    <Label className="form-label" for="host">
                      Host
                    </Label>
                    <Controller
                      id="host"
                      name="host"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Enter Host"
                          invalid={errors.host && true}
                        />
                      )}
                    />
                    {errors.host && (
                      <FormFeedback>{errors.host.message}</FormFeedback>
                    )}
                  </Col>
                  <Col md="6" className="mb-3">
                    <Label className="form-label" for="port">
                      Port
                    </Label>
                    <Controller
                      id="port"
                      name="port"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Enter Port"
                          invalid={errors.port && true}
                        />
                      )}
                    />
                    {errors.port && (
                      <FormFeedback>{errors.port.message}</FormFeedback>
                    )}
                  </Col>
                  <Col md="6" className="mb-3">
                    <Label className="form-label" for="secure">
                      Encryption
                    </Label>
                    <Controller
                      id="secure"
                      name="secure"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="select"
                          invalid={errors.secure && true}
                        >
                          <option value="">Select Encryption Type</option>
                          <option value={false}>False</option>
                          <option value={true}>True</option>
                        </Input>
                      )}
                    />
                    {errors.secure && (
                      <FormFeedback>{errors.secure.message}</FormFeedback>
                    )}
                  </Col>
                </>
              )}
            </Row>
            <div className="ml-auto">
              <ButtonComponent loading={isLoading} btnText={"Submit"} />
            </div>
          </Form>
        </Container>
        <VerifyEmail />
      </main>
    </>
  );
}
