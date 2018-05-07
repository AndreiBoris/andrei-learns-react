import React, { Component } from 'react'
import './App.css'

const exampleData = [
  {
    category: 'Sporting Goods',
    price: '$49.99',
    stocked: true,
    name: 'Football',
  },
  {
    category: 'Sporting Goods',
    price: '$9.99',
    stocked: true,
    name: 'Baseball',
  },
  {
    category: 'Sporting Goods',
    price: '$29.99',
    stocked: false,
    name: 'Basketball',
  },
  {
    category: 'Electronics',
    price: '$99.99',
    stocked: true,
    name: 'iPod Touch',
  },
  {
    category: 'Electronics',
    price: '$399.99',
    stocked: false,
    name: 'iPhone 5',
  },
  {
    category: 'Electronics',
    price: '$199.99',
    stocked: true,
    name: 'Nexus 7',
  },
]

class ProductCategoryRow extends Component {
  render() {
    const { category } = this.props
    return <div className="product-table__row product-table__row--category product-table__heading">{category}</div>
  }
}

class ProductRow extends Component {
  render() {
    const { name, price, inStock } = this.props
    return (
      <div className={`product-table__row ${inStock ? '' : 'product-table__row--out-of-stock'}`}>
        <div>{name}</div>
        <div>{price}</div>
      </div>
    )
  }
}

class SearchBar extends Component {
  render() {
    const { filterText, inStockOnly, handleUpdate } = this.props
    return (
      <form action="" className="search-bar">
        <input type="text" name="filterText" value={filterText} onChange={handleUpdate} placeholder="Search..." />
        <br />
        <input type="checkbox" name="inStockOnly" checked={inStockOnly} onChange={handleUpdate} id="in-stock-only" />
        <label htmlFor="in-stock-only">Only show products in stock</label>
      </form>
    )
  }
}

const organizeProductsByCategory = products => {
  // Take in products and move them into objects with the category and attached items on the same level
  // We use an array to keep things behaving predictably
  const organizedProducts = []
  // Track the array index of each category inside organizedProducts array
  const categoryIndexes = {}
  // Next index for category to be added to organizedProducts
  let nextIndex = 0

  products.forEach( product => {
    const { category } = product

    // If this is a new category, track it
    if ( !( category in categoryIndexes ) ) {
      categoryIndexes[category] = nextIndex
      nextIndex += 1
      organizedProducts.push( {
        category,
        products: [],
      } )
    }

    // Push the product to the associated array in organizedProducts
    const currentIndex = categoryIndexes[category]
    organizedProducts[currentIndex].products.push( product )
  } )

  return organizedProducts
}

class ProductTable extends Component {
  render() {
    const { products, filterText, inStockOnly } = this.props

    return (
      <div className="product-table">
        <div className="product-table__heading product-table__row">
          <div>Name</div>
          <div>Price</div>
        </div>
        <div />
        {organizeProductsByCategory( products ).map( category => {
          const heading = <ProductCategoryRow key={category.category} category={category.category} />
          const productJsx = category.products.map( product => {
            if ( inStockOnly && !product.stocked ) {
              return null
            }
            if ( filterText && !product.name.toLowerCase().includes( filterText.toLowerCase() ) ) {
              return null
            }
            return <ProductRow key={product.name} inStock={product.stocked} name={product.name} price={product.price} />
          } )
          return [ heading, productJsx ]
        } )}
      </div>
    )
  }
}

class FilterableProductTable extends Component {
  state = {
    filterText: '',
    inStockOnly: false,
  }

  handleUpdate = event => {
    const { target } = event
    const value = target.type === 'checkbox' ? target.checked : target.value
    const { name } = target

    this.setState( {
      [name]: value,
    } )
  }

  render() {
    return (
      <main className="filterable-product-table">
        <div className="filterable-product-table__content">
          <SearchBar
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
            handleUpdate={this.handleUpdate}
          />
          <ProductTable
            products={exampleData}
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
          />
        </div>
      </main>
    )
  }
}

export default FilterableProductTable
