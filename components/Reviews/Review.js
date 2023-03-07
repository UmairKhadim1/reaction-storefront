import React, {useState} from 'react'
import { Grid, Typography  } from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';
import moment from 'moment';
export default function Review(props) {
    const [star, setStar] = useState([1,2,3,4,5]);
    const formatDays = () => {
       
        var startDate = moment(props.item.updatedAt).format("DD/MM/YYYY");
        var structStartDate =  moment(startDate, "DD/MM/YYYY"); 
        var currenDate = moment(new Date()).format("DD/MM/YYYY");
        var endDate = moment(currenDate, "DD/MM/YYYY"); 
        var result =  endDate.diff(structStartDate, 'days')+"day ago";
        
        if(result == "0day ago"){
            return "Today";
        }
        return result;
    }
    return (
        <div className="Review">
            <Grid container>
                <Grid item xs={9} className="Review__info">
                    <div className="Review__profileImg" style={{backgroundImage:`url(${props.item.createdBy.image != null? props.item.createdBy.image :"/images/sellerProfile.jpg"})`}}>

                    </div>
                    <div className="Review__profileInfo">
                        <Typography xs={12} variant="h5" component="h2" className="Review__profileName">{props.item.createdBy.name}</Typography>
                        <div className="Review__reviewStars">
                        <Rating
                        size="small"
        name="productRating"
        value={props.item.score}
        readOnly
        precision={0.5}
        // emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
                        {/* {
                         star.map((item, i) =>{
                              return( <span class="fa fa-star"></span>)
                            })
                        } */}
                        <span className="Review__rating">{props.item.score}</span>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3} className="Review__date">
                   <span>  {formatDays()}</span>
                </Grid>
            </Grid>
            <Typography xs={12} className="Review__description">
               {props.item.review}
            </Typography>
        </div>
    )
}
