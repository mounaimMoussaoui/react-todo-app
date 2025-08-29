import { render, screen } from '@testing-library/react';
import {About} from '../About';

it('render in About Page', () => {
    render(<About />);
    const headerElement = screen.getByText(/About/i);
    expect(headerElement).toBeInTheDocument();
});

