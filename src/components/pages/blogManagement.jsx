import { Modal, Button } from "antd";
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { FaEdit } from "react-icons/fa";
import PageHeading from "../dashboard/pageHeading";
import { MdDelete } from "react-icons/md";
import ProductTable from "../dataTable2/productTable";
import debounce from "debounce";
import ApiFunction from "../api/apiFuntions";
import { blogCrud } from "../api/ApiRoutesFile";
import { handleError } from "../api/errorHandler";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";

export default function BlogManagement() {
  const [loading, setLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [lastId, setLastId] = useState(1);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const { post, get, deleteData } = ApiFunction();
  const navigate = useNavigate();

  const handleEdit = (row) => {
    navigate("/blog/form", { state: { blogData: row } });
  };

  const handleDelete = async () => {
    if (!selectedBlog) return;
    setLoading(true);
      await deleteData(`${blogCrud}/${selectedBlog?._id}`)
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message)
          setData((prevData) => prevData.filter((blog) => blog._id !== selectedBlog._id));
        }
      })
     .catch ((error) => {
       handleError(error);

     }) 
    .finally(() => {
      setLoading(false);
      setIsModalOpen(false);

    })
  };

  const showDeleteModal = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const fetchBlogs = debounce(async () => {
    setLoading(true);
    try {
      const result = await get(`${blogCrud}`);
      setData(result?.blogs || []);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, 300);

  useEffect(() => {
    fetchBlogs();
  }, [search, lastId]);

  const column = [
    {
      name: "#",
      minWidth: "50px",
      maxWidth: "60px",
      cell: (_, index) => <span>{index + 1 || "1"}</span>,
    },
    {
      name: "Title",
      minWidth: "400px",
      maxWidth: "500px",
      cell: (row) => <div>{row?.title || "N/A"}</div>,
    },
    {
      name: "Category",
      minWidth: "200px",
      maxWidth: "300px",
      cell: (row) => <div>{row?.category || "N/A"}</div>,
    },
    {
      name: "Created At",
      minWidth: "250px",
      maxWidth: "300px",
      cell: (row) => <span>{row?.createdAt ? moment(row.createdAt).format("DD/MM/YYYY") : "N/A"}</span>,
    },
    {
      name: "Actions",
      minWidth: "100px",
      maxWidth: "300px",
      cell: (row) => (
        <div className="flex gap-2">
          <div className="cursor-pointer p-2 rounded-full bg-gray-100" onClick={() => handleEdit(row)}>
            <FaEdit size={18} className="text_primary" />
          </div>
          <div className="cursor-pointer p-2 rounded-full bg-gray-100" onClick={() => showDeleteModal(row)}>
            <MdDelete size={20} className="text-red-500" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <main className="container p-4 mx-auto">
        <PageHeading headingText="Blogs" headingDescription="You Can Add And Manage Blogs Here" buttonText="Add Blog" path="/blog/form" />
        <Container fluid className="bg-white rounded-lg p-4">
          <ProductTable
            rowHeading="List of Blogs"
            columns={column}
            data={data}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            setLastId={setLastId}
            // showSearch={true}
            setSearch={setSearch}
            showFilter={false}
            count={count}
            loading={loading}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Container>
      </main>
      
      <Modal centered title="Are you sure to delete this blog?" visible={isModalOpen} onOk={handleDelete} onCancel={() => setIsModalOpen(false)}>
      </Modal>
    </>
  );
}
