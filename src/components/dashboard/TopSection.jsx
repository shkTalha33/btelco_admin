import { Button } from "antd";
import React from "react";
import { Container, Row, Col } from "reactstrap";

const TopSection = ({ userName, description, buttons, date, className }) => {
  return (
    <Container fluid className="px-[1rem] md:px-5 py-[1.81rem] bg_white my-3 border container-radius border-white w-full container-shadow rounded-lg">
      {/* Left side content */}
      <Row className=" justify-between items-center">
        <Col md="6">
          <h2 className="inter_bold text-[#25324B] text-[1.25rem] md:text-[1.4rem]">
            {userName}
          </h2>
          <p className="text-[0.85rem] md:text-[0.9rem] text-[#7C8493] mb-0">{description}</p>
        </Col>
        <Col md="6" className="">
          <div className="gap-2 flex items-center justify-end flex-wrap lg:flex-nowrap">
          {buttons && buttons.length > 0
            ? buttons.map((button, index) => (
                <Button
                  key={index}
                  type="default"
                  icon={button.icon}
                  className={className}
                  onClick={button.onClick}
                >
                  <span>{button.text}</span>
                </Button>
              ))
            : date} 
            </div>  
        </Col>
      </Row>
    </Container>
  );
};

export default TopSection;
