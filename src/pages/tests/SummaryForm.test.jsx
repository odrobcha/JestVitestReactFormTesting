import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import { expect } from 'vitest';
import SummaryForm from '../summary/SummaryForm';

describe('Summary form', () => {
    test('Checkbox flow initial state', () => {

        render(<SummaryForm/>);
        const confirmButton = screen.getByRole("button", { name: /confirm order/i });
        const checkbox = screen.getByRole('checkbox', { name: /I agree to/i });

        expect(checkbox).not.toBeChecked();
        expect(confirmButton).toBeDisabled();

    });

    test('Checkbox flow when clicked', async () => {
        const user = userEvent.setup();

        render(<SummaryForm/>);
        const confirmButton = screen.getByRole('button', { name: /order/i });
        const checkbox = screen.getByRole('checkbox', { name: /I agree to/i });

        await user.click(checkbox);
        expect(confirmButton).toBeEnabled();

        await user.click(checkbox);
        expect(confirmButton).toBeDisabled();

    });

    test("popover response to hover", async () => {
        const user = userEvent.setup();
        render(<SummaryForm/>);

        //popover starts out hidden
        const popupNull = screen.queryByText(/no ice cream will/i);
        expect(popupNull).not.toBeInTheDocument();

        //popooverappears onmouseover of checkbox label
        const termsAndConditions = screen.getByText(/terms and conditions/i);
        await user.hover(termsAndConditions);
        const popup = screen.getByText(/no ice cream will/i);
        expect(popup).toBeInTheDocument();

        //popover disappears with wemouse out
        await user.unhover(termsAndConditions);
        expect(popup).not.toBeInTheDocument();

    })
});
