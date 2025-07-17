import {
    ADD_TODO,
    REMOVE_TODO,
    SET_DONE,
    SORTED_LIST_TODO,
    SET_TITLE_VALUE,
    SET_VALUE_SEARCH,
    FILTERED_TODOS,
    EDIT_TODO,
    CLEAN_TODOS_DONE,
    LOAD_DATA,
    SET_TITLE_VALID,
    SET_EDITING_TITLE,
    SET_MESSAGE_VALUE,
    SET_PAGINATION,
    SET_LOADING,
    SET_GLOBAL_TODOS,
    SET_DELETED_ID
} from "../constants/actionTypes";

export default function reducer(state, action) {
    switch(action.type) {
        case `${ADD_TODO}`:
            return {
                ...state,
                todos: [action.payload ,...state.todos],
            };
        case `${REMOVE_TODO}`:
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.payload)
            };
        case `${SET_DONE}`: return {
            ...state,
            todos: state.todos.map( todo =>  todo.id === action.payload.id ? {...todo, done: action.payload.value} : todo ),
        };
        case `${SORTED_LIST_TODO}`: return {
            ...state,
            todos: state.todos = [...state.todos.filter((todo) => !todo.done), ...state.todos.filter((todo) => todo.done)],
        };
        case `${FILTERED_TODOS}`:
            return {
            ...state,
            filter: action.payload
        };
        case `${EDIT_TODO}`: return {
            ...state,
            todos: state.todos.map(todo => {
                if(todo.id === action.payload.id) {
                    todo.title = action.payload.titleEditing;
                }
                return todo;
            })
        };
        case `${CLEAN_TODOS_DONE}`: return {
          ...state,
          todos: state.todos.filter((todo) => !todo.done)
        };
        case `${LOAD_DATA}`: return {
            ...state,
            todos: [...action.payload],
        };
        case `${SET_VALUE_SEARCH}`: return {
            ...state,
            search: action.payload,
        };
        case `${SET_TITLE_VALUE}`: return {
            ...state,
            title: action.payload,
        };
        case `${SET_TITLE_VALID}`: return {
            ...state,
            titleValid: action.payload,
        };
        case `${SET_EDITING_TITLE}`: return {
          ...state,
          editTitle: action.payload,
        };
        case `${SET_MESSAGE_VALUE}`: return {
            ...state,
            message: action.payload,
        };
        case `${SET_PAGINATION}`: return {
            ...state,
            pagination: state.pagination + action.payload,
        };
        case `${SET_GLOBAL_TODOS}`: return {
          ...state,
          globalTodos: action.payload,
        };
        case `${SET_LOADING}`: return {
            ...state,
            loading: action.payload,
        };
        case `${SET_DELETED_ID}`: return {
            ...state,
            idDel: action.payload,
        }
        default: return state;
    }
}