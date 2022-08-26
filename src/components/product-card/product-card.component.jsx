import Button from '../button/button.component';
import './product-card.styles.scss';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';

const ProductCard = ({ product }) => {
    
    const { name, price, imageUrl } = product;
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems);
    const addProductToCart= () => dispatch(addItemToCart(cartItems,product));
    return (<div className='product-card-container'>
        <img src={imageUrl} alt={`{name}`} />
        <div className='footer'>
            <span className='name'></span>
            <span className='price'></span>
        </div>
        <Button buttonType='inverted' onClick={addProductToCart}>
            Add to Cart</Button>
    </div>
    );

}

export default ProductCard;