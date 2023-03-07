import React from 'react'
import { Typography } from '@material-ui/core'
export default function ImageStepCard(props) {
    const keyObject = props.title;
   
    return (
        <>
        <div className={`ImageStepCard ${props.uploadedUrl.length >0?"":"ImageStepCard__highlight"}`} onClick={()=>props.onSelectIcon(props.key)}>
            <img className="ImageStepCard__img" src={props.image}/>
            <Typography className="ImageStepCard__title" variant="h2">{props.title}</Typography>
           {props.uploadedUrl.length >0 ? <img className="ImageStepCard__tick" src="/icons/tickIcon.png" />
            :<img className="ImageStepCard__uploadBtn" src="/icons/uploadFileIcon.png" />}
        </div>
        </>
    )
}
