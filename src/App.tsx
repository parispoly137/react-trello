import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.section`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  // ★ drag가 끝났을 때 실행할 함수
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;

    if (!destination) return;

    // 같은 보드 내 이동
    if (destination.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const copyBoard = [...allBoards[source.droppableId]]; // 깊은 복사
        // 삭제할 요소를 따로 object로 grab 한 뒤에 나중에 붙이는 방식
        const taskObj = copyBoard[source.index];
        copyBoard.splice(source.index, 1); // 대상을 제거
        copyBoard.splice(destination.index, 0, taskObj); // 대상을 원하는 위치에 추가

        // 원래의 객체 형태로 return
        return {
          ...allBoards,
          [source.droppableId]: copyBoard, // key는 대괄호 형태로
        };
      });
    }

    // 다른 보드 간의 이동
    if (destination.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]]; // 시작 보드 ~ 깊은 복사
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]]; // 목표 보드 ~ 깊은 복사

        // 시작 보드에서 제거 후, 목표 보드에 해당 요소 추가
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);

        // 객체 형태 리턴
        return {
          ...allBoards,
          [destination.droppableId]: destinationBoard,
          [source.droppableId]: sourceBoard,
        };
      });
    }
  };
  return (
    // DragDropContext ~ onDragEnd 필수
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {/* key만을 이용하여 mapping ~ boardId */}
          {Object.keys(toDos).map((boardId) => (
            <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
