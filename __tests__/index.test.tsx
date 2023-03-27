import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Home from '../src/pages/index';

const mockStore = configureStore([thunk]);

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserverMock;

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../src/lib/firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
    currentUser: {},
  },
}));

jest.mock('../src/lib/unsplash', () => ({
  getRandomPhoto: jest.fn(),
}));

jest.mock('../src/store/reducers/todos.reducer', () => ({
  getTodoList: jest.fn(),
}));

describe('Home', () => {
  let store: any;

  const initialState = {
    todos: {
      todos: [
        {
          id: '1',
          title: 'Test ToDO 1',
          description: 'Test Description 1',
          completed: false,
        },
        {
          id: '2',
          title: 'Test ToDO 2',
          description: 'Test Description 2',
          completed: true,
        },
      ],
    },
  };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders Navbar', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const navbarElement = screen.getByRole('navigation');
    expect(navbarElement).toBeInTheDocument();
  });

  it('renders "Add ToDo" button', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const buttonElement = screen.getByText('Add ToDO');
    expect(buttonElement).toBeInTheDocument();
  });

  it('displays SidePanel when "Add ToDo" button is clicked', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const buttonElement = screen.getByText('Add ToDO');
    act(() => {
      fireEvent.click(buttonElement);
    });

    const sidePanelElement = screen.getByTestId('side-panel');
    expect(sidePanelElement).toBeInTheDocument();
  });
});
