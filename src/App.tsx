import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";
import DraggableCard from "./components/DraggableCard";

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

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  // drag가 끝났을 때 실행할 함수
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;

    setToDos((prevToDos) => {
      const copyToDos = [...prevToDos]; // for non-mutation
      // Delete item on source.index
      copyToDos.splice(source.index, 1);
      // Put back the item on the destination.index
      copyToDos.splice(destination!.index, 0, draggableId);

      return copyToDos;
    });
  };
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
                  // 컴포넌트 분리 및 props 전달
                  <DraggableCard key={todo} todo={todo} index={index} />
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
