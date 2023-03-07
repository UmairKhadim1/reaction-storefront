import React from 'react'
import { Grid, Typography, Container } from "@material-ui/core"
export default function Index(props) {
    const handleIncrementQuantity = (prevQuantity, cartItemId) => {
        const newQuantity = prevQuantity + 1;
        props.onChangeCartItemQuantity(newQuantity, cartItemId)
    }
    const handleDecrementQuantity = (prevQuantity, cartItemId) => {
        const newQuantity = prevQuantity - 1;
        props.onChangeCartItemQuantity(newQuantity, cartItemId)
    }
    return (
        <div>
        <Typography xs={12} className="customCartList__mainTitle" variant="h5" component="h2">Order</Typography>
        <Grid container className="customCartList">
           
           
            {props.items.map((cartItem, i) => {
                return (
                    <Grid xs={12} item  className="customCartList__item">
                        <div className="customCartList__imagebox">
                            {/* <img className="customCartList__imagebox" src={cartItem.imageURLs} /> */}
                            <img className="customCartList__image" src={cartItem.metafields[0].value} />
                            <div className="customCartList__removeIconBox" onClick={()=>props.onRemoveItemFromCart(cartItem._id)}>
                                <img className="customCartList__removeIcon" src="/icons/deleteIcon.png"/>
                            </div>
                        </div>
                        <div className="customCartList__rightContainer">
                            <Typography className="customCartList__title" variant="h5" component="h2">{cartItem.title} </Typography>
                            <Typography className="customCartList__description" variant="subtitle2" component="p">{cartItem.title} </Typography>
                            <div className="customCartList__actionArea">
                                {/* <div className="quantity__container">
                                    <div className="quantity__Box" onClick={() => handleDecrementQuantity(cartItem.quantity, cartItem._id)}><span>-</span></div>
                                    <div className="quantity__value">{cartItem.quantity}</div>
                                    <div className="quantity__Box" onClick={() => handleIncrementQuantity(cartItem.quantity, cartItem._id)}><span>+</span></div>
                                </div> */}
                                <div className="customCartItemprice">
                                    <span>{cartItem.subtotal.displayAmount}</span>
                                </div>

                            </div>
                        </div>
                    </Grid>
                )
            })}

        </Grid>
        </div>
    )
}
