import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
} from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ApiFunction from "../api/apiFuntions";
import toast from "react-hot-toast";
import { handleError } from "../api/errorHandler";
import { emailConfigureSend } from "../api/ApiRoutesFile";
import ButtonComponent from "./ButtonComponent";

export default function VerifyEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const { post } = ApiFunction();
  const schema = Yup.object().shape({
    verifyemail: Yup.string()
      .required("Email is required")
      .email("Email is invalid"),
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
    const emailToSend = {
      email: [data.verifyemail],
      subject: "New Subject",
      html: "<h1>Test an Email</h1>",
    };
    setIsLoading(true);
    await post(emailConfigureSend, emailToSend)
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

  return (
    <>
      <Container
        fluid
        className="px-4 md:px-5 py-4 bg_white my-3 border rounded-lg border-white w-full"
      >
        <h4
          className="poppins_medium mb-4 text_darkprimary"
          style={{ color: "#151D48" }}
        >
          Email Configuration Verification
        </h4>
        <p className="text-xs mt-5 text-[#FF0000]">
          Note: An email will be sent to test if your email settings are
          correct.
        </p>
        <p className="text-sm text-[#5E6675]">
          1. Enter the email address in the input box.
        </p>
        <p className="text-sm text-[#5E6675]">2. Click on Verify.</p>
        <p className="text-sm text-[#5E6675]">
          3. Check your inbox. If you have received a test email, then your
          email configuration is correct.
        </p>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className=" w-full mt-5 md:w-[49.2%] gap-x-5 flex-wrap flex-md-nowrap align-items-center justify-between">
            <div className="w-100 mb-3">
              <Label className="form-label" for="verifyemail">
                Email
              </Label>
              <Controller
                id="verifyemail"
                name="verifyemail"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter Email"
                    invalid={errors.verifyemail && true}
                  />
                )}
              />
              {errors.verifyemail && (
                <FormFeedback>{errors.verifyemail.message}</FormFeedback>
              )}
            </div>
            <div className="text-center">
              <ButtonComponent loading={isLoading} btnText={"Verify"} />
            </div>
          </div>
        </Form>
      </Container>
    </>
  );
}
