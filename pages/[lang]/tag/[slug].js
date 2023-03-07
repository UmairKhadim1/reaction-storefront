import React, { Component } from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import Helmet from "react-helmet";
import withCatalogItems from "containers/catalog/withCatalogItems";
import Breadcrumbs from "components/Breadcrumbs";
import ProductGrid from "components/ProductGrid";
import ProductGridEmptyMessage from "components/ProductGrid/ProductGridEmptyMessage";
import ProductGridHero from "components/ProductGridHero";
import ProductGridTitle from "components/ProductGridTitle";
import Layout from "components/Layout";
import SharedPropTypes from "lib/utils/SharedPropTypes";
import { withApollo } from "lib/apollo/withApollo";
import CustomLoader from "../../../components/CustomLoader";

import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchAllTags from "staticUtils/tags/fetchAllTags";
import fetchTag from "staticUtils/tag/fetchTag";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import SeeAllProducts from "../../../components/AllProducts";
import PageSizeSelector from "components/PageSizeSelector";
import SortBySelector from "components/SortBySelector";
import { Grid } from "@material-ui/core";

class TagGridPage extends Component {
  static propTypes = {
    catalogItems: PropTypes.array.isRequired,
    catalogItemsPageInfo: PropTypes.object,
    classes: PropTypes.object,
    initialGridSize: PropTypes.object,
    isLoadingCatalogItems: PropTypes.bool,
    routingStore: PropTypes.shape({
      query: PropTypes.shape({
        limit: PropTypes.string,
        sortby: PropTypes.string,
      }),
      setSearch: PropTypes.func.isRequired,
      tag: SharedPropTypes.tag,
    }),
    shop: PropTypes.shape({
      currency: PropTypes.shape({
        code: PropTypes.string.isRequired,
      }),
      description: PropTypes.string,
    }),
    tag: SharedPropTypes.tag,
    uiStore: PropTypes.shape({
      pageSize: PropTypes.number.isRequired,
      setPageSize: PropTypes.func.isRequired,
      setSortBy: PropTypes.func.isRequired,
      sortBy: PropTypes.string.isRequired,
    }),
  };

  // static getDerivedStateFromProps(props) {
  //   const { routingStore, tag } = props;
  //   if (tag && routingStore.tagId !== tag._id) {
  //     routingStore.setTagId(tag._id);
  //     routingStore.setSearch({
  //       before: null,
  //       after: null
  //     });
  //   }

  //   return null;
  // }

  state = {
    nodata: false,
    isFilter:false
  };

  setPageSize = (pageSize) => {
    this.props.routingStore.setSearch({ limit: pageSize });
    this.props.uiStore.setPageSize(pageSize);
  };

  setSortBy = (sortBy) => {
    this.setState({isFilter:true})
    this.props.routingStore.setSearch({ sortby: sortBy });
    this.props.uiStore.setSortBy(sortBy);
   
  };

