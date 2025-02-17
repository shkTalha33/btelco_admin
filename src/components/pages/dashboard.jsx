/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import debounce from "debounce";
import { Container, Row } from "reactstrap";
import ApiFunction from "../api/apiFuntions";
import MetricCard from "../dashboard/MetricCard";
import TopSection from "../dashboard/TopSection";
import { dashboardMetrices } from "../api/ApiRoutesFile";

const Dashboard = () => {
  const { get } = ApiFunction();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(null);

  const metrics = [
    {
      title: "Total Quotes",
      mainValue: dashboardData?.totalQuotes,
    },
    {
      title: "Home Services",
      mainValue: dashboardData?.totalLandingServices,
    },
    {
      title: "Total Blogs",
      mainValue: dashboardData?.totalBlogs,
    },
    {
      title: "Total Services",
      mainValue: dashboardData?.totalServices,
    },
  ];

  const fetchDashboardData = debounce(async () => {
    setLoading(true)
    await get(`${dashboardMetrices}`)
      .then((result) => {
        console.log(result)
        if (result?.success) {
          setDashboardData(result?.metrics);
        }
      })
      .catch((err) => {
        // handleError(err);
        // console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, 300);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <main className=" lg:container p-[0.5rem] md:p-4 mx-auto dashboard">
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
    </main>
  );
};

export default Dashboard;
