import { productActions } from "../actions/product.action";
import configureMockStore from "redux-mock-store";
import { productConstants } from "../constants/product.constant";
import thunk from "redux-thunk";
import axios from "axios";
jest.mock('axios');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const DEFAULT_STATE =  {
    
    products:[]
}
//const store = mockStore(DEFAULT_STATE);
describe("productActions",()=>{
   
    it("getProducts action creator return expected action",()=>{
        axios
        .get('https://5f993a3050d84900163b845a.mockapi.io/eriks/products/all')
        .then(200, { body: { products: [{ 'corpo_id': 5629, id: 1382796, name: 'masm' }] } })
    
        const expectedActions = [
          { type: productConstants.GET_PRODUCTS }, { body: { products: [{ 'corpo_id': 5629, id: 1382796, name: 'masm' }] }}
        ]
    
        const store = mockStore({ products: [] })
    
        return store.dispatch(productActions.getProduct()).then((data) => {
          expect(store.getActions()).toEqual(expectedActions)
        })
      })
})