import { product } from "../reducers/product.reducer";
import { productConstants } from "../constants/product.constant";

describe("product", () => {

    let expectedState;
    let initialState;

    it("handle product request", () => {
        initialState={product:1};
        expectedState={product:1};
        expect(product(initialState,productConstants.GET_PRODUCTS)).toEqual(expectedState);
    });
});