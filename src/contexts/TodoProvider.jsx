import React, {createContext, useContext, useReducer} from "react";
import reducer from "../reducers/Reducer";

export const TodoContext = createContext();
export default function TodoProvider({ children }) {

    const initialState = {
        nbElements: 5,
        startValue: 0,
        title: '',
        titleValid: undefined,
        search: '',
        message: '',
        idDel: -1,
        delConfirmation: undefined,
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