import React from "react";
import Layout from "../../components/Layout";
import { withApollo } from "lib/apollo/withApollo";
import { Grid, Typography } from "@material-ui/core";
import inject from "hocs/inject";
import withCatalogItems from "containers/catalog/withCatalogItems";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import { locales } from "translations/config";
function PurchaseReturn() {
  return (
    <Layout>
      <div className="ContainerContent__MainMaxWidth">
        <div className="returnPolicy">
          <Grid container>
            <Grid item>
              <Typography className="returnPolicy__pagename" variant="h5" component="h2">
                <Typography className="returnPolicy__pagename" variant="b" component="b">
                  RETURN POLICY
                </Typography>
              </Typography>
            </Grid>
          </Grid>
          <div className="returnPolicy__contentContainer">
           
            <Typography xs={12} variant="h5" component="p" className="returnPolicy__content privacyPolicy__content1">
            Thank you for your purchase. We hope you are happy with your purchase. However, if you are not completely satisfied with your purchase for any reason, please contact us with 14 days of receiving the item.             </Typography>
          </div>
          <Grid container>
            <Grid item xs={12}>
              <Typography className="returnPolicy__contentTitle" variant="h5" component="h2">
                RETURNS
              </Typography>
              <div className="returnPolicy__contentContainer">
                <Typography xs={12} variant="h5" component="p" className="returnPolicy__content returnPolicy__content1">
                All returns must be sent within 14 days of contacting us. All returned items must be in new and unused condition, with all original tags and labels attached.
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography className="returnPolicy__contentTitle" variant="h5" component="h2">
                Returns Process
              </Typography>
              <div className="returnPolicy__contentContainer">
                <Typography xs={12} variant="h5" component="p" className="returnPolicy__content returnPolicy__content1">
                Please contact us for all return arrangements.
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography className="returnPolicy__contentTitle" variant="h5" component="h2">
                Refunds
              </Typography>
              <div className="returnPolicy__contentContainer">
                <Typography xs={12} variant="h5" component="p" className="returnPolicy__content returnPolicy__content1">
                After receiving your return and inspecting the condition of your item, we will process your return. Please allow at least ten (10) days from the receipt of your item to process your return . Refunds may take 1-2 billing cycles to appear on your credit card statement, depending on your credit card company. We will notify you by email when your return has been processed.                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography className="returnPolicy__contentTitle" variant="h5" component="h2">
                Exceptions
              </Typography>
              <div className="returnPolicy__contentContainer">
                <Typography xs={12} variant="h5" component="p" className="returnPolicy__content returnPolicy__content1">
                For defective or damaged products, please contact us at the contact details below to arrange a refund or exchange. Please include as much details as possible.     </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography className="returnPolicy__contentTitle" variant="h5" component="h2">
                Questions
              </Typography>
              <div className="returnPolicy__contentContainer">
                <Typography xs={12} variant="h5" component="p" className="returnPolicy__content returnPolicy__content1">
                If you have any questions concerning our return policy, please complete the contact us form on our website or email us at:
                  <Typography variant="h6" component="p">
                  <Typography component="a" href="mailto:info@landofsneakers.com">info@landofsneakers.com</Typography> 
                  </Typography>
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </Layout>
  );
}
export async function getStaticProps({ params: { lang } }) {
  const primaryShop = await fetchPrimaryShop(lang);
  const translations = await fetchTranslations(lang, ["common"]);

  if (!primaryShop?.shop) {
    return {
      props: {
        shop: null,
        ...translations,
      },
      // eslint-disable-next-line camelcase
      unstable_revalidate: 1, // Revalidate immediately
    };
  }

  return {
    props: {
      ...primaryShop,
      ...translations,
    },
    // eslint-disable-next-line camelcase
    unstable_revalidate: 120, // Revalidate each two minutes
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
    fallback: false,
  };
}
export default withApollo()(withCatalogItems(inject("routingStore", "uiStore")(PurchaseReturn)));
