import React from 'react'
import { Typography, Button } from "@material-ui/core";
import { ToastContainer, toast } from 'react-toastify';
export default function CustomMiniCart(props) {
    const notify = (val) => toast(val,{
        hideProgressBar: true
      });
    const handleIncrementQuantity = (prevQuantity, cartItemId) => {
        if(props.cart?.items.length<1){
        const newQuantity = prevQuantity + 1;
        props.onChangeCartItemQuantity(newQuantity, cartItemId)
        }else{
           notify("you can add only one item in cart");
        }
    }
    const handleDecrementQuantity = (prevQuantity, cartItemId) => {
        const newQuantity = prevQuantity - 1;
        props.onChangeCartItemQuantity(newQuantity, cartItemId)
    }
    return (
        <div className="customMiniCart">
            {props.cart?.items?.map((item, i) => {
                return (
                    <>
                        <div className="customMiniCart__items">
                            <div className="customMiniCart__titleContainer">
                                <Typography xs={10} className="customMiniCart__title" variant="h2">{item.title}</Typography>
                                <Typography xs={2} className="customMiniCart__price" variant="h2">{item.price.displayAmount}</Typography>
                            </div>
                            <div className="customMiniCart__options">
                                <div className="customMiniCart__optionBox">
                                    <span className="customMiniCart__optionTitle">color:</span><span className="customMiniCart__optionValue">{JSON.parse(item.optionTitle).color}</span>
                                </div>
                                <div className="customMiniCart__optionBox">
                                    <span className="customMiniCart__optionTitle">Size:</span><span className="customMiniCart__optionValue">{JSON.parse(item.optionTitle).size}</span>
                                </div>
                            </div>
                            {/* <div className="customMiniCart__actions">
                                <div className="customMiniCart__action" onClick={() => handleDecrementQuantity(item.quantity, item._id)}><span >-</span></div>
                                <Typography variant="h2" className="customMiniCart__actionValue"><span>{item.quantity}</span></Typography>
                                <div className="customMiniCart__action" onClick={() => handleIncrementQuantity(item.quantity, item._id)}><span>+</span></div>
                            </div> */}
                            <Typography className="customMiniCart__removeItem" variant="h2" onClick={()=>props.onRemoveItemFromCart(item._id)}>Remove</Typography>
                        </div>
                 
                    </>)
            })}
                   <div className="customMiniCart__footer">
                            <div className="customMiniCart__subTotal">
                                <Typography variant="h2" className="customMiniCart__subTotalTitle">Subtotal :</Typography>
                                <Typography variant="h2" className="customMiniCart__subTotalPrice">{props.cart?.checkout?.summary?.itemTotal?.displayAmount}</Typography>
                            </div>
                            <Button className="customMiniCart__checkoutBtn" onClick={()=> props.onCheckoutButtonClick()}>Checkout</Button>
                            <Typography variant="h2" className="customMiniCart__footerText">Shipping and tax calculated in checkout</Typography>
                        </div>
        </div>
    )
}
