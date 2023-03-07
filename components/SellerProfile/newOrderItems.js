import React, { useState, useEffect,useMemo } from "react";
import SellerProfileItem from "./SellerProfileItem";
import { Grid, Typography, Button,Dialog } from "@material-ui/core";
import ProductGridEmptyMessage from "../ProductGrid/ProductGridEmptyMessage";
import useUpdateVariant from "../../hooks/UpdateVariant/useUpdateVariantPublish";
import useArchiveVariant from "../../hooks/archiveVariants/useArchiveVariant";
import useAuthStore from "hooks/globalStores/useAuthStore";
import { ToastContainer, toast } from 'react-toastify';
import NewOrderDetail from "./newOrderDetail";
import NewOrder from "./newOrder";
import CollapsibleTable from "./collapsibleTable";
import Pagination from "components/CustomCatalogGrid/Pagination"
let PageSize = 20;
export default function NewOrderItems(props) {
  const [itemsData, setItemsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderDetailOpen, setOrderDetailOpen] = useState(false);
  const { account } = useAuthStore();
  useEffect(()=>{
    const res =  props.items.filter((data,i)=>{
      if(data.status != "Completed"){
        if(data.status != "coreOrderWorkflow/canceled"){
          return data;
        }
         
      }
    })
    setItemsData(res)
   },[])
  if ((props.items && props.items.length == 0) || props.items == null)
    return (
      <Grid item xs={12}>

       {account.identityVerified? <React.Fragment>
        <h2 className="sellerProfile__noListingMsg">No Orders found</h2>
        </React.Fragment>:<React.Fragment>
        <h2 className="sellerProfile__noListingMsg">To start selling, profile verification is required  &nbsp;&nbsp;
        <a href="/en/contact" className="red-font">
        <span>Contact Us Now</span>
        </a>
        
        </h2>
        
          </React.Fragment>}
      </Grid>
    );
  const [updateVariantEntry] = useUpdateVariant();
  const [archiveVariantEntry] = useArchiveVariant();
  const handlePublish = async (item, shopId, variantId,productId) => {
    const variantStruct = {
      isVisible: true,
    };
    const res = await updateVariantEntry(variantStruct, shopId, variantId,productId);
    if (res) {
      const reStructObj = itemsData.map((val, i) => {
        if (val._id == variantId) {
          return {
            ...val,
            isVisible: true,
          };
        }
        return val;
      });
      setItemsData(reStructObj);
    }
  };
  const notify = () => toast("Un-Pubish the Product to delete",{
    hideProgressBar: true
  });
  const handleUnPublish = async (item, shopId, variantId,productId) => {
    const variantStruct = {
      isVisible: false,
    };
    const res = await updateVariantEntry(variantStruct, shopId, variantId,productId);
    if (res) {
      const reStructObj = itemsData.map((val, i) => {
        if (val._id == variantId) {
          return {
            ...val,
            isVisible: false,
          };
        }
        return val;
      });
      setItemsData(reStructObj);
    }
  };
  const handleArchiveVariant = async (shopId, variantId) => {
  
    const res = await archiveVariantEntry(shopId, variantId);
    
    if (res) {
      const reStructObj = itemsData.filter((val, i) => {
        if (val._id != variantId) {
          return val;
        }
      });
      setItemsData(reStructObj);
     }
  };
  const handleClose = () => {
    setOrderDetailOpen(false)
  }
  const restructOrdersStatusUpdated = (orderId, status) => {
    if(status == "Completed" || status == "coreOrderWorkflow/canceled"){
      const res =  itemsData.filter((data,i)=>{
        if(data._id != orderId){
            return data;
          }
           
        })
      setItemsData(res)
    }else{
      const newArray = itemsData.map((val,i)=>{
        if(val._id == orderId){
          return {
              ...val,
              status:status
          }
        }
       return val;
      })
      setItemsData(newArray);
    }
    
  }
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return itemsData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage,itemsData]);
  return (
    <div>
      
      <Grid container >
        {/* <Grid item xs={12}>
        <Button href="/en/uploadProduct" className="customAddressBook__addAddress">
          <img src="/icons/uploadFileIcon.png" />
          <span> Upload Product</span>
          </Button>
        </Grid> */}
        <Grid  item xs={12} >

          <CollapsibleTable items={currentTableData} restructOrdersStatusUpdated={(orderId, status)=>restructOrdersStatusUpdated(orderId, status)} currentUser={props.currentUser}/>
           </Grid> 
           <Grid  item xs={12} style={{display:"flex",justifyContent:"center"}}>
           <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={itemsData.length}
        pageSize={PageSize}
        onPageChange={page =>  setCurrentPage(page)}
        handleCurrentPage={page => setCurrentPage(page) }
      />
             </Grid> 
      </Grid>
      {/* <ToastContainer /> */}
      <Dialog
          open={orderDetailOpen}
           onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={ "md" }
          fullWidth={true}
          onBackdropClick={()=>setOrderDetailOpen(false)}
          // disableBackdropClick={false}
          className={`orderDetail__dialog`}
        >
           <NewOrderDetail/>
          </Dialog>
    </div>
  );
}