  renderHeaderMetatags(metafields) {
    const { shop } = this.props;

    const metatags = [];
    let hasDescription = false;
    metafields.forEach((field) => {
      if (field.namespace && field.namespace === "metatag") {
        const metatag = {
          content: field.value,
        };
        metatag[field.scope] = field.key;
        metatags.push(metatag);
        if (field.key === "description") {
          hasDescription = true;
        }
      }
    });
    if (hasDescription === false) {
      metatags.push({ name: "description", content: shop && shop.description });
    }
    return metatags;
  }
  renderFilters() {
    const { routingStore, shop, tag, uiStore } = this.props;
    const pageSize =
      routingStore.query && routingStore.query.limit ? parseInt(routingStore.query.limit, 10) : uiStore.pageSize;
    const sortBy = routingStore.query && routingStore.query.sortby ? routingStore.query.sortby : uiStore.sortBy;
    // return (
      
    //       <SortBySelector sortBy={sortBy} onChange={this.setSortBy} />
    // );
  }
  xtc() {
    let _self = this;
    if(!this.state.nodata){
   let timeDelay =  setTimeout(function () {
      if( _self.props.catalogItems.length==0){
        _self.setState({ nodata: true });
      }
    }, 1800);
    clearTimeout(timeDelay);
  }
  }
  render() {
    const { catalogItems, catalogItemsPageInfo, isLoadingCatalogItems, routingStore, shop, tag, uiStore } = this.props;
    const pageSize =
      routingStore.query && routingStore.query.limit ? parseInt(routingStore.query.limit, 10) : uiStore.pageSize;
    const sortBy = routingStore.query && routingStore.query.sortby ? routingStore.query.sortby : uiStore.sortBy;
    if (!tag && !shop) {
      return (
        <Layout shop={shop}>
          {/*<ProductGridEmptyMessage
            actionMessage="Go Home"
            notFoundMessage= "Sorry! We couldn't find what you're looking for."
            resetLink="/"
          />*/}
          <CustomLoader />
        </Layout>
      );
    }

    return (
      <Layout shop={shop}>
        
        <Helmet
          title={`${tag && tag.displayTitle} | ${shop && shop.name}`}
          meta={
            tag && tag.metafields && tag.metafields.length > 0
              ? this.renderHeaderMetatags(tag.metafields)
              : [{ name: "description", content: shop && shop.description }]
          }
        />
        <div className="ContainerContent__MainMaxWidth">
          <div className="ContainerPages__MainMaxWidth">
            {/* <Breadcrumbs isTagGrid tagId={routingStore.tagId} /> */}
            {
              // tag && tag.displayTitle && <ProductGridTitle displayTitle={tag.displayTitle} />
            }
            <ProductGridHero tag={tag} />
           
           { 
            !this.state.nodata&&(<React.Fragment>{ this.renderFilters()}
            <SeeAllProducts isFilter={this.state.isFilter} setIsFilter={(val)=>this.setState({isFilter:val})} pageInfo={catalogItemsPageInfo} setPageSize={()=>setPageSize(PAGE_SIZES._20)} catalogItems={catalogItems} displayTitle={tag && tag.displayTitle && tag.displayTitle} 
            sortBy={sortBy} onChangeSort={this.setSortBy}
            
            /></React.Fragment>)
}            {catalogItems.length == 0 && this.xtc()}
            {this.state.nodata && (
              <React.Fragment>
              {/* <ProductGridEmptyMessage
                actionMessage="Return to Shop All"
                notFoundMessage="Sorry! We couldn't find what you're looking for."
                resetLink="/shopAll"
              /> */}
              <br/>
              <br/>
              </React.Fragment>
            )}
          
            {/* <ProductGrid
          catalogItems={catalogItems}
          currencyCode={shop.currency.code}
          isLoadingCatalogItems={isLoadingCatalogItems}
          pageInfo={catalogItemsPageInfo}
          pageSize={pageSize}
          setPageSize={this.setPageSize}
          setSortBy={this.setSortBy}
          sortBy={sortBy}
        /> */}
          </div>
        </div>
      </Layout>
    );
  }
}

/**
 *  Static props for the tags route
 *
 * @param {String} lang - the shop's language
 * @param {String} slug - the tag's slug
 * @returns {Object} props
 */
export async function getStaticProps({ params: { lang, slug } }) {
  // const productSlug = slug && slug[0];
  const primaryShop = await fetchPrimaryShop(lang);

  if (!primaryShop?.shop) {
    return {
      props: {
        shop: null,
        translations: null,
        fetchAllTags: null,
        tag: null,
      },
      // eslint-disable-next-line camelcase
      unstable_revalidate: 1, // Revalidate immediately
    };
  }

  return {
    props: {
      ...primaryShop,
      ...(await fetchTranslations(lang, ["common"])),
      ...(await fetchAllTags(lang)),
      ...(await fetchTag(slug, lang)),
    },
    // eslint-disable-next-line camelcase
    unstable_revalidate: 120, // Revalidate each two minutes
  };
}

/**
 *  Static path for the tags route
 *
 * @returns {Object} the paths
 */
export async function getStaticPaths() {
  return {
    paths: locales.map((locale) => ({ params: { lang: locale, slug: "-" } })),
    fallback: true,
  };
}

export default withApollo()(withCatalogItems(inject("routingStore", "uiStore")(TagGridPage)));
