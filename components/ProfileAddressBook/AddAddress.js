import { Grid, Button } from '@material-ui/core'
import React, { useState } from 'react';

export default function AddAddress(props) {
      const [address, setAddress] = useState({
            address1: "",
            address2: "",
            city: "",
            // company:"",
            country: "",
            fullName: "",
            // isBillingDefault:"",
            isCommercial: false,
            // isShippingDefault:"",
            phone: "",
            postal: "",
            region: "",
            // isPickupAddress:false
      })
      const [isPickupAddress,setIsPickupAddress] = useState(false);
      const [Error,setError] = useState({});


      // const handleChangeAddress  = (e) =>{
      //     var fieldName = e.target.name
      //     setAddress({
      //         ...address,
      //         fieldName:e.target.value
      //     })
      // }
      const validateAddress = (obj) => {
           
            let error = {};
            let isValid = true;
            
            if (address.address1.length == 0) {
                  error.address1 = "address is required";
                  isValid= false;
            }
            if(address.city.length  == 0){
                   error.city = " city is required";
                   isValid= false;
            }
            // if(address.country.length  == 0){
            //        error.country = "country is required";
            //        isValid= false;
            // }
            if(address.fullName.length  == 0){
                   error.fullName = "address name is required";
                   isValid= false;
            }
            if(address.phone.length  == 0){
                   error.phone = "phone is required"
                   isValid= false;
            }
            if(address.postal.length  == 0){
                   error.postal = "postal is required"
                   isValid= false;
            }  
            if(address.region.length  == 0){
                   error.region = "region is required"
                   isValid= false;
            }
            return {error, isValid};

      }
      const handleOnSubmit = () => {
        const {error, isValid} = validateAddress(address);
        const structAddress = {
             ...address,
             metafields : {
                  key:"isPickupAddress",
                  value:`${isPickupAddress}`  
             } 
        }
        
        setError(error);
        if(isValid){
            props.onAddressAdded(structAddress);
            props.setShowAddAddress(false);
        }
            
      }
      return (
            <div className="CAB__addAddress">

                  <div className="CAB__addAddress__formRow">
                        <label>Country</label>
                        <select value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })}>
                              <option value="pakistan">Pakistan</option>

                        </select>
                        <p className="CAB__addAddress__error">{Error.country && Error.country}</p>
                  </div>
                  <div className="CAB__addAddress__formRow">
                        <label>Name</label>
                        <input type="text" value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value })} name="fullName" className="addressLine" placeholder="Enter Name" />
                        <p className="CAB__addAddress__error">{Error.fullName && Error.fullName}</p>
                  </div>
                  <div className="CAB__addAddress__formRow">
                        <label>Address</label>
                        <input type="text" value={address.address1} onChange={(e) => setAddress({ ...address, address1: e.target.value })} name="address1" className="addressLine" placeholder="Enter Address" />
                        <p className="CAB__addAddress__error">{Error.address1 && Error.address1}</p>
                  </div>
                  <div className="CAB__addAddress__formRow">
                        <label>Address Line 2 (Optional)</label>
                        <input type="text" value={address.address2} onChange={(e) => setAddress({ ...address, address2: e.target.value })} name="address2" className="addressLine" placeholder="Enter Address Line 2 (Optional)" />
                  </div>
                  <div className="CAB__addAddress__formRow">
                        <label>City</label>
                        <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} name="city" className="addressLine" placeholder="Enter City" />
                        <p className="CAB__addAddress__error">{Error.city && Error.city}</p>
                  </div>
                  <Grid container className="CAB__addAddress__Grid">
                        <Grid item xs={12} sm={5}>
                              <div className="CAB__addAddress__formRow">
                                    <label>Region</label>
                                    <input type="text" value={address.region} onChange={(e) => setAddress({ ...address, region: e.target.value })} name="region" className="addressLine" placeholder="Enter Region" />
                                    <p className="CAB__addAddress__error">{Error.region && Error.region}</p>
                              </div>
                             
                        </Grid>
                        <Grid item xs={12} sm={5}>
                              <div className="CAB__addAddress__formRow">
                                    <label>Post code</label>
                                    <input type="text" value={address.postal} onChange={(e) => setAddress({ ...address, postal: e.target.value })} name="postal" className="addressLine" placeholder="Enter Post code" />
                                    <p className="CAB__addAddress__error">{Error.postal && Error.postal}</p>
                              </div>
                        </Grid>
                  </Grid>
                  <div className="CAB__addAddress__formRow">
                        <label>Phone</label>
                        <input type="text" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} name="phone" className="addressLine" placeholder="Enter Phone" />
                        <p className="CAB__addAddress__error">{Error.phone && Error.phone}</p>
                  </div>
                  <div className="CAB__addAddress__checkboxRow">
                        <input type="checkbox" checked={address.isCommercial} onChange={(e) => setAddress({ ...address, isCommercial: !address.isCommercial })} /> Is this Commercial Address?
                  </div>
                 {props.isSeller && <div className="CAB__addAddress__checkboxRow">
                        <input type="checkbox" checked={isPickupAddress} onChange={(e) => setIsPickupAddress(!isPickupAddress)} /> Is this Pickup Address?
                  </div>}
                  <div className="CAB__addAddress__formBtn">
                        <span></span>
                        <div className="CAB__addAddress__formBtnRight">
                              <Button className="CAB__addAddress__formBtnCancel" onClick={() => props.setShowAddAddress(false)}>Cancel</Button>
                              <Button className="CAB__addAddress__formBtnSave" onClick={handleOnSubmit}>Save</Button>
                        </div>
                  </div>
            </div>
      )
}
