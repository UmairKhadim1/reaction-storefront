import React, { useState,useMemo } from 'react'
import Layout from "../../components/Layout";
import { withApollo } from "lib/apollo/withApollo";
import { Grid, Typography, Button,Hidden } from "@material-ui/core";
import { Swiper, SwiperSlide } from "swiper/react";
import SellerProfile from "../../components/PopularSellerCard";
import inject from "hocs/inject";
import withCatalogItems from "containers/catalog/shopAllCatalogItems";
import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import PropTypes from "prop-types";
import GridFourCard from "../../components/CustomCatalogGrid/GridFourCard";
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import fetchAllTags from "staticUtils/tags/fetchAllFeaturedTags";

import fetchAllBrands from "staticUtils/tags/fetchAllBrandTags";
import Link from "components/Link";
import SwiperCore, {
    Navigation, Thumbs
} from 'swiper/core';
import Pagination from "components/CustomCatalogGrid/Pagination"
let PageSize = 20;
SwiperCore.use([Navigation, Thumbs]);


function ShopAll(props) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const {catalogItems,tags,Brandtags,data} = props;
    const [currentPage, setCurrentPage] = useState(1);
    const currentWidth = window.innerWidth;
//     const products = (catalogItems || []).map((item) => item.node.product);
//    const currentWidth = window.innerWidth;
//     const popularProductsTag =  tags.filter((item,i)=>item?.slug=="popular-now");
//     let tagIdPopularProduct =null;
//     let popularProductoShow =[];
    
//     if(popularProductsTag.length>0){
//      tagIdPopularProduct = popularProductsTag && popularProductsTag[0]._id;
//      popularProductoShow = products.filter((item,i)=>{
//         const isExist =   item?.tagIds.some((val,index)=>val===tagIdPopularProduct);
//         if(isExist){
//            return item;
//         }
//  })
// }
//  var RemainingTags =tags;
//  RemainingTags = RemainingTags.filter((tag,i)=>tag._id !==tagIdPopularProduct);
//  var OtherProductsToShow = [];
//   RemainingTags.map((tagItem,i)=>{
//     const productData = products.filter((item,i)=>{
      
//       var isExist =   item?.tagIds.some((val,index)=>val==tagItem._id);
     
//       if(isExist){
//          return item;
//       }
  
