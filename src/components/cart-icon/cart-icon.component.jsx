import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import {toggleCartHidden} from '../../redux/cart/cart.actions';
import {selectCartItemsCount} from '../../redux/cart/cart.selectors';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{itemCount}</span>
    </div>
  );

// const mapStateToProps = (state) => ({   //THIS IS A SELECTOR IN REDUX 
//   itemCount: selectCartItemsCount(state) //this is a classic way, no use of structuredselector
// })

const mapStateToProps = createStructuredSelector ({   //THIS IS A SELECTOR IN REDUX 
  itemCount: selectCartItemsCount
})



const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
  });
  


  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CartIcon);
