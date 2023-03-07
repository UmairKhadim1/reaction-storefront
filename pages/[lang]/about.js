import React from 'react'
import Layout from "../../components/Layout";
import { withApollo } from "lib/apollo/withApollo";
import { Grid, Typography } from "@material-ui/core";
import inject from "hocs/inject";
import withCatalogItems from "containers/catalog/withCatalogItems";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import { locales } from "translations/config";
function About() {
    return (
        <Layout>
            <div className="ContainerContent__MainMaxWidth">
                <div className="aboutus">

                    <Grid container>
                        <Grid item>
                            <Typography className="aboutus__pageName" variant="h5" component="h2">ABOUT LoS</Typography>
                            <Typography className="aboutus__mainHeading" variant="h5" component="h2">Land of Sneakers</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <div className="aboutus__contentContainer">
                                <Typography className="aboutus__content aboutus__content1" variant="h5" component="p">
                                Land Of Sneakers (LOS) is an online community marketplace that connect sneakerheads, traders and enthusiasts of sneakers from around the world – with a particular emphasis on safeguarding the community from fraudulent activity in the resale market. All sellers on the platform are vetted to ensure users have the most pleasant experience.                                </Typography>
                                
                            </div>

                        </Grid>
                        <Grid item xs={12} sm={6}>
                             <div className="aboutus__logo">
                                 <img src="/images/about_image.png"/>
                             </div>
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
export default withApollo()(withCatalogItems(inject("routingStore", "uiStore")(About)));