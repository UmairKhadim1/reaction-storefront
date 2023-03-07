import React from "react";
import Layout from "../../../components/Layout";
import { withApollo } from "lib/apollo/withApollo";
import { Grid, Typography, Button } from "@material-ui/core";
import inject from "hocs/inject";
import withCatalogItems from "containers/catalog/withCatalogItems";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import { locales } from "translations/config";
import { useRouter } from "next/router";
import useAuthStore from "hooks/globalStores/useAuthStore";
function VerificationError() {
  const router = useRouter();
  const { account } = useAuthStore();
 
  const handleContinue = () => {};
  return (
    <Layout>
      <div className="ContainerContent__MainMaxWidth verificationError">
        <div className="verificationError__wrapper">
          <Grid container>
            <Grid item xs={12}>
              <Typography className="verificationError__heading" variant="h2">
                Become a seller
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} className="verificationError__Container">
              <img className="verificationError__icon" src="/icons/ErrorIcon.svg" />
              <Typography variant="h2" className="verificationError__title">
                Error
              </Typography>
              <Grid container>
                <Grid item xs={12} md={10}>
                  <Typography variant="h2" className="verificationError__description">
                    We are unable to process your request at the moment, please try again later.
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}></Grid>
              </Grid>
              {/* <Button className="verificationError__btn" onClick={handleContinue}>Try again</Button>:
               */}
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
export default withApollo()(withCatalogItems(inject("routingStore", "uiStore")(VerificationError)));
