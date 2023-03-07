import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import useAddBid from "hooks/Bidding/useAddBid";
import {useRouter} from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import {TextField,InputAdornment} from "@material-ui/core"
const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
   
});

function AddBidModal(props) {
    const classes = useStyles();
    const [bidValue, setBidValue] = React.useState(null);
    const [addBidEntry] = useAddBid();
    const router =useRouter();
    const handleClose = () => {
        props.onClose();
    };

    const handleListItemClick = (value) => {
        props.onClose();
    };
    const notify = (str) => toast(str);
    const handleReviewSubmit =async () => {
  const{shop,currentVariantId,userId,product,account} = props;
    const currentVariant = product.variants.filter((variant)=> variant._id == currentVariantId);
    if(bidValue && +bidValue < currentVariant[0].pricing[0].price && +bidValue>0){
    if(account.userId){
    const filtervariant = product.variants.filter((variant,i)=>variant._id == currentVariantId);
     
    const filterSoldByUser = filtervariant[0].uploadedBy.userId;
    
          
          const structOffer = {
            amount:{
                amount:+bidValue,
                currencyCode:shop.currency.code
            },
            text: "My offer to you for this product is "+props.shop.currency.symbol+""+bidValue+".",
            status:"new"
          }
          const offerTypes = 'counterOffer';
          const productPrice = {
              amount: filtervariant[0].pricing[0].price,
                currencyCode:shop.currency.code
          }

          if(filterSoldByUser != account.userId){
         const bidRes = await addBidEntry(shop._id,currentVariantId,structOffer,filterSoldByUser,product.productId,offerTypes,productPrice);
         if(bidRes){
             notify("Bid successfully placed");
               router.push("/en/chat");
         }
        }else{
            notify("You cannot bid on your own product.");
        }
    }else{
         notify("Login to bid on this product");
        router.push("/signin");
    }
}else{notify("Offered amount must be less than actual price. ")}
        // props.onAddReview(reviewRes.data.createOrUpdateProductReview);
        
    }
    return (
        <Dialog className="writeReview__Wrapper" maxWidth="sm" fullWidth={true} onClose={handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
      
        <div className="writeReview__modalContainer">
                <div className="writeReview__header">
                    <Typography variant="h2" className="addBid__heading">Bidding</Typography>
                    <img onClick={props.onClose} className="writeReview__closeBtn" src="/icons/cross.svg" />
                </div>
                <div className="writeReview__row">
                    <Typography variant="h2" className="addBid__title">Add your Bid</Typography>
                    <TextField
            id="standard-basic"
            className="variant__customizedInput bidInput"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span>£</span>
                </InputAdornment>
              ),
            }}
            value={bidValue}
            onChange={(e) => setBidValue(e.target.value)}
          />
                    {/* <input  min="1"  type="number" value={bidValue} onChange={(e)=>setBidValue(e.target.value)} /> */}
                </div>
                <Button className="addBid__submitBtn" onClick={handleReviewSubmit}>Submit Bid</Button>
           </div>
        </Dialog>
         
    );
}

AddBidModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};
export default AddBidModal;


