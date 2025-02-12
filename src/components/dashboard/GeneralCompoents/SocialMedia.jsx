/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import { Container, Form, FormFeedback, Input, Label } from "reactstrap";
import * as Yup from "yup";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import HashLoader from "react-spinners/HashLoader";

const SocialMediaLinkSetting = () => {
  const onError = (errors) => {
    // console.error("Validation Errors:", errors);
  };

  const [isLoading, setIsLoading] = useState(false);

  const schema = Yup.object().shape({
    facebook: Yup.string().required("Facebook Link is required"),
    instagram: Yup.string().required("Instagram link is required"),
    linkedin: Yup.string().required("Linkedin Link is required"),
    twitter: Yup.string().required("twitter Link  is required"),
    fields: Yup.array().of(
      Yup.object().shape({
        value: Yup.string().required("This field is required"),
      })
    ),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  });

  const onSubmit = (data) => {
  };

  return (
    <>
      <Container fluid className=" py-4 bg_white my-3 border rounded-lg border-white w-full">
          <h4 className="poppins_medium mb-4 text-lg md:text-2xl" style={{ color: "#151D48" }}>
            Socail Media Links Setting
          </h4>
      <Form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="d-flex flex-column gap-2 w-100"
      >
        <div className="d-flex w-100 gap-x-5 flex-wrap flex-md-nowrap align-items-center justify-between">
          <div className="w-100 mb-3">
            <Label className="form-label" for="facebook">
              Facebook
            </Label>
            <Controller
              id="facebook"
              name="facebook"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter Facebook Link"
                  invalid={errors.facebook && true}
                />
              )}
            />
            {errors.facebook && (
              <FormFeedback>{errors.facebook.message}</FormFeedback>
            )}
          </div>
          <div className="w-100 mb-3">
            <Label className="form-label" for="instagram">
              Instagram
            </Label>
            <Controller
              id="instagram"
              name="instagram"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter instagram Link"
                  invalid={errors.instagram && true}
                />
              )}
            />
            {errors.instagram && (
              <FormFeedback>{errors.instagram.message}</FormFeedback>
            )}
          </div>
        </div>
        <div className="d-flex w-100 gap-x-5 flex-wrap flex-md-nowrap align-items-center justify-between">
          <div className="w-100 mb-3">
            <Label className="form-label" for="linkedin">
              Linkedin
            </Label>
            <Controller
              id="linkedin"
              name="linkedin"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter Linkedin Link "
                  invalid={errors.linkedin && true}
                />
              )}
            />
            {errors.linkedin && (
              <FormFeedback>{errors.linkedin.message}</FormFeedback>
            )}
          </div>
          <div className="w-100 mb-3">
            <Label className="form-label" for="twitter">
              Twitter Link
            </Label>
            <Controller
              id="twitter"
              name="twitter"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter Twitter Link"
                  invalid={errors.twitter && true}
                />
              )}
            />
            {errors.twitter && (
              <FormFeedback>{errors.twitter.message}</FormFeedback>
            )}
          </div>
        </div>

        <div className="d-flex w-100 gap-x-5 flex-wrap flex-md-nowrap align-items-center justify-between">
          <div className="w-100 mb-3">
            {fields.map((field, index) => (
              <div
                key={field.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <Controller
                  name={`fields.${index}.value`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Text Here"
                      invalid={!!errors.fields?.[index]?.value}
                    />
                  )}
                />
                {errors.fields?.[index]?.value && (
                  <FormFeedback>
                    {errors.fields[index].value.message}
                  </FormFeedback>
                )}
                <Button
                  type="text"
                  onClick={() => remove(index)}
                  icon={<DeleteOutlined />}
                  danger
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ value: "" })}
              className="w-full h-10 flex justify-center items-center bg_white border-1 text-black"
            >
              <span className="bg_primary w-6 flex justify-center items-center h-6 rounded-full p-2">
                <PlusOutlined className="text_white" />
              </span>
              <span className="ml-2">Add Custom Field</span>
            </button>
          </div>

          {/* Submit Button */}
          <div className="w-100 mb-3">
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 rounded-lg text-center bg_primary text-white border-0 text-[poppins_regular] w-[14rem] h-[3.3rem]"
            >
              {isLoading ? <HashLoader  className="mx-auto"   color="#fff" size={18} /> : "Save"}
            </button>
          </div>
        </div>

        <div></div>
      </Form>
      </Container>
    </>
  );
};
export default SocialMediaLinkSetting;
