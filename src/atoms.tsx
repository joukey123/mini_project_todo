import { atom, selector } from "recoil";
import { recoilPersist, PersistStorage } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "ToDos",
  storage: localStorage,
});

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

export interface IAddCategory {
  category: string;
  id: number;
}

export const addCategoryState = atom<IAddCategory[]>({
  key: "addCategory",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const categotyState = atom<Categoties>({
  key: "categoty",
  default: Categoties.ToDo,
});

export const toDoAtom = atom<IToDo[]>({
  key: "toDos",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoAtom);
    const category = get(categotyState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
