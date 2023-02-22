import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'

import {
  makeBuyOrder,
  makeSellOrder,
} from '../store/interactions'
import {
  web3Selector,
  exchangeSelector,
  tokenSelector,
  accountSelector,
  buyOrderSelector,
  sellOrderSelector,
} from '../store/selectors'
import {
  buyOrderAmountChanged,
  buyOrderPriceChanged,
  sellOrderAmountChanged,
  sellOrderPriceChanged,
} from '../store/actions'

import Spinner from './Spinner'

const showForm = props => {
  const {
    dispatch,
    exchange,
    token,
    account,
    web3,
    buyOrder,
    sellOrder,
    showBuyTotal,
    showSellTotal,
  } = props

  return (
    <Tabs defaultActiveKey="buy">
      <Tab eventKey="buy" title="Buy">
        <form onSubmit={e => {
          e.preventDefault()
          makeBuyOrder(dispatch, exchange, web3, token, buyOrder, account)
        }}>
          <div className="form-group small">
            <label>Buy Amount (ZB)</label>
            <div className="input group">
              <input
                type="text"
                placeholder="Buy Amount"
                onChange={e => dispatch(buyOrderAmountChanged(e.target.value))}
                className="form-control form-control-sm"
                required />
            </div>
          </div>
          <div className="form-group small">
            <label>Buy Price</label>
            <div className="input group">
              <input
                type="text"
                placeholder="Buy Price"
                onChange={e => dispatch(buyOrderPriceChanged(e.target.value))}
                className="form-control form-control-sm"
                required />
            </div>
          </div>
          <button type="submit" className="btn yellow btn-block btn-sm">Buy Order</button>
          {showBuyTotal ? <small>Total: {buyOrder.amount * buyOrder.price} ETH</small> : null}
        </form>
      </Tab>

      <Tab eventKey="sell" title="Sell">
        <form onSubmit={e => {
          e.preventDefault()
          makeSellOrder(dispatch, exchange, web3, token, sellOrder, account)
        }}>
          <div className="form-group small">
            <label>Sell Amount (ZB)</label>
            <div className="input group">
              <input
                type="text"
                placeholder="Sell Amount"
                onChange={e => dispatch(sellOrderAmountChanged(e.target.value))}
                className="form-control form-control-sm"
                required />
            </div>
          </div>
          <div className="form-group small">
            <label>Sell Price</label>
            <div className="input group">
              <input
                type="text"
                placeholder="Sell Price"
                onChange={e => dispatch(sellOrderPriceChanged(e.target.value))}
                className="form-control form-control-sm"
                required />
            </div>
          </div>
          <button type="submit" className="btn yellow btn-block btn-sm">Sell Order</button>
          {showSellTotal ? <small>Total: {sellOrder.amount * sellOrder.price} ETH</small> : null}
        </form>
      </Tab>
    </Tabs>
  )
}


class NewOrder extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-header">
          New Order
        </div>
        <div className="card-body">
          {this.props.showForm ? showForm(this.props) : <Spinner />}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const buyOrder = buyOrderSelector(state)
  const sellOrder = sellOrderSelector(state)

  return {
    web3: web3Selector(state),
    exchange: exchangeSelector(state),
    token: tokenSelector(state),
    account: accountSelector(state),
    buyOrder,
    sellOrder,
    showForm: !buyOrder.making && !sellOrder.making,
    showBuyTotal: buyOrder.amount && buyOrder.price,
    showSellTotal: sellOrder.amount && sellOrder.price,
  }
}

export default connect(mapStateToProps)(NewOrder)
