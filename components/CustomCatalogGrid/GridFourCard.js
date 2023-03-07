import React from 'react'
import {Grid} from "@material-ui/core";
import CatalogGridItem from '../CatalogGridItem/CatalogGridItem';
export default function Index(props) {
      const shuffleArray = props.products.sort(); 
    return (
        // className="productGrid__4cardContainer" className={`productGrid__4card${i}`}
         <Grid container spacing={0,3,3,3} className="productGrid__4cardContainer">
          
            {shuffleArray.map((item, i)=>{
                
                return(
                    <Grid item xs={12} sm={6} md={6} lg={3} xl={3} >
                       <CatalogGridItem 
                       className="cat-thumb-main"
                       product={item}
                        // {...props}
                        />
                    </Grid>
                )
            })}
         </Grid>
    )
}
