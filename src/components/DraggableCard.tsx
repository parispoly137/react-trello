import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

// 타입 선언
interface IDraggableProps {
  todo: string;
  index: number;
}

function DraggableCard({ todo, index }: IDraggableProps) {
  return (
    // Draggable ~ draggableId, index 필수
    <Draggable draggableId={todo} index={index}>
      {/* Draggable에는 제공되는 props 존재-> children에 설정 */}
      {(provided) => (
        <Card
          ref={provided.innerRef}
          // 아래 2개의 props가 모두 있어야 요소를 컨트롤할 수 있다.
          {...provided.draggableProps} // controls the movement of the draggable
          {...provided.dragHandleProps} // drag handle
        >
          {todo}
        </Card>
      )}
    </Draggable>
  );
}

// Props가 변하는 경우에만 렌더링하게 한다.
export default React.memo(DraggableCard);
