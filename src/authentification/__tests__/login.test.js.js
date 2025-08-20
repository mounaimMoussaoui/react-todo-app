import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {Login} from "../Login";
import AuthenticationProvider from "../../contexts/AuthenticationProvider";
import {MemoryRouter} from "react-router-dom";
import TodoProvider from "../../contexts/TodoProvider";


test('Login page renders without crashing', async () => {
    render(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AuthenticationProvider>
                <TodoProvider >
                    <Login />
                </TodoProvider>
            </AuthenticationProvider>
        </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('login'));

    await waitFor( () => {
        expect(screen.getByText(/Authentication Page/i)).toBeInTheDocument();
    });
})