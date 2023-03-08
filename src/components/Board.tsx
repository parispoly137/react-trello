import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

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

interface IBoards {
  toDos: string[];
  boardId: string;
}

export default function Board({ toDos, boardId }: IBoards) {
  return (
    // Droppable ~ droppableId 필수
    <Wrapper>
      <Title>{boardId}</Title>
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
              <DraggableCard key={todo} todo={todo} index={index} />
            ))}
            {/* drag할 때, droppable의 영역이 변하지 않게 설정 */}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}
