import { atom } from "recoil";

// To Do에 들어갈 key들에 대한 타입 설정
export interface IToDo {
  id: number;
  text: string;
}

// toDoState는 To Do 객체를 요소로 담는 배열 객체
interface IToDoState {
  [key: string]: IToDo[]; // key는 대괄호로
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  // <{[key: string]: {id: number, text: string}[]}>
  default: {
    "To Do": [], // 띄어쓰기가 있으면 큰 따옴표
    Doing: [],
    Done: [],
  },
});
