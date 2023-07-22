import React from "react";
import type { BadgeProps } from "antd";
import { Badge, Calendar } from "antd";
import type { Dayjs } from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import "./Schedule.scss";

const getListData = (value: Dayjs) => {
  let listData;
  switch (value.date()) {
    case 5:
      listData = [
        { type: "warning", content: "Cong ty TokyoTechlab" },
        { type: "success", content: "10h-11h" },
      ];
      break;
    case 8:
      listData = [
        { type: "warning", content: "Cong ty Rikkei" },
        { type: "success", content: "14h-15h" },
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "Cong ty Sun*" },
        { type: "success", content: "9h-10h" },
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "Cong ty Misa" },
        { type: "success", content: "15h-16h" },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

function Schedule() {
  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <React.Fragment>
      <Calendar
        cellRender={cellRender}
        style={{ width: "100%", padding: "20px 30px", borderRadius: "20px" }}
      />
    </React.Fragment>
  );
}

export default Schedule;
