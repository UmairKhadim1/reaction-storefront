import React, { useState } from 'react'
import { Grid, Typography, Button } from "@material-ui/core";
import CustomNewOrderItemList from "components/CustomNewOrderItemList";
import { format } from "date-fns";
import useApproveOrderPayment from "../../hooks/admin/mutation/handleApproveOrderPayment";
import handleCancelOrderItem from "../../hooks/admin/mutation/handleCancelOrderItem";
import ShipmentLabel from "./ShipmentLabel";
import useUpdateOrderStatus from "hooks/updateOrderStatus/useUpdateOrderStatus";
import CustomSelect from "../CustomSeclect";
const options = [
    { value: "Completed", label: "Completed" },
    { value: "Picked", label: "Picked" },
    { value: "Packed", label: "Packed" },
    { value: "Shipped", label: "Shipped" },
    { value: "Labeled", label: "Labeled" },
]
export default function NewOrderDetail(props) {
    const [updateOrderStatusEntry] = useUpdateOrderStatus()
    const [entryApproveOrderPayment] = useApproveOrderPayment();
    const [entryCancelOrderItem] = handleCancelOrderItem();
    const [selectedOption, setSelectedOption] = useState(null);
    const orderDate = format(
        props.data.createdAt,
        "MM/DD/YYYY"
    );
    const handleLabel = (order) => {
        //    const res = ShipmentLabel({order})
    }
    const handleSelectedOption = async (val) => {
        
        setSelectedOption(val);
        const res = await updateOrderStatusEntry(props.data._id, val.value)
    }
    return (
        <div className="newOrderDetail">
            <Grid container>
               
                <Grid item xs={12}>
                    <Typography variant="h2" className="newOrderDetail__title">Order Detail</Typography>
                </Grid>
                <Grid item xs={12} style={{ padding: "10px 0px" }}>
                    <CustomNewOrderItemList items={props.data.fulfillmentGroups[0].items.nodes} />

                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container>
                        <Grid item xs={12} className="newOrderDetail__row">
                            <Typography className="newOrderDetail__heading" variant="h2">Date:</Typography>
                            <Typography className="newOrderDetail__description" variant="h2">{orderDate}</Typography>
                        </Grid>
                        <Grid item xs={12} className="newOrderDetail__row">
                            <Typography className="newOrderDetail__heading" variant="h2">Payment Method:</Typography>
                            <Typography className="newOrderDetail__description" variant="h2">{props.data.payments[0].method.displayName}</Typography>
                        </Grid>
                        <Grid item xs={12} className="newOrderDetail__row">
                            <Typography className="newOrderDetail__heading" variant="h2">Shipping Method:</Typography>
                            <Typography className="newOrderDetail__description" variant="h2">{props.data.fulfillmentGroups[0].selectedFulfillmentOption.fulfillmentMethod.displayName}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container>
                        <Grid item xs={12} >
                            <Typography className="newOrderDetail__addressHeading" variant="h2">Shipping Address:</Typography>
                            <Typography className="newOrderDetail__addressDescription" variant="h2">{props.data.fulfillmentGroups[0].data.shippingAddress.address1 + " " + props.data.fulfillmentGroups[0].data.shippingAddress?.address2}</Typography>
                            <Typography className="newOrderDetail__addressDescription" variant="h2">{props.data.fulfillmentGroups[0].data.shippingAddress.city}</Typography>
                            <Typography className="newOrderDetail__addressDescription" variant="h2">{props.data.fulfillmentGroups[0].data.shippingAddress.region}</Typography>
                            <Typography className="newOrderDetail__addressDescription" variant="h2">{props.data.fulfillmentGroups[0].data.shippingAddress.postal}</Typography>
                            <Typography className="newOrderDetail__addressDescription" variant="h2">{props.data.fulfillmentGroups[0].data.shippingAddress.country}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                
                {/* { props.data.status.toLowerCase() == "new" &&
                <Grid item xs={12} className="newOrderDetail__footer">
                    <Button className="newOrderDetail__footerBtn newOrderDetail__footerBackBtn" onClick={()=>entryCancelOrderItem(props.data)}>Cancel</Button>
                    <Button className="newOrderDetail__footerBtn newOrderDetail__footerAcceptBtn" 
                    onClick={()=>entryApproveOrderPayment(props.data._id,[props.data.payments[0]._id],props.data.shop._id)}>Capture Payment</Button>
                </Grid>} */}
                {/* <Button className="newOrderDetail__footerBtn newOrderDetail__footerBackBtn" onClick={()=>handleLabel(props.data)}>Create Label</Button> */}
            </Grid>
        </div>
    )
}
