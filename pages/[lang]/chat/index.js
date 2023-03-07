import React, { useState, useEffect } from 'react'
import Layout from "components/Layout";
import { withApollo } from "lib/apollo/withApollo";
import inject from "hocs/inject";
import withCatalogItems from "containers/catalog/withCatalogItems";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import { locales } from "translations/config";
import ChatBox from "components/ChatBox";
import Helmet from "react-helmet";
import { Grid } from "@material-ui/core";
import { useQuery, gql } from "@apollo/client";
import useStores from "hooks/useStores";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/router";
function Chat(props) {
    // const { authStore } = useStores();
    // const { accessToken } = authStore;
    const router = useRouter();
    const { authStore: { account, accessToken }, shop } = props;

    const [chatContacts, setChatContacts] = useState([]);
    const [queryValue, setQueryValue] = useState([])
    const [queryParams, setQueryParams] = useState([])
    useEffect(() => {
        if (router.asPath.split("?")[1]) {
            const ParamsDictonery = parseQueryStringToDictionary(router.asPath.split("?")[1])
            setQueryParams(ParamsDictonery)

        }
        const queryValue1 = router.query['bidId'] || router.asPath.match(new RegExp(`[&?]${'bidId'}=(.*)(&|$)`))
        setQueryValue(queryValue1);
    }, [])
    const { data } = useQuery(gql`
    query GetBidsbyAccountId{
        getBidsbyAccountId{
            _id
            createdAt
            productId
            soldBy
            soldByInfo {
                name
                image
            }
            createdBy
            createdByinfo {
                name
                image
            }
            activeOffer {
                text
            }
        }
    }
    `, {
        skip: !accessToken
    });
    const parseQueryStringToDictionary = (queryString) => {
        var dictionary = {};

        // remove the '?' from the beginning of the
        // if it exists
        if (queryString.indexOf('?') === 0) {
            queryString = queryString.substr(1);
        }

        // Step 1: separate out each key/value pair
        var parts = queryString.split('&');

        for (var i = 0; i < parts.length; i++) {
            var p = parts[i];
            // Step 2: Split Key/Value pair
            var keyValuePair = p.split('=');

            // Step 3: Add Key/Value pair to Dictionary object
            var key = keyValuePair[0];
            var value = keyValuePair[1];

            // decode URI encoded string
            value = decodeURIComponent(value);
            value = value.replace(/\+/g, ' ');

            dictionary[key] = value;
        }

        // Step 4: Return Dictionary Object
        return dictionary;
    };
    useEffect(() => {

        // do some checking here to ensure data exist
        if (data) {
            setChatContacts(data.getBidsbyAccountId)
            // mutate data if you need to
            //   setShippingMethods(data.flatRateFulfillmentMethods.nodes)
        }

    }, [data]);
    return (
        <Layout>
            <Helmet
                title={"My Bids "}
            />
            <div className="ContainerContent__MainMaxWidth chat">
                <Grid container className="chat__row">
                    <Grid item xs={12} lg={10}>
                        <ChatBox
                            chatContacts={chatContacts}
                            account={account}
                            accessToken={accessToken}
                            shop={shop}
                            currentBidId={queryParams.bidId}
                            from={queryParams.from}
                            to={queryParams.to}
                        />
                    </Grid>
                </Grid>
                <ToastContainer hideProgressBar={true} />
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
export default withApollo()(withCatalogItems(inject("routingStore", "uiStore")(Chat)));