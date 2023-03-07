import React,{useState,useEffect} from 'react'
import { useQuery,gql } from "@apollo/client";
import ShippingMethodCard from './ShippingMethodCard';
import {Grid} from "@material-ui/core";
import useAddShippingMethod from "hooks/addShippingMethod/useAddShippingMethod";
import useViewer from "hooks/viewer/useViewer";
export default function Index(props) {
    const [addShippingLabelEntry] = useAddShippingMethod()
     const [shippingMethods,setShippingMethods] = useState([]);
     const [sellerFullfilments,setSellerFullfilments] = useState([]);
        // const { loading, data } = useQuery(gql`
        // query FlatRateFulfillmentMethods($shopId:ID!){
        //     flatRateFulfillmentMethods(shopId:$shopId){
        //         nodes {
        //             _id
        //             name
        //             rate
        //             label
                    
        //         }
        //     }
        // }
        // `,{
        //     variables: {
        //         shopId: props.shop._id
        //     }
        // })
   
   
    useEffect(()=>{
        setShippingMethods(props.shippingMethods);
        props.account.AvailableFulfillmentMethods !=null &&  setSellerFullfilments(props.account.AvailableFulfillmentMethods)
    },[props.account]);
    const handleSwitch =async (fullfillmentId,status) => {
         
      const res = await addShippingLabelEntry(props.account.userId,fullfillmentId,status);
      
      setSellerFullfilments(res.data.updateAvailableFulfillmentMethodEntry);
    }
    return (
        <Grid container className="shippingMethod" spacing={3}>
            {shippingMethods.map((item,i)=>{
                return(
                    <Grid   item xs={12} sm={4} md={3} lg={2}>
                  <ShippingMethodCard status = {sellerFullfilments.includes(item._id)} item={item} handleSwitch={(id,val)=>handleSwitch(id,val)}/>
                  </Grid>
                );
            })}
        </Grid>
    )
}
