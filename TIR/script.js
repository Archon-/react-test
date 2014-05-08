/** @jsx React.DOM */

/**
 *  @class ProductCategoryRow
 *  @classdesc Contains the category row
 *  @param {object}         props
 *  @param {string}         props.category      Category name
 */

var ProductCategoryRow = React.createClass({
    render: function() {
        return (<tr><th colSpan="2">{this.props.category}</th></tr>);
    }
});

/**
 *  @class ProductRow
 *  @classdesc Contains data about product 
 *  @param {object}         props
 *  @param {object}         props.product           Product data
 *  @param {string}         props.product.name      Product name
 *  @param {string}         props.product.price     Product price
 *  @param {boolean}        props.product.stocked   Product avaliability
 */

var ProductRow = React.createClass({
    render: function() {
        var name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{color: 'red'}}>
                {this.props.product.name}
            </span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
});

/**
 *  @class ProductTable
 *  @classdesc  Component containt all table elements like category, products and search form
 *  @param {object}         props
 *  @param {object}         props.product           Product data
 *  @param {string}         props.product.name      Product name
 *  @param {string}         props.product.price     Product price
 *  @param {boolean}        props.product.stocked   Product avaliability
 */

var ProductTable = React.createClass({
    render: function() {
        var rows = [];
        var lastCategory = null;
        this.props.products.forEach(function(product) {
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }
            rows.push(<ProductRow product={product} key={product.name} />);
            console.log("product: ");
            console.log(product.category);
            lastCategory = product.category;
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});

/**
 *  @class SearchBar
 *  @classdesc Search form
 *  
 */

var SearchBar = React.createClass({
    render: function() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Search..." />
                <p>
                    <input type="checkbox" />
                    Only show products in stock
                </p>
            </form>
        );
    }
});

/**
 *  @class FilterableProductTable
 *  @classdesc Filter products
 *  
 */

var FilterableProductTable = React.createClass({
    render: function() {
        return (
            <div>
                <SearchBar />
                <ProductTable products={this.props.products} />
            </div>
        );
    }
});


var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'},
  {category: 'Food', price: '$00.99', stocked: true, name: 'Milk'},
  {category: 'Food', price: '$00.99', stocked: true, name: 'Butter'}
];
 
React.renderComponent(<FilterableProductTable products={PRODUCTS} />, document.body);
