import { render, screen } from "@testing-library/react";
import TodoProvider from "../../contexts/TodoProvider";
import {NotFoundPage} from "../NotFoundPage";
import {MemoryRouter} from "react-router-dom";


it("Renders without crashing",  () => {
     render(<MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
             <TodoProvider >
                <NotFoundPage />
             </TodoProvider >
        </MemoryRouter>);
    const titleElement = screen.getByTestId(/message/i);
    expect(titleElement).toBeInTheDocument();
})