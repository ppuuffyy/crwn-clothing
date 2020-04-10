import React from 'react';
//import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {auth} from '../../firebase/firebase.util';
import {createStructuredSelector} from 'reselect';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {HeaderContainer, LogoContainer, OptionsContainer, OptionDiv, OptionLink} from './header.styles';

//import './header.styles.scss';
import {ReactComponent as Logo} from '../../assets/crown.svg'; 



const Header = ({currentUser, hidden}) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer>
        
            <OptionLink to='/shop'> SHOP </OptionLink>
            <OptionLink to='/contact'> CONTACT </OptionLink>
            {           
                currentUser ? 
                    <OptionDiv onClick={() => auth.signOut() }>SIGN OUT</OptionDiv> 
                        :
                    <OptionLink to='/signin'> SIGN IN</OptionLink>
        
            }
            <CartIcon />         
        </OptionsContainer>
        {hidden ? null : <CartDropdown />}
    </HeaderContainer>
)

// const mapStateToProps = ({user: {currentUser}, cart: {hidden}}) => ({
//     currentUser,                 //Selector usage without createStructuredSelector
//     hidden
// })

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);