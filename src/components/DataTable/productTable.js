/* eslint-disable no-unused-vars */
import { Fragment, useState, forwardRef, useEffect } from "react";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {
  ChevronDown,
  FileText,
  MoreVertical,
  Edit2,
  Trash,
} from "react-feather";
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  CardTitle,
  CardHeader,
} from "reactstrap";
import {
  arrowleft2,
  arrowright2,
  filter,
  searchbar,
  searchnormal,
} from "../icons/icon";
import { CiSearch } from "react-icons/ci";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Button } from "antd";
import HashLoader from "react-spinners/HashLoader";

const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className="form-check">
    <Input type="checkbox" ref={ref} {...props} />
  </div>
));

const ProductTable = ({
  data, //  data
  columns, // coulumns
  currentPage, // 0
  showFilter,
  // showRow, // undefines
  // rowHeading, // undefines
  setCurrentPage, //
  setPageNumber,
  count, //ok
  // setSearch,
  loading,
  heading,
  type,
  pagination,
  itemsPerPage,
}) => {
  const [modal, setModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Calculate the items to display for the current page
  const offset = currentPage * itemsPerPage; // currentPage = 2 items per page = 5 => 2*5 = 10
  const currentData = data.slice(offset, offset + itemsPerPage); // 10-15

  // ** Function to handle Modal toggle
  // const handleModal = () => setModal(!modal);

  // ** Function to handle filter
  // const handleFilter = (e) => {
  //   const value = e.target.value;
  //   let updatedData = [];
  //   setSearchValue(value);

  //   if (value.length) {
  //     updatedData = data.filter((item) => {
  //       const startsWith =
  //         item.full_name.toLowerCase().startsWith(value.toLowerCase()) ||
  //         item.post.toLowerCase().startsWith(value.toLowerCase()) ||
  //         item.email.toLowerCase().startsWith(value.toLowerCase()) ||
  //         item.age.toLowerCase().startsWith(value.toLowerCase()) ||
  //         item.salary.toLowerCase().startsWith(value.toLowerCase()) ||
  //         item.start_date.toLowerCase().startsWith(value.toLowerCase());

  //       const includes =
  //         item.full_name.toLowerCase().includes(value.toLowerCase()) ||
  //         item.post.toLowerCase().includes(value.toLowerCase()) ||
  //         item.email.toLowerCase().includes(value.toLowerCase()) ||
  //         item.age.toLowerCase().includes(value.toLowerCase()) ||
  //         item.salary.toLowerCase().includes(value.toLowerCase()) ||
  //         item.start_date.toLowerCase().includes(value.toLowerCase());

  //       if (startsWith) {
  //         return startsWith;
  //       } else if (!startsWith && includes) {
  //         return includes;
  //       } else return null;
  //     });
  //     setFilteredData(updatedData);
  //     setSearchValue(value);
  //   }
  // };

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
    setPageNumber(page.selected + 1);
  };

  const handlePageChange = (data) => {
    setCurrentPage(data.selected);
  };

  const pageCount = count

  // ** Pagination Previous Component
  const Previous = ({ currentPage, setCurrentPage }) => {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 786);

    useEffect(() => {
      const handleResize = () => {
        setIsLargeScreen(window.innerWidth > 786);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Check if it's not the first page before decrementing
    const handlePrevious = () => {
      if (currentPage > 0) {
        setCurrentPage((prev) => prev - 1);
      }
    };

    return (
      <Button
        className="flex justify-between items-center"
        type="default"
        onClick={handlePrevious}
        disabled={currentPage === 0} // Disable on first page
      >
        <FaArrowLeft />
        {isLargeScreen && <span className="ml-2">Previous</span>}
      </Button>
    );
  };

  const customPagination = () => {
    return (
      <div>
        <ReactPaginate
          previousLabel={<Previous />} // Previous button
          nextLabel={<Next />} // Next button
          breakLabel={"..."} // Ellipsis between page ranges
          pageCount={pageCount} // Total page count
          forcePage={currentPage} // Sync with current page
          marginPagesDisplayed={2} // Pages displayed at the start and end
          pageRangeDisplayed={1} // Pages around current page
          onPageChange={handlePageChange} // Event triggered on page change
          containerClassName={"pagination"} // Main pagination container
          activeClassName={"active"} // Style active page number
          previousLinkClassName={"previous"} // Style for previous link
          nextLinkClassName={"next"} // Style for next link
          pageLinkClassName={"page"} // Style for page number links
        />
      </div>
    );
  };

  // ** Pagination Next Component
  const Next = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 786);

    // Update `isDesktop` state on window resize
    useEffect(() => {
      const handleResize = () => setIsDesktop(window.innerWidth > 786);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Check if it's not the last page before incrementing
    const handleNext = () => {
      if (currentPage < pageCount - 1) {
        setCurrentPage((prev) => prev + 1);
      }
    };

    return (
      <Fragment>
        <Button
          className="flex justify-between items-center"
          type="default"
          onClick={handleNext}
          disabled={currentPage === pageCount - 1} // Disable on last page
        >
          <span className="mr-2">{isDesktop && "Next"}</span> <FaArrowRight />
        </Button>
      </Fragment>
    );
  };

  // ** Custom Pagination
  // const CustomPagination = () => (
  // <ReactPaginate
  //   previousLabel={<Previous size={15} />} // Previous button
  //   nextLabel={<Next size={15} />} // Next button
  //   forcePage={1}                        // Force current page to stay in sync
  //   onPageChange={(page) => handlePagination(page)}
  //   pageCount={count} // Total pages
  //   breakLabel="..." // Ellipsis between page ranges
  //   pageRangeDisplayed={3} // Pages around current page
  //   marginPagesDisplayed={3} // Pages at the start and end
  //   activeClassName="active" // Active page styling
  //   pageClassName="page-item" // Page item styling
  //   breakClassName="page-item" // Ellipsis styling
  //   nextLinkClassName="page-link" // Next link styling
  //   pageLinkClassName="page-link" // Page link styling
  //   breakLinkClassName="page-link" // Break/ellipsis link styling
  //   previousLinkClassName="page-link" // Previous link styling
  //   nextClassName="page-item next-item" // Next item styling
  //   previousClassName="page-item prev-item" // Previous item styling
  //   containerClassName="pagination react-paginate separated-pagination pagination-sm pe-4 justify-end mt-4"
  // />
  // <ReactPaginate
  //   previousLabel={"Previous"} // previous button
  //   nextLabel={"Next"} // next button
  //   breakLabel={"..."} // break wiht ...
  //   pageCount={pageCount} // count number of pages
  //   marginPagesDisplayed={2} // set range from both sides equally 1 2 3 ... 24 25 26
  //   pageRangeDisplayed={3} // set range like 1 2 3 ... 24 25
  //   onPageChange={handlePageChange} // event trigger on page change
  //   containerClassName={"pagination"} // for styling
  //   activeClassName={"active"} // style active page number
  //   previousLinkClassName={"previous"} // style previous link calss
  //   nextLinkClassName={"next"} // style next link class
  //   pageLinkClassName={"page"} // page links class
  // />
  // );

  return (
    <>
      <Fragment>
        {loading ?
         <div className="flex justify-center py-5">
         <HashLoader  className="mx-auto"   color="#1857d2" />
       </div>
        :
        <Card className="border inter_regular rounded-lg border-white w-full">
          {/* {showRow && ( */}
          <div className="flex items-center justify-between flex-wrap p-2 md:p-3 md:gap-3 w-full">
            <div className="">
              <h6 className="inter_regular text-lg md:text-xl text_dark">
                {heading}
              </h6>
            </div>
            {type === "search" ? (
              <>
                <div className="flex items-center flex-wrap gap-[12px]">
                  <div className="relative">
                    {/* <Input
                    className="dataTable-filter ps-5 md:pe-5 py-[8px]"
                    type="text"
                    placeholder="Search "
                    id="search-input-1"
                    value={searchValue}
                    // onChange={handleFilter}
                  /> */}
                    <Button
                      className="flex justify-between items-center text-xs md:text-sm"
                      icon={<CiSearch />}
                    >
                      Search
                    </Button>
                  </div>
                  {/* {showFilter && ( */}
                  <div>
                    <button className="flex items-center gap-2 border rounded-lg py-[8px] px-[14px]">
                      <img src={filter} alt="" />
                      <span className="inter_regular text_black text-xs md:text-sm">
                        Filter
                      </span>
                    </button>
                  </div>
                  {/* )} */}
                </div>
              </>
            ) : type === "date" ? (
              <div className="rounded-full p-2 bg-[#E5F0FF]">
                <span className="text-xs">feb 26,2024 -feb 26,2024</span>
              </div>
            ) : (
              ""
            )}
          </div>
          {/* )} */}
          {loading ? (
            <div
              className="py-5"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <HashLoader  className="mx-auto"   color="#1857d2" />
            </div>
          ) : (
            <div className="react-dataTable">
              {/* <DataTable
                noHeader
                pagination
                selectableRowsNoSelectAll
                // selectableRows
                columns={columns}
                paginationPerPage={itemsPerPage}
                className="react-dataTable"
                sortIcon={<ChevronDown size={10} />}
                paginationDefaultPage={currentPage + 1}
                paginationComponent={CustomPagination}
                data={searchValue.length ? filteredData : data}
                // selectableRowsComponent={BootstrapCheckbox}
              /> */}

              <DataTable
                columns={columns} // columns of table
                data={data} // data to display
                // customStyles={{ headRow: { style: { textAlign: "center" } } }}
                pagination={pagination} // allow pagination
                paginationPerPage={itemsPerPage} // records to display per page
                paginationComponent={customPagination} // custom pagination
              />
            </div>
          )}
        </Card>
}
      </Fragment>
    </>
  );
};

export default ProductTable;
