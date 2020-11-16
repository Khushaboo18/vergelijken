import "../styles/App.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../actions/product.action";
import ProductView from "./ProductView";

const App = () => {
  const data = useSelector((state) => state.product);
  const dispatch = useDispatch();
  let featureList;
  let products;
  let checkboxList=new Map();
  let productCount=0;

  // Product details which are not features
  const nonFeatureList = [
    "salePrice",
    "manufacturerName",
    "grossPrice",
    "BUP_UOM",
    "BUP_Value",
    "uom",
    "productImage",
    "BUP_Conversion",
    "minQuantity",
    "manufacturerImage",
    "name",
    "sku",
    "listPrice",
    "channel",
    "display",
    "atp",
    "badges",
  ];

  useEffect(() => {
    // Action to fetch all products from API
    dispatch(productActions.getProduct());
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  if (data.items) {
    products = data.items.products;
    productCount=products.length;
    // Features which needs to be compared for all products
    featureList = Object.keys(products[0]).filter(
      (element) => !nonFeatureList.includes(element)
    );
    // Sort all features in alphabetical order irrespective of case
    featureList.sort((a, b) =>
     a.localeCompare(b)  //In case of locale specific sorting argument can be passed to this method 
    );
    // Setting initial value of all checkbox true to show all products compared
    products.map((product)=>{
    return checkboxList.set(product.Artikelnummer,true);
    })
  }

  //Render ProductView component only when API response data is not null
  function renderProductView(){
    if (data.items) {
      return <ProductView features={featureList} data={products} checkboxList={checkboxList} hideItemOption = {true}/>
    }
  }

  return (
    <div>
      <div className="App-header">{productCount} Producten Vergelijken</div>
      {renderProductView()}
    </div>
  );
};

 
export default App;
