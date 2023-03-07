import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.ul`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

// test array
const toDos = ["a", "b", "c", "d", "e", "f", "g"];

function App() {
  // drag가 끝났을 때 실행할 함수
  const onDragEnd = () => {};
  return (
    // DragDropContext ~ onDragEnd 필수
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {/* Droppable ~ droppableId 필수 */}
          <Droppable droppableId='one'>
            {/* Droppable에는 제공되는 props 존재-> children에 설정 */}
            {(provided) => (
              <Board ref={provided.innerRef} {...provided.droppableProps}>
                {toDos.map((todo, index) => (
                  // Draggable ~ draggableId, index 필수
                  <Draggable draggableId={todo} index={index} key={index}>
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
                ))}
                {/* drag할 때, droppable의 영역이 변하지 않게 설정 */}
                {provided.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
