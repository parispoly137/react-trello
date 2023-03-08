import { atom } from "recoil";

interface IToDo {
  [key: string]: string[]; // key는 대괄호로
}

export const toDoState = atom<IToDo>({
  key: "toDo",
  default: {
    "To Do": ["a", "b", "c"], // 띄어쓰기가 있으면 큰 따옴표
    Doing: ["d", "e"],
    Done: ["f"],
  },
});
