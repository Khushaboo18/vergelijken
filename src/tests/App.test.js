import { render, screen } from '@testing-library/react';
import App from '../components/App';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe("<App />", () => {
const intialState = {
 counterValue:5
}
const store = mockStore(intialState);
  it("Renders <App /> component correctly", () => {
    
    const { getByText } = render(<Provider store={store}><App /></Provider>);
    expect(getByText(/Producten Vergelijken/i)).toBeInTheDocument();
  });
});