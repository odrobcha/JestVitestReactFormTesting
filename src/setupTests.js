import "@testing-library/jest-dom";

import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './mocks/server'

//Establish API mocking before all test
beforeAll(() => server.listen());

//Reset handlers in between tests
afterEach(() => server.resetHandlers());

//Clean up after the tests re finished
afterAll(() => server.close());
