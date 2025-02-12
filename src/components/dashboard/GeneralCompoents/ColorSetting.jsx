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

const ColorSetting = () => {
  const onError = (errors) => {
    // console.error("Validation Errors:", errors);
  };

  const [isLoading, setIsLoading] = useState(false);

  const schema = Yup.object().shape({
    primary: Yup.string().required("Primary is required"),
    secondary: Yup.string().required("Secondary is required"),
    secondary2: Yup.string().required("Secondary2 is required"),
    primaryBg: Yup.string().required("Primary Background is required"),
    secondaryText: Yup.string().required("Secondary Text is required"),
    primaryText: Yup.string().required("Primary Text is required"),
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
        <main className="poppins_regular add-firm text-sm lg:container  mx-auto">
      <Container fluid className=" py-4 bg_white my-3 border rounded-lg border-white w-full">
          <h4 className="poppins_medium mb-4 text-lg md:text-2xl" style={{ color: "#151D48" }}>
            Color Setting
          </h4>
      <Form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="d-flex flex-column gap-2 w-100"
      >
        <div className="d-flex w-100 gap-x-5 flex-wrap flex-md-nowrap align-items-center justify-between">
          <div className="w-100 mb-3">
            <Label className="form-label" for="primary">
              Primary Color
            </Label>
            <Controller
              id="primary"
              name="primary"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter Primary"
                  invalid={errors.primary && true}
                />
              )}
            />
            {errors.primary && (
              <FormFeedback>{errors.primary.message}</FormFeedback>
            )}
          </div>
          <div className="w-100 mb-3">
            <Label className="form-label" for="secondary">
              Secondary Color
            </Label>
            <Controller
              id="secondary"
              name="secondary"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter Secondary"
                  invalid={errors.secondary && true}
                />
              )}
            />
            {errors.secondary && (
              <FormFeedback>{errors.secondary.message}</FormFeedback>
            )}
          </div>
        </div>
        <div className="d-flex w-100 gap-x-5 flex-wrap flex-md-nowrap align-items-center justify-between">
          <div className="w-100 mb-3">
            <Label className="form-label" for="secondary2">
              Secondary Color 2
            </Label>
            <Controller
              id="secondary2"
              name="secondary2"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter Secondary Color 2"
                  invalid={errors.secondary2 && true}
                />
              )}
            />
            {errors.secondary2 && (
              <FormFeedback>{errors.secondary2.message}</FormFeedback>
            )}
          </div>
          <div className="w-100 mb-3">
            <Label className="form-label" for="primaryBg">
              Primary Background
            </Label>
            <Controller
              id="primaryBg"
              name="primaryBg"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter primaryBg"
                  invalid={errors.primaryBg && true}
                />
              )}
            />
            {errors.primaryBg && (
              <FormFeedback>{errors.primaryBg.message}</FormFeedback>
            )}
          </div>
        </div>
        <div className="d-flex w-100 gap-x-5 flex-wrap flex-md-nowrap align-items-center justify-between">
          <div className="w-100 mb-3">
            <Label className="form-label" for="secondaryText">
              Text Secondary Color
            </Label>
            <Controller
              id="secondaryText"
              name="secondaryText"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter Text Secondary Color "
                  invalid={errors.secondaryText && true}
                />
              )}
            />
            {errors.secondaryText && (
              <FormFeedback>{errors.secondaryText.message}</FormFeedback>
            )}
          </div>
          <div className="w-100 mb-3">
            <Label className="form-label" for="primaryText">
              Text Primary Color
            </Label>
            <Controller
              id="primaryText"
              name="primaryText"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter Text Primary Color "
                  invalid={errors.primaryText && true}
                />
              )}
            />
            {errors.primaryText && (
              <FormFeedback>{errors.primaryText.message}</FormFeedback>
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
              {isLoading ? <HashLoader  className="mx-auto"   color="#fff" size={16} /> : "Save"}
            </button>
          </div>
        </div>

        <div></div>
      </Form>
      </Container>
      </main>
    </>
  );
};
export default ColorSetting;
