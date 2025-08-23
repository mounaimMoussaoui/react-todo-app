import {act, render, renderHook, screen, waitFor} from "@testing-library/react";
import AlertBox from "../AlertBox";
import TodoProvider, {useTodoContext} from "../../contexts/TodoProvider";
import userEvent from "@testing-library/user-event";


describe('test Alert Box Component', () => {
    test('should render correctly', async () => {
        render(
            <TodoProvider>
                <AlertBox />
            </TodoProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Title: Warning/i)).toBeInTheDocument();
        });
    });

    // test('Button <- Yes -> I The Alert Working', async () => {
    //
    //         render(
    //             <TodoProvider>
    //                 <AlertBox />
    //             </TodoProvider>
    //         );
    //
    //     await act(() => {
    //         return (() => {
    //             const confirmBtn = screen.getByTestId("confirmBtn");
    //             userEvent.click(confirmBtn);
    //         })();
    //     });
    //
    //     await waitFor(() => {
    //         expect(screen.getByText(/Todo Task With This Id \d Removed Successfully/i)).toBeInTheDocument();
    //     });
    // });

})