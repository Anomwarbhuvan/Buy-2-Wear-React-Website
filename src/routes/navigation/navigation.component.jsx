import userEvent from "@testing-library/user-event";
import { Fragment} from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom"
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { selectCurrentUser } from "../../store/user/user.selector";
import './navigation.styles.scss';

const Navigation = () => {
    
    const currentUser = useSelector(selectCurrentUser);

    const isCartOpen = useSelector(selectIsCartOpen);
    
    
    const signOutHandler = async () => {
        const res = await signOutUser();
       
  
    }
    return (
      <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrwnLogo className= 'logo' />
                </Link>
              
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={signOutUser}>SIGN-OUT</span>)
                            :  (<Link className="nav-link" to='/auth'>
                            SIGN IN
                        </Link>
                        )
                    }

                    <CartIcon />
                    

                </div>
                {isCartOpen && <CartDropdown />}
         
        </div>
        <Outlet />
      </Fragment>
  
    )
}
  
export default Navigation;