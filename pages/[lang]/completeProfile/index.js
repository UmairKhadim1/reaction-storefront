import React from 'react'
import { withApollo } from "lib/apollo/withApollo";
import { Grid, Typography } from "@material-ui/core";
import inject from "hocs/inject";
import withCatalogItems from "containers/catalog/withCatalogItems";
import CompleteProfile from '../../../components/CompleteProfile';
import AddressProfile from "../../../components/AddressProfile";
import SellerProfile from "../../../components/SellerProfile";
import Layout from "../../../components/Layout";
function Index() {
    return (
        <Layout>
            <div className="ContainerContent__MainMaxWidth">
                <Grid container className="signupProfileInfo__grid">
                    <Grid item xs={12} sm={12} lg={12}>
                    {/* <CompleteProfile /> */}
                     {/* <AddressProfile/> */}
                     {/* <SellerProfile/> */}
                    </Grid>
                </Grid>
            </div>
        </Layout>
    )
}
export default withApollo()(withCatalogItems(inject("routingStore", "uiStore")(Index)));
