import React, { useState } from "react";
import { List as ListType } from "../types";
import Card from "./Card";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

interface ListProps {
  list: ListType;
  boardId: string;
}

const List: React.FC<ListProps> = ({ list, boardId }) => {
  const [newListTitle, setNewListTitle] = useState("");
  const [newCardText, setNewCardText] = useState("");

  const handleAddList = async () => {
    if (newListTitle.trim() === "") return;
    await addDoc(collection(db, "lists"), {
      title: newListTitle,
      boardId: boardId,
      cards: [],
    });
    setNewListTitle("");
  };

  const handleAddCard = async () => {
    if (newCardText.trim() === "") return;
    await addDoc(collection(db, "cards"), {
      text: newCardText,
      listId: list.id,
    });
    setNewCardText("");
  };

  return (
    <div className="list">
      <h3 className="list-title">{list.title}</h3>
      <div className="cards">
        {list.cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
      <div className="add-card">
        <input
          type="text"
          value={newCardText}
          onChange={(e) => setNewCardText(e.target.value)}
          placeholder="New Card Text"
        />
        <button onClick={handleAddCard}>Add Card</button>
      </div>
    </div>
  );
};

export default List;