import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoState } from "../atoms";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) =>
        props.isDragging ? "#e4f2ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
        props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`;

const DeleteImg = styled.div`
    background: url(delete_4219.png) no-repeat right/contain;
    width: 60px;
    height: 23px;
    float: right;
    position: relative;
    top: -2px;
    z-index: 99;
`;

interface IDragabbleCardProps {
    toDoId: number;
    toDoText: string;
    index: number;
    boardId: string;
}

function DragabbleCard({ toDoId, toDoText, index, boardId }: IDragabbleCardProps) {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const deleteClick = () => {
        setToDos((allBoards) => {
            const boardCopy = [...allBoards[boardId]];
            boardCopy.splice(index, 1);
            return {
                ...allBoards,
                [boardId]: boardCopy,
            };
        });
    }
    return (
        <Draggable draggableId={toDoId + ""} index={index}>
            {(magic, snapshot) => (
                <Card
                    isDragging={snapshot.isDragging}
                    ref={magic.innerRef}
                    {...magic.dragHandleProps}
                    {...magic.draggableProps}
                >
                    {toDoText}
                    <DeleteImg onClick={deleteClick} />
                </Card>
            )}
        </Draggable>
    );
};

export default React.memo(DragabbleCard);