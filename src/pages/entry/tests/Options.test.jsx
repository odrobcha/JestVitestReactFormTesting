import {render, screen} from '@testing-library/react';
import Options from '../Options';
import { expect } from 'vitest';

test('Displays image for each scoop from the server', async ()=>{
    render(<Options optionType="scoops"/>);

    // find images

    const scoopImages = await screen.findAllByRole('img', {name: /scoop$/i}) //every image have the altText with the 'scoop" in the end (this $ point and the end);
    expect(scoopImages).toHaveLength(2);

    // confirm alt text of images
    const altText = scoopImages.map((element) => {return element.alt});
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);



});
