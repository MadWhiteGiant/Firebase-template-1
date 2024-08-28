export interface Card {
  id: string;
  text: string;
  listId: string;
}

export interface List {
  id: string;
  title: string;
  boardId: string;
  cards: Card[];
}

export interface Board {
  id: string;
  title: string;
  lists: List[];
}