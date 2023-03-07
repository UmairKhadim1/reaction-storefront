import React, { useState, useEffect, useMemo } from "react";
import SellerProfileItem from "./SellerProfileItem";
import { Grid, Typography, Button } from "@material-ui/core";
import ProductGridEmptyMessage from "../ProductGrid/ProductGridEmptyMessage";
import useUpdateVariant from "../../hooks/UpdateVariant/useUpdateVariantPublish";
import useArchiveVariant from "../../hooks/archiveVariants/useArchiveVariant";
import useAuthStore from "hooks/globalStores/useAuthStore";
import { ToastContainer, toast } from 'react-toastify';
import Pagination from "components/CustomCatalogGrid/Pagination"
let PageSize = 20;
export default function SellerProfileItems(props) {
  const [itemsData, setItemsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { account } = useAuthStore();
  useEffect(() => {
    const reStructItems = props.items.filter((item, i) => {
      if (item.isDeleted != true) {
        return item;
      }
    })
    setItemsData(reStructItems)
  }, [])
  if ((props.items && props.items.length == 0) || props.items == null)
    return (
      <Grid item xs={12}>

        {account.identityVerified ?
          
          <React.Fragment>
          {account && !account?.AccountBook?.length && (<Grid item xs={12}>
            <h2 className="sellerProfile__noListingMsg">Please add payout account information in settings before uploading/publishing product for hassle free payments. &nbsp;&nbsp;</h2>
          </Grid>)
          }
  
          <Grid item xs={12}>
            <Button href="/en/uploadProduct" className="customAddressBook__addAddress">
              <img src="/icons/uploadFileIcon.png" />
              <span> Upload Product</span>
            </Button>
          </Grid>
    
          <h2 className="sellerProfile__noListingMsg">No Listing found</h2>
        </React.Fragment> : <React.Fragment>
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
  const handlePublish = async (item, shopId, variantId, productId) => {
    const variantStruct = {
      isVisible: true,
    };
    const res = await updateVariantEntry(variantStruct, shopId, variantId, productId);
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
  const notify = () => toast("Un-Pubish the Product to delete", {
    hideProgressBar: true
  });
  const handleUnPublish = async (item, shopId, variantId, productId) => {
    const variantStruct = {
      isVisible: false,
    };
    const res = await updateVariantEntry(variantStruct, shopId, variantId, productId);
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
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return itemsData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, itemsData]);
  return (

    <div>

      <Grid container spacing={3}>
        {account && !account?.AccountBook?.length && (<Grid item xs={12}>
          <h2 className="sellerProfile__noListingMsg">Please add payout account information in settings before uploading/publishing product for hassle free payments. &nbsp;&nbsp;</h2>
        </Grid>)}

        <Grid item xs={12}>
          <Button href="/en/uploadProduct" className="customAddressBook__addAddress">
            <img src="/icons/uploadFileIcon.png" />
            <span> Upload Product</span>
          </Button>
        </Grid>

        {currentTableData &&

          currentTableData.map((item, i) => {
            if (!item.isDeleted) {
              return (
                <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                  <SellerProfileItem {...props} notify={notify} item={item} handleArchiveVariant={handleArchiveVariant} handlePublish={handlePublish} handleUnPublish={handleUnPublish} />
                </Grid>
              );
            }
          })}
        <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={itemsData.length}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)}
            handleCurrentPage={page => setCurrentPage(page)}
          />
        </Grid>
      </Grid>
      {/* <ToastContainer /> */}
    </div>
  );
}
