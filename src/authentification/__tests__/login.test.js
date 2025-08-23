import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {Login} from "../Login";
import AuthenticationProvider from "../../contexts/AuthenticationProvider";
import {MemoryRouter} from "react-router-dom";
import TodoProvider from "../../contexts/TodoProvider";
import userEvent from "@testing-library/user-event";


describe("Login Cases Study Before Create And After Creating Account", () => {

test('Login Handled authentication Filed', async () => {
    render(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AuthenticationProvider>
                <TodoProvider >
                    <Login />
                </TodoProvider>
            </AuthenticationProvider>
        </MemoryRouter>
    );

    const identifier =  screen.getByTestId("fieldIdentifier");
    const password =  screen.getByTestId("fieldPassword");
    const loginBtn = screen.getByTestId('login');

    await userEvent.type(identifier, "@user100");
    await userEvent.type(password, "A4s");

    fireEvent.click(loginBtn);

    await waitFor( () => {
        expect(screen.getByText(/Oops: Your Don't Have Account Signing Up First/i)).toBeInTheDocument();
    });
});


it('Login Handled authentication passed', async () => {
    render(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AuthenticationProvider>
                <TodoProvider >
                    <Login />
                </TodoProvider>
            </AuthenticationProvider>
        </MemoryRouter>
    );

    const identifier =  screen.getByTestId("fieldIdentifier");
    const password =  screen.getByTestId("fieldPassword");
    const loginBtn = screen.getByTestId('login');

    await userEvent.type(identifier, "@Admin123");
    await userEvent.type(password, "QAZ123qaz");

    fireEvent.click(loginBtn);

    await waitFor( () => {
        expect(screen.getByText(/Welcome You're Login Now (?=.)/i)).toBeInTheDocument();
    });
});
});

