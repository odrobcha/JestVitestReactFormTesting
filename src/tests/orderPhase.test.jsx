import {render, screen, logRoles} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from '../App';
import { expect } from 'vitest';
import { http, HttpResponse } from "msw";
import {server} from '../mocks/server';
test("order phases for happy path", async ()=>{
    const user = userEvent.setup();
    //render App
    const {container, unmount} = render(<App/>);

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
    const summaryHeading = screen.getByRole('heading', {name: "Order Summary"});
    expect(summaryHeading).toBeInTheDocument();

    const scoopsPrice = screen.getByText(/scoops:/i);
    expect(scoopsPrice).toHaveTextContent("$2.00");

    const toppingsPrice = screen.getByText(/toppings:/i);
    expect(toppingsPrice).toHaveTextContent("$1.50");

    const orderLists = screen.getAllByRole('list');
    expect(orderLists).toHaveLength(2);

    expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
    expect(screen.getByText("M&Ms")).toBeInTheDocument();

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
    expect(orderNumber).toHaveTextContent("111222");
    expect(loader).not.toBeInTheDocument();
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
    unmount();
});

test("order phases for happy path with no toppings", async ()=>{
    const user = userEvent.setup();
    //render App
    const {container, unmount} = render(<App/>);

    //add scoops
    const vanillaInput = await screen.findByRole('spinbutton', {
        name: 'Vanilla',
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');

    const orderButton = screen.getByRole("button", {name: /view order/i});
    await user.click(orderButton);
    // logRoles(container);
    // screen.debug();

    const orderLists = screen.getAllByRole('list');
    expect (orderLists).toHaveLength(1);
});

test("disable ViewOrder button when no scoop is chose", async ()=>{
    const user = userEvent.setup();
  //render App
    render(<App/>);

    //chose 0 scoops
    const vanillaInput = await screen.findByRole('spinbutton', {
        name: 'Vanilla',
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '0');

    const orderButton = screen.getByRole("button", {name: /view order/i});
    expect(orderButton).toBeDisabled();

    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');

    expect(orderButton).toBeEnabled();
});

test("If user input negative value to scoops, add red box around", async ()=>{
    const user = userEvent.setup();
    //render App
    const {container} = render(<App/>);

    //chose -2 scoops
    const vanillaInput = await screen.findByRole('spinbutton', {
        name: 'Vanilla',
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '-2');

    // logRoles(container);
    // screen.debug();
    const inputGroup = screen.getAllByTestId('inputGroup');
 //   console.log(inputGroup)

    let classes = '';
      inputGroup.forEach(element =>{
        if (element.className.includes("Vanilla")){
            classes = element.className
        }
    });
    expect(classes).toMatch(/warning/);

});

test("total is not updated, when incorrect scoop value(<0 or not number) is added", async ()=>{
    const user = userEvent.setup();
    //render App
    const {container} = render(<App/>);

    //select grand total
    const grandTotal = screen.getByText(/grand total/i);
    //input -2 scoops
    const vanillaInput = await screen.findByRole('spinbutton', {
        name: 'Vanilla',
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '-2');

    expect(grandTotal).toHaveTextContent("$0.00");

    //input not a number scoops
    await user.clear(vanillaInput);
    await user.type(vanillaInput, 'some string{enter}');

    expect(grandTotal).toHaveTextContent("$0.00");
});

test("Display error, when there is error response from the server", async() =>{
    const user = userEvent.setup();
    server.resetHandlers(
      http.post("http://localhost:3030/order",  () => {
          return  HttpResponse.json(null, {status: 500})
      }) );


    //render App
    const {container} = render(<App/>);

    //Make the order
    const vanillaInput = await screen.findByRole('spinbutton', {
        name: 'Vanilla',
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '2');

    //Confirm order
    const orderButton = screen.getByRole("button", {name: /view order/i});
    await user.click(orderButton);

    //accept T&C and click button to confirm order
    const checkbox = screen.getByRole('checkbox', { name: /I agree to/i });
    const confirmButton = screen.getByRole('button', { name: /confirm order/i });

    await user.click(checkbox);
    await user.click(confirmButton);

    //Find 1 alert element

   // screen.debug();
    const alerts = await screen.findAllByRole('alert');
   expect(alerts).toHaveLength(1);


});
