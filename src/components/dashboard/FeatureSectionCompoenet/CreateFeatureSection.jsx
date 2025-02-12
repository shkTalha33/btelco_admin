/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import {
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
} from "reactstrap";
import * as Yup from "yup";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import FileUpload from "../FileUpload";
import HashLoader from "react-spinners/HashLoader";

const CreateFeatureSection = () => {
  const [featureImageUrl, setFeatureImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [featureLoading, setFeatureLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  const [addSection, setAddSection] = useState(1);

  const onError = (errors) => {
    // console.error("Validation Errors:", errors);
  };

  const handleFileChange = async (event, setter) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      setFeatureLoading(true);
      setter(URL.createObjectURL(selectedFile)); // Use the setter for the specific image
      setFeatureLoading(false);
    }
    return selectedFile ? event.target.files : null;
  };

  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    heading: Yup.string().required("Heading is required"),
    description: Yup.string().required("Description is required"),
    features: Yup.string().required("Features is required"),
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

  const addNewSection = () => {
    setAddSection((prev) => prev + 1)
  };


  return (
    <>
        <Container fluid className=" py-4 bg_white my-3 border rounded-lg border-white w-full">
          <h4 className="poppins_medium mb-4" style={{ color: "#151D48" }}>
            Create Feature Sections
          </h4>
          {Array.from({ length: addSection }, (_, index) => (
          <Form
          key={index}
            onSubmit={handleSubmit(onSubmit, onError)}
            className="d-flex flex-column gap-2 mb-20 w-100"
          >
            <div className="d-flex w-100 gap-x-5 flex-wrap flex-md-nowrap md:items-start justify-between">
              <div className="flex flex-col w-[100%]">
                <FileUpload
                  label="Image"
                  control={control}
                  name="featureImage"
                  imageUrl={featureImageUrl}
                  setImageUrl={setFeatureImageUrl}
                  fileLoading={featureLoading}
                  handleFileChange={handleFileChange}
                  error={errors.image}
                />
                <div className="w-100 mb-3">
                  <Label className="form-label" for="title">
                    Title
                  </Label>
                  <Controller
                    id="title"
                    name="title"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter Title"
                        invalid={errors.title && true}
                      />
                    )}
                  />
                  {errors.title && (
                    <FormFeedback>{errors.title.message}</FormFeedback>
                  )}
                </div>
              </div>
              <div className="w-100 mb-3">
                <Label className="form-label" for="description">
                  Description
                </Label>
                <Controller
                  id="description"
                  name="description"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="textarea"
                      style={{ height: "200px" }}
                      {...field}
                      placeholder="Enter Description"
                      invalid={errors.description && true}
                    />
                  )}
                />
                {errors.description && (
                  <FormFeedback>{errors.description.message}</FormFeedback>
                )}
              </div>
            </div>
            <div className="d-flex w-100 gap-x-5 flex-wrap flex-md-nowrap align-items-center justify-between">
              <div className="w-100 mb-3">
                <Label className="form-label" for="heading">
                  Heading
                </Label>
                <Controller
                  id="heading"
                  name="heading"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Heading"
                      invalid={errors.heading && true}
                    />
                  )}
                />
                {errors.heading && (
                  <FormFeedback>{errors.heading.message}</FormFeedback>
                )}
              </div>
              <div className="w-100 mb-3">
                <Label className="form-label" for="features">
                  Features
                </Label>
                <Controller
                  id="features"
                  name="features"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Features"
                      invalid={errors.features && true}
                    />
                  )}
                />
                {errors.features && (
                  <FormFeedback>{errors.features.message}</FormFeedback>
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
                onClick={()=>setCurrentSection(index)}
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
          ))}
          <Button onClick={addNewSection}>Add</Button>
        </Container>
    </>
  );
};
export default CreateFeatureSection;
