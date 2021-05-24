import { useDrag } from "react-dnd";

export const ListElement = ({ text, onDropList, id, index, type }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "list",
    item: { id, index, type },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (item && dropResult) {
        onDropList(item);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      style={
        type === "list"
          ? {
              border: "1px dashed gray",
              padding: "0.5rem 1rem",
              marginBottom: ".5rem",
              backgroundColor: "white",
              cursor: "move",
            }
          : {
              display: "flex",
            }
      }
    >
      {type === "list" ? (
        text
      ) : (
        <span
          style={{
            display: "inline",
            border: "1px solid gray",
            backgroundColor: "white",
            cursor: "move",
          }}
        >
          {text}
        </span>
      )}
    </div>
  );
};
