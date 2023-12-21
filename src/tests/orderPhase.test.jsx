import {render, screen, logRoles} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from '../App';
import { expect } from 'vitest';

test("orederphases for happy path", async ()=>{
    const user = userEvent.setup();
    //render App
    const {container} = render(<App/>);

    //add scoops
    const vanillaInput = await screen.findByRole('spinbutton', {
        name: 'Vanilla',
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');
    //add scoops and toping
    const MandMCheckbox = await screen.findByRole('checkbox', { name: 'M&Ms' });
    await user.click(MandMCheckbox);

    //click order button

    const orderButton = screen.getByRole("button", {name: /view order/i});
    await user.click(orderButton);
    //check summary

    const scoopsPrice = screen.getByText(/scoops:/i);
    expect(scoopsPrice).toHaveTextContent("$2.00");

    const toppingsPrice = screen.getByText(/toppings:/i);
    expect(toppingsPrice).toHaveTextContent("$1.50");

    const orderLists = screen.getAllByRole('list');
    expect(orderLists).toHaveLength(2);

    //accept T&C and click button to confirm order
    const checkbox = screen.getByRole('checkbox', { name: /I agree to/i });
    const confirmButton = screen.getByRole('button', { name: /confirm order/i });

    await user.click(checkbox);
    await user.click(confirmButton);

    // screen.debug();
    // logRoles(container);

    const loader = await screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
    // confirm order number on confirmation page

    const orderNumber =  await screen.findByText(/order number/i);
    expect(orderNumber).toHaveTextContent("111222")
   //click "new order" button on confirmation page

    const newOrder = screen.getByRole("button", {name: /new order/i});
    await user.click(newOrder);
    //check that scoops and toppings been update



    const vanillaInputUpd = await screen.findByRole('spinbutton', {
        name: 'Vanilla',
    });
    expect(vanillaInputUpd.value).toEqual("0");

    const MandMCheckboxUpd = await screen.findByRole('checkbox', { name: 'M&Ms' });
    expect(MandMCheckboxUpd.checked).toEqual(false);

});
