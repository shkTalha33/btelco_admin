/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TransactionChart from "../../utils/TranscationChart";
import DounutChart from "../../utils/DounutChart";

import TopSection from "../dashboard/TopSection";
import { Col, Container, Row } from "reactstrap";
import MetricCard from "../dashboard/MetricCard";
import ApiFunction from "../api/apiFuntions";
import { getCompanies, getDashboardData, getStaff } from "../api/ApiRoutesFile";
import { handleError } from "../api/errorHandler";
import debounce from "debounce";
import ProductTable from "../dataTable2/productTable";
import ImageLoader from "./ImageLoader/ImageLoader";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dashboardDataLoading, setDashboardDataLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [registerFirm, setRegisterFirm] = useState([]);
  const [allStaff, setAllStaff] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { get, post } = ApiFunction();
  const [dashboardData, setDashboardData] = useState(null);
  const [detailType, setDetailType] = useState("weekly");

  const metrics = [
    {
      title: "Total Companies",
      mainValue: dashboardData?.totalComapnies,
    },
    {
      title: "Active Companies",
      mainValue: dashboardData?.totalSubscribedActiveCompanies,
    },
    {
      title: "InActive Companies",
      mainValue: dashboardData?.totalInActiveSubscribeCompanies,
    },
    {
      title: "Expired Companies",
      mainValue: dashboardData?.totalSubscribeExpireCompanies,
    },
  ];

  const registerFirmColumn = [
    {
      name: "#",
      minWidth: "50px",
      maxWidth: "60px",
      cell: (_, index) => (
        <span className="text-center flex items-center justify-center">
          {index + 1 || "1"}
        </span>
      ),
    },
    {
      name: "Logo",
      minWidth: "100px",
      maxWidth: "100px",
      cell: (row) => (
        <div className="rounded-full justify-center">
          <ImageLoader
            circeltrue={true}
            imageUrl={row?.firm_logo}
            classes="rounded-full w-[35px] h-[35px]"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      ),
    },
    {
      name: "Firms",
      minWidth: "100px",
      maxWidth: "250px",
      cell: (row) => (
        <div className="flex items-center justify-center">
          <span>{row?.name || "John"}</span>
        </div>
      ),
    },
    {
      name: "Admin",
      minWidth: "150px",
      maxWidth: "300px",
      cell: (row) => (
        <div className="rounded-full justify-center flex items-center gap-2">
          <ImageLoader
            circeltrue={true}
            imageUrl={row?.admin?.profile}
            classes="rounded-full w-[25px] h-[25px]"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <p className="mb-0 poppins_medium">{row?.admin?.fname}</p>
        </div>
      ),
    },
  ];

  const fetchDashboardData = debounce(async () => {
    setDashboardDataLoading(true)
    await get(`${getDashboardData}${detailType}`)
      .then((result) => {
        if (result?.success) {
          setDashboardData(result);
        }
      })
      .catch((err) => {
        // handleError(err);
        // console.log(err)
      })
      .finally(() => {
        setDashboardDataLoading(false)
      })
  }, 300);

  useEffect(() => {
    fetchDashboardData();
  }, [detailType]);

  const getAllCompanies = debounce(async () => {
    const searchQuery = { status: "active" };
    setLoading(true);
    await post(`${getCompanies}/1`, searchQuery)
      .then((result) => {
        if (result?.success) {
          setRegisterFirm(result?.users);
        }
      })
      .catch((err) => {
        // console.log(err)
        // handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, 300);

  useEffect(() => {
    getAllCompanies();
  }, []);

  const getAllEmployees = debounce(async () => {
    setIsLoading(true);
    await post(`${getStaff}1`)
      .then((result) => {
        setAllStaff(result?.staff);
      })
      .catch((err) => {
        // console.log(err)
        // handleError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, 300);

  useEffect(() => {
    getAllEmployees();
  }, []);

  return (
    <main className="min-h-screen lg:container p-[0.5rem] md:p-4 mx-auto dashboard">
      <TopSection
        userName="Good morning, Jake"
        description="Here Is The Summary Overview"
        className="m-1 text-[0.8rem] md:text-[0.9rem]"
      />

      <Container fluid className="py-4 bg_white my-3 rounded-lg">
        <Row className="g-3">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              mainValue={metric.mainValue}
              details={metric.details}
            />
          ))}
        </Row>
      </Container>

      <div className="md:flex gap-3 items-center flex-lg-nowrap w-full">
        <div className="w-full mb-3 md:mb-0 min-h-[400px] bg_white rounded-lg p-2 md:p-[1rem]">
          <ProductTable
            rowHeading={"Registered Firms"}
            columns={registerFirmColumn}
            data={registerFirm}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            setLastId={1}
            count={0}
            loading={loading}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
