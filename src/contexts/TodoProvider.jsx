import React, {createContext, useContext, useMemo, useReducer} from "react";
import reducer from "../reducers/Reducer";

export const TodoContext = createContext();
export default function TodoProvider({ children }) {

    const initialState = {
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
    const value = useMemo(() => ({ state, dispatch }), [ state, dispatch ])
    return (
        <TodoContext.Provider value={value}>
            { children }
        </TodoContext.Provider>
    )

}

export const useTodoContext = () => useContext(TodoContext);