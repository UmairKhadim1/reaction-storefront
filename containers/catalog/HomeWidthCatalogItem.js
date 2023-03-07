import React from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import { Query } from "@apollo/react-components";
import hoistNonReactStatic from "hoist-non-react-statics";
import { pagination, paginationVariablesFromUrlParams } from "lib/utils/pagination";
import catalogItemsQuery from "./catalogItems.gql";
import { useQuery } from "@apollo/client";
import { GQL_URL } from "../../apiConfig.js";
/**
 * withCatalogItems higher order query component for fetching primaryShopId and catalog data
 * @name withCatalogItems
 * @param {React.Component} Component to decorate and apply
 * @returns {React.Component} - component decorated with primaryShopId and catalog as props
 */
export default function withCatalogItems(Component) {
  // state={
  //   load:false
  // }
  class CatalogItems extends React.Component {
    state={
      loading:false,
      catalogitems:[]
    }
    static propTypes = {
      primaryShopId: PropTypes.string,
      routingStore: PropTypes.object.isRequired,
      tag: PropTypes.shape({
        _id: PropTypes.string.isRequired
      }),
      uiStore: PropTypes.object.isRequired
    };
    fetchbrandproduct = (val, displayTitle,slug) => {
      return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var graphql = JSON.stringify({
          query: `query catalogItemsQuery(
            $shopId: ID!
           
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
                      shop {
                        currency {
                          code
                        }
                      }
                      pricing {
                        compareAtPrice {
                          displayAmount
                        }
                        currency {
                          code
                        }
                        displayPrice
                        minPrice
                        maxPrice
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
          variables: val,
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
            const { catalogItems } = JSON.parse(result).data;
            resolve({ key: displayTitle, catalogItems: catalogItems,slug:slug });
          })
          .catch((error) => {
            
            reject(error);
          });
      });
    };
    componentDidMount(){
      const { primaryShopId, routingStore, uiStore, tag, tags } = this.props;
      const [sortBy, sortOrder] = uiStore.sortBy.split("-");
      let PromArray = []
      tags&&tags.map((element, i) => {
        if(element.slug.includes("new-arrival")){
          PromArray.push(this.fetchbrandproduct({
            shopId: primaryShopId,
            // ...paginationVariablesFromUrlParams(routingStore.query, { defaultPageLimit: uiStore.pageSize }),
            //  tagIds: [element._id],
            sortBy,
            sortByPriceCurrencyCode: uiStore.sortByCurrencyCode,
            sortOrder,
            first: 6
          }, element.displayTitle,element.slug))
        }
        else{
        //  const result =  
        PromArray.push(this.fetchbrandproduct({
          shopId: primaryShopId,
          // ...paginationVariablesFromUrlParams(routingStore.query, { defaultPageLimit: uiStore.pageSize }),
          tagIds: [element._id],
          sortBy,
          sortByPriceCurrencyCode: uiStore.sortByCurrencyCode,
          sortOrder,
          first: 8
        }, element.displayTitle,element.slug))
        // const slug = element.slug
        // return {slug,result}
      }
      });
      
   
        //  this.setState({loading:true});
         Promise.all(PromArray).then(data=>{
           
           this.setState({catalogitems:data})
         })
      
     
    
     
    }
    render() {

      const { primaryShopId, routingStore, uiStore, tag, tags } = this.props;
      const [sortBy, sortOrder] = uiStore.sortBy.split("-");


      if (!primaryShopId) {
        return (
          <Component
            {...this.props}
          />
        );
      }

      return (
        <>
          
          <Component
            {...this.props}
            data={this.state.catalogitems}

          />
        </>
      )
    }
  }

  hoistNonReactStatic(CatalogItems, Component);

  return inject("primaryShopId", "routingStore", "uiStore")(CatalogItems);
}
