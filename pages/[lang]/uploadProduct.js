import React, {useState, useEffect} from 'react'
import Layout from "../../components/Layout";
import { withApollo } from "lib/apollo/withApollo";
import { Grid, Typography } from "@material-ui/core";
import inject from "hocs/inject";
import withCatalogItems from "containers/catalog/withCatalogItems";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import { locales } from "translations/config";
import UploadProductSteps from "../../components/UploadProduct";
import fetchAllBrands from "staticUtils/tags/fetchAllBrandTags";
import { useRouter } from 'next/router'
import useAuthStore from "hooks/globalStores/useAuthStore";
function UploadProduct(props) {
  const [updateProductId, setUpdateProductId] = useState(null);
  const { account } = useAuthStore();
  const router = useRouter();
 
  useEffect(()=>{
    const queryValue1 = router.query['updateProductId'] || router.asPath.match(new RegExp(`[&?]${'updateProductId'}=(.*)(&|$)`))
    setUpdateProductId(queryValue1);
  },[])
  // useEffect(() => {
  //   if (router && router.query.updateProductId) {
  //     router.push("/profile/address");
  //   //  console.log("router query in contex",router.query);
  //   //  setUpdateProductId(router.query.updateProductId);
  //   }
  //  }, [router]);
  const {catalogItems} = props;
  const products = catalogItems?.map(item=>item.node.product);

 
    return (
        <Layout>
            <div className="ContainerContent__MainMaxWidth uploadProduct__page">
              
            {/* <UploadProductSteps account={account} updateProductId={(updateProductId?updateProductId:null)} shop={props.shop} products={products} lang= {props.lang} brands={props?.Brandtags}/> */}
               <UploadProductSteps account={account} updateProductId={router.query?.updateProductId?router.query.updateProductId:null} shop={props.shop} products={products} lang= {props.lang} brands={props?.Brandtags}/>
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
        ...translations,
        ...await fetchAllBrands(lang),
        lang
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
      fallback: true
    };
  }
export default withApollo()(withCatalogItems(inject("routingStore", "uiStore")(UploadProduct)));