// })
//   //  if(productData.length>=1){
//     OtherProductsToShow.push({key:tagItem.displayTitle,products:productData,slug:tagItem.slug})
//   //  }
//   })



  

  // updated data
  
  let popularProductoShow = [];
  let newArrivalProducts = [];
  let OtherProductsToShow = [];
  data.map((item,i)=>{
       
    if(item.key.replace(/\s/g, '').toLowerCase()== "popularnow"){
      popularProductoShow.push(...item.catalogItems.edges)
    }else{
      OtherProductsToShow.push({key:item.key,
        products:item.catalogItems.edges.map(val => val.node.product),
         slug:item.slug})
    }
})


    return (
       
        <Layout>
            
            <div className="ContainerContent__MainMaxWidth">
                <div className="shopAll">
                    <Grid container className={"shopAll__mainContainer"} >
                        <Grid item sm={12} md={8} lg={6} xl={4} className={"mainContainer__box  mob-dif"}>
                            <Typography variant="h2" fontWeight={700} className={"mainContainer__heading"}>
                                Get Your
                            </Typography>
                            <Typography variant="h2" fontWeight={700} className={"mainContainer__heading"}>
                                Sneaker Fix!
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item className="shopAll__section">
                            <Typography variant="h5" component="h2" className="shopAll__title">Popular Brands</Typography>
                            <Swiper slidesPerView={currentWidth>1400?7:4} 
                            slidesPerGroup={currentWidth>1400?5:3} style={{ '--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#000000', height:"70%" }} loop={true} spaceBetween={10} navigation={true}
                                
                               thumbs={{ swiper: thumbsSwiper }}
                                className="mySwiper2">
                               {Brandtags?.map((item,i)=>{
                              return(
                                !item.slug.includes('-brand-')&&(
                                <SwiperSlide key={i}>
                                    <Link href={`/tag/${item.slug}`}>
                                    <div className="imgContainer" >
                                        <img src={`/brand/${item.name.replace("brand-","").replace(" ","").replace("-","").toLowerCase()}.png`} />
                                    </div>
                                    </Link>
                                </SwiperSlide>)
                                )
                                })}
                            </Swiper>
                        </Grid>
                    </Grid>
                    {popularProductoShow.length>=1 &&
                    <Grid container>
                        <Grid xs={12} item className="shopAll__section">
                            {/* <Typography variant="h5" component="h2" className="shopAll__title">Popular Products</Typography> */}
                            <div className="shopAll__headingContainer">
                            <Typography xs={12} variant="h5" component="h2" className="shopAll__headingTitle">Popular Product</Typography>
                    
                            <Hidden only="xs">
                            <Button className="shopAll__headingBtn" href="/en/tag/popular-now" >See All</Button>
                            </Hidden>

                            </div>
                            <GridFourCard
                            products={popularProductoShow}
                            placeholderImageURL="/images/placeholder.gif"
                            {...props}
                                 />
                        </Grid>
                        <div className="center-flex mb-15">
                        <Hidden xsUp>
                        <Button className="shopAll__headingBtn" href="/en/tag/popular-now" >See All</Button>
                        <br/>
                        </Hidden>
                      </div>
                      
                    </Grid>
}
                    {/* <Grid container>
                        <Grid xs={12} item className="shopAll__section shopAll__sellerSection">
                            <Typography variant="h5" component="h2" className="shopAll__title">Popular Seller</Typography>
                            <Swiper slidesPerView={currentWidth>1000?7:4} style={{ '--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#000000',height:"100%" }} loop={true} spaceBetween={10} navigation={false}
                                thumbs={{ swiper: thumbsSwiper }}
                                className="mySwiper2">
                                <SwiperSlide>
                                    <SellerProfile />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <SellerProfile />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <SellerProfile />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <SellerProfile />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <SellerProfile />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <SellerProfile />
                                </SwiperSlide>
                            </Swiper>
                        </Grid>
                    </Grid> */}
                     {OtherProductsToShow.map((item,index)=>{
if(item.products.length>=1){
return(
                    <Grid key={index} container>
                        <Grid xs={12} item className="shopAll__section">
                            <div className="shopAll__headingContainer">
                            <Typography xs={12} variant="h5" component="h2" className="shopAll__headingTitle">{item.key}</Typography>
                            <Hidden only="xs">
                            <Button className="shopAll__headingBtn" href={`/en/tag/${item.slug.includes('-brand-')?item.slug.split('featured-')[1]:item.slug}`}>See All</Button>
                            </Hidden>
                            </div>

                            
                            <GridFourCard
                            products={item.products}
                            placeholderImageURL="/images/placeholder.gif"
                            {...props}
                                 />
                        </Grid>
                        <div className="center-flex mb-15">
                        <Hidden xsUp>
                        <Button className="shopAll__headingBtn" href={`/en/tag/${item.slug.includes('-brand-')?item.slug.split('featured-')[1]:item.slug}`}>See All</Button>
                        <br/>
                        </Hidden>
                      </div>
                    </Grid>)}
                     })}
                </div>
            </div>
        </Layout>
    )
}
ShopAll.propTypes = {
    catalogItems: PropTypes.array,
    catalogItemsPageInfo: PropTypes.object,
    isLoadingCatalogItems: PropTypes.bool,
    routingStore: PropTypes.object,
    shop: PropTypes.shape({
      currency: PropTypes.shape({
        code: PropTypes.string.isRequired
      })
    }),
    tag: PropTypes.object,
    uiStore: PropTypes.shape({
      pageSize: PropTypes.number.isRequired,
      setPageSize: PropTypes.func.isRequired,
      setSortBy: PropTypes.func.isRequired,
      sortBy: PropTypes.string.isRequired
    })
  };
export async function getStaticProps({ params: { lang } }) {
    const primaryShop = await fetchPrimaryShop(lang);
    const translations = await fetchTranslations(lang, ["common"]);
  
    if (!primaryShop?.shop) {
      return {
        props: {
          shop: null,
          ...translations
        },
        // eslint-disable-next-line camelcase
        unstable_revalidate: 1 // Revalidate immediately
      };
    }
  
    return {
      props: {
        ...primaryShop,
        ...await fetchAllTags(lang),
        ...await fetchAllBrands(lang),
        ...translations
      },
      // eslint-disable-next-line camelcase
      unstable_revalidate: 120 // Revalidate each two minutes
    };
  }
  
  /**
   *  Static paths for the main layout
   *
   * @returns {Object} the paths
   */
  export async function getStaticPaths() {
    return {
      paths: locales.map((locale) => ({ params: { lang: locale } })),
      fallback: false
    };
  }
export default withApollo()(withWidth()(withCatalogItems(inject("routingStore", "uiStore")(ShopAll))));
