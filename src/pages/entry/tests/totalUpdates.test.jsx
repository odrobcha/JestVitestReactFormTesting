import React from 'react';
import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';
import { expect } from 'vitest';

test('update scoop subtotal when scoops change', async () => {
    const user = userEvent.setup();
    render(<Options optionType="scoops"/>);

    // make sure total starts out $0.00
    const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
    expect(scoopsSubtotal).toHaveTextContent('0.00');

    // update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole('spinbutton', {
        name: 'Vanilla',
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');
    expect(scoopsSubtotal).toHaveTextContent('2.00');

    // update chocolate scoops to 2 and check subtotal
    const chocolateInput = await screen.findByRole('spinbutton', {
        name: 'Chocolate',
    });
    await user.clear(chocolateInput);
    await user.type(chocolateInput, '2');
    expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('Update toppings subtotal, when toppings changes', async () => {
    const user = userEvent.setup();
    render(<Options optionType="toppings"/>);

    const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false });
    expect(toppingsSubtotal).toHaveTextContent('0.00');

    const MandMCheckbox = await screen.findByRole('checkbox', { name: 'M&Ms' });
    await user.click(MandMCheckbox);
    expect(toppingsSubtotal).toHaveTextContent('1.50');

    const hotFudgeCheckbox = await screen.findByRole('checkbox', { name: 'Hot fudge' });
    await user.click(hotFudgeCheckbox);

    expect(toppingsSubtotal).toHaveTextContent('3.00');

    await user.click(MandMCheckbox);
    expect(toppingsSubtotal).toHaveTextContent('1.50');

});

describe('Grand total', () => {
    test('starts at 0.00', () => {
        const user = userEvent.setup();
       const {unmount} =  render(<OrderEntry/>);
        const grandTotal = screen.getByText('Grand total: $', { exact: false });
        expect(grandTotal).toHaveTextContent('0.00');
        unmount();

    });
    test('updates properly if scoops is added first', async () => {
        const user = userEvent.setup();
        render(<OrderEntry/>);

        const grandTotal = screen.getByText('Grand total: $', { exact: false });

        const vanillaInput = await screen.findByRole('spinbutton', {
            name: 'Vanilla',
        });
        await user.clear(vanillaInput);
        await user.type(vanillaInput, '1');
        expect(grandTotal).toHaveTextContent('2.00');

        const hotFudgeCheckbox = await screen.findByRole('checkbox', { name: 'Hot fudge' });
        await user.click(hotFudgeCheckbox);
        expect(grandTotal).toHaveTextContent('3.50');

    });
    test('updates properly if toppings is added first', async () => {
        const user = userEvent.setup();
        render(<OrderEntry/>);

        const grandTotal = screen.getByText('Grand total: $', { exact: false });

        const hotFudgeCheckbox = await screen.findByRole('checkbox', { name: 'Hot fudge' });
        if (hotFudgeCheckbox.checked) {
            await user.click(hotFudgeCheckbox);
        }
        const vanillaInput = await screen.findByRole('spinbutton', {
            name: 'Vanilla',
        });
        await user.clear(vanillaInput);
        await user.type(vanillaInput, '0');

        await user.click(hotFudgeCheckbox);
        expect(grandTotal).toHaveTextContent('1.50');

        await user.clear(vanillaInput);
        await user.type(vanillaInput, '1');
        expect(grandTotal).toHaveTextContent('3.50');

    });

    test('updates properly if the item is removed', async () => {
        const user = userEvent.setup();
        render(<OrderEntry/>);

        const grandTotal = screen.getByText('Grand total: $', { exact: false });

        const hotFudgeCheckbox = await screen.findByRole('checkbox', { name: 'Hot fudge' });

        await user.click(hotFudgeCheckbox);

        const vanillaInput = await screen.findByRole('spinbutton', {
            name: 'Vanilla',
        });
        await user.clear(vanillaInput);
        await user.type(vanillaInput, '2');

        expect(grandTotal).toHaveTextContent('5.50');

        await user.clear(vanillaInput);
        await user.type(vanillaInput, '1');
        await user.click(hotFudgeCheckbox);

        expect(grandTotal).toHaveTextContent('2.00');
    });
});
