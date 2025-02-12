import React from "react";
import { Alert, Button } from "antd";
import { Container } from "reactstrap";

export default function AlertSection({
  type,
  message,
  description,
  buttons = [],
}) {
  return (
    <Container fluid className="px-0">
      <Alert
        className="flex flex-col md:flex-row items-start md:items-center gap-2 gap-md-4"
        message={<span className="text-sm md:text-[1rem] font-semibold">{message}</span>}
        showIcon
        description={
          <span className="text-xs md:text-[0.85rem] lg:text-base">
            {description}
          </span>
        }
        type={type}
        action={
          <div className="flex flex-wrap gap-2 justify-start md:justify-end">
            {buttons.map((button, index) => (
              <Button
                className={`text-xs md:text-sm ${button.className}`}
                key={index}
              >
                {button.text}
              </Button>
            ))}
          </div>
        }
      />
    </Container>
  );
}
