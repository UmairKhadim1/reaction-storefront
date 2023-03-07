import React, { useState, useEffect } from "react";
import CustomSelect from "../CustomSeclect/index";
import CustomSearchSelect from "../CustomSearchSelect/index";
import { TextField, InputAdornment, Grid, Button } from "@material-ui/core";
import useUploadProduct from "hooks/uploadProduct/useUploadProduct";
import useCreateProduct from "hooks/uploadProduct/useCreateNewProduct";
import useAuthStore from "hooks/globalStores/useAuthStore";
import useUpdateVariant from "../../hooks/UpdateVariant/useUpdateVariant";
import useUpdateSimpleInventory from "../../hooks/updateSimpleInventory/useUpdateSimpleInventory";
import CustomLoader from "../CustomLoader";
import { json } from "body-parser";
import { useRouter } from "next/router";
import { GQL_URL } from "../../apiConfig.js";

// import decodeOpaqueIdForNamespace from "@reactioncommerce/api-utils/decodeOpaqueIdForNamespace.js";
//import encodeOpaqueId from "@reactioncommerce/api-utils/encodeOpaqueId.js";
// import fetchCatalogProduct from "staticUtils/catalog/fetchCatalogProduct";
// const brandOptions = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
// ];
export default function Step1(props) {
  let { account } = useAuthStore();
  const router = useRouter();
  const [selectedOption, setSectedOption] = useState(null);

  const [priceError, setpriceError] = useState(null);
  const [sizeError, setsizeError] = useState(null);
  const [productError, setproductError] = useState(null);
  const [brandError, setbrandError] = useState(null);

  const [addProductError, setaddProductError] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [fetchingProducts, setfetchingProducts] = useState(null);
  const [brandProducts, setBrandProducts] = useState([]);
  const [selectedBrandProduct, setSelectedBrandProduct] = useState(null);
  const [selectedShoesSize, setSelectedShoesSize] = useState(null);
  const [selectedBrandColor, setSelectedBrandColor] = useState("");
  const [price, setPrice] = useState("");
  const [transactionFee, settransactionFee] = useState("");
  const [payFee, setpayFee] = useState("");
  const [totalPayout, setTotalPayout] = useState("");
  const [media, setMedia] = useState([]);
  const [minOffer, setMinOffer] = useState("");
  const [editTouch, setEditTouch] = useState(false);
  const brandOptions =
    props.brands &&
    props.brands.map((item) => {
      return { id: item._id, value: item.displayTitle, label: item.displayTitle };
    });
  const ukShoesSizes = [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5].map(
    (item) => {
      return { value: item, label: item };
    },
  );


  useEffect(() => {
    //ancestorId

    if (props.updateProductId != null && props.account.productVariants != undefined) {
      const productToUpdateFilter =
        props.account.productVariants &&
        props.account.productVariants.filter((item, i) => {
          return item._id == props.updateProductId;
        });

    

      const structBrand = {
        id: productToUpdateFilter && productToUpdateFilter[0]?.metafields[0]?.value,
        value: productToUpdateFilter && productToUpdateFilter[0]?.metafields[0]?.key,
        label: productToUpdateFilter && productToUpdateFilter[0]?.metafields[0]?.key,
      };

      const structBrandProduct = {
        id: productToUpdateFilter && productToUpdateFilter[0].ancestorId,
        value: productToUpdateFilter && productToUpdateFilter[0].title,
        label: productToUpdateFilter && productToUpdateFilter[0].title,
      };

      const structColor = productToUpdateFilter && JSON.parse(productToUpdateFilter[0].optionTitle).color;
      const structSize = productToUpdateFilter && JSON.parse(productToUpdateFilter[0].optionTitle).size;
      const structPrice = productToUpdateFilter && productToUpdateFilter[0].price;
      let priceval = parseFloat(structPrice);
      const reStructSize = {
        id: 1,
        value: productToUpdateFilter && structSize,
        label: productToUpdateFilter && structSize,
      };
      setSelectedBrand(structBrand);
      setSelectedBrandProduct(structBrandProduct);
      setSelectedShoesSize(reStructSize);
      setSelectedBrandColor(structColor);
      setPrice(structPrice);
      setMedia(productToUpdateFilter[0].media);
      settransactionFee((priceval * 0).toFixed(2));
      setpayFee((priceval * 0.03).toFixed(2));
      setTotalPayout(priceval - (priceval * 0).toFixed(2) - (priceval * 0.03).toFixed(2));
      //    const productToUpdateStruct =  productToUpdateFilter.map((item,i)=>{
      //        return{

      //        }
      //    })
    }
  }, [props.updateProductId, props.account]);
  const handleChange = (selectedOption) => {
    setSectedOption(selectedOption);
  };
  const handleColorChange = (e) => {
    setEditTouch(true);
    setSelectedBrandColor(e.target.value);
  };
  const handlePriceChange = (price) => {
    const pattern = /^[+]?([.]\d+|\d+[.]?\d*)$/;
    if (pattern.test(price)) {


      setpriceError(null)

      setEditTouch(true);
      if (price.length == 0) {
        price = 0;
      }
      let priceval = parseFloat(price);

      setPrice(priceval);
      //0.095
      settransactionFee((priceval * 0).toFixed(2));
      setpayFee((priceval * 0.03).toFixed(2));
      setTotalPayout(priceval - (priceval * 0).toFixed(2) - (priceval * 0.03).toFixed(2));
    } else {
      setpriceError("Enter valid price")
      setPrice();

    }
  };
  const fetchbrandproduct = (tagId, term) => {
    return new Promise((resolve, reject) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var graphql = JSON.stringify({
        query: `query catalogItemsQuery(
          $shopId: ID!
          $searchQuery: String
          $tagIds: [ID]
          $first: ConnectionLimitInt
          $last: ConnectionLimitInt
          $before: ConnectionCursor
          $after: ConnectionCursor
          $sortBy: CatalogItemSortByField
          $sortByPriceCurrencyCode: String
          $sortOrder: SortOrder
        ) {
          catalogItems(
            shopIds: [$shopId]
            tagIds: $tagIds
            searchQuery: $searchQuery
            first: $first
            last: $last
            before: $before
            after: $after
            sortBy: $sortBy
            sortByPriceCurrencyCode: $sortByPriceCurrencyCode
            sortOrder: $sortOrder
          ) {
            edges {
              node {
                _id
                ... on CatalogItemProduct {
                  product {
                    _id
                    productId
                    title
                    slug
                    vendor
                    productId
                    metafields {
                      description
                      key
                      namespace
                      scope
                      value
                      valueType
                      __typename
                    }
              
                    primaryImage {
                      URLs {
                        thumbnail
                        small
                        medium
                        large
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
        }`,
        variables: { shopId: props.shop._id, tagIds: [tagId], searchQuery: term, first: 20 },
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: graphql,
        redirect: "follow",
      };

      fetch(GQL_URL, requestOptions)
        .then((response) => response.text())
        .then((result) => {

          resolve(JSON.parse(result).data);
        })
        .catch((error) => {

          reject(error);
        });
    });
  };
  const handleBrandChange = async (selectedOption) => {
    setbrandError(null);
    setBrandProducts([]);
    setSelectedBrandProduct(null);
    setSelectedBrandColor("");
    setEditTouch(true);
    newBrands = [];
    const filterBrandProductsInfo = await fetchbrandproduct(selectedOption.id, "");
    setSelectedBrand(selectedOption);

    let filterBrandProducts = filterBrandProductsInfo.catalogItems.edges;
    let newBrands = [];
    const availableBrandProducts = filterBrandProducts.map((obj, index) => {

      let item = obj.node.product;
      {
        newBrands.push({
          id: item.productId,
          value: item.title,
          label: item.title,
          image: item.primaryImage?.URLs.large,
          metafields: item.metafields ? item.metafields : null,
        });
      }
    });
    setBrandProducts(newBrands);
    // return newBrands;

  };

  const handleSelectedBrandProducts = async (selectedOption) => {
    setproductError(null)
    setEditTouch(true);
    setSelectedBrandProduct(selectedOption);
    setSelectedBrandColor(selectedOption.metafields && selectedOption.metafields[2].value); // const filterBrandProductVariant = item.products.filter((item)=>{
    //     item._id == selectedOption.id
    // })
    // const filterBrandProductVariant =  fetchCatalogProduct(selectedOption.id);
  };

  const [createProductEntry] = useCreateProduct();
  const [uploadProductEntry] = useUploadProduct();
  const [updateVariantEntry] = useUpdateVariant();

  const [UpdateSimpleInventory] = useUpdateSimpleInventory();

  const handleSkip = () => {
    const productToUpdateFilter =
      props.account.productVariants &&
      props.account.productVariants.filter((item, i) => {
        return item._id == props.updateProductId;
      });
    props.handleProductInfoNext(
      productToUpdateFilter[0].parentId, //product id
      props.updateProductId, //variant id
    );
  };

  const handleNext = async () => {
    setaddProductError("")
    if (!validateProductupload()) { return }
    const structureShortTitle = JSON.stringify({ size: selectedShoesSize.value, color: selectedBrandColor });
    const data = {
      attributeLabel: "color",
      optionTitle: structureShortTitle,
      title: selectedBrandProduct.value,
      price: parseInt(price),
      isVisible: false,
      uploadedBy: {
        userId: account.userId,
        name: account?.name != null ? account.name : account.username == null ? "" : account.username,
      },
      metafields: [
        {
          key: selectedBrand.value,
          value: selectedBrand.id,
        },
      ],
      // brand : selectedBrand.value,
      // color: selectedBrandColor,
      // minOffer: minOffer
    };
    try {

      if (!selectedBrandProduct.id || selectedBrandProduct.id == null) {

        let createProductObj = {
          description: "",
          isVisible: true,
          media: [{
            priority:0,
            productId:"null",
            URLs: {
              large: "https://los-2022.s3.amazonaws.com/placeholder-shoe.png",
              medium: "https://los-2022.s3.amazonaws.com/placeholder-shoe.png",
              thumbnail: "https://los-2022.s3.amazonaws.com/placeholder-shoe.png",
              small: "https://los-2022.s3.amazonaws.com/placeholder-shoe.png"

            }
          }],
          metafields: [
            {
              description: "Product release date",
              key: "releaseDate",
              value: null,
            },
            {
              description: "Product sku",
              key: "sku",
              value: null,
            },
            {
              description: "Product colorway",
              key: "colorway",
              value: selectedBrandColor,
            },
          ],
          productType: "simple",
          slug: data?.title.replace(" ", "-").toLowerCase(),
          tagIds: [selectedBrand.id],
          title: data?.title,
          vendor: selectedBrand.value,
        };

        const resCreateProduct = await createProductEntry(createProductObj, props.shop._id)
        if (resCreateProduct.data.createProduct.product._id) {
          const res = await uploadProductEntry(data, props.shop._id, resCreateProduct.data.createProduct.product._id);
          if (res.data.createProductVariant.variant._id) {
            const res1 = await UpdateSimpleInventory(res.data.createProductVariant.variant._id, props.shop._id, resCreateProduct.data.createProduct.product._id);
          }
          props.handleProductInfoNext(
            res.data.createProductVariant.variant.parentId,
            res.data.createProductVariant.variant._id,
          );
        }
        return;

      } else {
        const res = await uploadProductEntry(data, props.shop._id, selectedBrandProduct.id);
        if (res.data.createProductVariant.variant._id) {
          const res1 = await UpdateSimpleInventory(res.data.createProductVariant.variant._id, props.shop._id, selectedBrandProduct.id);
        }
        props.handleProductInfoNext(
          res.data.createProductVariant.variant.parentId,
          res.data.createProductVariant.variant._id,
        );
      }
    }
    catch (err) {
      console.log("create product error", err)
      setaddProductError("You do not have permission to upload product, contact admin");


    }
    //inventory enable
    //     if( res.data.createProductVariant.variant._id){
    //       const res1 = await UpdateSimpleInventory(res.data.createProductVariant.variant._id, props.shop._id, selectedBrandProduct.id);
    // console.log(res1)
    //     }

  };
  const handleProductSearch = async (value) => {
    if (value.trim().length > 7) {
      value = '\"' + value
      value = value + '\"'

      const filterBrandProductsInfo = await fetchbrandproduct(selectedBrand.id, value);
      // const filterBrandProductsInfo = await fetchbrandproduct(selectedBrand.id,`\"${value}\\`);
      let filterBrandProducts = filterBrandProductsInfo.catalogItems.edges;
      let newBrands = [];
      const availableBrandProducts = filterBrandProducts.map((obj, index) => {

        let item = obj.node.product;
        {
          newBrands.push({
            id: item.productId,
            value: item.title,
            label: item.title,
            image: item.primaryImage?.URLs.large,
            metafields: item.metafields ? item.metafields : null,
          });
        }
      });
      // setBrandProducts(newBrands);
      return newBrands;
    }
  };
  const validateProductupload = () => {
    let isValid = true;
    if (!selectedBrand) {
      setbrandError("Brand is required");
      isValid = false;
    }
    if (!selectedShoesSize) {
      setsizeError("Shoe size is required");
      isValid = false;
    }
    if (!selectedBrandProduct) {
      setproductError("Product is required");
      isValid = false;
    }
    if (!price) {
      setpriceError("Price is required");
      isValid = false;
    }
    return isValid;
  }
  const handleUpdate = async () => {
    if (!validateProductupload()) { return }
    const structureShortTitle = JSON.stringify({ size: selectedShoesSize.value, color: selectedBrandColor });

    const data = {
      attributeLabel: "color",
      optionTitle: structureShortTitle,
      title: selectedBrandProduct.value,
      price: parseInt(price),
      isVisible: false,
      media: media,
      uploadedBy: {
        userId: account.userId,
        name: account.firstName,
      },
      metafields: [
        {
          key: selectedBrand.value,
          value: selectedBrand.id,
        },
      ],
      // brand : selectedBrand.value,
      // color: selectedBrandColor,
      // minOffer: minOffer
    };
    const res = await updateVariantEntry(data, props.shop._id, props.updateProductId);
    props.handleProductInfoNext(
      res.data.updateProductVariant.variant.parentId,
      res.data.updateProductVariant.variant._id,
    );
  };
  return (
    <React.Fragment>
      {fetchingProducts && <CustomLoader />}{" "}
      <div className="uploadProductForm">
        <div className="uploadProductForm__formRow">
          <label>Brand</label>
          <CustomSelect
            options={brandOptions}
            selectedOption={selectedBrand}
            handleChange={(selectedOption) => handleBrandChange(selectedOption)}
          />
          <div className="uploadProductForm__feeContainer pt-5">

            {brandError && <span className="inline-error ">{brandError}</span>}

          </div>
        </div>
        {selectedBrand != null && (
          <div className="uploadProductForm__formRow">
            <label>Select Product</label>
            <CustomSearchSelect
              options={brandProducts}
              selectedOption={selectedBrandProduct}
              defaultOptions={brandProducts}
              loadOptions={handleProductSearch}
              handleChange={handleSelectedBrandProducts}
            />

            {selectedBrandProduct && <img className="uploadProductForm__prev" src={selectedBrandProduct.image} />}
            <div className="uploadProductForm__feeContainer pt-5">

              {productError && <span className="inline-error ">{productError}</span>}

            </div>
          </div>
        )}
        <div className="uploadProductForm__formRow">
          <label>Colorway</label>

          <input
            // readOnly
            placeholder="Colorway"
            type="text"
            value={selectedBrandColor}
            onChange={(e) => handleColorChange(e)}
          />
        </div>
        <div className="uploadProductForm__formRow">
          <label>Shoe Size</label>
          <CustomSelect
            options={ukShoesSizes}
            selectedOption={selectedShoesSize}
            handleChange={(val) => {
              setSelectedShoesSize(val); setsizeError(null);
              setEditTouch(true);
            }}
          />
          <div className="uploadProductForm__feeContainer pt-5">

            {sizeError && <span className="inline-error ">{sizeError}</span>}

          </div>
        </div>
        <div className="uploadProductForm__formRow uploadProductForm__formRow__Custom white-input">
          <label>Price</label>
          <TextField
            id="standard-basic"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span>£</span>
                </InputAdornment>
              ),
            }}
            value={price}
            onChange={(e) => handlePriceChange(e.target.value)}
          />
          <div className="uploadProductForm__feeContainer pt-5">

            {priceError && <span className="inline-error ">{priceError}</span>}

          </div>
        </div>
        <div className="uploadProductForm__feeContainer">
          <Grid container className="uploadProductForm__infoCard">
            <Grid item className="uploadProductForm__infoTitle">
              Transaction Fee (0%)
            </Grid>
            <Grid item className="uploadProductForm__infoData">
              -£{transactionFee}
            </Grid>
          </Grid>
          <Grid container className="uploadProductForm__infoCard">
            <Grid item className="uploadProductForm__infoTitle">
              Payment Proc. (3%)
            </Grid>
            <Grid item className="uploadProductForm__infoData">
              -£{payFee}
            </Grid>
          </Grid>
          {/*
                <Grid container className="uploadProductForm__infoCard">
                    <Grid item className="uploadProductForm__infoTitle">
                        Discount Code
                    </Grid>
                    <Grid item className="uploadProductForm__infoData">
                        <input type="text" placeholder="Add Discount +" />
                    </Grid>
                </Grid>*/}
          <Grid container className="uploadProductForm__infoCard">
            <Grid item className="uploadProductForm__infoTitle">
              Total Payout
            </Grid>
            <Grid item className="uploadProductForm__infoData">
              £ {totalPayout}
            </Grid>
          </Grid>
        </div>
        {/*    <div className="uploadProductForm__formRow uploadProductForm__formRow__Custom">
                <label>Minimum offer</label>
                <TextField
                    id="standard-basic"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <span>£</span>
                            </InputAdornment>
                        )
                    }}
                    value={minOffer}
                    onChange={(e)=>setMinOffer(e.target.value)}
                />
                </div>
            <div className="uploadProductForm__feeContainer">
                <Grid container className="uploadProductForm__infoCard">
                    <Grid item className="uploadProductForm__infoTitle">
                        Transaction Fee (9.5%)
                    </Grid>
                    <Grid item className="uploadProductForm__infoData">
                        -£0.00
                    </Grid>
                </Grid>
                <Grid container className="uploadProductForm__infoCard">
                    <Grid item className="uploadProductForm__infoTitle">
                        Payment Proc. (3%)
                    </Grid>
                    <Grid item className="uploadProductForm__infoData">
                        -£15.00
                    </Grid>
                </Grid>
                <Grid container className="uploadProductForm__infoCard">
                    <Grid item className="uploadProductForm__infoTitle">
                        Discount Code
                    </Grid>
                    <Grid item className="uploadProductForm__infoData">
                        <input type="text" placeholder="Add Discount +" />
                    </Grid>
                </Grid>
             
                
                <Grid container className="uploadProductForm__infoCard">
                    <Grid item className="uploadProductForm__infoTitle">
                        Total Payout
                    </Grid>
                    <Grid item className="uploadProductForm__infoData">
                        £437.50
                    </Grid>
                </Grid>
            </div>
               */}
        <div className="uploadProductForm__footer uploadProductForm__feeContainer pt-5">

          {addProductError && <span className="inline-error ">{addProductError}</span>}
        </div>
        <div className="uploadProductForm__footer">
          <Button
            className="uploadProductForm__footerBtn uploadProductForm__footerBackBtn "
            onClick={() => router.push("/en/profile/address")}
          >
            Back
          </Button>
          {props.updateProductId != null ? (
            editTouch ? (
              <Button
                className="uploadProductForm__footerBtn uploadProductForm__footerNextBtn "
                onClick={() => handleUpdate()}
              >
                Update
              </Button>
            ) : (
              <Button
                className="uploadProductForm__footerBtn uploadProductForm__footerNextBtn "
                onClick={() => handleSkip()}
              >
                Next
              </Button>
            )
          ) : (
            <Button
              className="uploadProductForm__footerBtn uploadProductForm__footerNextBtn w-175 "
              onClick={() => handleNext()}
            >
              Save and Continue
            </Button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
