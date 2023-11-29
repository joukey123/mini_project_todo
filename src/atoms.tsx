import { atom, selector } from "recoil";

export enum Categoties {
  "ToDo" = "ToDo",
  "Doing" = "Doing",
  "Done" = "Done",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categoties;
}

export const categotyState = atom<Categoties>({
  key: "categoty",
  default: Categoties.ToDo,
});

export const toDoAtom = atom<IToDo[]>({
  key: "toDos",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoAtom);
    const category = get(categotyState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
