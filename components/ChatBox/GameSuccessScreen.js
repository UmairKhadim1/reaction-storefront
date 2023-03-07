import React from 'react'
import {Typography, Grid,Button} from "@material-ui/core";
export default function GameSuccessScreen(props) {
    return (
        
        <Grid container className="gameSuccessScreen">
            <Grid className="gameSuccessScreen__innerContainer" item xs={12} sm={10} md={8} lg={5}>
                    <img className="gameSuccessScreen__logo" src="/images/chatShoes.svg"/>
                    <Typography className="gameSuccessScreen__winnerName" variant="h2">{props.wonByInfo.name} WINS!</Typography>
                    <img className="gameSuccessScreen__winnerBadge" src="/images/chatCrown.svg"/>
                    <div className="gameSuccessScreen__winnerProfile" style={{backgroundImage:props.wonByInfo.image?"url("+props.wonByInfo.image+")":"url("+"/images/sellerProfile.jpg"+")"}}></div>
                    <Typography className="gameSuccessScreen__prizeTitle" variant="h2">{props.winnerInfo.product.title}</Typography>
                    <Typography className="gameSuccessScreen__prizePrice" variant="h2">{props.winnerInfo.offer.amount.displayAmount}</Typography>
                    <div className="gameSuccessScreen__textWrapper">
                    <Typography className="gameSuccessScreen__text" variant="h2">Sneakers</Typography>
                    <Typography className="gameSuccessScreen__text" variant="h2">Copped for</Typography>
                    <Typography className="gameSuccessScreen__text" variant="h2">{props.winnerInfo.offer.amount.displayAmount}</Typography>
                   {props.currentBid.createdBy == props.account.userId  && <Button className="gameBuyNow__Btn" href={`/en/variant/${encodeURIComponent(props.winnerInfo.productSlug)}?variantId=${props.winnerInfo.reactionVariantId}`}>Buy Now</Button>}
                    </div>
                </Grid>
                </Grid>
    )
}
