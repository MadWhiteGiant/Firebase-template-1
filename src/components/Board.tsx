import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import List from "./List";
import { Board as BoardType } from "../types";

const Board: React.FC = () => {
  const [boards, setBoards] = useState<BoardType[]>([]);
  const [newBoardTitle, setNewBoardTitle] = useState("");

  useEffect(() => {
    const boardsQuery = query(
      collection(db, "boards"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(boardsQuery, (snapshot) => {
      const newBoards = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as BoardType[];
      setBoards(newBoards);
    });

    return () => unsubscribe();
  }, []);

  const handleAddBoard = async () => {
    if (newBoardTitle.trim() === "") return;
    await addDoc(collection(db, "boards"), {
      title: newBoardTitle,
      createdAt: new Date(),
      lists: [],
    });
    setNewBoardTitle("");
  };

  return (
    <div className="board-container">
      <div className="add-board">
        <input
          type="text"
          value={newBoardTitle}
          onChange={(e) => setNewBoardTitle(e.target.value)}
          placeholder="New Board Title"
        />
        <button onClick={handleAddBoard}>Add Board</button>
      </div>
      {boards.map((board) => (
        <div key={board.id} className="board">
          <h2 className="board-title">{board.title}</h2>
          <div className="lists">
            {board.lists.map((list) => (
              <List key={list.id} list={list} boardId={board.id} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;