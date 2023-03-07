import React from 'react'
import {Typography, Grid, Button} from "@material-ui/core";
import Link from "components/Link";

export default function SellerProfileItem(props) {
    
    return (
    //     <Link
    //     href={props.item.parentId && "/variant/[...slugOrId]"}
    //     as={props.item.parentId && `/variant/${props.item.parentId}?variantId=${props.item._id}`}
    //   >
        <div className="sellerProfile__productCard">
            <div className="SP__productCrd__ImgContainer">
                 <img className="contain__img" src={props.item.media.length>0 ? props.item?.media[0]?.URLs?.large:"/images/placeholderImage.png"}/>
                 <div className="SP__productCard__actions">
                     {props.item.isVisible ?
                     <Button className="SP__productCard__actionBtn" onClick={()=>props.handleUnPublish(props.item,props.item.shop._id,props.item._id,props.item.ancestorId)}>Un-Publish <div className="SP__productCard__actionBtnGreen"></div></Button>:<>
                     <Button className={props.item?.media?.length?"SP__productCard__actionBtn":"SP__productCard__actionBtn hidden-btn"} onClick={()=>props.handlePublish(props.item,props.item.shop._id,props.item._id,props.item.ancestorId)} >Publish <div className="SP__productCard__actionBtnGrey"></div></Button>
                     {/* <Button className="SP__productCard__actionBtn" onClick={()=>props.handleArchiveVariant(props.item.shop._id,props.item._id)}>Archive</Button> */}
                     </>
                    }
                     <Link className="SP__productCard__actionBtn" href={`/uploadProduct?updateProductId=${props.item._id}`}>Edit</Link>
                    
                   
                 </div>
                 {/* ?variantId=${props.item._id} */}
                {props.item.isVisible && <Link className="SP__productCard__actionBtnPreview" href={`/product/${props.item.slug}`}>Preview</Link>}
                <div onClick={()=>{!props.item.isVisible ? props.handleArchiveVariant(props.item.shop._id,props.item._id): props.notify()}} className="SP__productCard__actionBtn__DeltImg">
                    <img src="/icons/deleteIcon.png" />
                  </div>
            </div>
            <div className="SP__productCard__footerContainer">
                 <Typography className="SP__productCard__title" variant="h5">{props.item.title}</Typography>
                 <Typography className="SP__productCard__price" variant="h5">{props.shop.currency.symbol+props.item.price}</Typography>
            </div>
          
        </div>
        // </Link>
    )
}
