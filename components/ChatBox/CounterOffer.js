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
import useAddOffer from "hooks/Bidding/addOffer";
import { useRouter } from "next/router";
import {  toast } from 'react-toastify';
import {TextField, InputAdornment} from "@material-ui/core"
const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },

});

function AddBidModal(props) {
    const [addOfferEntry] = useAddOffer();
    const classes = useStyles();
  const [isSendingText, setIsSendingText] = useState(false);

    const [bidValue, setBidValue] = React.useState("");
    const router = useRouter();
    const handleClose = () => {
        props.onClose();
    };
    const notify = (val) => toast(val);
    const handleListItemClick = (value) => {
        props.onClose();
    };
    const handleReviewSubmit = async () => {
        const { selectedContact, currentBid,bids } = props;
        if(+bidValue < currentBid.product.pricing.price && +bidValue>=0){
        const structOffer = {
            amount: {
                amount: +bidValue,
                currencyCode: props.shop.currency.code
            },
            text: "My offer to you for this product is "+props.shop.currency.symbol+""+bidValue+".",
            status: "counterOffer"
        }
        const offerType = "counterOffer";
        const to = selectedContact.soldBy == props.account.userId ? selectedContact.createdBy : selectedContact.soldBy;
        const bidId = currentBid._id;
        
        if (structOffer && to && bidId) {
            setIsSendingText(true)
            const res = await addOfferEntry(bidId, structOffer, to, offerType);
            setIsSendingText(false)
            const newBidObj = res.data.sendOffer;
            if (res) {
                const newBids = bids.map((bid, i) => {
                    if (bid._id == currentBid._id) {
                        const newOffer = [...bid.offers];
                        newOffer.push(newBidObj)
                        return {
                            ...bid,
                            offers: newOffer,
                            activeOffer: {
                                text:res.data.sendOffer.text,
                                amount:{ ...res.data.sendOffer.amount}
                            },
                            canAccept:res.data.canAccept
                        }
                    }
                    return bid;
                });
                const updateCurrentBid = [...currentBid.offers];
                updateCurrentBid.push(newBidObj);
               
                props.handleCounterOffer(newBids, updateCurrentBid,res.data.sendOffer);
            }
        }
    }else{notify("Offered amount must be less than actual price. ")}
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
                    {/* <input className="bidInput" type="number" min="1" value={bidValue} onChange={(e) => setBidValue(e.target.value)} /> */}
                </div>
                <Button className="addBid__submitBtn" disabled={isSendingText} onClick={handleReviewSubmit}>Submit Bid</Button>
            </div>
        </Dialog>

    );
}

AddBidModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};
export default AddBidModal;


