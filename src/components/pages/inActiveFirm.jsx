/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */

// React and related hooks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// UI Components
import { Container } from "reactstrap";
import { Dropdown } from "antd";

// Icons
import { FaEllipsisVertical } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

// Utilities
import debounce from "debounce";

// API and Redux actions
import { getCompanies } from "../api/ApiRoutesFile.jsx";
import { handleError } from "../api/errorHandler.js";
import ApiFunction from "../api/apiFuntions";
import { setAllFirms } from "../redux/firm.js";

import ProductTable from "../dataTable2/productTable.jsx";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Edit, Trash2, X } from "react-feather";

// Components
import ImageLoader from "./ImageLoader/ImageLoader";
import PageHeading from "../dashboard/pageHeading";

import AddAdmin from "../common/AddAdmin.jsx";
import UpdateFirmStatusModal from "../common/UpdateFirmStatusModal.jsx";
import HashLoader from "react-spinners/HashLoader.js";

export default function AllFirms() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentFirm, setCurrentFirm] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFirmUpateStatusModal, setShowFirmUpateStatusModal] =
    useState(null);
  const [updateableFirm, setUpdateableFirm] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [rowData, setRowData] = useState(null);
  const [lastId, setLastId] = useState(1);
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const { post } = ApiFunction();
  const dispatch = useDispatch();
  const allCompanies = useSelector((state) => state.firm.allFirms) || [];

  const columns = [
    {
      name: "#",
      minWidth: "60px",
      maxWidth: "80px",
      cell: (_, index) => (
        <span className="flex items-start justify-start">
          {(((parseInt(lastId) - 1) * 10) + (index + 1)) || "1"}
        </span>
      ),
    },
    {
      name: "Reg#",
      minWidth: "80px",
      maxWidth: "90px",
      cell: (row) => (
        <span className="flex items-start justify-start">
          {row?.registration || "1"}
        </span>
      ),
    },
    {
      name: "Logo",
      minWidth: "70px",
      maxWidth: "100px",
      cell: (row) => (
        <div className="flex items-center justify-center">
          <ImageLoader
            circeltrue={true}
            imageUrl={row?.firm_logo}
            classes="rounded-full bg-cover w-[35px] h-[35px]"
            style={{ maxWidth: "35px", maxHeight: "35px" }}
          />
        </div>
      ),
    },
    {
      name: "Firm Name",
      minWidth: "150px",
      maxWidth: "250px",
      cell: (row) => (
        <span className="text-center flex items-center justify-center">
          {row?.name || "John"}
        </span>
      ),
    },
    {
      name: "Firm Email",
      minWidth: "200px",
      maxWidth: "300px",
      cell: (row) => (
        <span className="text-center flex items-center justify-center">
          {row?.email || "john@example.com"}
        </span>
      ),
    },
    {
      name: "Phone",
      minWidth: "200px",
      maxWidth: "250px",
      cell: (row) => (
        <span className="text-center flex items-center justify-center">
          {row?.phone || "+12345676543"}
        </span>
      ),
    },
    {
      name: "Address",
      minWidth: "200px",
      maxWidth: "300px",
      cell: (row) => (
        <span className="text-center flex items-center justify-center">
          {row?.address}
        </span>
      ),
    },
    {
      name: "Admin",
      minWidth: "150px",
      maxWidth: "300px",
      cell: (row) => (
        <span className="text-center flex items-center justify-center">
          {row?.admin?.fname || (
            <button
              style={{
                color: "#26A4FF",
                background: "#E5F0FF",
              }}
              className="rounded-full py-1 px-3"
              onClick={() => handleAddAdmin(row)}
            >
              Add Admin
            </button>
          )}
        </span>
      ),
    },
    {
      name: "Subscription",
      minWidth: "150px",
      maxWidth: "200px",
      cell: (row) => (
        <span className="text-center flex items-center justify-center">
          {row?.package?.name || "No Plan selected"}
        </span>
      ),
    },
    {
      name: "Type",
      minWidth: "100px",
      maxWidth: "200px",
      cell: (row) => (
        <span className="text-center flex items-center justify-center">
          {row?.type || "Trail"}
        </span>
      ),
    },
    // {
    //   name: "Start Date",
    //   minWidth: "110px",
    //   maxWidth: "200px",
    //   cell: (row) => (
    //     <span className="text-center flex items-center justify-center">
    //       {row?.startDate || "1-Jan-2024"}
    //     </span>
    //   ),
    // },
    {
      name: "Status",
      minWidth: "110px",
      maxWidth: "250px",
      cell: (row) => (
        <div
          className="flex items-center justify-center whitespace-nowrap"
          onClick={() => handleUpdateStatus(row)}
        >
          <button
            style={{
              color: "#FF6550",
              background: "#E5F0FF",
            }}
            className="rounded-full py-1 px-3 capitalize"
          >
            {row?.status}
          </button>
        </div>
      ),
    },
    {
      name: "View",
      minWidth: "70px",
      maxWidth: "80px",
      cell: (row) => (
        <>
          <Dropdown
            size="large"
            menu={{
              items: getDropdownItems(row),
            }}
            className="mr-[4rem]"
            placement="bottomRight"
          >
            <div className="flex items-center p-2 text_secondary bg-[#E5F0FF] rounded-full justify-center">
              <FaEllipsisVertical
                size={18}
                // onClick={() => handleViewClick(row)} // Add your handler here
                className="cursor-pointer "
              />
            </div>
          </Dropdown>
        </>
      ),
    },
  ];

  const handleUpdateStatus = (row) => {
    setUpdateableFirm(row);
    setShowFirmUpateStatusModal(true);
  };

  const toggleSidebar = (row) => {
    setOpen(!open);
    if (row) {
      setRowData(row);
    }
  };

  const toggleDel = (row) => {
    setOpenDel(!openDel);
    if (row) {
      setRowData(row);
    }
  };

  const handleAddAdmin = (row) => {
    setShowModal(true);
    setCurrentFirm(row?._id);
  };

  const getDropdownItems = (row) => [
    {
      key: "edit",
      label: (
        <Link
          to={{
            pathname: "/companies/addfirm",
            search: `page=${lastId}&firm=${row?._id}`,
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
          }}
        >
          <MdEdit size={17} className="text-blue-700" /> Edit
        </Link>
      ),
    },

    // {
    //   key: "delete",
    //   label: "Delete",
    //   icon: <MdDelete size={17} className="text-red-500" />,
    //   onClick: () => handleDelete(row),
    // },
  ];

  const getAllCompanies = debounce(async () => {
    // if (allCompanies?.length > 0) {
    //   setLoading(false);
    //   return;
    // }
    const searchQuery = { status: 'deactivated' };
    setLoading(true);
    await post(`${getCompanies}/${lastId}`, searchQuery)
      .then((result) => {
        if (result?.success) {
          setCount(result?.count?.totalPage);
          setItemsPerPage(result?.count?.currentPageSize);
          dispatch(setAllFirms(result?.users));
        }
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, 300);

  useEffect(() => {
    getAllCompanies();
  }, [lastId, search]);

  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={toggleSidebar} />
  );
  const CloseBtn2 = (
    <X className="cursor-pointer" size={15} onClick={toggleDel} />
  );

  return (
    <main className="lg:container p-[0.5rem] md:p-4 mx-auto">
      <PageHeading
        headingText="Firms"
        headingDescription="Here are The Firms That are Inactive"
        buttonText="Add Firm"
        path="/companies/addfirm"
      />
      <Container fluid className="bg_white rounded-lg">
        <div className="bg_white rounded-lg p-1 md:p-[1rem]">
          <ProductTable
            rowHeading={"Inactive Firms"}
            columns={columns}
            data={allCompanies}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            setLastId={setLastId}
            setSearch={setSearch}
            showSearch={false}
            showFilter={true}
            count={count}
            loading={loading}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

          <Modal centered isOpen={openDel} toggle={toggleDel}>
            <ModalHeader close={CloseBtn2}> Delete Category </ModalHeader>
            <ModalBody>
              <div className="text-center">
                Are you sure you want to delete this Category?
              </div>
              <div className="d-flex pt-2 justify-content-center gap-1">
                <Button
                  className=""
                  // disabled={isloading}
                  color="primary"
                  type="button"
                // onClick={HandleDelet}
                >
                  {isloading ? <HashLoader  className="mx-auto"   color="#fff" size={16} /> : "Delete"}
                </Button>
                <Button
                  outline
                  color="secondary"
                  type="reset"
                  onClick={toggleDel}
                >
                  Cancel
                </Button>
              </div>
            </ModalBody>
          </Modal>
        </div>
      </Container>

      <AddAdmin
        currentFirm={currentFirm}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      <UpdateFirmStatusModal
        show={showFirmUpateStatusModal}
        setShow={setShowFirmUpateStatusModal}
        heading="Update Status"
        updateAbleItem={updateableFirm}
      />
    </main>
  );
}
