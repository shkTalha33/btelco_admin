import { Tabs } from "antd";
import React from "react";
import { Container } from "reactstrap";
import GeneralSetting from "./generalSetting";
import FeatureSection from "./featureSection";
import CreateFAQsSection from "../dashboard/FAQs/CreateFAQs";

export default function Setting() {
  const tabItems = [
    {
      label: "General Settings",
      key: "1",
      children: <GeneralSetting />,
    },
    {
      label: "Feature Section",
      key: "2",
      children: <FeatureSection />,
    },
    {
      label: "FAQs",
      key: "3",
      children: <CreateFAQsSection />
    },
  ];

  return (
    <>
      <main className="min-h-screen poppins_regular add-firm text-sm lg:container p-2 p-md-4 mx-auto">
        <Container fluid className="px-2 md:px-5 pt-4 bg_white mt-3 border rounded-lg border-white w-full">
          <h4 className="inter_medium mb-4 text_darkprimary">
            Good Morning, Jake
          </h4>
          <Tabs
            style={{ color: "bg_darkprimary", }}
            defaultActiveKey="1"
            items={tabItems}
            tabBarStyle={{fontSize:"16px"}}
          />
        </Container>
      </main>
    </>
  );
}
