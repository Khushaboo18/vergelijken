import { productConstants } from "../constants/product.constant";
import { productService } from "../services/product.service";

export const productActions = {
  getProduct,
};

function getProduct() {
  return (dispatch) => {
    return productService
      .getProducts()
      .then((products) => dispatch(success(products)));
  };
  function success(products) {
    return { type: productConstants.GET_PRODUCTS, products };
  }
}
