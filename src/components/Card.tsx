import React from "react";
import { Card as CardType } from "../types";

interface CardProps {
  card: CardType;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className="card">
      <p>{card.text}</p>
    </div>
  );
};

export default Card;