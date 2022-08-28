// import { CardElement ,useStripe,useElements} from '@stripe/react-stripe-js';
// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { selectCartTotal } from '../../store/cart/cart.selector';
// import { selectCurrentUser } from '../../store/user/user.selector';
// import Button from '../button/button.component';
// import { BUTTON_TYPE_CLASSES } from '../button/button.component';
// import { PaymentFormContainer,FormContainer ,PaymentButton} from './payment-form.styles';


// const PaymentForm = () => {

//     const stripe = useStripe();
//     const elements = useElements();
//     const amount = useSelector(selectCartTotal);
//     const currentUser = useSelector(selectCurrentUser);
//     const [isProcess, setIsProcess] = useState(false);

//     const paymentHandler = async (e) => {

//         e.preventDefault();

//         if (!stripe || !elements) {
//             return;
//         }

//         setIsProcess(true);
//         const baseUrl = 'buy-2-wear.netlify.app/.netlify/functions/{create-payment-intent}';
//         const response = await fetch(baseUrl, {
//             method: 'post',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ amount: amount * 100 })
//         }).then(res => res.json());

//         const { paymentIntent: { client_secret } } = response;
//         console.log(client_secret);

//         const paymentResult = await stripe.confirmCardPayment(client_secret, {
//             payment_method: {
//                 card: elements.getElement(CardElement),
//                 billing_details: {
//                     name: currentUser ? currentUser.displayName : 'Guest Acc',
//                 }
//             }
//         });

//         setIsProcess(false);

//         if (paymentResult.error) {
//             alert(paymentResult.error);
//         } else {
//             if (paymentResult.paymentIntent.status == 'succeeded') {
//                 alert('Payment Successful');
//             }
//         }

//     };

//     return (
//         <PaymentFormContainer>
//             <FormContainer onSubmit ={paymentHandler}>
//                 <h2>Credit Card Payment: </h2>
//                 <CardElement />
//                 <PaymentButton
//                     isLoading ={isProcess}
//                     disabled={isProcess} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now
//                 </PaymentButton>
//             </FormContainer>
 
//         </PaymentFormContainer>
//     )
// }

// export default PaymentForm;