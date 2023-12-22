import {formatCurrency} from './index'
import { expect } from 'vitest';

test("formatCurrency", () =>{
    const dollarCurrency = formatCurrency(2);
    expect(dollarCurrency).toEqual("$2.00");

    const dollarCurrency1 = formatCurrency(2.1);
    expect(dollarCurrency1).toEqual("$2.10");
});
