import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Container, Grid, List, ListItem, ListItemText, Icon, Hidden } from "@material-ui/core";
import Head from "next/head";
import {useRouter} from "next/router";
const date = new Date();

const styles = (theme) => ({
  footerBottom: {
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: theme.spacing(2),
    color: "#FFFFFF",
    display: "flex",
    justifyContent: "space-between",
  },
});

const Footer = ({ ...props }) => {
  const router = useRouter();
  const handleSellerIdentity = () =>{
    // http://localhost:4100/identityVerification
  
       router.push(`/en/contact`)
  
  }
  return(
  <>
    {/* <Container maxWidth="xl" className="FooterContainer__MainMaxWidth ContainerContent__MainMaxWidth">
      <div className="ContainerPages__MainMaxWidth">
        <div className="Footer__section5">
          <Grid container spacing={3} className="Footer__download">
            <Hidden smDown>
              <Grid item sm={6} md={6} lg={6} className="Footer__downloadImg">
                <img className="FooterSection5__image" src="/images/HomeMobile.png" />
              </Grid>
            </Hidden>
            <Grid item sm={8} md={6} lg={6} className="FooterSection5__contentContainer">
              <div className="FooterSection5__content">
                <Typography variant="h2" className="FooterSection5__title">LOS App</Typography>
                <Typography variant="h2" className="FooterSection5__title"> Coming Soon</Typography>
                <div className="FooterSection5__subtitleBox">
                  <Typography variant="subtitle2" className="FooterSection5__subtitle">Great Deals on sneakers and accessories</Typography>
                  <Typography variant="subtitle2" className="FooterSection5__subtitle">Make offers on your most wanted styles</Typography>
                  <Typography variant="subtitle2" className="FooterSection5__subtitle"> Exclusive drops and collections</Typography>
                </div>
                <div className="dowload__sources">
                  <span className="dowloadSource__item"><img src="/icons/appleStore.png" /> </span>
                  <span className="dowloadSource__item"><img src="/icons/playstore.png" /></span>
                </div>
              </div>
            </Grid>

          </Grid>
        </div>
      </div>
    </Container> */}
    <footer className="footer">
      <Container maxWidth="xl" className="FooterContainer__MainMaxWidth ContainerContent__MainMaxWidth">
        <div className="ContainerPages__MainMaxWidth">
          <Grid container>
            <Grid item xs={12} sm={4} md={3} lg={4}>
              <div className="footer__leftContent">
                <img src="/icons/footerLogo.svg" />

                <div className="footer__socialMedia">
                  <a href="https://www.instagram.com/landofsneakersuk" target="_blank">
                    <img src="/icons/instagram.svg" />
                  </a>

                  <a href="https://www.facebook.com/groups/524477431685141" target="_blank">
                    <img src="/icons/facebook.svg" />
                  </a>

                  <a href="https://twitter.com/landofsneakers" target="_blank">
                    <img src="/icons/twitter.svg" />
                  </a>

                  {/* <Icon>instagram</Icon>
                <Icon>facebook</Icon>
                <Icon>twitter</Icon>
                <Icon>youtube</Icon> */}
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={8}>
              <Grid container>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <Typography variant="h6" className="footer__title">
                    Shop
                  </Typography>
                  <div>
                    <List>
                      {/*   <ListItem button component="a" href="/en/authenticity">
                    <ListItemText
                      primary="Authenticity"
                       className="footer__listItemText"
                     />
                   </ListItem> 
              */}
                    {/*  <ListItem button component="a" href="/en/buyerProtection">
                        <ListItemText primary="Buyer Protection" className="footer__listItemText" />
            </ListItem>*/}
                      <ListItem button component="a" href="/en/purchaseReturns">
                        <ListItemText primary="Purchases & Returns" className="footer__listItemText" />
                      </ListItem>
                      <ListItem button component="a" href="/en/tag/new-arrival">
                        <ListItemText primary="New Arrival" className="footer__listItemText" />
                      </ListItem>
                      <ListItem button component="a" href="/en/tag/popular-now">
                        <ListItemText primary="Most Popular" className="footer__listItemText" />
                      </ListItem>
                    </List>
                  </div>
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={3}>
                  <Typography variant="h6" className="footer__title">
                    Support
                  </Typography>
                  <div>
                    <List>
                      <ListItem button component="a" href="/en/contact">
                        <ListItemText primary="Contact Us" className="footer__listItemText" />
                      </ListItem>
                      <ListItem button component="a" href="/en/faqs">
                        <ListItemText primary="FAQs" className="footer__listItemText" />
                      </ListItem>
                      <ListItem button component="a" href="/en/privacy">
                        <ListItemText primary="Privacy Policy" className="footer__listItemText" />
                      </ListItem>
                      <ListItem button component="a" href="/en/terms">
                        <ListItemText primary="Terms" className="footer__listItemText" />
                      </ListItem>
                    </List>
                  </div>
                </Grid>
                <Grid item xs={12} sm={4} md={5} lg={5}>
                  <Typography variant="h6" className="footer__title">
                    Contact Us
                  </Typography>
                  <div>
                    <List>
                   {   /*<ListItem button component="a" href="mailto:info@landofsneakers.com">
                        <ListItemText primary="Email us" className="footer__listItemText" />
            </ListItem>*/}
                      <ListItem>
                        <ListItemText
                          primary="15 Upper Grosvenor Street London W1K 7PJ"
                          className="footer__listItemText"
                        />
                      </ListItem >
                      <ListItem button component="a" onClick={handleSellerIdentity}>
                        <ListItemText
                          primary="Become a Seller"
                          className="footer__listItemText"
                        />
                      </ListItem>
                    </List>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container className="pt-20 my-footer">
            <Typography style={{color:"white"}} xs={12} sm={6} component="div" variant="p" className="footerBottom__text">
              &copy; {date.getFullYear()} Land of Sneakers - All Right Reserved
            </Typography>
            {/*   <Hidden xsDown>
              <Typography xs={12} sm={6} component="div">
                <div className="dowload__sources">
                  <span className="dowloadSource__item">
                    <img src="/icons/ios_btn.svg" />{" "}
                  </span>
                  <span className="dowloadSource__item">
                    <img src="/icons/Android_btn.svg" />
                  </span>
                </div>
              </Typography>
        </Hidden>*/}
          </Grid>
        </div>
      </Container>
    </footer>
  </>
);}

Footer.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles, { name: "SkFooter" })(Footer);
