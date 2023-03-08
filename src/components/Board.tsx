import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import DraggableCard from "./DraggableCard";
import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.ul`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

// Area's props의 타입 선언
interface IArea {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

// 타입 지정
const Area = styled.div<IArea>`
  // props 값에 따라 색상 설정
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#e3fdeba0"
      : props.isDraggingFromThis
      ? "#ffeaf1"
      : "#ffffff5c"};
  padding: 20px;
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface IBoards {
  toDos: IToDo[];
  boardId: string;
}

// useForm에 지정할 input의 변수 타입 설정
interface IForm {
  toDo: string;
}

export default function Board({ toDos, boardId }: IBoards) {
  // recoil ~ useSetRecoilState
  const setToDos = useSetRecoilState(toDoState);
  // useForm
  const { register, handleSubmit, setValue } = useForm<IForm>();

  // handleSubmit이 유효한 경우
  const onValid = ({ toDo }: IForm) => {
    // to Do 로 들어갈 새로운 항목
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    // setToDos를 통해 새로운 요소 추가
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]], // 기존의 보드에 새로운 To Do를 추가
      };
    });
    // 입력창 초기화
    setValue("toDo", "");
  };

  return (
    // Droppable ~ droppableId 필수
    <Wrapper>
      <Title>{boardId}</Title>
      {/* Form + input 세팅 */}
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type='text'
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {/* Droppable에는 제공되는 props 존재-> children에 설정 */}
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver} // drag 시작 보드 ~ boolean
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)} // drag 목표 보드 ~ boolean으로 전환
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((todo, index) => (
              // 컴포넌트 분리 및 props 전달
              <DraggableCard
                key={todo.id}
                index={index}
                toDoId={todo.id}
                toDoText={todo.text}
              />
            ))}
            {/* drag할 때, droppable의 영역이 변하지 않게 설정 */}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}
