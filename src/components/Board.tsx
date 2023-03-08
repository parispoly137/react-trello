import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.ul`
  width: 300px;
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
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
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {toDos.map((todo, index) => (
              // 컴포넌트 분리 및 props 전달
              <DraggableCard key={todo} todo={todo} index={index} />
            ))}
            {/* drag할 때, droppable의 영역이 변하지 않게 설정 */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
}
