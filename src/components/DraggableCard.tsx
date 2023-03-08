import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

// 타입 직접 지정
const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;

  // props 값에 따라 색상 및 그림자
  background-color: ${(props) =>
    props.isDragging ? "#d0e8ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 10px rgba(0, 0, 0, 0.3)" : "none"};
`;

// 타입 선언
interface IDraggableProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DraggableCard({ toDoId, toDoText, index }: IDraggableProps) {
  return (
    // Draggable ~ draggableId, index 필수
    <Draggable draggableId={toDoId + ""} index={index}>
      {/* Draggable에는 제공되는 props 존재-> children에 설정 */}
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging} // drag 중인지 여부
          ref={provided.innerRef}
          // 아래 2개의 props가 모두 있어야 요소를 컨트롤할 수 있다.
          {...provided.draggableProps} // controls the movement of the draggable
          {...provided.dragHandleProps} // drag handle
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

// Props가 변하는 경우에만 렌더링하게 한다.
export default React.memo(DraggableCard);
