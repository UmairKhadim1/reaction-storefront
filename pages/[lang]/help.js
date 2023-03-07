import React, {useState} from 'react'
import Layout from "../../components/Layout";
import { withApollo } from "lib/apollo/withApollo";
import { Grid, Typography, Icon,InputBase } from "@material-ui/core";
import { fade, makeStyles } from '@material-ui/core/styles';
import CustomHelpAccordian from "../../components/CustomHelpAccordion/index";
import inject from "hocs/inject";
import withCatalogItems from "containers/catalog/withCatalogItems";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import { locales } from "translations/config";
const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        background: "#F0F0F0 !important",
        borderRadius: "25px !important",
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        color: "#626262 !important",
        fontFamily: "Karla !important",
        fontStyle: "normal !important",
        fontWeight: "normal important",
        fontSize: "14px !important",
        lineHeight: "16px !important",
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}))
function Help() {
    const classes = useStyles();
    const [popularFaqs, setPopularFaqs]= useState([{
        label: 'I haven’t received some or all my item?',
        value: 'Land Of Sneakers (LoS) is an online community marketplace that connect sneakerheads, traders and enthusiasts of sneakers from around the world – with a particular emphasis on safeguarding the community from fraudulent activity and promoting a scalable P2P platform.'
    },
    {
        label: 'My item is not as described?',
        value: 'Text of Accordion 2'
    },
    {
        label: 'How do I get a refund?',
        value: 'Text of Accordion 2'
    },
    {
        label: 'Can I cancel my order?',
        value: 'Text of Accordion 2'
    },
    ]);
    return (
        <Layout>
            <div className="ContainerContent__MainMaxWidth">
                <div className="help">
                    <Grid container>
                        <Grid item>
                            <Typography className="help__pagename" variant="h5" component="h2">Help Center</Typography>
                            <Typography className="help__mainHeading" variant="h5" component="h2">Hello. What can we help you with?</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} className="help__featureContainer">
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Grid container className="help__featureBox">
                                <Grid className="help__featureIcon" item xs={2}>
                                    <img src="/icons/yourOrders.png" />
                                </Grid >

                                <Grid xs={8} className="help__featureInfo">
                                    <Typography className="help__featureTitle">Your Orders</Typography>
                                    <Typography className="help__featureDescription">Track packages</Typography>
                                    <Typography className="help__featureDescription">Edit or cancel order</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Grid container className="help__featureBox">
                                <Grid className="help__featureIcon" item xs={2}>
                                    <img src="/icons/refund.png" />
                                </Grid >

                                <Grid xs={8} className="help__featureInfo">
                                    <Typography className="help__featureTitle">Returns & Refunds</Typography>
                                    <Typography className="help__featureDescription">Return or exchange items</Typography>
                                    <Typography className="help__featureDescription">print return mailing labels</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Grid container className="help__featureBox">
                                <Grid className="help__featureIcon" item xs={2}>
                                    <img src="/icons/accountSetting.png" />
                                </Grid >

                                <Grid xs={8} className="help__featureInfo">
                                    <Typography className="help__featureTitle">Account Settings</Typography>
                                    <Typography className="help__featureDescription">Change email/password</Typography>
                                    <Typography className="help__featureDescription">update login information</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Grid container className="help__featureBox">
                                <Grid className="help__featureIcon" item xs={2}>
                                    <img src="/icons/paymentSetting.png" />
                                </Grid >

                                <Grid xs={8} className="help__featureInfo">
                                    <Typography className="help__featureTitle">Payment Settings</Typography>
                                    <Typography className="help__featureDescription">Add or edit payment</Typography>
                                    <Typography className="help__featureDescription">methods</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container className="help__mainHeadingContainer">
                        <Grid item>
                            <Typography className="help__mainHeading" variant="h5" component="h2">Find more solutions</Typography>
                        </Grid>
                        <Grid item >
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <Icon>search</Icon>
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item>
                            <Typography className="help__mainHeading" variant="h5" component="h2">Popupular FAQs</Typography>
                        </Grid>
                    </Grid>
                    <Grid container className="help__popularFaqsContainer">
                        <Grid item>
                        <CustomHelpAccordian hiddenTexts={popularFaqs} />
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
export default withApollo()(withCatalogItems(inject("routingStore", "uiStore")(Help)));