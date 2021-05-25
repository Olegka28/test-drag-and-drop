import React from "react";
import { useDrop } from "react-dnd";
import { statuses } from "./data";

const DropWrapper = ({ onDrop, children, status }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "ITEM",
    canDrop: (item, monitor) => {
      const itemIndex = statuses.findIndex((st) => st.status === item.status);
      const statusIndex = statuses.findIndex((st) => st.status === status);
      return [itemIndex + 1, itemIndex - 1, itemIndex].includes(statusIndex);
    },
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      if (status === "timeline" && clientOffset) {
        onDrop(item, monitor, status, clientOffset.x);
      }
      onDrop(item, monitor, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={
        status === "timeline"
          ? {
              width: "100%",
              height: "100%",
              display: "flex",
              position: "relative",
            }
          : { width: "100%", height: "100%" }
      }
    >
      {children}
    </div>
  );
};

export { DropWrapper };
