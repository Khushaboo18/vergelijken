import React, { Component } from "react";
import "../styles/ProductView.scss";


class ProductView extends Component {
  constructor(props) {
    super(props);
    // Binding events with this
    this.hideProduct = this.hideProduct.bind(this);
    this.handleChange = this.handleChange.bind(this);
    let handleHide = this.hideProduct;
    if (this.props.onHide) {
      handleHide = this.props.onHide
    }
    this.state = {
      productDataList: this.props.data,
      productListTodisplay: this.props.data,
      handleHideProduct: handleHide,
      checkedItems:this.props.checkboxList
    };
  }
  
  render(){
    // creating a comparison table having thead to display products and tbody to display features
  return (
    <div className="compare-table">
        <table className="table" striped>
          {this.generateHeader(this.state.productListTodisplay)}
          {this.generateBody(this.state.productListTodisplay)}
        </table>
      </div>
  );
  }

  //Method to render header of table containing a th to display checkboxes for all products
  generateHeader=(data) =>{
    return (
      <thead>
        <tr>
          <th className="product-filter"><tr>
            <div className="filter-header">Je selectie</div><br />
                {this.state.productDataList.map((product, i) =>
                <div className="filter-items">
                  <label>
                    <input type="checkbox"
                    checked={this.state.checkedItems.get(product.Artikelnummer)} 
                    name={product.Artikelnummer}
                    className="checkbox"
                    key={i}
                    onChange={this.handleChange}
                    />
                    <span>{product.name}</span>
                  </label>
                </div> )}
            </tr><tr></tr>
          </th>
          {data.map((product, i) => this.productHeaderDetails(product, i))}
        </tr>
      </thead>
    );
  };

  //Method to display th with product image, name, price and delete action
  productHeaderDetails(product, i) {
    return (
      <th key={i} className="table-header">
        <tr>
          {(() => {
            if (this.props.hideItemOption) {
              return (
                <div className="product-remove-btn" onClick={() => { this.state.handleHideProduct(product.Artikelnummer) }}>
                  <i className="fa fa-trash"></i>
                </div>
              );
            }
          })()}
          <div className="product-image">
            <img
              src={product.productImage}
              alt="product img"
              className="product-image"
              id={i}
            />
          </div><br /><br />
          <div className="product-name">{product.name}</div><br />
        </tr>
        <tr className="product-name-header">
          <td className="product-name-header-item">
            <div className="product-price">{product.grossPrice}</div>
            <div className="product-price-desc">per stuk / excl. btw</div>
          </td>
      </tr> 
      <hr /></th>
    );
  }
  
// Renders body of table containg badges as first feature and other product features 
  generateBody(data) {
    if (data.length <= 0) {
      return "No products to display";
    } else {
      return (
        <tbody>
          <tr>
          <td className="feature-header">
            Badges
          </td>
          {data.map((product,i) => <td className="feature-value" key={i}>{this.showBadges(product.badges,i)}</td>)}
        </tr>
          {this.props.features.map(feature => this.productComparisonFeature(feature, data))}
        </tbody>
      );
    }
  }

  // Method to reder features and highlight feature if any one product has different feature value
  productComparisonFeature(feature, data) {
    let featureValues=[];
    data.map((product,i) => {
      for (const [key, value] of Object.entries(product)) {
        if(feature===key){
          featureValues[i]=value;
        }
      }
      return featureValues;
    });
    // create a tr (row with feature ) and values of that feature 
    if (data.find(item => item[feature] !== "N/A")) {
      return (
        <tr>
          <td className={this.checkDuplicateFeatures(featureValues)?"feature-header":"highlight-row"}>
            {feature}
          </td>
          {data.map(product => this.getProductFeature(product, feature,featureValues))}
        </tr>
      );
    }
  }
  
  // Method to get boolean response to highlight feature
  checkDuplicateFeatures(featureValues) {
    return featureValues.every((e, i, a) => e===a[0]);
  }

  // Display feature value of one product at a time
  getProductFeature(product, feature,featureValues) {
    return <td className={this.checkDuplicateFeatures(featureValues)?"feature-header":"highlight-row"}>{product[feature]}</td>;
  }

  // Method to split product feature badge response with pipe to render all badge images src
  showBadges(badge,i){
    let badges=badge.split('|');
    return(
    badges.map((imageSrc,i)=> <img src={imageSrc} key={i} alt="badge img" className="badge-image" />)
    );
  }

  // Handle checkbox event for all products
  handleChange(e) {
    const productNumber = e.target.name;
    const isChecked = e.target.checked;
    let temp_list = this.state.productListTodisplay;

       if (isChecked===false){
         // removing product if checkbox is unchecked
        this.hideProduct(productNumber);
       } else if( isChecked===true){
         // adding the removed product and changing state of checkbox
        let checkedItem= this.state.checkedItems;
        let newProductList = this.state.productDataList;
        newProductList = newProductList.filter(item => item.Artikelnummer === productNumber);
        temp_list.push(newProductList[0]);
        this.setState({
          productListTodisplay: temp_list
        });
        this.setState({ checkedItems: checkedItem.set(productNumber, isChecked) });
       }
  }
  
  // Hiding product and unchecking the checkbox when delete icon is clicked
  hideProduct(product_id) {
    const isChecked=false;
    let checkedItem= this.state.checkedItems;
    this.setState({ checkedItems: checkedItem.set(product_id, isChecked) });
    let temp_list = this.state.productListTodisplay;
    temp_list = temp_list.filter(item => item.Artikelnummer !== product_id);
    this.setState({
      productListTodisplay: temp_list
    });
  }
}

export default ProductView;
