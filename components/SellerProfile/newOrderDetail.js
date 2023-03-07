import React, {useState,useEffect} from 'react'
import { Grid, Typography, Button } from "@material-ui/core";
import CustomNewOrderItemList from "components/CustomNewOrderItemList";
import { format } from "date-fns";
import useApproveOrderPayment from "../../hooks/admin/mutation/handleApproveOrderPayment";
import handleCancelOrderItem from "../../hooks/admin/mutation/handleCancelOrderItem";
import ShipmentLabel from "./ShipmentLabel";
import useUpdateOrderStatus from "hooks/updateOrderStatus/useUpdateOrderStatus";
import useAddShippingLabel from "hooks/shippingLabel/useAddShippingLabel";
import useAddTrackingCode from "hooks/shippingLabel/useAddTrackingCode";
import CustomSelect from "../CustomSeclect";
import {COURIER_URL,COURIER_USER,COURIER_TOKEN} from "../../courierConfig";
import axios from "axios";
import {  toast } from 'react-toastify';
// { value:"Labeled",label:"Labeled"},
// { value:"Picked",label:"Picked"},
// { value:"Packed",label:"Packed"},
const options = [
    { value:"Completed",label:"Completed"},
    { value:"Shipped",label:"Shipped"},
    
]
export default function NewOrderDetail(props) {
    const [updateOrderStatusEntry] = useUpdateOrderStatus()
    const [entryApproveOrderPayment] = useApproveOrderPayment();
    const [entryCancelOrderItem] = handleCancelOrderItem();
    const [addShippingLabelEntry] = useAddShippingLabel();
    const [addTrackingCodeEntry] = useAddTrackingCode();
    const [selectedOption,setSelectedOption] = useState(null);
    const [downloadLabel, setDownloadLabel] = useState(null);
    const [trackingCode, setTrackingCode] = useState("");
    const orderDate = format(
        props.data.createdAt,
        "MM/DD/YYYY"
      );
      
      useEffect(()=>{
          setDownloadLabel(props.data.shipmentLabel?props.data.shipmentLabel.uri:null);
      },[])
      const handleLabel = (order) => {
            const res = JSON.stringify(ShipmentLabel({order}))
            
            
            let config = {
                   method:"post",
                   url:`${COURIER_URL}/create-label`,
                   headers: { 
                    // 'api-user': `${COURIER_USER}`, 
                    // 'api-token': `${COURIER_TOKEN}`, 
                    'Content-Type': 'application/json'
                  },
                  data : res
            }
            axios(config)
                .then(async function (response) {
                
                setDownloadLabel(response.data.uri);
                const structTrackingUrl = `http://localhost:4000/en/trackYourOrder?tracking_request_hash=${response.data.tracking_request_hash}&&tracking_request_id=${response.data.tracking_request_id}&&tracking_codes=${response.data.tracking_codes}&&courier=${response.data.courier}`
                const addTrackingRes  = await addShippingLabelEntry(props.data._id,props.data.fulfillmentGroups[0]._id,structTrackingUrl,props.currentUser);
                
                })
                .catch(function (error) {
                
                });

            // fetch(`${COURIER_URL}/api/couriers/v1/Test/create-label`,{
            //     method:"post",
            //     headers: { 
            //         'api-user': '{{landOfSneakers}}', 
            //         'api-token': '{{txyidcmonavpzgwh}}', 
            //         'Content-Type': 'application/json'
            //       },
            //       body:res
            // })
            // .then(function (response) {
            //   console.log("create label server api res",response.json());
            // })
            // .catch(function (error) {
            //   console.log("create label server api error",error);
            // });
            
      }
      const handleSelectedOption =async (val) => {
           
           setSelectedOption(val);
           const res= await   updateOrderStatusEntry(props.data._id,val.value,props.currentUser);
           
           if(res){
                notify("Order status successfully updated");
                props.restructOrdersStatusUpdated(res.data.updateOrder.order._id,res.data.updateOrder.order.status)
           }
      }
      const notify = (val) => toast(val,{
        hideProgressBar: true
      });
      const onCapturePayment =async (orderId,paymentId,shopId)=>{
          
           const res = await entryApproveOrderPayment(orderId,paymentId,shopId,props.currentUser);
           
           if(res){
           
            props.restructOrdersStatusUpdated(res.data.captureOrderPayments.order._id,res.data.captureOrderPayments.order.status)
               notify("Order completed.");

           }
      }
      const onCancelPayments =async (data) => {
        const res = await entryCancelOrderItem(data,props.currentUser);
        
        if(res){
            
         props.restructOrdersStatusUpdated(res.data.cancelOrderItem.order._id,res.data.cancelOrderItem.order.status)
            notify("Order cancelled successfully.");

        }
      }
      const handleAddTrackingCode =async (orderData) => {
                   //addTrackingCodeEntry
                   const addTrackingRes  = await addTrackingCodeEntry(props.data._id,props.data.fulfillmentGroups[0]._id,trackingCode,props.currentUser);
                   if(addTrackingRes){
                    notify("Tracking code added successfully.")
                   }
      }
     
    return (
        <div className="newOrderDetail">
            <Grid container>
                {props.data.status.toLowerCase() == "new"?<></>:
            <Grid item xs={12} style={{display:"flex", justifyContent:"flex-end"}}>
                 <Grid item xs={6} sm={2}>
                   <CustomSelect  options={options}
                    selectedOption={selectedOption}
                    handleChange={(e)=>handleSelectedOption(e)}
                    />
                   </Grid>
                </Grid>}
                <Grid item xs={12}>
                    <Typography variant="h2" className="newOrderDetail__title">Order Detail</Typography>
                </Grid>
                <Grid item xs={12} style={{padding:"10px 0px"}}>
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
                            <Typography className="newOrderDetail__addressDescription" variant="h2">{props.data.fulfillmentGroups[0].data.shippingAddress.address1+" "+props.data.fulfillmentGroups[0].data.shippingAddress?.address2}</Typography>
                            <Typography className="newOrderDetail__addressDescription" variant="h2">{props.data.fulfillmentGroups[0].data.shippingAddress.city}</Typography>
                            <Typography className="newOrderDetail__addressDescription" variant="h2">{props.data.fulfillmentGroups[0].data.shippingAddress.region}</Typography>
                            <Typography className="newOrderDetail__addressDescription" variant="h2">{props.data.fulfillmentGroups[0].data.shippingAddress.postal}</Typography>
                            <Typography className="newOrderDetail__addressDescription" variant="h2">{props.data.fulfillmentGroups[0].data.shippingAddress.country}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                
               { props.data.status.toLowerCase() == "new"?
                <Grid item xs={12} className="newOrderDetail__footer">
                    <Button className="newOrderDetail__footerBtn newOrderDetail__footerBackBtn" onClick={()=>onCancelPayments(props.data)}>Cancel</Button>
                    <Button className="newOrderDetail__footerBtn newOrderDetail__footerAcceptBtn" 
                    onClick={()=>onCapturePayment(props.data._id,[props.data.payments[0]._id],props.data.shop._id)}>Accept order</Button>
                </Grid>: props.data.fulfillmentGroups[0].selectedFulfillmentOption.fulfillmentMethod.group.toLowerCase() == "free"  ?
                    <Grid container className="newOrderDetail__freeShipWrapper">
                         <Grid item xs={12}>
                             <Typography variant="h2" className="newOrderDetail__freeShipTitle">Add Tracking Code</Typography>
                             </Grid>
                        <Grid item xs={12} sm={10} md={8} lg={6} className="newOrderDetail__freeShipContainer">
                        <input type="text" value={trackingCode} onChange={(e)=>setTrackingCode(e.target.value)}/>
                        <Button className="newOrderDetail__footerBtn newOrderDetail__footerAddTrackingBtn" onClick={()=>handleAddTrackingCode(props.data)}>Save</Button>
                        </Grid>
                    </Grid>
                :downloadLabel != null ? <a className="newOrderDetail__footerBtn newOrderDetail__footerDownloadLabelBtn" target="_blank"  href={`${downloadLabel}`}>Download Label</a>:
                <Button className="newOrderDetail__footerBtn newOrderDetail__footerCreateLabelBtn" onClick={()=>handleLabel(props.data)}>Create Label</Button>}
            </Grid>
        </div>
    )
}
