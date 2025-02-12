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
import FileUpload from "../FileUpload";
import HashLoader from "react-spinners/HashLoader";

const HeroSetting = () => {

    const [heroImageUrl, setHeroImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [heroLoading, setHeroLoading] = useState(false);

  const onError = (errors) => {
    // console.error("Validation Errors:", errors);
  };

  const handleFileChange = async (event, setter) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      setHeroLoading(true);
      setter(URL.createObjectURL(selectedFile)); // Use the setter for the specific image
      setHeroLoading(false);
    }
    return selectedFile ? event.target.files : null;
  };



  const schema = Yup.object().shape({
    hero: Yup.string().required("Hero Title is required"),
    hero2: Yup.string().required("Hero2 Title is required"),
    tag: Yup.string().required("Tag Line is required"),
    image: Yup.string().required("An image is required"),
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
            Hero Section Setting
          </h4>
      <Form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="d-flex flex-column gap-2 w-100"
      >
        <div className="d-flex w-100 gap-x-5 flex-wrap flex-md-nowrap md:items-center justify-between">
            <FileUpload
            label="Hero Image"
            control={control}
            name="image"
            imageUrl={heroImageUrl}
            setImageUrl={setHeroImageUrl}
            fileLoading={heroLoading}
            handleFileChange={handleFileChange}
            error={errors.image}
          />

              <div className="w-100 mb-3">
                <Label className="form-label" for="hero">
                 Hero Title
                </Label>
                <Controller
                  id="hero"
                  name="hero"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Hero Title"
                      invalid={errors.hero && true}
                    />
                  )}
                />
                {errors.hero && (
                  <FormFeedback>{errors.hero.message}</FormFeedback>
                )}
              </div>
            </div>
        <div className="d-flex w-100 gap-x-5 flex-wrap flex-md-nowrap align-items-center justify-between">
          <div className="w-100 mb-3">
            <Label className="form-label" for="hero2">
              Hero Title 2
            </Label>
            <Controller
              id="hero2"
              name="hero2"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter Hero Title"
                  invalid={errors.hero2 && true}
                />
              )}
            />
            {errors.hero2 && (
              <FormFeedback>{errors.hero2.message}</FormFeedback>
            )}
          </div>
          <div className="w-100 mb-3">
            <Label className="form-label" for="tag">
              Tag
            </Label>
            <Controller
              id="tag"
              name="tag"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter Tag"
                  invalid={errors.tag && true}
                />
              )}
            />
            {errors.tag && (
              <FormFeedback>{errors.tag.message}</FormFeedback>
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
    </>
  );
};
export default HeroSetting;
