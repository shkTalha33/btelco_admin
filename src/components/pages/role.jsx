import React, { useState } from "react";
import PageHeading from "../dashboard/pageHeading";
import { Container } from "reactstrap";
import { StaffRoleColumns, StaffRoleData } from "../../utils/dummyData";
import ProductTable from "../DataTable/productTable";

export default function Role() {
    const [loading, setLoading] = useState(false)
    const [staffPage, setStaffPage] = useState(0)
  return (
    <>
      <main className="min-h-screen inter_regular add-firm text-sm lg:container p-[0.5rems] p-md-4 mx-auto">
        <PageHeading
          headingText="Role and Permission"
          headingDescription="You Can Assign New Role And Manage Them"
          buttonText="Create New Role"
          path="/staff/roles/create-role"
        />

        <Container fluid className="p-[1rem] md:px-5 md:py-4 bg_white my-3 border rounded-lg border-white w-full">
          <ProductTable
            heading="List"
            count={0}
            loading={loading}
            setCurrentPage={setStaffPage}
            currentPage={staffPage}
            columns={StaffRoleColumns}
            data={StaffRoleData}
            setPageNumber={setStaffPage}
            type="search"
            pagination={true}
            itemsPerPage={5}
          />
        </Container>
      </main>
    </>
  );
}
