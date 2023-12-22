import React from 'react';
import { http, HttpResponse } from 'msw';
import { server } from '../../../mocks/server';

import { render, screen, logRoles } from '../../../test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';
import { expect } from 'vitest';

test('Handles error for scoops and toppings', async () => {

    server.resetHandlers(
      http.get('http://localhost:3030/scoops', () => {
          return new HttpResponse(null, { status: 500 });
      }),

      http.get('http://localhost:3030/toppings', () => {
          return new HttpResponse(null, { status: 500 });
      })
    );

    // const {container} = render (<OrderEntry/>);
    render(<OrderEntry/>);
    const alerts = await screen.findAllByRole('alert');
    //  logRoles( container);

    expect(alerts).toHaveLength(2);
});
