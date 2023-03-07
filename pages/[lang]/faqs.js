import React, { useState } from "react";
import Layout from "../../components/Layout";
import { withApollo } from "lib/apollo/withApollo";
import { Typography, Grid, Container, Icon, InputBase } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import CustomAccordian from "../../components/CustomAccordian/index";
import inject from "hocs/inject";
import withCatalogItems from "containers/catalog/withCatalogItems";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import { locales } from "translations/config";
const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    background: "#F0F0F0 !important",
    borderRadius: "25px !important",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
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
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
function FAQs() {
  const classes = useStyles();
  const [hiddenTexts, setHiddenTexts] = useState([
    {
      label: "What is LoS?",
      value:
        "Land Of Sneakers (LOS) is an online community marketplace that connect sneakerheads, traders and enthusiasts of sneakers from around the world – with a particular emphasis on safeguarding the community from fraudulent activity. All our sellers are vetted to ensure our users have the most pleasant experience.",
    },
    {
      label: "How does LoS work?",
      value:
        "Simply photograph your items (note: items must be in a new condition), set your price then post it on our platform. Buyers will be able to make you offers for your product or buy it at the price you have set (Note: Sellers will able to upload products once the full version of the website is live).",
    },
  ]);
  const [buyingQuestion, setBuyingQustion] = useState([
    {
      label: "I haven't received some or all my item?",
      value:
        "Please complete the form on the contact us page as soon as possible with all the relevant information. Be sure to include as much detail as possible. We will investigate the matter and contact you.",
    },
    {
      label: "My item is not as described?",
      value:
        "Please complete the form on the contact us page as soon as possible with all the relevant information. Be sure to include as much detail as possible. We will investigate the matter and contact you.",
    },
    {
      label: "How do I get a refund?",
      value:
        "Please complete the form on the contact us page as soon as possible with all the relevant information within 14 days. Be sure to include as much detail as possible. We will investigate the matter and contact you.",
    },
    {
      label: "Can I cancel my order?",
      value: "Unfortunately once an order is placed, it cannot be cancelled.",
    },
  ]);
  const [sellingQuestion, setSellingQustion] = useState([]);

  // const [sellingQuestion, setSellingQustion]= useState([{
  //     label: 'How do I generate a shipping label?',
  //     value: 'Land Of Sneakers (LoS) is an online community marketplace that connect sneakerheads, traders and enthusiasts of sneakers from around the world – with a particular emphasis on safeguarding the community from fraudulent activity and promoting a scalable P2P platform.'
  // },
  // {
  //     label: 'How do I edit my listing?',
  //     value: 'Text of Accordion 2'
  // },
  // {
  //     label: 'How can I ensure my items sell?',
  //     value: 'Text of Accordion 2'
  // },
  // {
  //     label: 'What happens if I cancel an order?',
  //     value: 'Text of Accordion 2'
  // },
  // {
  //     label: 'How can I temporarily deactivate my listings?',
  //     value: 'Text of Accordion 2'
  // },
  // ]);
  // const [verificationQuestion, setVerificationQustion]= useState([{
  //     label: 'Pending details',
  //     value: 'Land Of Sneakers (LoS) is an online community marketplace that connect sneakerheads, traders and enthusiasts of sneakers from around the world – with a particular emphasis on safeguarding the community from fraudulent activity and promoting a scalable P2P platform.'
  // },
  // ]);
  const [verificationQuestion, setVerificationQustion] = useState([]);

  const [accountQuestion, setAccountQustion] = useState([
    {
      label: "How do I reset my password?",
      value: "To reset password, please select forgot password on the login screen.",
    },

    {
      label: "How can I contact you?",
      value: "We are always happy to help. Please complete the contact us form with as much detail as possible.",
    },
  ]);
  return (
    <Layout>
      <div className="ContainerContent__MainMaxWidth">
        <div className="faqs">
          <Typography className="faq__pageName" variant="h5" component="h2">
            Faqs
          </Typography>
          <Grid container className="faq__mainHeadingContainer">
            <Grid item>
              <Typography className="faq__mainHeading" variant="h5" component="h2">
                Hi, what can we help you with today?
              </Typography>
            </Grid>
            <Grid item>
              {/*  <div className={classes.search}>
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
            </div>*/}
            </Grid>
          </Grid>
          <Typography className="faq__title" variant="h5" component="h2">
            Questions about the platform:
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <CustomAccordian hiddenTexts={hiddenTexts} />
            </Grid>
          </Grid>
          <Typography className="faq__title" variant="h5" component="h2">
            Questions about buying:
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <CustomAccordian hiddenTexts={buyingQuestion} />
            </Grid>
          </Grid>
          {/*    <Typography className="faq__title" variant="h5" component="h2">Questions about selling:</Typography>
            <Grid container>
                 <Grid item xs={12}>
                 <CustomAccordian hiddenTexts={sellingQuestion} />
                 </Grid>
          </Grid>*/}
          <Typography className="faq__title" variant="h5" component="h2">
            Questions about account:
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <CustomAccordian hiddenTexts={accountQuestion} />
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
export default withApollo()(withCatalogItems(inject("routingStore", "uiStore")(FAQs)));
