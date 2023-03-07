import React, {useState,useEffect} from 'react';
import Layout from "../../../components/Layout";
import { withApollo } from "lib/apollo/withApollo";
import { Grid, Typography } from "@material-ui/core";
import inject from "hocs/inject";
import withCatalogItems from "containers/catalog/withCatalogItems";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";

import fetchTranslations from "staticUtils/translations/fetchTranslations";
import { locales } from "translations/config";
import PublicProfileComponent from "components/PublicProfile";
import { GQL_URL } from "../../../apiConfig";
function SellerPublicProfile(props) {
    const  {userName,shop, authStore:{account,accessToken}}  = props;
    const [profile,setProfile] = useState(null)
     useEffect(() => {
          if(userName){
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            accessToken && myHeaders.append("Authorization", `${accessToken}`);
            var graphql = JSON.stringify({
              query: `
              query getUserByuserName($userName: String!) {
                getUserByuserName(userName: $userName) {
                  name
                  profilePhoto
                  canFollow
                  isVerified
                  userName
                  products {
                    _id
                    ancestorId
                    parentId
                    media {
                        URLs {
                        large
                    medium
                    original
                    small
                    thumbnail
                        }
                        priority
                        productId
                        variantId
                    }
                    
                    title
                    pricing {
                    displayPrice
                    maxPrice
                    minPrice
                    price
       }
                  }
                  follower {
                     name
                        profile {
                          name 
                          picture
                          username
                        }
                       username
                     }
                     following {
                      name
                         profile {
                           name 
                           picture
                           username
                         }
                        username
                      }
                  }
                }
                    `,
              variables: {
                userName
              },
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
                  setProfile(JSON.parse(result).data.getUserByuserName)
                  // resolve(JSON.parse(result).data);
                })
                .catch((error) => {
                  // reject(error);
                });
          }
     },[userName,accessToken])
    return (
        <Layout>
           
            <div className="ContainerContent__MainMaxWidth">
                <div className="aboutus">
                    <PublicProfileComponent
                    shop={shop}
                    profile={profile}
                    account={account} />
                </div>
            </div>
        </Layout>
    )
}
export async function getStaticProps({ params: { slugOrId, lang } }) {
    const primaryShop = await fetchPrimaryShop(lang);
    const translations = await fetchTranslations(lang, ["common"]);
    // const profile = await fetchProfileInfo(slugOrId && slugOrId[0]);
    
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
            ...translations,
            userName:slugOrId && slugOrId[0]
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
        paths: locales.map((locale) => ({ params: { lang: locale,slugOrId: ["-"] } })),
        fallback: true
    };
}
export default withApollo()(withCatalogItems(inject("routingStore", "uiStore")(SellerPublicProfile)));