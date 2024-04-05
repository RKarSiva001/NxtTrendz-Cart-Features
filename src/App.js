import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    // this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    //   TODO: Update the code here to implement addCartItem
    const findingBasedOnId = cartList.find(
      eachCart => eachCart.id === product.id,
    )
    if (findingBasedOnId) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (findingBasedOnId.id === each.id) {
            const quantityProduct = each.quantity + 1
            return {...each, quantity: quantityProduct}
          }
          return each
        }),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const removing = cartList.filter(each => each.id !== id)
    this.setState({cartList: removing})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const quantityDecreased = cartList.find(each => each.id === id)

    if (quantityDecreased.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.id === id) {
            const decreasing = each.quantity - 1
            return {...each, quantity: decreasing}
          }
          return each
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (each.id === id) {
          const increaseQuantity = each.quantity + 1
          return {...each, quantity: increaseQuantity}
        }
        return each
      }),
    }))
  }

  // incrementCartItemQuantity = id => {
  //     const {cartList} = this.state
  //     const cartItem = cartList.find(eachItem => eachItem.id === id)
  //     const {quantity} = cartItem
  //     console.log(quantity)
  //     this.setState(prevState => ({quantity: prevState.quantity + 1}))
  //     console.log(quantity)
  //     // const filteredCartList = cartList.filter(eachItem => eachItem.id !== id)
  //     // this.setState({cartList: filteredCartList})
  //     // this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
  //   }
  //   removeCartItem = id => {
  //     const {cartList} = this.state
  //     const filteredCartList = cartList.filter(eachItem => eachItem.id !== id)
  //     this.setState({cartList: filteredCartList})
  //   }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
