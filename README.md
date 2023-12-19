# Starter code for Sundaes on Demand

Created for the Udemy course [React Testing Library with Jest / Vitest](https://www.udemy.com/course/react-testing-library)

## How this project was created

This project was created using this command:

```sh
npm create vite@latest sundae-starter -- --template react
```

and then following all of the steps below.

I also removed a few unnecessary files, and updated

- App.jsx
- index.css
- this README file 😄

## Install React Boostrap, Vitest, and React Testing Library

```sh
npm install -D vitest @vitest/ui eslint-plugin-vitest
npm install -D jsdom @testing-library/jest-dom @testing-library/react eslint-plugin-jest-dom eslint-plugin-testing-library
npm install bootstrap react-bootstrap
```

## Add Bootstrap

Add this line to _src/main.jsx_:

```js
import "bootstrap/dist/css/bootstrap.min.css";
```

## Update port to 3000

To match the expectation of the sundae server, and avoid CORS errors, add this to the property / value to the `defineConfig` argument in _vite.config.js_:

```js
  server: {
    port: 3000,
    // exit if port 3000 is in use (to avoid CORS errors; server expects port 3000)
    strict: true,
  },
```

## Add `start` script to package.json

In order to match the legacy course videos (which were filmed with create-react-app), add this to the _package.json_ `scripts` array:

```json
    "start": "vite",
```

## Install future dependencies

For folks using this as a starter for adding React code, run these installs:

```sh
npm install -D @testing-library/user-event msw
npm install axios
```

## Add test script to package.json `test` object

```json
  "test": "vitest --watch"
```

## Add a test setup file

To make [jest-dom matchers](https://github.com/testing-library/jest-dom#custom-matchers) available in all test files:

1. create new file _src/setupTests.js_
1. add these contents:

```js
import "@testing-library/jest-dom";
```

## Add Vitest and Testing Library plugins to ESLint

In _.eslintrc.cjs_:

1. Add these to to the `extends` array:

```js
   'plugin:testing-library/react',
   'plugin:vitest/recommended',
```

1. This step avoids linting errors when using the `test` and `expect` Vitest globals without importing them first.

At the top, require the Vitest plugin:

```js
const vitest = require("eslint-plugin-vitest");
```

Then Add this property / value to the top-level `module.exports` object:

```js
    globals: {
      ...vitest.environments.env.globals,
    },
```

## Update a few ESLint rules

Add these to the `rules` array in _.eslintrc.cjs_:

```js
    "no-unused-vars": "warn", // warning, not error
    "vitest/expect-expect": "off", // eliminate distracting red squiggles while writing tests
    "react/prop-types": "off", // turn off props validation
```

## Add Automatic ESLint and Prettier formatting on save

1. Install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions in VSCode if they're not already installed.
1. Create _.vscode/settings.json_ file.
1. Add these contents:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

**Note**: if you're having issues getting ESLint to work properly with VSCode, please see [this troubleshooting guide](https://dev.to/bonnie/eslint-prettier-and-vscode-troubleshooting-ljh).

## Update vite configuration for tests

Update _vite.config.js_ based on the [Vitest Testing Library example](https://github.com/vitest-dev/vitest/blob/main/examples/react-testing-lib/vite.config.ts). Add this property / value to the `defineConfig` argument:

```js
  test: {
    globals: true,
    environment: "jsdom",
    // this points to the setup file created earlier
    setupFiles: "./test/setup.js",
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,
  },
```

## Command to run tests in watch mode

```sh
npm test
```

## Reference

- [creating a Vite project](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)
- [Vitest Testing Library example](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib)
- [Vitest ESLint plugin](https://www.npmjs.com/package/eslint-plugin-vitest)



TDD - test driven development
Writes test before write code and then write thec ode till test passes
- write function Component without any code
- write code
- tests pass

##Jest/Vitest

- runs and executes test

## testing-library

- creates simulated DOM structure without browser
- provide utilities to interact with this DOM (find element, click, ...)

## render()

It creates simulated DOM

- import { render} from "@testing-library/react";
- render(<Component/>)

## screen

It gives access to simulated DOM
- import { screen } from "@testing-library/react";


## Debagging
Documentation https://testing-library.com/docs/dom-testing-library/api-debugging/

- logRoles

    - import {logRoles} from '@testing-library/dom'
    - const {container} = render(<App />);
    - logRoles(container);

## Find Elements

Documentation can be found here https://testing-library.com/docs/queries/about/#priority
Command:

- get - expect element to be in the DOM
- query - expect element
- find - expect element to appear async

[All] - expect mor the 1 match . Returns array

QueryType:

- RolesAltText
- Text
- Form element
    - Placeholders
    - labelText
    - DisplayValue

Documentation

- https://testing-library.com/docs/queries/about/
- https://testing-library.com/docs/react-testing-library/cheatsheet/
- https://testing-library.com/docs/queries/about/#priority

---- | No Match | 1 Match | 1+ Match | Await

getBy | throw | return | throw | No

findBy | throw | return | throw | Yes

queryBy | null | return | throw | No

getAllBy | throw | array | array | No

findAllBy | throw | array | array | Yes

queryAllBy | [] | array | array | No

For example:

- screen.getByText(STRING) OR screen.getByText(/text/i) (regula expression)
    Using STRING has to be exactly the searching phrase

- screen.getByRole('role', {name: XXX})

-

### All roles can be found here
- https://www.w3.org/TR/wai-aria/#role_definitions
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role

### All matchers can be found here
- https://github.com/testing-library/jest-dom

- expect(buttonElement).toHaveTextContent(/text/i)
- expect(buttonElement).toHaveClass("blue");


##E vents

- import { fireEvent } from '@testing-library/react';

OR
- install @testing-library/user-event
- import userEvent from "@testing-library/user-event";

Using userEvent we need to start session

    user =userEvent.setup()

#### it always return a PROMISE
therefore test has to be async
and await user.click

## Mock Service Worker
Documentation
- https://mswjs.io/

- install `npm install msw`
- Create handlers - function that defines what is returned from particular uri route
    - create /mocks/handlers.js
    - create function that returs the responce for each route:

    import { http, HttpResponse } from 'msw'

    export const handlers = [
        http                              //http handler type for REST API - it is http for GRAPHQL - it is graphql
        .post(                            // method
        '/auth',                          //URL
        () => {
            return HttpResponse.json({    //response
                user: {
                    id: 'abc-123',
                    name: 'John Maverick',
                },
            })
        }),
    ]

- Create test server

 Use Node.js integration
    - Create mocks/server.js
        import { setupServer } from 'msw/node'
        import { handlers } from './handlers'

        export const server = setupServer(...handlers)

    - Enable mocking
    Edit setupTests.js
         import { beforeAll, afterEach, afterAll } from 'vitest'
         import { server } from './mocks/server

         beforeAll(() => server.listen())
         afterEach(() => server.resetHandlers())
         afterAll(() => server.close())


- Make sure test server listen during all tests and intersept all server calls (setup.js)
    - reset after each test

### ANYTIME dealing with async request USE async/await in test and findBy
