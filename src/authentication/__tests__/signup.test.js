import {Signup} from "../Signup";
import {act, render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import TodoProvider from "../../contexts/TodoProvider";
import AuthenticationProvider from "../../contexts/AuthenticationProvider";
import userEvent from "@testing-library/user-event";

describe("Testing Signup Loading And Signing Accounts", () => {
    test("Testing Signup Load Successfully", async () => {
        render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <TodoProvider>
                    <AuthenticationProvider>
                        <Signup />
                    </AuthenticationProvider>
                </TodoProvider>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Sing Up Page/i)).toBeInTheDocument();
        });
    });

    test("Testing Validation Of Identifier Filed", async () => {
        render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <TodoProvider>
                    <AuthenticationProvider>
                        <Signup />
                    </AuthenticationProvider>
                </TodoProvider>
            </MemoryRouter>
        );

        const identifier = screen.getByTestId("identifier");
        const signupBtn = screen.getByTestId("SignupBtn");

         await act(() => {
            return  ( async() => {
                await userEvent.type(identifier, "@A");
                await userEvent.click(signupBtn);
            })();
        });

        await waitFor(() => {
            expect(screen.getByText(/(Identifier is required)|(identifier must be at least 5 characters)/i)).toBeInTheDocument();
        });
    });

    test("Testing Validation Of FullName Filed", async () => {
        render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <TodoProvider>
                    <AuthenticationProvider>
                        <Signup />
                    </AuthenticationProvider>
                </TodoProvider>
            </MemoryRouter>
        );

        const fullName = screen.getByTestId("fullName");
        const signupBtn = screen.getByTestId("SignupBtn");

        await act(() => {
            return  ( async() => {
                await userEvent.type(fullName, "@A");
                await userEvent.click(signupBtn);
            })();
        });

        await waitFor(() => {
            expect(screen.getByText(/(Full name is required)|(fullName must be at least 6 characters)/i)).toBeInTheDocument();
        });
    });

    test("Testing Validation Of Email Filed", async () => {
        render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <TodoProvider>
                    <AuthenticationProvider>
                        <Signup />
                    </AuthenticationProvider>
                </TodoProvider>
            </MemoryRouter>
        );

        const email = screen.getByTestId("email");
        const signupBtn = screen.getByTestId("SignupBtn");

        await act(() => {
            return  ( async() => {
                await userEvent.type(email, "");
                await userEvent.click(signupBtn);
            })();
        });

        await waitFor(() => {
            expect(screen.getByText(/(Email is required)|(email must be a valid email)/i)).toBeInTheDocument();
        });
    });

    test("Testing Validation Of Password Filed", async () => {
        render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <TodoProvider>
                    <AuthenticationProvider>
                        <Signup />
                    </AuthenticationProvider>
                </TodoProvider>
            </MemoryRouter>
        );

        const password = screen.getByTestId("password");
        const signupBtn = screen.getByTestId("SignupBtn");

        await act(() => {
            return  ( async() => {
                await userEvent.type(password, "dd");
                await userEvent.click(signupBtn);
            })();
        });

        await waitFor(() => {
            expect(screen.getByText(/(password is a required field)|(Please Enter A Strong Password)/i)).toBeInTheDocument();
        });
    });

    test("Testing Validation Of confirm Password Filed", async () => {
        render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <TodoProvider>
                    <AuthenticationProvider>
                        <Signup />
                    </AuthenticationProvider>
                </TodoProvider>
            </MemoryRouter>
        );

        const confirmPassword = screen.getByTestId("confirmPassword");
        const signupBtn = screen.getByTestId("SignupBtn");

        await act(() => {
            return  ( async() => {
                await userEvent.type(confirmPassword, "dds");
                await userEvent.click(signupBtn);
            })();
        });

        await waitFor(() => {
            expect(screen.getByText(/Confirm Password Must Be Equal Password/i)).toBeInTheDocument();
        });
    });


    test("Testing Signup An Account Successfully", async () => {
       render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <TodoProvider>
                    <AuthenticationProvider>
                        <Signup />
                    </AuthenticationProvider>
                </TodoProvider>
            </MemoryRouter>
        );

        const identifier = screen.getByTestId("identifier");
        const fullName = screen.getByTestId("fullName");
        const email = screen.getByTestId("email");
        const password = screen.getByTestId("password");
        const ConfirmPassword = screen.getByTestId("confirmPassword");
        const signupBtn = screen.getByTestId("SignupBtn");

        await act(() => {
            return  ( async() => {
                await userEvent.type(identifier, 'User Testing');
                await userEvent.type(fullName, 'User For Test');
                await userEvent.type(email, 'testingUser@mail.com');
                await userEvent.type(password, 'ASD44asd');
                await userEvent.type(ConfirmPassword, 'ASD44asd');
                await userEvent.click(signupBtn);
            })();
        });

        await waitFor(() => {
             expect(screen.getByText(/(?=.) Your Account Create Successfully/i)).toBeInTheDocument();
        });
    });
});