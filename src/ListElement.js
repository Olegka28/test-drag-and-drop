import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

export const ListElement = ({ card, moveItem, index }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "ITEM",
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (card.status === "list" && dragIndex === hoverIndex) {
        return;
      }

      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;

      if (
        card.status === "list" &&
        dragIndex < hoverIndex &&
        hoverClientY < hoverMiddleY
      ) {
        return;
      }

      if (
        card.status === "list" &&
        dragIndex > hoverIndex &&
        hoverClientY > hoverMiddleY
      ) {
        return;
      }

      if (card.status === "list") {
        moveItem(dragIndex, hoverIndex);

        item.index = hoverIndex;
      }
      // moveItem(dragIndex, hoverIndex);

      // item.index = hoverIndex;
    },
  });

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: "ITEM", ...card, index },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  dragRef(drop(ref));

  return (
    <>
      <div
        ref={ref}
        style={
          card.status === "timeline"
            ? {
                width: "50px",
                height: "40px",
                border: "1px solid green",
                position: "absolute",
                left: card.left - 25,
                boxSizing: "border-box",
                cursor: "move",
                opacity: isDragging ? 0 : 1,
              }
            : {
                opacity: isDragging ? 0 : 1,
                border: "1px dashed gray",
                padding: "0.5rem 1rem",
                marginBottom: ".5rem",
                backgroundColor: "white",
                cursor: "move",
              }
        }
      >
        {card.text}
      </div>
    </>
  );
};
