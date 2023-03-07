import React, {useState,useEffect} from 'react';
import Layout from "../../components/Layout";
import { withApollo } from "lib/apollo/withApollo";
import inject from "hocs/inject";
import withCatalogItems from "containers/catalog/withCatalogItems";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import { locales } from "translations/config";
import TrackOrder from "../../components/TrackOrder";
import TrakingDetail from '../../components/TrackOrder/TrakingDetail';
import {useRouter} from "next/router";
import {COURIER_URL,COURIER_USER,COURIER_TOKEN} from "../../courierConfig";
import axios from "axios";
function TrackYourOrder() {
    const [trackingInfo, setTrackingInfo] = useState({});
    const [labelInfo,setLabelInfo] = useState({});
    const router = useRouter();
    useEffect(()=>{
        if(router.query.tracking_request_hash && router.query.tracking_request_id){
            const structLabelInfo = {
                tracking_request_hash: router.query.tracking_request_hash,
                tracking_request_id: router.query.tracking_request_id,
                tracking_codes: router.query.tracking_codes,
                courier: router.query.courier
            }
            setLabelInfo(structLabelInfo);
            let config = {
                method:"post",
                url:`${COURIER_URL}/get-tracking`,
                headers: { 
                 'Content-Type': 'application/json'
               },
               data : {
                tracking_request_hash : router.query.tracking_request_hash,
                tracking_request_id : router.query.tracking_request_id
               }
         }
         axios(config)
             .then(async function (response) {
             setTrackingInfo(response.data.data);
           
             })
             .catch(function (error) {
             console.log("create label server api error",error);
             });
        }
    },[router])
   
    return (
        <Layout>
            <div className="trackYourOrder">
                <div className="ContainerContent__MainMaxWidth">
                    {/* <TrackOrder /> */}
                    <TrakingDetail labelInfo={labelInfo}/>
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
export async function getStaticPaths() {
    return {
        paths: locales.map((locale) => ({ params: { lang: locale } })),
        fallback: false
    };
}
export default withApollo()(withCatalogItems(inject("routingStore", "uiStore")(TrackYourOrder)));