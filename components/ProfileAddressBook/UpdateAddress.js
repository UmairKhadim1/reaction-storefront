import { Grid,Button } from '@material-ui/core'
import React, {useState, useEffect} from 'react';

export default function AddAddress(props) {
    const [address, setAddress] = useState({
        address1:"",
        address2:"",
        city:"",
        // company:"",
        country:"",
        fullName:"",
        // isBillingDefault:"",
        isCommercial:false,
        // isShippingDefault:"",
        phone:"",
        postal:"",
        region:"",
        // isPickupAddress:false
    })
    const [isPickupAddress,setIsPickupAddress] = useState(false);
    useEffect(()=>{
        setAddress({
            address1:props.currentAddress.address1,
            address2:props.currentAddress.address2,
            city:props.currentAddress.city,
            // company:"",
            country:props.currentAddress.country,
            fullName:props.currentAddress.fullName,
            // isBillingDefault:"",
            isCommercial:props.currentAddress.isCommercial,
            // isShippingDefault:"",
            phone:props.currentAddress.phone,
            postal:props.currentAddress.postal,
            region:props.currentAddress.region
        })
        if(props.currentAddress.metafields != null){
            let newVal = "";
            if(props.currentAddress.metafields[0].value == "true"){
                newVal = true;
            }else if(props.currentAddress.metafields[0].value == "false"){
                newVal = false;
            }
             
            setIsPickupAddress(newVal);
        } 
    },[])
    // const handleChangeAddress  = (e) =>{
    //     var fieldName = e.target.name
    //     setAddress({
    //         ...address,
    //         fieldName:e.target.value
    //     })
    // }
    const handleOnSubmit = () => {
        const structAddress = {
            ...address,
            metafields : {
                 key:"isPickupAddress",
                 value:`${isPickupAddress}`  
            } 
       }
        props.onAddressEdited(props.currentAddress._id,structAddress);
        props.setShowUpdateAddress(false);
    }
    const handleOnDelete = () => {
        props.onAddressDeleted(props.currentAddress._id);
        props.setShowUpdateAddress(false);
    }
    return (
        <div className="CAB__addAddress">
            <div className="CAB__addAddress__formRow">
                      <label>Country</label>
                      <select onChange={(e)=>setAddress({...address,country:e.target.value})} name="country" id="country">
  <option value="pakistan">Pakistan</option>
 
</select>
                     
                </div>
                <div className="CAB__addAddress__formRow">
                      <label>Name</label>
                      <input type="text" value={address.fullName} onChange={(e)=>setAddress({...address,fullName:e.target.value})} name="fullName" className="addressLine" placeholder="Enter Name"/>
                </div>
                <div className="CAB__addAddress__formRow">
                      <label>Address</label>
                      <input type="text" value={address.address1} onChange={(e)=>setAddress({...address,address1:e.target.value})} name="address1" className="addressLine" placeholder="Enter Address"/>
                </div>
                <div className="CAB__addAddress__formRow">
                      <label>Address Line 2 (Optional)</label>
                      <input type="text" value={address.address2} onChange={(e)=>setAddress({...address,address2:e.target.value})} name="address2" className="addressLine" placeholder="Enter Address Line 2 (Optional)"/>
                </div>
                <div className="CAB__addAddress__formRow">
                      <label>City</label>
                      <input type="text" value={address.city} onChange={(e)=>setAddress({...address,city:e.target.value})} name="city" className="addressLine" placeholder="Enter City"/>
                </div>
                <Grid container className="CAB__addAddress__Grid">
                   <Grid item xs={12} sm={5}>
                   <div className="CAB__addAddress__formRow">
                      <label>County</label>
                      <input type="text" value={address.region} onChange={(e)=>setAddress({...address,region:e.target.value})} name="region" className="addressLine" placeholder="Enter County"/>
                </div>
                   </Grid>
                   <Grid item xs={12} sm={5}>
                   <div className="CAB__addAddress__formRow">
                      <label>Post code</label>
                      <input type="text" value={address.postal} onChange={(e)=>setAddress({...address,postal:e.target.value})} name="postal" className="addressLine" placeholder="Enter Post Code"/>
                </div>
                   </Grid>
                </Grid>
                <div className="CAB__addAddress__formRow">
                      <label>Phone</label>
                      <input type="text" value={address.phone} onChange={(e)=>setAddress({...address,phone:e.target.value})} name="phone" className="addressLine" placeholder="Enter Phone"/>
                </div>
                <div className="CAB__addAddress__checkboxRow">
                    <input type="checkbox" checked={address.isCommercial} onChange={(e)=>setAddress({...address,isCommercial:!address.isCommercial})}/> Is this Commercial Address?
                </div>
               {props.isSeller && <div className="CAB__addAddress__checkboxRow">
                        <input type="checkbox" checked={isPickupAddress} onChange={(e) => setIsPickupAddress(!isPickupAddress)} /> Is this Pickup Address?
                  </div>}
                <div className="CAB__addAddress__formBtn">
                      <Button className="CAB__addAddress__formBtnDelete" onClick={handleOnDelete}>Delete</Button>
                      <div className="CAB__addAddress__formBtnRight">
                      <Button className="CAB__addAddress__formBtnCancel" onClick={()=> props.setShowUpdateAddress(false)}>Cancel</Button>
                      <Button className="CAB__addAddress__formBtnSave" onClick={handleOnSubmit}>Save</Button>
                      </div>
                </div>
        </div>
    )
}
