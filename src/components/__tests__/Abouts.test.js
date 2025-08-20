import { render, screen } from '@testing-library/react';
import {Abouts} from '../Abouts';

it('render in Abouts Page', () => {
    render(<Abouts />);
    const headerElement = screen.getByText(/Abouts/i);
    expect(headerElement).toBeInTheDocument();
});

