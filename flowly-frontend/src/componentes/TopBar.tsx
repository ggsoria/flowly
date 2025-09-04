import type { DateTime } from "luxon";
import { IoIosArrowDown } from "react-icons/io";
import DatePicker from "react-datepicker";
import { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import "../styles/datepicker-style.css";
import { formatDateMMyyyy } from "../utils/dateUtils";

interface TopBarProps {
  date: DateTime;
}

const TopBar = (props: TopBarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(props.date.toJSDate());

  const customInput = () => {
    return (
      <div className="flex items-center">
        <div className="pl-4 text-primary-light dark:text-primary-dark text-base">
          {formatDateMMyyyy(selectedDate)}
        </div>
        <button className="flex ml-2 text-primary-light dark:text-primary-dark hover:cursor-pointer">
          <IoIosArrowDown className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="flex items-center h-14">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date as Date)}
        dateFormat="MMMM yyyy"
        showPopperArrow={false}
        showMonthYearPicker
        customInput={customInput()}
        className="hover:cursor-pointer"
      />
    </div>
  );
};

export default TopBar;
