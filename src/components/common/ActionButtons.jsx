import { Button } from "antd";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { filter } from "../icons/icon";

export default function ActionButtons({
  showSearch = true,
  showFilter = true,
  additionalButtons = [],
}) {
  return (
    <div className="flex items-center flex-wrap gap-[12px]">
      {/* Additional Buttons */}
      {additionalButtons.map((button, index) => (
        <div key={index}>{button}</div>
      ))}
      {/* Search Button */}
      {showSearch && (
        <div className="relative">
          <Button
            className="flex justify-between items-center text-[12px]"
            icon={<CiSearch size={14} />}
          >
            Search
          </Button>
        </div>
      )}

      {/* Filter Button */}
      {showFilter && (
        <div>
          <Button className="flex items-center gap-1 border rounded-lg  px-[14px]">
            <img src={filter} alt="Filter" width={14} />
            <span className="inter_regular text_black text-[12px]">Filter</span>
          </Button>
        </div>
      )}
    </div>
  );
}
