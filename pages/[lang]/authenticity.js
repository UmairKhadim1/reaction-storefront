import React from 'react'
import Layout from "../../components/Layout";
import { withApollo } from "lib/apollo/withApollo";
import inject from "hocs/inject";
import { Grid, Typography } from "@material-ui/core";
import withCatalogItems from "containers/catalog/withCatalogItems";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import { locales } from "translations/config";
 function Authenticity() {
    return (
      <Layout>
      <div className="ContainerContent__MainMaxWidth faqs">
          <div className="buyerProtection">
              <Typography className="buyerProtection__heading" variant="h5" component="h2">Authenticity</Typography>
              <Grid container className="buyerProtection__container">
                  <Grid item xs={12} className="buyerProtection__info">
                      <Typography className="buyerProtection__content" variant="h5" component="p">At Land of Sneakers we care deeply about our users experience. We have put measures in place to safeguard our community from scams and fraudulent activity.  Sellers on our platform are vetted to ensure our users have a harmonious experience. Our team of authentication specialists carry out in-hand verification on selected sellers as an additional measure. </Typography>
                <br/>
                      <Typography className="buyerProtection__content" variant="h5" component="p">
                          
                      We have a no tolerance policy when it comes to the authenticity of sneakers being sold on our platform. Any user found to be in breach of our policies will be exiled from the Land of Sneakers forever.  </Typography>
                       
                  </Grid>
              </Grid>

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
export default withApollo()(withCatalogItems(inject("routingStore", "uiStore")(Authenticity)));