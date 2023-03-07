import React from 'react'
import {Typography, Grid, Button} from "@material-ui/core";
import Link from "components/Link";

export default function SellerProfileItem(props) {
    
   
    return (
        <Link
        href={props.item.parentId && "/variant/[...slugOrId]"}
        as={props.item.parentId && `/variant/${props.item.parentId}?variantId=${props.item._id}`}
      >
        <div className="sellerProfile__productCard">
            <div className="SP__productCrd__ImgContainer">
                {/* props.item.media.length>0 ? props.item?.media[0]?.URLs?.large: */}
                 <img src={props.item.media.length>0 ? props.item.media[0].URLs.large : "/images/placeholder.gif"}/>
            </div>
            <div className="SP__productCard__footerContainer">
                 <Typography className="SP__productCard__title" variant="h5">{props.item.title}</Typography>
                 <Typography className="SP__productCard__price" variant="h5">{props.shop.currency.symbol+props.item.pricing.price}</Typography>
            </div>
          
        </div>
        </Link>
    )
}
