import React, { useState, useEffect } from 'react'
import { Grid, Typography, Button } from "@material-ui/core";
import useAuthStore from "hooks/globalStores/useAuthStore";
import useUpdateProfile from "hooks/updateProfile/useUpdateProfile";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import { GQL_URL } from "../../apiConfig";
export default function index(props) {
  const router = useRouter();
  const [updateProfileEntry] = useUpdateProfile();
  const [ukShoesSizes, setUkShoesSizes] = useState([5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5])
  const [currentPrimarilyType, setCurrentPrimarilyType] = useState("individual");
  const [image, setImage] = useState({ preview: "", raw: null });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [isEditProfile, setIsEditProfile] = useState(true);
  const { account, accessToken } = useAuthStore();
  const [isUserNameTouched, setIsUserNameTouched] = useState(false);
  const [prevUserName, setPrevUserName] = useState("");
  useEffect(() => {
    setImage({
      preview: account.picture, raw: null
    })
    setFirstName(account.firstName);
    setLastName(account.lastName);
    setUsername(account.username);
    setPrevUserName(account.username);
  }, []);
  const handleUsername = (e) => {

    if (prevUserName.replace(/ /g, '') != e.replace(/ /g, '')) {
      setIsUserNameTouched(true);
    }
    setUsername(e);
  }
  const handleChange = (e) => {
    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0]
    })
  }
  const notify = (val) => toast(val, {
    hideProgressBar: true
  });
  const handleUpload = async e => {
    e.preventDefault();
    if (!isUserNameTouched) {
      const name = firstName + " " + lastName;

      if (image.raw != null) {
        const formData = new FormData();
        formData.append("photos", image.raw, image.raw?.name);
        formData.append("isMulti", "false");
        formData.append("uploadPath", `users/${account.userId}/profile`);
        var requestOptions = {
          method: "POST",
          body: formData,
          redirect: "follow",
        };
        //https://api.landofsneakers.com/upload

        fetch("https://api.landofsneakers.com/upload", requestOptions)
          .then((response) => response.json())
          .then(async (result) => {

            const res = await updateProfileEntry(name, firstName, lastName, result.data[0].url, username);
            if (res) {
              //     notify("Profile updated successfully")
              //    let timeerrr=  setTimeout(()=>{
              //     router.push("/en/profile/address")
              //     },1000)
              //     clearTimeout(timeerrr);
              router.push("/en/profile/address")

              // props.onUpdateProfite(res.data.updateAccount.account);

            }

          })
      } else {
        const res = await updateProfileEntry(name, firstName, lastName, image.preview, username);
        if (res) {
          // props.onUpdateProfite(res.data.updateAccount.account);
          router.push("/en/profile/address")

        }
      }
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `${accessToken}`);
      var graphql = JSON.stringify({
        query: `
            query IsAvailable($userName:String!){
                isAvailable(userName:$userName)
            }
            `,
        variables: {
          userName: username
        },
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: graphql,
        redirect: "follow",
      };
      fetch(GQL_URL, requestOptions)
        .then((response) => response.text())
        .then(async (result) => {
          const isAvailable = JSON.parse(result).data.isAvailable;
          // resolve(JSON.parse(result).data);
          if (isAvailable) {
            const name = firstName + " " + lastName;

            if (image.raw != null) {
              const formData = new FormData();
              formData.append("photos", image.raw, image.raw?.name);
              formData.append("isMulti", "false");
              formData.append("uploadPath", `users/${account.userId}/profile`);
              var requestOptions = {
                method: "POST",
                body: formData,
                redirect: "follow",
              };
              //https://api.landofsneakers.com/upload

              fetch("https://api.landofsneakers.com/upload", requestOptions)
                .then((response) => response.json())
                .then(async (result) => {

                  const res = await updateProfileEntry(name, firstName, lastName, result.data[0].url, username);
                  if (res) {
                    //     notify("Profile updated successfully")
                    //    let timeerrr=  setTimeout(()=>{
                    //     router.push("/en/profile/address")
                    //     },1000)
                    //     clearTimeout(timeerrr);
                    router.push("/en/profile/address")

                    // props.onUpdateProfite(res.data.updateAccount.account);

                  }

                })
            } else {
              const res = await updateProfileEntry(name, firstName, lastName, image.preview, username);
              if (res) {
                // props.onUpdateProfite(res.data.updateAccount.account);
                router.push("/en/profile/address")

              }
            }
          } else {
            notify("This username not available")
          }
        })
        .catch((error) => {
          // reject(error);
        });
    }
  };
  return (
    <div className="completeProfile">
      <Grid container className="completeProfile__wrapper">
        {/* <Grid xs={12} >
           { !isEditProfile?<Button  onClick={()=>setIsEditProfile(true)} className="customAddressBook__addAddress" style={{marginLeft:"auto"}}>
      
          <span> Edit Profile</span>
          </Button>   :
          <Button  onClick={()=>setIsEditProfile(false)} className="customAddressBook__addAddress" style={{marginLeft:"auto"}}>
      
          <span> Cancel</span>
          </Button>}   
                </Grid> */}
        <Grid xs={12} sm={8} lg={6}>
          {/* <Typography className="completeProfile__title" variant="h2" component="h2">Complete Profile</Typography> */}
          {/* <div className="completeProfile__primarilyType">
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
            </div> */}
          <Typography className="completeProfile__profileImgTitle" variant="h2">I’m primarily a:</Typography>
          <div className="completeProfile__profileImgContainer">
            <div className="completeProfile__profileImgBox">
              {image.preview ? (
                <img className="completeProfile__profileImgPreview" src={image.preview} />) : (
                <img className="completeProfile__profileImgPlaceholder" src="/icons/uploadImgPlaceHolder.png" />
              )}
              {isEditProfile && <> <label htmlFor="upload-button">   <div className="completeProfile__uploadProfileImg"><img src="/icons/uploadFileIcon.png" /></div></label>
                <input type="file" id="upload-button" style={{ display: 'none' }} onChange={handleChange} /> </>}
            </div>
          </div>
          <div>
            <div className="completeProfile__formRow">
              <label>First name</label>
              <input type="text" value={firstName} name="firstName" className="firstName" placeholder="Enter First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="completeProfile__formRow">
              <label>Last name</label>
              <input type="text" value={lastName} name="lastName" className="lastName" placeholder="Enter Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="completeProfile__formRow">
              <label>User name</label>
              <input type="text" value={username} name="username" className="username" placeholder="Enter User Name"
                onChange={(e) => handleUsername(e.target.value)}
              />
            </div>
            {/* <div className="completeProfile__formRow">
                      <label>Shoe size</label>
                      <select className="completeProfile__ShoeSizes">
                          {ukShoesSizes.map((item,i)=>{
                              return(
                                  <option key={i} className="completeProfile__ShoeSize">UK {item}</option>
                              )
                          })}
                          
                      </select>
                </div>
                <Typography className="completeProfile__billingAddress" variant="h2">Billing Address</Typography>
                <div className="completeProfile__formRow">
                      <label>Address line 1</label>
                      <input type="text" value="" name="addressLine1" className="addressLine" placeholder="Enter address"/>
                </div>
                <div className="completeProfile__formRow">
                      <label>Address line 2</label>
                      <input type="text" value="" name="addressLine2" className="addressLine" placeholder="Enter address"/>
                </div>
                <div className="completeProfile__formRow">
                      <label>City</label>
                      <input type="text" value="" name="city" className="city" placeholder="Enter city"/>
                </div>
                <div className="completeProfile__formRow">
                      <label>Postal / Zip Code</label>
                      <input type="text" value="" name="postalCode" className="postalCode" placeholder="Enter zip code"/>
                </div>*/}
          </div>
          {isEditProfile && <div className="completeProfile__footer">
            <Button className="saveBtn" onClick={handleUpload}>Save</Button>
          </div>}
        </Grid>
      </Grid>

    </div>
  )
}
