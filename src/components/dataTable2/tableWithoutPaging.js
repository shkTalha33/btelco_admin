/* eslint-disable no-unused-vars */
import { Menu } from "antd";
import React, { Fragment, useState } from "react";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import ReactPaginate from "react-paginate";
import HashLoader from "react-spinners/HashLoader";
import { Card, CardTitle, Input } from "reactstrap";
// import { arrowdown, arrowleft3, arrowright3, filter, searchnormal } from '../icons/icon'

const TableWithoutPaging = ({
  data,
  columns,
  currentPage,
  showFilter,
  setItemsPerPage,
  itemsPerPage,
  showRow,
  rowHeading,
  setCurrentPage,
  setLastId,
  count,
  setSearch,
  loading,
  totalRecords,
  fetchData,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    if (value.length) {
      updatedData = data.filter((item) => {
        const startsWith =
          item.full_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.post.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          item.age.toLowerCase().startsWith(value.toLowerCase()) ||
          item.salary.toLowerCase().startsWith(value.toLowerCase()) ||
          item.start_date.toLowerCase().startsWith(value.toLowerCase());

        const includes =
          item.full_name.toLowerCase().includes(value.toLowerCase()) ||
          item.post.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.age.toLowerCase().includes(value.toLowerCase()) ||
          item.salary.toLowerCase().includes(value.toLowerCase()) ||
          item.start_date.toLowerCase().includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
      setSearchValue(value);
    }
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected);
    setLastId(page.selected + 1);
  };

  const handleMenuClick = (e) => {
    setItemsPerPage(parseInt(e.key, 10));
  };

  const goToFirstPage = () => {
    setCurrentPage(0);
    setLastId(1);
  };

  const goToLastPage = () => {
    const lastPage = count - 1;
    setCurrentPage(lastPage);
    setLastId(lastPage + 1);
  };

  const First = () => (
    <Fragment>
      <button className="mb-0" onClick={goToFirstPage}>
        {/* <img src={arrowleft3}
                style={{ width: '20px', height: 'auto' }} alt="" /> */}
      </button>
    </Fragment>
  );

  const Last = () => (
    <Fragment>
      <button className="mb-0" onClick={goToLastPage}>
        {/* <img src={arrowright3}
                style={{ width: '20px', height: 'auto' }} alt="" /> */}
      </button>
    </Fragment>
  );

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

  const getItemRange = () => {
    const startItem = currentPage * itemsPerPage + 1;
    const endItem = Math.min(startItem + itemsPerPage - 1, totalRecords);
    return `${startItem} to ${endItem}`;
  };

  const CustomPagination = () => {
    return (
      <div className="pagination-container flex rounded-3">
        <div className="flex gap-3 items-center">
          <First />
          <ReactPaginate
            previousLabel={<Previous />}
            nextLabel={<Next />}
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
            containerClassName="pagination react-paginate separated-pagination pagination-sm justify-start"
          />
          <Last />
          {/* <div className="flex gap-1 items-center">
                        <Dropdown overlay={menu} trigger={['click']} className='border-0'>
                            <Button className='flex gap-1 bg_light items-center'>
                                <h6 className="item-range mb-0 roboto_regular">
                                    {itemsPerPage}
                                </h6>
                                <img src={arrowdown} alt="" />
                            </Button>
                        </Dropdown>
                        <h6 className="item-range mb-0 roboto_regular">
                            Items per page
                        </h6>
                    </div> */}
        </div>
        <div className="flex me-4 gap-3 items-center">
          <h6 className="item-range mb-0 roboto_regular">
            Items {getItemRange()} of {totalRecords}
          </h6>
        </div>
      </div>
    );
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="10">10</Menu.Item>
      <Menu.Item key="20">20</Menu.Item>
      <Menu.Item key="30">30</Menu.Item>
    </Menu>
  );

  return (
    <Fragment>
      <Card className="border-0 w-full bg-transparent">
            <CardTitle className="poppins_medium capitalize text-xl mb-4">
              {rowHeading}
            </CardTitle>
        {showRow && (
          <div className="flex items-center justify-between flex-wrap p-3 max-md:gap-3 w-full">
            <div className="flex items-center flex-wrap gap-[12px]">
              <div className="relative">
                {/* <img src={searchnormal} className='absolute mt-[12px] ms-3' alt="" /> */}
                <Input
                  className="dataTable-filter ps-5 md:pe-5 py-[8px] w-full"
                  type="text"
                  placeholder="Search anything here"
                  id="search-input-1"
                  value={searchValue}
                  onChange={handleFilter}
                />
              </div>
              {/* {showFilter && (
                                <div>
                                    <button className="flex items-center gap-2 border rounded-lg py-[8px] px-[14px]">
                                        <img src={filter} alt="" />
                                        <span className='plusJakara_semibold text_black text-sm'>Filter</span>
                                    </button>
                                </div>
                            )} */}
            </div>
          </div>
        )}
        {loading ? (
          <div
            className="py-5"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <HashLoader  className="mx-auto"   size={18} color="#1857d2" />
          </div>
        ) : (
          <div className="w-full react-dataTable">
            <DataTable
              noHeader
              // pagination
              selectableRowsNoSelectAll
              columns={columns}
              paginationPerPage={itemsPerPage}
              className="react-dataTable"
              sortIcon={<ChevronDown size={10} />}
              paginationDefaultPage={currentPage + 1}
              // paginationComponent={CustomPagination}
              data={searchValue.length ? filteredData : data}
            />
          </div>
        )}
      </Card>
    </Fragment>
  );
};

export default TableWithoutPaging;
