import * as React from 'react';
// import Popover from '@mui/material/Popover';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import { Popover, Typography, Button, Grid } from "@material-ui/core";
export default function BasicPopover(props) {
    const { currentBid, bids, handleChangeBid } = props
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handleBidClick = (bid) => {
        handleChangeBid(bid);
         handleClose();
    }
    return (
        <div>
            {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Popover
      </Button> */}
          {bids.length>0 &&
          <div className="custom__chatBoxHeader">
            <div aria-describedby={id} variant="contained" onClick={handleClick} className="chatBox__messageHeader__right">
                <img className="CB__MH__productImg" src={currentBid.product && currentBid.product.media[0].URLs.large} />
                <div className="CB__MH__infoContainer">
                    <Grid container style={{height:"100%"}}>
                        <Grid item xs={12} lg={10} style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                            <Typography className="CB__MH__PTitle" variant="h2">{currentBid.product && currentBid.product.title}</Typography>
                            <Typography className="CB__MH__PPrice" variant="h2">{currentBid.product && props?.shop?.currency?.symbol+currentBid.product.pricing.price}</Typography>
                        </Grid>
                    </Grid>
                </div>
                {open ?<img className="CB__MH__dropdownIcon" src="/icons/arrowUp.png" /> :<img className="CB__MH__dropdownIcon" src="/icons/arrowDown.png" />}
            </div></div>}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}

                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {bids.map((bid, i) => {
                    return (
                        <div className="chatdropdown__products" onClick={() => handleBidClick(bid)}>
                            <div className="chatdropdown__productsItem" >
                                <div variant="contained" className="chatBox__messageHeader__right">
                                    <img className="CB__MH__productImg" src={bid.product.media[0].URLs.large} />
                                    <div className="CB__MH__infoContainer">
                                        <Grid container>
                                            <Grid item xs={12} lg={10}>
                                                <Typography className="CB__MH__PTitle" variant="h2">{bid.product.title}</Typography>
                                                <Typography className="CB__MH__PPrice" variant="h2">{props.shop.currency.symbol+bid.product.pricing.price}</Typography>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                            </div>
                            
                            {bid.isNewOffer && <div className="CB__MH__offerFlag"></div>}
                          
                        </div>
                    )
                })}
            </Popover>
        </div>
    );
}
