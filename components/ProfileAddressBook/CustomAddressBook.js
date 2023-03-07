import React, { useState } from 'react';
import { Grid, Typography, Button } from "@material-ui/core";
import AddAddress from './AddAddress';
import UpdateAddress from "./UpdateAddress";
export default function CustomAddressBook(props) {
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [showUpdateAddress, setShowUpdateAddress] = useState(false);
    const [currentAddress, setCurrentAddress] = useState({});

    const handleEditClick = (item) => {
        setCurrentAddress(item),
            setShowUpdateAddress(true)
    }
    return (
        <div className="customAddressBook">
            {showAddAddress == true ?
                <Grid container style={{display:"flex",justifyContent:"center"}}>
                    <Grid item xs={12} md={8} lg={6}>
                        <AddAddress {...props} setShowAddAddress={(val) => setShowAddAddress(val)} isSeller={props.isSeller} />
                    </Grid>
                </Grid>
                : showUpdateAddress == true ?
                <Grid container style={{display:"flex",justifyContent:"center"}}>
                <Grid item xs={12} md={8} lg={6}>
                    <UpdateAddress {...props} currentAddress={currentAddress} setShowUpdateAddress={(val) => setShowUpdateAddress(val)} isSeller={props.isSeller} />
                    </Grid>
                </Grid>
                    :
                    <>
                        <Grid container className="customAddressBook__containerCard" spacing={3}>{props?.account?.addressBook.map((item, i) => {
                            if (item) {
                                return (
                                    <Grid item xs={12} sm={6} md={4}>
                                        <div className="customAddressBook__Card">
                                            <div className="customAddressBook__titleContainer">
                                                <Typography className="customAddressBook__title" variant="h2">{item.fullName}</Typography>
                                                <Typography variant="a" component="a" className="customAddressBook__action" onClick={() => handleEditClick(item)}>Edit</Typography >
                                            </div>
                                            <Grid container>
                                                <Grid item xs={12} md={9}>
                                                    <Typography className="customAddressBook__address" variant="h2">{item.address1 + " " + item.city + " " + item.country + " " + item.region}</Typography>
                                                </Grid>
                                            </Grid>

                                            <Typography className="customAddressBook__phone" variant="h2">{item.phone}</Typography>
                                        </div>
                                    </Grid>
                                )
                            }
                        })}
                        </Grid>
                        <Button onClick={() => setShowAddAddress(true)} className="customAddressBook__addAddress"><img src="/icons/uploadFileIcon.png" /><span>Add new address</span></Button>
                    </>
            }
        </div>
    )
}
