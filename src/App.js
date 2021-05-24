import { useState, useCallback } from "react";
// import update from "immutability-helper";
import { uuid } from "uuidv4";
import "./App.css";
import { ListElement } from "./ListElement";
// import { ListBox } from "./ListBox";
import { useDrop } from "react-dnd";

function App() {
  const [cards, setCards] = useState([
    {
      id: uuid(),
      text: "item 1",
      type: "list",
    },
    {
      id: uuid(),
      text: "item 2",
      type: "list",
    },
    {
      id: uuid(),
      text: "item 3",
      type: "list",
    },
    {
      id: uuid(),
      text: "item 4",
      type: "list",
    },
    {
      id: uuid(),
      text: "item 5",
      type: "list",
    },
    {
      id: uuid(),
      text: "item 6",
      type: "list",
    },
    {
      id: uuid(),
      text: "item 7",
      type: "list",
    },
  ]);

  const [selectedCard, setSelectedCard] = useState([]);

  const [{ isOver }, addToTimelineRef] = useDrop({
    accept: "list",
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isOver: isListOver }, removeFromTimelineRef] = useDrop({
    accept: "list",
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const moveListItem = useCallback(
    (item) => {
      console.log(item);
      if (item && item.type === "list") {
        const findElement = cards.find((card) => item.id === card.id);
        findElement.type = "timeline";
        setSelectedCard((_presState) => [..._presState, findElement]);
        setCards((_presState) =>
          _presState.filter((card) => card.id !== item.id)
        );
      } else {
        const findElement = selectedCard.find((card) => item.id === card.id);
        findElement.type = "list";
        setCards((_presState) => [..._presState, findElement]);
        setSelectedCard((_presState) =>
          _presState.filter((card) => card.id !== item.id)
        );
      }
    },
    [setSelectedCard, setCards, cards, selectedCard]
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      <div
        ref={removeFromTimelineRef}
        style={{
          padding: 10,
          border: "1px solid blue",
          width: 400,
          background: isListOver ? "blue" : "white",
        }}
      >
        {cards.map((item, index) => {
          return (
            <ListElement
              key={item.id}
              {...item}
              onDropList={moveListItem}
              index={index}
            />
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          ref={addToTimelineRef}
          style={{
            background: isOver ? "green" : "white",
            border: "1px solid red",
            width: "100%",
            height: 40,
            display: "flex",
          }}
        >
          {selectedCard.map((item, index) => {
            return (
              <ListElement
                key={item.id}
                {...item}
                onDropList={moveListItem}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
