import React from 'react'
import { Typography, Button } from "@material-ui/core";
export default function index(props) {
    

    return (
        <div className="customOrderBox">
            {props.items?.map((item, i) => {
                return (
                    <>
                        <div className="customOrderBox__items">

                            {item.metafields != true && <div className="customOrderBox__imagebox">
                                <img className="customOrderBox__image" src="/images/placeholder.gif" />
                                {/* <img className="customOrderBox__image" src={item.metafields[0].value} /> */}
                            </div>}
                            <div className="customOrderBox__rightContainer">
                                <div className="customOrderBox__titleContainer">
                                    <Typography xs={10} className="customOrderBox__title" variant="h2">{item.title}</Typography>
                                    <Typography xs={2} className="customOrderBox__price" variant="h2">{item.price.displayAmount}</Typography>
                                </div>
                                <div className="customOrderBox__options">
                                    <div className="customOrderBox__optionBox">
                                        <span className="customOrderBox__optionTitle">Vendor:</span><span className="customOrderBox__optionValue">{item.productVendor}</span>
                                    </div>
                                    <div className="customOrderBox__optionBox">
                                        <span className="customOrderBox__optionTitle">color:</span><span className="customOrderBox__optionValue">{JSON.parse(item.optionTitle).color}</span>
                                    </div>
                                    <div className="customOrderBox__optionBox">
                                        <span className="customOrderBox__optionTitle">Size:</span><span className="customOrderBox__optionValue">{JSON.parse(item.optionTitle).size}</span>
                                    </div>
                                    <div className="customOrderBox__optionBox">
                                        <span className="customOrderBox__optionTitle">Quantity:</span><span className="customOrderBox__optionValue">{item.quantity}</span>
                                    </div>

                                </div>
                            </div>

                          {props.trackingUrl &&  <Button className="customOrderBox__trackOrder" href={props.trackingUrl}>Track Order</Button>}
                        </div>
                        <div className="customOrderBox__footer">
                            <div className="customOrderBox__optionBox">
                                <span className="customOrderBox__optionTitle">Estimated Delivery:</span><span className="customOrderBox__optionValue">{"NA"}</span>
                            </div>
                            <div className="customOrderBox__optionBox">
                               <div> <span className="customOrderBox__optionTitle">Serivce Proder:</span><span className="customOrderBox__optionValue">{props.shippingMethod}</span></div>
                             {props.tracking &&  <div><span className="customOrderBox__optionTitle">Tracking Code:</span><span className="customOrderBox__optionValue">{props.tracking}</span></div>}

                            </div>
                        </div>
                    </>)
            })}

        </div>
    )
}
