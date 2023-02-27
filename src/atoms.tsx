import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface ITodo {
    id: number;
    text: string;
}

interface IToDoState {
    [key: string]: ITodo[];
}

const {persistAtom} = recoilPersist();

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        "할 일": [],
        "하는중": [],
        "한 일": [],
    },
    effects_UNSTABLE : [persistAtom],
});