/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Col, Form, Input, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { Edit, Trash2 } from "react-feather";
import HashLoader from "react-spinners/HashLoader";
import ApiFunction from "../api/apiFuntions";
import { blogCategoryCrud } from "../api/ApiRoutesFile";
import ProductTable from "../dataTable2/productTable";
import { Card, Container } from "reactstrap";
const BlogCategory = () => {
  // states-------
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessing2, setIsProcessing2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastId, setLastId] = useState(1);
  const [categories, setCategories] = useState([]);
  const [statusId, setstatusId] = useState("");
  const [lastId2, setLastId2] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setselectedItem] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [count, setcount] = useState(0);
  const [selectedItem2, setselectedItem2] = useState(null);
  const [loadingstatus, setloadingstatus] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form] = Form.useForm();
  const { post, get, deleteData, put } = ApiFunction();

  useEffect(() => {
    if (selectedItem2) {
      form.setFieldsValue({
        title: selectedItem2?.title,
      });
      setIsEditMode(true);
    } else {
      form.resetFields();
      setIsEditMode(false);
    }
  }, [selectedItem2, form]);

  const handleCloseModal = () => {
    setModalOpen(false);
    setIsEditMode(false);
    setselectedItem2(null);
    form.resetFields();
    form.setFieldsValue({
      title: "",
    });
  };

  const handleClick = (row) => {
    setselectedItem(row);
    setShowDelete(true);
  };

  const handleUpdate2 = async (row) => {
    setstatusId(row?._id);
    setloadingstatus(true);
    try {
      const endpoint = `${blogCategoryCrud}/${row?._id}`;
      const res = await deleteData(endpoint);
      if (res) {
        message.success(res?.message);
        const updatedCategories = categories.filter(
          (item) => !(item._id === row._id)
        );
        setCategories(updatedCategories);
        setShowDelete(false);
      } else {
        message.error("Status not updated");
      }
    } catch (error) {
      message.error("An error occurred while updating");
    } finally {
      setloadingstatus(false);
    }
  };

  const handleSubmit = async (values) => {
    setIsProcessing(true);
    const data = {
      title: values?.title,
    };
    try {
      const res = await post(blogCategoryCrud, data);
      if (res?.success) {
        message.success("Category created Successfully");
        setCategories([...categories, res?.category]);
        form.resetFields();
        setModalOpen(false);
        form.setFieldsValue({
          title: "",
        });
      }
    } catch (error) {
      setIsProcessing(false);
      message.error("Your category did not create");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit2 = async (values) => {
    const data = {
      title: values?.title,
    };
    setIsProcessing2(true);
    try {
      const endpoint = `${blogCategoryCrud}/${selectedItem2?._id}`;
      const res = await put(endpoint, data);
      if (res.success) {
        message.success("Category updated successfully");
        const updatedCategories = categories?.map((category) =>
          category._id === selectedItem2?._id ? res?.category : category
        );
        setCategories(updatedCategories);
        setModalOpen(false);
        setselectedItem2(null);
        form.resetFields();
        form.setFieldsValue({
          title: "",
        });
      }
    } catch (error) {
      message.error("Your category did not update");
    } finally {
      setIsProcessing2(false);
    }
  };

  const handleClick2 = (row) => {
    setselectedItem2(row);
    setModalOpen(true);
  };

  const fetchData = async () => {
    setLoading(true);
    const endpoint = `${blogCategoryCrud}`;
    try {
      const res = await get(endpoint);
      if (res?.success) {
        setCategories(res?.categories);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: "Title",
      minWidth: "300px",
      cell: (row) => (
        <div className=" w-full flex items-center justify-start">
          <span className="poppins_medium">{row?.title || "Not found"}</span>
        </div>
      ),
    },
    {},
    {
      name: "Action",
      allowoverflow: true,
      noSort: true,
      minWidth: "132px",
      maxWidth: "152px",
      cell: (row) => {
        return (
          <div className="flex gap-1">
            <button
              style={{
                width: "24px",
                height: "24px",
                backgroundColor: "#54A6FF",
              }}
              onClick={() => handleClick2(row)}
              className="bg-[#54A6FF] flex justify-center rounded-3 items-center"
            >
              <Edit size={14} color="#fff" />
            </button>
            <button
              style={{
                backgroundColor: "#d15a5a",
              }}
              onClick={() => handleClick(row)}
              className={`text_white flex justify-center rounded-2 p-1 items-center relative`}
            >
              <Trash2 size={14} />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <main className="min-h-screen email-firm poppins_regular add-firm text-sm lg:container p-2 p-md-4 mx-auto">
        <Container fluid className="p-3 mb-[1rem] md:mb-5 bg_white rounded-lg">
          <Card className="border border-white">
            <div className="flex justify-between">
              <div>
                <h4 className="inter_medium text-lg md:text-2xl">
                  {"Blog Categories"}
                </h4>
                <p className="text-gray-500 text-xs md:text-sm mb-0">
                  {"You can add blog categories here"}
                </p>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="bg_primary text_white px-3 py-1 rounded-3 plusJakara_medium"
              >
                Create Category
              </button>
            </div>
          </Card>
        </Container>
        <div className="mt-3">
          {loading ? (
            <main className="my-5 d-flex w-100 justify-content-center align-items-center">
              <HashLoader className="mx-auto" size={24} color="#1857d2" />
            </main>
          ) : !categories || categories.length === 0 ? (
            <main className="my-5 d-flex w-100 justify-content-center align-items-center">
              <span className="text_secondary plusJakara_medium">
                No Category Found
              </span>
            </main>
          ) : (
            <ProductTable
              count={count}
              loading={loading}
              setCurrentPage={setLastId2}
              currentPage={lastId2}
              columns={columns}
              data={categories}
              setLastId={setLastId}
            />
          )}
        </div>
      </main>

      <Modal
        open={modalOpen}
        maskClosable={false}
        onCancel={handleCloseModal}
        footer={null}
        centered
      >
        <Form
          className="flex flex-wrap"
          form={form}
          initialValues={{
            title: selectedItem2?.title,
          }}
          onFinish={isEditMode ? handleSubmit2 : handleSubmit}
        >
          <Col span={24}>
            <h5 className="plusJakara_medium mb-4 text-[#252C32]">
              {isEditMode ? "Edit Category" : "Add Category"}{" "}
            </h5>
            <Form.Item
              name="title"
              className="mt-2 mb-[20px]"
              rules={[
                {
                  required: true,
                  message: "Please enter the Category Name",
                },
              ]}
            >
              <Input
                size="large"
                className="plusJakara_regular"
                type="text"
                placeholder="Category Name"
              />
            </Form.Item>
          </Col>
          <div className="d-flex w-100 justify-content-end">
            <button
              type="submit"
              disabled={isProcessing || isProcessing2}
              className="px-4 py-2 text_white rounded-3 bg_dark plusJakara_medium"
            >
              {isEditMode ? (
                isProcessing2 ? (
                  <HashLoader className="mx-auto" color="#fff" size={16} />
                ) : (
                  "Update"
                )
              ) : isProcessing ? (
                <HashLoader className="mx-auto" color="#fff" size={16} />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </Form>
      </Modal>

      <Modal
        open={showDelete}
        centered
        onCancel={() => setShowDelete(false)}
        footer={null}
      >
        <h6 className="text_dark plusJakara_medium">
          Are you want to delete this category?
        </h6>
        <div className="flex justify-center gap-2 w-full my-3">
          <button
            type="button"
            className={`border cursor-pointer rounded-lg gap-1 px-3 py-2 inter_medium text-sm flex justify-center items-center bg_white text_secondary`}
            onClick={() => setShowDelete(false)}
          >
            No
          </button>
          <button
            type="button"
            disabled={loadingstatus}
            className={`border rounded-lg gap-1 px-3 py-2 inter_medium text-sm flex justify-center items-center bg_primary text_white`}
            onClick={() => handleUpdate2(selectedItem)}
          >
            {loadingstatus ? (
              <HashLoader className="mx-auto" size={14} color="#fff" />
            ) : (
              "Yes"
            )}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default BlogCategory;
