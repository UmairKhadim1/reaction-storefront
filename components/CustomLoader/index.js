import React from 'react'
import animationData from "../Animation/data.json";
import Lottie from "lottie-react";
import {Grid} from "@material-ui/core";
export default function Loader() {
    return (
        <div className="customLoader">
              <Grid container justify="center" alignItems="center" className="customLoader__style">
                <Grid className="customLoader__animation">
                    <Lottie animationData={animationData} />
                </Grid>
             </Grid>
        </div>
    )
}
