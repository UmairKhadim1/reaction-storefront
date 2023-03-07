import React, {useState} from 'react'
import {Grid,Typography,Switch,FormControlLabel  } from "@material-ui/core";
const label = { inputProps: { 'aria-label': 'controlled' } };
export default function ShippingMethodCard(props) {
    const [checked, setChecked] = useState(false);
    const handleChange = (event,fullfillmentId) => {
        
        setChecked(event.target.checked);
        props.handleSwitch(fullfillmentId,event.target.checked);
    }
    
    return (
        <div className="ShippingMethodCard">
            <div>
            <img className="ShippingMethodCard__img" src={`/icons/${props.item.name.toLowerCase()}.png`}/>
            </div>
            <div className="ShippingMethodCard__info">
                <Typography className="ShippingMethodCard__title" variant="h2">Name</Typography>
                <Typography className="ShippingMethodCard__value" variant="h2" >{props.item.name}</Typography>
                {/* <FormControlLabel control={<Switch defaultChecked />} label="Label" />
      <FormControlLabel disabled control={<Switch />} label="Disabled" /> */}
                <Switch  checked={props.status}  onChange={(e)=>handleChange(e,props.item._id)} {...label} />
                </div>
        </div>
    )
}
