/* eslint-disable no-duplicate-imports */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-use-before-define */
/* eslint-disable semi */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
// import '@styles/react/libs/flatpickr/flatpickr.scss'
import React, { Fragment, useState } from "react";
import DataTable from "react-data-table-component";
import { ChevronDown, Search } from "react-feather";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { CardHeader, CardTitle, Input } from "reactstrap";
import HashLoader from "react-spinners/HashLoader";
import { useLocation } from "react-router-dom";
import { NoData } from "../icons/icon";

const ProductTable = ({
  data,
  columns,
  showFilter,
  showSearch,
  itemsPerPage,
  setSelect,
  setSelectPlan,
  rowHeading,
  setLastId,
  count,
  loading,
  setSearch,
  setCurrentPage,
  currentPage,
}) => {
  // setItemsPerPage={setItemsPerPage}
  // setSelect={setSelect}

  const [searchValue, setSearchValue] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setSearch(value);
    setLastId(1);
    setCurrentPage(0);
  };
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
    setLastId(page.selected + 1);
  };

  const { pathname } = useLocation();

  const selectOptions = {
    "/faqs": [
      { value: "all", label: "All" },
      { value: "company", label: "Company FAQ" },
      { value: "landing", label: "Landing FAQ" },
    ],
    "/manage/subscription": [
      { value: "", label: "All" },
      { value: "active", label: "Active" },
      { value: "cancel", label: "Cancel" },
      { value: "expire", label: "Expired" },
    ],
    "/client/details": [
      { value: "", label: "All" },
      { value: "pending", label: "Pending" },
      { value: "completed", label: "Completed" },
    ],
    // "/manage/subscription": [
    //   { value: "", label: "All" },
    //   { value: "pending", label: "Pending" },
    //   { value: "completed", label: "Completed" },
    // ],
  };

  const NoDataComponent = () => {
    return(
      <div className="flex items-center gap-2 flex-col">
        <img src={NoData} alt="No Data" width={120} />
        <p className="py-2 poppins_medium text_dark ">No records to show...</p>
      </div>
    )
  }

  const currentOptions = selectOptions[pathname];

  const handleSelect = (e) => {
    const value = e.target.value;
    setSelect(value);
    setLastId(1);
    setCurrentPage(0);
  };
  const handleSelectPlan = (e) => {
    setSelectPlan(e.target.value);
    setLastId(1);
    setCurrentPage(0);
  };

  const Previous = () => (
    <Fragment>
      <span>
        <MdArrowLeft size={25} />
      </span>
    </Fragment>
  );

  const Next = () => (
    <Fragment>
      <span>
        <MdArrowRight size={25} />
      </span>
    </Fragment>
  );

  const CustomPagination = () => {
    if (count <= 1) return null;
    return (
      <div className="bg-white rounded-b-xl border-t border-t-[#C5C5D3] overflow-hidden py-4">
        <ReactPaginate
          previousLabel={
            <div className="flex text-sm items-center md:gap-2">
              <FaArrowLeft className="color-0" />
              {/* <span className="hidden md:block medium-font color-0">
                Previous
              </span> */}
            </div>
          }
          nextLabel={
            <div className="flex text-sm items-center md:gap-2">
              {/* <span className="medium-font color-0 hidden md:block">Next</span> */}
              <FaArrowRight className="color-0" />
            </div>
          }
          forcePage={currentPage}
          onPageChange={(page) => handlePagination(page)}
          pageCount={count}
          breakLabel="..."
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          activeClassName="active"
          pageClassName="page-item"
          breakClassName="page-item"
          nextLinkClassName="page-link"
          pageLinkClassName="page-link"
          breakLinkClassName="page-link"
          previousLinkClassName="page-link"
          nextClassName="page-item next-item"
          previousClassName="page-item prev-item"
          containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-center py-3"
        />
      </div>
    );
  };
  return (
    <Fragment>
      {rowHeading && (
        // <CardHeader className="flex flex-wrap items-center justify-between mb-3">
        //   <CardTitle className="bold-font" tag={"h4"}>
        //     {rowHeading}
        //   </CardTitle>
        //   {showSearch && (
        //     <div className="flex items-center flex-wrap gap-[12px] mt-2 me-2">
        //       <div
        //         style={{ width: "max-content"}}
        //         className="relative d-flex align-items-center MD:me-10"
        //       >
        //         <Search
        //           size={20}
        //           className="absolute position-absolute text-[0.5rem] ms-2"
        //           alt=""
        //           onClick={() => setToggleSearch((prev) => !prev)}
        //         />
        //         {/* {toggleSearch && ( */}
        //           <Input
        //             className="dataTable-filter ps-5 md:pe-5 py-[0.5rem] w-full "
        //             style={{ height: "2.45rem" }}
        //             type="text"
        //             placeholder="search here"
        //             id="search-input-1"
        //             value={searchValue}
        //             onChange={handleFilter}
        //           />
        //         {/* )} */}
        //       </div>
        //       {showFilter && (
        //         <div>
        //           <button className="flex items-center gap-2 border rounded-lg py-[0.5rem] px-[14px]">
        //             {/* <Image src={filter} alt="" /> */}
        //             <span className="plusJakara_semibold text_black text-sm">
        //               Filter
        //             </span>
        //           </button>
        //         </div>
        //       )}
        //     </div>
        //   )}
        // </CardHeader>
        <CardHeader className="flex flex-wrap items-center justify-between my-3">
          <CardTitle className="poppins_medium capitalize text-xl">
            {rowHeading}
          </CardTitle>
          <div className="flex items-center  gap-[12px] mt-2 me-2">
            {showSearch && (
              <div
                style={{ width: "100%", maxWidth: "300px", marginLeft: "auto" }}
                className="relative d-flex w-full align-items-center"
              >
                <Search
                  size={20}
                  className="absolute position-absolute text-sm ms-3"
                  alt=""
                />
                <Input
                  style={{ padding: ".55rem 1.5rem .55rem 2.7rem",}}
                  className="dataTable-filter w-full !h-[2.5rem]"
                  type="text"
                  placeholder="Search here"
                  id="search-input-1"
                  value={searchValue}
                  onChange={handleFilter}
                />
              </div>
            )}
            {currentOptions && (
              <div>
                <Input type="select" onChange={handleSelect} className="md:!w-[150px] !h-[2.5rem]">
                  {currentOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Input>
              </div>
            )}
            {/* {pathname === "/client/details" && (
              <div>
                <Input type="select" onChange={handleSelectPlan}>
                  <option value="">All</option>
                  <option value="form">Form</option>
                  <option value="document">Document</option>
                </Input>
              </div>
            )} */}
          </div>
        </CardHeader>
      )}

      <div className="react-dataTable rounded-t-xl overflow-hidden">
        <DataTable
          noHeader
          pagination={true}
          progressPending={loading}
          progressComponent={
            <div
              className="py-5"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <HashLoader  className="mx-auto"   color="#1857d2" size={18} />
            </div>
          }
          noDataComponent={<NoDataComponent />}
          selectableRowsNoSelectAll
          columns={columns}
          paginationPerPage={itemsPerPage}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          data={data}
        />
      </div>
    </Fragment>
  );
};

export default ProductTable;
