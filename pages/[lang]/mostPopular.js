import React from 'react'
import Layout from "../../components/Layout";
import { withApollo } from "lib/apollo/withApollo";
import inject from "hocs/inject";
import withCatalogItems from "containers/catalog/withCatalogItems";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import { locales } from "translations/config";
 function MostPopular() {
    return (
        <Layout>
        <div>
            <h2 className="text-center">MostPopular Page</h2>
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
export default withApollo()(withCatalogItems(inject("routingStore", "uiStore")(MostPopular)));