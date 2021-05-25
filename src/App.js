import { useRef, useState } from "react";
import { ListElement } from "./ListElement";
import { DropWrapper } from "./dropWrapper";
import { data } from "./data";

function App() {
  const timelineRef = useRef(null);
  const [cards, setCards] = useState(data);

  const onDrop = (item, monitor, status, left) => {
    setCards((prevState) => {
      const newItem = prevState
        .filter((i) => i.id !== item.id)
        .concat({
          ...item,
          status,
          left: left - timelineRef.current.clientWidth,
        });
      return [...newItem];
    });
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const card = cards[dragIndex];

    setCards((prevState) => {
      const newItems = prevState.filter((_, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, card);
      return [...newItems];
    });
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      <div
        style={{
          padding: 10,
          border: "1px solid blue",
          width: 400,
        }}
      >
        <DropWrapper onDrop={onDrop} status="list">
          {cards
            .filter((i) => i.status === "list")
            .map((i, idx) => (
              <ListElement
                key={i.id}
                index={idx}
                moveItem={moveItem}
                card={i}
                status="list"
              />
            ))}
        </DropWrapper>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          ref={timelineRef}
          style={{
            border: "1px solid red",
            width: "100%",
            height: "40px",
          }}
        >
          <DropWrapper onDrop={onDrop} status="timeline">
            {cards
              .filter((i) => i.status === "timeline")
              .map((i, idx) => (
                <ListElement
                  key={i.id}
                  index={idx}
                  moveItem={moveItem}
                  card={i}
                  status="timeline"
                />
              ))}
          </DropWrapper>
        </div>
      </div>
    </div>
  );
}

export default App;
