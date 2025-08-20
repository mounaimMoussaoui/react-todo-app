import { render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import TodoProvider from '../../contexts/TodoProvider';
import {TodoItem} from '../TodoItem.jsx';


it("renders New Task", () => {

    const task = {
        id: 400,
        title: 'New Task',
        done: false,
    }

    render(
        <MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
            <TodoProvider>
                <TodoItem  key={task.id} task={task} textDecoration={task.done} listTodos={null} />
            </TodoProvider>
        </MemoryRouter>
    );
    const addedTask =  screen.getByText(/New Task/i);
    expect( addedTask ).toBeInTheDocument();
});