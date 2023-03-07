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
import useAddReview from "hooks/Review/addReview";

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
   
});

function WriteReviewModal(props) {
    const classes = useStyles();
    const [experience, setExperience] = React.useState(2);
    // const [quality, setQuality] = React.useState(2);
    // const [speed, setSpeed] = React.useState(2);
    // const [communication, setCommunication] = React.useState(2);
    const [feedback,setFeedback] = useState("");
    const [addReviewEntry] = useAddReview();
    
    const handleClose = () => {
        props.onClose();
    };

    const handleListItemClick = (value) => {
        props.onClose();
    };
    const handleReviewSubmit =async () => {
          
      
        const reviewRes = await addReviewEntry(props.userId,props.productId,experience,feedback)
        props.onAddReview(reviewRes.data.createOrUpdateProductReview);
       
    }
    return (
        <Dialog className="writeReview__Wrapper" maxWidth="sm" fullWidth={true} onClose={handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
        <div className="writeReview__modalContainer">
                <div className="writeReview__header">
                    <Typography variant="h2" className="writeReview__heading">Write a review</Typography>
                    <img onClick={props.onClose} className="writeReview__closeBtn" src="/icons/cross.svg" />
                </div>
                <div className="writeReview__row">
                    <Typography variant="h2" className="writeReview__title">How was your experience with the buyer?</Typography>
                    <div className="writeReview__ratingBox">
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Rating
                                name="Experience"
                                value={experience}
                                precision={0.5}
                                onChange={(event, newValue) => {
                                    setExperience(newValue);
                                }}
                            />
                        </Box>
                    </div>
                </div>
                {/* <div className="writeReview__row">
                    <Typography variant="h2" className="writeReview__title">Quality of product?</Typography>
                    <div className="writeReview__ratingBox">
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Rating
                                name="Quality"
                                value={quality}
                                onChange={(event, newValue) => {
                                    setQuality(newValue);
                                }}
                            />
                        </Box>
                    </div>
                </div>
                <div className="writeReview__row">
                    <Typography variant="h2" className="writeReview__title">Speed of delivery?</Typography>
                    <div className="writeReview__ratingBox">
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Rating
                                name="Speed"
                                value={speed}
                                onChange={(event, newValue) => {
                                    setSpeed(newValue);
                                }}
                            />
                        </Box>
                    </div>
                </div>
                <div className="writeReview__row">
                    <Typography variant="h2" className="writeReview__title">Communication?</Typography>
                    <div className="writeReview__ratingBox">
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Rating
                                name="Communication"
                                value={communication}
                                onChange={(event, newValue) => {
                                    setCommunication(newValue);
                                }}
                            />
                        </Box>
                    </div>
                </div> */}
                <textarea value={feedback} onChange={(e)=>setFeedback(e.target.value)} rows={6} className="writeReview__comment"/>
                <Button className="writeReview__submitBtn" onClick={handleReviewSubmit}>Submit Review</Button>
           </div>
        </Dialog>
         
    );
}

WriteReviewModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};
export default WriteReviewModal;


