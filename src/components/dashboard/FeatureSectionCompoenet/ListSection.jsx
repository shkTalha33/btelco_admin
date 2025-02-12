/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FeaturePageColumns, FeaturePageData } from "../../../utils/dummyData";
import ProductTable from "../../DataTable/productTable";
import { Container } from "reactstrap";

const ListSection = () => {
  const [featurePage, setFeaturePage] = useState(0);
  const [loading, setLoading] = useState(false);


  return (
    <>
    <Container fluid className=" py-4 bg_white my-3 border rounded-lg border-white w-full">
        <ProductTable
          heading="List Section"
          count={0}
          loading={loading}
          setCurrentPage={setFeaturePage}
          currentPage={featurePage}
          columns={FeaturePageColumns}
          data={FeaturePageData}
          setPageNumber={setFeaturePage}
          type="search"
          pagination={true}
          itemsPerPage={5}
        />
        </Container>
    </>
  );
};
export default ListSection;
