import React from "react";
import AnalyticsCharts from "../common/AnalyticsCharts";
import { Col, Container, Row } from "reactstrap";

export default function Revenue() {
  // Donut Chart Data (Trial-to-Paid Conversion Rate)
  const donutChartOptions = {
    chart: {
      type: "donut",
    },
    labels: ["Trial Users", "Paid Users"], // Legends
    series: [70, 30], // Data values
    legend: {
      position: "bottom", // Legends at the bottom
      horizontalAlign: "center",
    },
    dataLabels: {
      enabled: false, // Disable percentage in the center
    },
    tooltip: {
      enabled: true, // Tooltip with data values
      y: {
        formatter: (val) => `${val}%`, // Customize tooltip percentage
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false, // Disable inner labels
          },
        },
      },
    },
  };
  
  const donutChartSeries = [70, 30];
  

  // Line Chart Data (MRR & ARR)
  const lineChartOptions = React.useMemo(() => ({
    chart: { type: "line", stacked: true },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr"] },
  }), []);
  
  const lineChartSeries = React.useMemo(() => [
    { name: "MRR", data: [1500, 1700, 800, 2000] },
    { name: "ARR", data: [6000, 8400, 9600, 12000] },
  ], []);
  

  // Stacked Bar Chart Data (Revenue by Plan Type)
  const barChartOptions = {
    chart: { type: "bar", stacked: true },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr"] },
  }
  const barChartSeries = [
    { name: "Basic Plan", data: [300, 400, 500, 600] },
    { name: "Pro Plan", data: [200, 300, 400, 500] },
    { name: "Enterprise Plan", data: [100, 200, 300, 400] },
  ]

  return (
    <>
      <main className="min-h-screen inter_regular add-firm text-sm lg:container p-2 p-md-4 mx-auto">
        <Container fluid className="px-[1rem] md:px-5 py-4 bg_white my-3 border rounded-lg border-white w-full">
            <AnalyticsCharts title="MRR & ARR" options={lineChartOptions} series={lineChartSeries} type="line" />
        </Container>
        <Container fluid className="px-[1rem] md:px-5 py-4 bg_white my-3 border rounded-lg border-white w-full">
            <Row className="">
                <Col md="8">
            <AnalyticsCharts title="Revenue by Plan Type" options={barChartOptions} series={barChartSeries} type="bar"/>
                </Col>
                <Col md="4">
            <AnalyticsCharts title="Conversion Rate" options={donutChartOptions} series={donutChartSeries} type="donut"/>
                </Col>
            </Row>
        </Container>
      </main>
    </>
  );
}
