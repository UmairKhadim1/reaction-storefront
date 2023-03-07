import React from 'react';
import { Typography } from "@material-ui/core"
export default function Index() {
    return (
        <div className="popularSeller">
            <div className="popularSeller_profileImg" style={{
                backgroundImage:"URL(/images/sellerProfile.jpg)"
            }}>
            </div>
            <Typography className="popularSeller_profileTitle" variant="h5" component="h2">John doe</Typography>
            <Typography className="popularSeller_profileViewBtn" variant="h5" component="h2">view store</Typography>
        </div>
    )
}
