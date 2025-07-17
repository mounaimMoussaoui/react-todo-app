import React, {useEffect, useMemo} from "react";
import TodoItem from "./components/TodoItem";
import FormUI from "./components/FormUI";
import PaginationForm from "./components/PaginationForm";
import styles from "./style/ModularStyle.module.scss";
import {useTodoContext} from "./contexts/TodoProvider";
import {LOAD_DATA, SET_GLOBAL_TODOS, SET_LOADING} from "./constants/actionTypes";
import Loader from "./components/Loader";
import useLocalStorage from "./customsHooks/useLocalStorage";

function App() {

    const { state, dispatch } = useTodoContext();

    const [ todos, setTodos ] = useLocalStorage('todos', []);

    useEffect(() => {
        try {
            dispatch({type: LOAD_DATA, payload: todos});
            dispatch( {type: SET_LOADING, payload: true} );
        } catch {
            console.log("Error loading todos");
        }
    }, [dispatch]);

    useEffect(() => {
        try {
            const liveTodos = state.todos;
            setTodos(liveTodos);
            dispatch( {type: SET_GLOBAL_TODOS, payload: state.todos } );
            dispatch( {type: SET_LOADING, payload: true} );
        } catch(err) {
            console.error(err);
        }
    }, [state.todos, dispatch, setTodos]);

    const fltSerTodos = useMemo(() => {
        return state.filter === "completed" ? todos.filter((todo) => todo.done === true)
            : state.filter === 'active' ? todos.filter((todo) => todo.done === false) : state.search !== ""
            ? todos.filter(todo => todo.title.toLowerCase().includes(state.search.toLowerCase())) : todos;

    }, [todos, state.filter, state.search]);

    useEffect(() => {
        dispatch( {type: SET_GLOBAL_TODOS, payload: fltSerTodos } );
    }, [dispatch, fltSerTodos]);

    const visibleTodos = useMemo( () => {

        return state.globalTodos.slice(state.startValue + state.pagination, state.nbElements + state.pagination);

    }, [state.globalTodos, state.startValue, state.nbElements, state.pagination]);

    return (
       <section className={styles.container}>
           <FormUI />
           <ul className={styles.todoList}>
                { !state.loading ? <Loader />
                   : state.globalTodos.length > 0
                   ? visibleTodos.map((item) => (
                        <TodoItem task={item} key={item.id}
                                  textDecoration={item.done}
                        />
                    )) : "No Task Have Yet"
                }
            </ul>
            <PaginationForm />
       </section>
       );
}

export default App;