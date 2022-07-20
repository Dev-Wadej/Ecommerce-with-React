import { Outlet, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import {
  NavigationContainer,
  LogoContainer,
  NavLink,
  NavLinks,
} from './navigation.styles';
import { useContext } from 'react';
import { selectCurrentUser } from '../../store/user/user.selector';
import { CartContext } from '../../context/cart.context';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  // const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <>
      <NavigationContainer>
        <LogoContainer to={'/'}>
          <div>
            <CrwnLogo className="logo" />
          </div>
        </LogoContainer>

        <NavLinks>
          <NavLink to={'/shop'}>SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to={'/auth'}>SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
};
export default Navigation;
