import React, {Suspense, useEffect, useMemo, useRef} from "react";
import {FormUI} from "./components/FormUI";
import {PaginationForm} from "./components/PaginationForm";
import styles from "./style/ModularStyle.module.scss";
import {useTodoContext} from "./contexts/TodoProvider";
import {LOAD_DATA, SET_GLOBAL_TODOS, SET_LOADING} from "./constants/actionTypes";
import {Loader} from "./components/Loader";
import useLocalStorage from "./customsHooks/useLocalStorage";
import {TodoItem} from "./components/TodoItem";
import {motion} from "framer-motion";
import {NotificationBox} from "./components/NotificationBox";

const AlertBox = React.lazy(() => import("./components/AlertBox"));

export const App = React.memo(() => {
    const { state, dispatch } = useTodoContext();

    const [ todos, setTodos ] = useLocalStorage('todos', []);

    const listTodos = useRef(null);

    useEffect(() => {
        try {
            dispatch( {type: SET_LOADING, payload: true} );
            dispatch({type: LOAD_DATA, payload: todos })
            dispatch( {type: SET_LOADING, payload: false} );
        } catch {
            console.log("Error loading todos");
        }
    // eslint-disable-next-line
    }, []);

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
       if(state.filter === "completed") {
            return todos.filter((todo) => todo.done === true);
        } else if(state.filter === "active") {
            return todos.filter((todo) => todo.done === false);
        } else if(state.search !== "") {
            return todos.filter(todo => todo.title.toLowerCase().includes(state.search.toLowerCase()))
        } else {
            return todos;
        }
   //eslint-disable-next-line
    }, [state?.filter, state?.search]);

    useEffect(() => {
        dispatch( {type: SET_GLOBAL_TODOS, payload: fltSerTodos } );
    }, [dispatch, fltSerTodos]);

    const visibleTodos = useMemo( () => {

        return Array.isArray(state.globalTodos) && state.globalTodos.slice(state.startValue + state.pagination, state.nbElements + state.pagination);

    }, [state.globalTodos, state.startValue, state.nbElements, state.pagination]);

    return (
       <motion.section initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.5}}} className={styles.container}>
           { state.notification ? <NotificationBox /> : null }
           <FormUI />
           <motion.ul ref={listTodos} className={styles.todoList}>
               <Suspense fallback={<Loader />}>
                   {visibleTodos.length > 0
                       ? visibleTodos?.map((item) => {
                           return <TodoItem task={item} key={item.id} textDecoration={item.done} listTodos={listTodos} />
                       }) : "No Tasks Yet"}
               </Suspense>
           </motion.ul>
            <PaginationForm />
           { state.message ? <Suspense fallback={<Loader />}><AlertBox /></Suspense> : null}
       </motion.section>
       );
})