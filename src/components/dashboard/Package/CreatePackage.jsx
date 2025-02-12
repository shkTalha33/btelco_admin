import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row
} from "reactstrap";
import * as Yup from "yup";
import ApiFunction from "../../api/apiFuntions";
import { createPackage, editPackage } from "../../api/ApiRoutesFile";
import { handleError } from "../../api/errorHandler";
import ButtonComponent from "../../common/ButtonComponent";
import { addAndUpdatePackage } from "../../redux/pricingPackage";

const CreatePackage = ({ rowData = null, setIsModalOpen, allPackages }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [featuresList, setFeaturesList] = useState([]);
  const { post, put } = ApiFunction();
  const dispatch = useDispatch();

  const AVAILABLE_FEATURES = [
    { id: 'lead', label: 'Manage leads and quotes' },
    { id: 'member', label: 'Create and manage members' },
    { id: 'chat', label: 'Chat with team members and clients' },
    { id: 'document', label: 'Upload and manage documents' },
    { id: 'email', label: 'Configure client emails' }
  ];

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    tags: Yup.string().required("Tag Line is required"),
    amount: Yup.string().required("Charges is required"),
    interval: Yup.string().required("Subscription plan is required"),
    features: Yup.array().min(1, "At least one feature is required"),
  });

  const toggleFeature = (feature) => {
    if (featuresList.includes(feature)) {
      setFeaturesList(featuresList.filter(f => f !== feature));
    } else {
      setFeaturesList([...featuresList, feature]);
    }
  };

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (featuresList.length === 0) {
      toast.error("Please select at least one feature.");
      return;
    }

    const sameIntervalCount = allPackages?.filter(
      (pkg) => pkg.interval === data.interval
    ).length;

    if (!rowData && sameIntervalCount >= 3) {
      toast.error(
        `You cannot create more than 3 packages for the ${data.interval} plan.`
      );
      return;
    }

    const apiData = { ...data, features: featuresList };
    const apiEndPoint = rowData ? `${editPackage}${rowData?._id}` : createPackage;
    const method = rowData ? put : post;

    setIsLoading(true);
    try {
      const result = await method(apiEndPoint, apiData);
      dispatch(addAndUpdatePackage(result?.package));
      toast.success(result?.message || "Package is updated successfully!");
      if (rowData) {
        setIsModalOpen(false);
      }
      reset();
      setFeaturesList([]);
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (rowData) {
      setValue("name", rowData?.name);
      setValue("tags", rowData?.tags);
      setValue("amount", rowData?.amount);
      setValue("interval", rowData?.interval);
      setFeaturesList(rowData?.features || []);
    }
  }, [rowData, setValue]);

  return (
    <main
      className={`poppins_regular add-firm text-sm lg:container p-2 mx-auto ${rowData ? "p-4 pt-0 pt-md-3" : "p-md-4"
        } `}
    >
      <Container
        fluid
        className={` ${rowData ? "px-0 " : "px-md-5 px-[1rem] py-4"
          }  bg_white border rounded-lg border-white w-full`}
      >
        <h4 className="poppins_medium mb-4" style={{ color: "#151D48" }}>
          {!rowData && "Create Package"}
        </h4>
        <Form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-2 w-100">
          <Row className="gx-4 justify-between">
            <Col md="6" className="mb-2">
              <Label className="form-label" for="name">Name</Label>
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
              {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
            </Col>

            <Col md="6" className="mb-2">
              <Label className="form-label" for="tags">Tag Line</Label>
              <Controller
                id="tags"
                name="tags"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter Tag Line"
                    invalid={errors.tags && true}
                  />
                )}
              />
              {errors.tags && <FormFeedback>{errors.tags.message}</FormFeedback>}
            </Col>

            <Col md="6" className="mb-2">
              <Label className="form-label" for="amount">Charges</Label>
              <Controller
                id="amount"
                name="amount"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder="Enter Charges"
                    invalid={errors.amount && true}
                  />
                )}
              />
              {errors.amount && <FormFeedback>{errors.amount.message}</FormFeedback>}
            </Col>
            <Col md="6" className="mb-2">
              <Label className="form-label" for="interval">Select Subscription Plan</Label>
              <Controller
                id="interval"
                name="interval"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    type="select"
                    {...field}
                    invalid={errors.interval && true}
                  >
                    <option value="">Select Plan</option>
                    <option value="month">Monthly</option>
                    <option value="year">Yearly</option>
                  </Input>
                )}
              />
              {errors.interval && <FormFeedback>{errors.interval.message}</FormFeedback>}
            </Col>
            <Col md="12" className="mb-2">
              <Label className="form-label">Features</Label>
              <div className="border rounded-lg p-3 bg-gray-50">
                <div className="grid grid-cols-2 gap-3">
                  {AVAILABLE_FEATURES.map((feature) => (
                    <div key={feature.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={feature.id}
                        checked={featuresList.includes(feature.id)}
                        onChange={() => toggleFeature(feature.id)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={feature.id} className="text-sm text-gray-700">
                        {feature.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {featuresList.length === 0 && (
                <div className="text-red-500 text-xs mt-1">
                  Please select at least one feature
                </div>
              )}
            </Col>
          </Row>

          <div className="ml-auto">
            <ButtonComponent loading={isLoading} btnText={rowData ? "Update" : "Submit"} />
          </div>
        </Form>
      </Container>
    </main>
  );
};

export default CreatePackage;