import React from 'react'
import { Grid,Typography } from '@material-ui/core'
export default function GameCard(props) {
    return (
        <Grid container className="gameCard">
            <Grid className="gameCard__innerContainer" item xs={12} sm={10} md={8} lg={6}>
            <img className="gameCard__logo" src="/icons/logo.svg" />
            <Typography variant="h2" className="gameCard__title">Land of Sneakers coin toss</Typography>    
            <Typography variant="h2" className="gameCard__description">Winner of the coin toss will have the offer they requested.</Typography>
            <Grid container className="gameCard__gamePlayerRow">
                <Grid xs={5} >
                    <div className="gamePlayer__container">
                    <div className="gamePlayer__profileImg" style={{backgroundImage:
                        props.tossResultObj.wonBy == props.account.userId?  props.tossResultObj.wonByInfo.image?"url("+props.tossResultObj.wonByInfo.image+")":  "url("+"/images/sellerProfile.jpg"+")"
                        : props.tossResultObj.lostByInfo.image?"url("+props.tossResultObj.lostByInfo.image+")":  "url("+"/images/sellerProfile.jpg"+")"
                        }}></div>
                    <Typography variant="h2" className="gamePlayer__selectedOption" >{props.tossResultObj.head == props.account.userId ? "Head":"Tail"}</Typography>
                    <img className="gameCard__gameIcon" src={`${props.tossResultObj.head == props.account.userId?"/images/head.png":"/images/tail.png"}`}/>
                    </div>
                    <Grid xs={12}>
                    <Typography variant="h2" className="gamePlayer__selectedOption gamePlayer__profileName">
                        {props.tossResultObj.wonBy == props.account.userId?  props.tossResultObj.wonByInfo.name:props.tossResultObj.lostByInfo.name}
                        </Typography>
                        </Grid>
                 </Grid>
                 <Grid xs={2} className="gamePlayer__container">
                      {/* <img className="gameCard__gameIcon" src="/icons/gameIcon.png"/> */}
                 </Grid>
                 <Grid xs={5} className=" gamePlayer__containerRight">

                 <div className="gamePlayer__container">
                 <img className="gameCard__gameIcon" src={`${props.tossResultObj.head == props.account.userId?"/images/tail.png":"/images/head.png"}`}/>
                 <Typography variant="h2" className="gamePlayer__selectedOption">{props.tossResultObj.head == props.account.userId ? "Tail":"Head"}</Typography>
                 <div className="gamePlayer__profileImg" style={{backgroundImage:  
                        props.tossResultObj.wonBy == props.account.userId?  props.tossResultObj.lostByInfo.image?"url("+props.tossResultObj.lostByInfo.image+")":  "url("+"/images/sellerProfile.jpg"+")"
                        : props.tossResultObj.wonByInfo.image?"url("+props.tossResultObj.wonByInfo.image+")":  "url("+"/images/sellerProfile.jpg"+")"}}></div>
                        </div>
                        <Grid xs={12}>
                    <Typography variant="h2" className="gamePlayer__selectedOption gamePlayer__profileName">
                        {props.tossResultObj.wonBy == props.account.userId?  props.tossResultObj.lostByInfo.name:props.tossResultObj.wonByInfo.name}
                        </Typography>
                        </Grid>
                 </Grid>
            </Grid>
          {props.tossResult.toLowerCase() == "head" ?  <img className="gameCard__animation" src="/gifs/tossLos.gif"/>:<img className="gameCard__animation" src="/gifs/tossShoe.gif"/>}
            </Grid>
        </Grid>
    )
}
