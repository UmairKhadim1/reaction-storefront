import React, {useState} from 'react'
import { Grid, Typography,Button } from "@material-ui/core";
export default function index() {
    const [currentPrimarilyType,setCurrentPrimarilyType] = useState("individual");
    const [image, setImage] = useState({ preview: "", raw: "" });
    const handleChange = (e) => {
        setImage({
         preview: URL.createObjectURL(e.target.files[0]),
         raw: e.target.files[0]
        })
       }
       const handleUpload = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image.raw);
    
        // await fetch("YOUR_URL", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "multipart/form-data"
        //   },
        //   body: formData
        // });
      };
    return (
        <div className="addressProfile">
            <Typography className="addressProfile__title" variant="h2" component="h2">Address</Typography>
            <div className="addressProfile__primarilyType">
                <Typography className="primarilyType__title" variant="h2">I’m primarily a:</Typography>
                <div className="primarilyType__options">
                <div>
                    <input id="radio-1" className="radio-custom" onChange={()=>setCurrentPrimarilyType("individual")} name="radio-group" type="radio" checked={currentPrimarilyType == "individual"?true:false} />
                    <label for="radio-1" className="radio-custom-label">Individual</label>
                </div>
                <div>
                    <input id="radio-2" className="radio-custom" onChange={()=>setCurrentPrimarilyType("business")} name="radio-group" type="radio"checked={currentPrimarilyType == "business"?true:false} />
                    <label for="radio-2" className="radio-custom-label radio-custom-label2">Business</label>
                </div>
                </div>
            </div>
            <Typography className="addressProfile__profileImgTitle" variant="h2">I’m primarily a:</Typography>
            <div className="addressProfile__profileImgContainer">
                  <div className="addressProfile__profileImgBox">
                  {image.preview ? (
                       <img className="addressProfile__profileImgPreview" src={image.preview}/>):(
                        <img className="addressProfile__profileImgPlaceholder" src="/icons/uploadImgPlaceHolder.png"/>
                       )}
                      <label htmlFor="upload-button">  <div className="addressProfile__uploadProfileImg"><img src="/icons/uploadFileIcon.png"/></div></label>
                      <input type="file" id="upload-button" style={{ display: 'none' }} onChange={handleChange} />

                  </div>
            </div>
            <div>
                <div className="addressProfile__formRow">
                      <label>Business name</label>
                      <input type="text" value="" name="businessName" className="businessName" placeholder="johnny’s Shoe Sote"/>
                </div>
                <div className="addressProfile__formRow">
                      <label>Propriator’s name</label>
                      <input type="text" value="" name="propriatorName" className="propriatorName" placeholder="Enter name"/>
                </div>
                <Typography className="addressProfile__billingAddress" variant="h2">Billing Address</Typography>
                <div className="addressProfile__formRow">
                      <label>Address line 1</label>
                      <input type="text" value="" name="addressLine1" className="addressLine" placeholder="Enter address"/>
                </div>
                <div className="addressProfile__formRow">
                      <label>Address line 2</label>
                      <input type="text" value="" name="addressLine2" className="addressLine" placeholder="Enter address"/>
                </div>
                <div className="addressProfile__formRow">
                      <label>City</label>
                      <input type="text" value="" name="city" className="city" placeholder="Enter city"/>
                </div>
                <div className="addressProfile__formRow">
                      <label>Postal / Zip Code</label>
                      <input type="text" value="" name="postalCode" className="postalCode" placeholder="Enter zip code"/>
                </div>
            </div>
            <div className="addressProfile__footer">
                <Button className="saveBtn">Save</Button>
            </div>
        </div>
    )
}
