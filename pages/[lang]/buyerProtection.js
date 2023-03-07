import React from 'react'
import Layout from "../../components/Layout";
import { withApollo } from "lib/apollo/withApollo";
import { Grid, Typography } from "@material-ui/core";
import inject from "hocs/inject";
import withCatalogItems from "containers/catalog/withCatalogItems";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import { locales } from "translations/config";
function BuyerProtection() {
    return (
        <Layout>
            <div className="ContainerContent__MainMaxWidth faqs">
                <div className="buyerProtection">
                    <Typography className="buyerProtection__heading" variant="h5" component="h2">Buyer Protection</Typography>
                    <Grid container className="buyerProtection__container">
                        <Grid item xs={12} className="buyerProtection__info">
                            <Typography className="buyerProtection__content" variant="h5" component="p">In order to be covered by Buyer Protection you must pay inside the app or on the Land of Sneakers website using the BUY button and report any issues to us within 30 days.</Typography>
                            <Typography className="buyerProtection__content" variant="h5" component="p">
                                All purchases made in-app and/or on the Land of Sneakers website, are covered by Buyer Protection and you’ll receive a full refund if your item doesn’t arrive or if it’s significantly not as described. We will investigate any reports and mediate between you and the seller to come to a satisfactory resolution. If we decide that your item is significantly not as described, then we will where possible facilitate a return in exchange for a refund.
                            </Typography>
                             
                        </Grid>
                    </Grid>

                    <Typography className="buyerProtection__subHeading " variant="subtitle" component="h2">The following aren’t covered by Buyer Protection: </Typography>
                    <Typography className="buyerProtection__list" variant="subtitle" component="h2">- Purchases made without using the BUY button </Typography>
                    <Typography className="buyerProtection__list" variant="subtitle" component="h2">- Meet in person transactions</Typography>
                </div>
            </div>
        </Layout>
    )
}
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
export default withApollo()(withCatalogItems(inject("routingStore", "uiStore")(BuyerProtection)));