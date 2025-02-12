import React from "react";
import { Row, Col } from "react-bootstrap";

const MetricCard = ({ title, mainValue }) => {
  return (
    <Col sm="6" md="3" lg="6" xl="3" className="mb-3">
      <div className="bg_secondaryligth p-[1rem] md:p-4 min-h-[10.5rem] metric">
        <Row className="items-center justify-center">
          <Col xl="8" className="flex items-center justify-center flex-col">
            <h6 className="mb-0 text_secondary inter_semibold text-[1rem] text-center ">
              {title}
            </h6>
            <p className="mb-0 text_darkprimary text-[3rem] md:text-[4rem] inter_semibold text-center">
              {mainValue || 0}
            </p>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default MetricCard;
