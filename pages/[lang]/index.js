import React, { Component } from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import Helmet from "react-helmet";
// import withCatalogItems from "containers/catalog/withCatalogItems";
import withCatalogItems from "containers/catalog/HomeWidthCatalogItem";
import ProductGrid from "components/ProductGrid";
import Layout from "components/Layout";
import { inPageSizes } from "lib/utils/pageSizes";
import { withApollo } from "lib/apollo/withApollo";

import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import DownloadSection from "../../components/DownloadSection";
import fetchAllTags from "staticUtils/tags/fetchAllFeaturedTags";
class ProductGridPage extends Component {
  static propTypes = {
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

  componentDidMount() {
    const { routingStore } = this.props;
    routingStore.setTagId(null);
  }

  setPageSize = (pageSize) => {
    this.props.routingStore.setSearch({ limit: pageSize });
    this.props.uiStore.setPageSize(pageSize);
  };

  setSortBy = (sortBy) => {
    this.props.routingStore.setSearch({ sortby: sortBy });
    this.props.uiStore.setSortBy(sortBy);
  };

  render() {
   
    const {
      catalogItems,
      tags,
      catalogItemsPageInfo,
      isLoadingCatalogItems,
      routingStore: { query },
      shop,
      uiStore,
      data
    } = this.props;
    const pageSize = query && inPageSizes(query.limit) ? parseInt(query.limit, 10) : uiStore.pageSize;
    const sortBy = query && query.sortby ? query.sortby : uiStore.sortBy;

    let pageTitle;
    if (shop) {
      pageTitle = shop.name;
      if (shop.description) pageTitle = `${pageTitle} | ${shop.description}`;
    } else {
      pageTitle = "Storefront";
    }
    
    let hotNowProducts = [];
    let newArrivalProducts = [];
    let remainingProducts = [];
if(data){
   data.map((item,i)=>{
       
          if(item.key.replace(/\s/g, '').toLowerCase()== "newarrival"){
            newArrivalProducts.push(...item.catalogItems.edges)
          }else if(item.key.replace(/\s/g, '').toLowerCase()== "hotnow"){
            hotNowProducts.push(...item.catalogItems.edges)
          }else{
            remainingProducts.push({key:item.key,
              products:item.catalogItems.edges.map(val => val.node.product),
               slug:item.slug})
          }
    })
  }
    return (
      <Layout shop={shop}>
        <Helmet
          title={pageTitle}
          meta={[{ name: "description", content: shop && shop.description }]}
        />
        <div className="ContainerContent__MainMaxWidth">
          <div className="ContainerPages__MainMaxWidth">
            
          <ProductGrid
            hotNowProducts= {hotNowProducts}
            newArrivalProducts= {newArrivalProducts}
             remainingProducts ={remainingProducts}
             tags={tags}
            />
            {/* <ProductGrid
              catalogItems={catalogItems}
              tags={tags}
              currencyCode={(shop && shop.currency && shop.currency.code) || "USD"}
              isLoadingCatalogItems={isLoadingCatalogItems}
              pageInfo={catalogItemsPageInfo}
              pageSize={pageSize}
              setPageSize={this.setPageSize}
              setSortBy={this.setSortBy}
              sortBy={sortBy}
            /> */}
          </div>
        </div>
        <DownloadSection/>
      </Layout>
    );
  }
}

/**
 *  Static props for the main layout
 *
 * @param {String} lang - the shop's language
 * @returns {Object} the props
 */
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

export default withApollo()(withCatalogItems(inject("routingStore", "uiStore")(ProductGridPage)));
