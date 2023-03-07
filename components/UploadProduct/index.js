import React, {useState} from 'react'
import Step1 from "./step1";
import Step2 from "./Step2";
import { Grid } from "@material-ui/core";
export default function Index(props) {
   const [newProductId, setNewProductId] =  useState("");
   const [newVariantId, setNewVariantId] =  useState("");
   const [step1,setStep1] = useState(true);

  const handleProductInfoNext = (prodId,VariantId) =>{
    setNewProductId(prodId);
    setNewVariantId(VariantId);
    setStep1(false);
  }  
  return (
    <div className="uploadProduct">
      <Grid container justifyContent="center">
        <Grid item xs={12} md={9} lg={7}>
          {step1 == true ?
           <Step1 account={props.account} updateProductId={props.updateProductId} shop={props.shop} products={props.products} lang= {props.lang} brands={props.brands} handleProductInfoNext = {(prodId,VariantId)=>handleProductInfoNext(prodId,VariantId) }/>
           :<Step2 back={()=>setStep1(true)} account={props.account} updateProductId={props.updateProductId} shop={props.shop} newProductId={newProductId} newVariantId={newVariantId} /> }
         
        </Grid>
      </Grid>

    </div>
  )
}
