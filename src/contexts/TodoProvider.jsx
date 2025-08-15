import React, {createContext, useContext, useReducer} from "react";
import reducer from "../reducers/Reducer";

export const TodoContext = createContext();
export default function TodoProvider({ children }) {

    const initialState = {
        user: null,
        nbElements: 5,
        startValue: 0,
        notification: null,
        title: '',
        titleValid: undefined,
        search: '',
        message: '',
        idDel: -1,
        inNotFonded: false,
        filter: 'all',
        loading: false,
        editTitle: '',
        pagination: 0,
        todos: [],
        globalTodos: [],
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <TodoContext.Provider value={{ state, dispatch }}>
            { children }
        </TodoContext.Provider>
    )

}

export const useTodoContext = () => useContext(TodoContext);