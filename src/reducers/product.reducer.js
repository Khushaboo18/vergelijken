import { productConstants } from "../constants/product.constant";

export function product(state = {}, action) {
  switch (action.type) {
    case productConstants.GET_PRODUCTS:
      return {
        items: action.products,
      };

    default:
      return state;
  }
}
