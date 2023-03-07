import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import { withApollo } from "lib/apollo/withApollo";
import { Grid, Typography, Button } from "@material-ui/core";
import inject from "hocs/inject";
import withCatalogItems from "containers/catalog/withCatalogItems";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import { locales } from "translations/config";
import CustomLoader from "../../../components/CustomLoader/index";
import useAuthStore from "hooks/globalStores/useAuthStore";
import {API_URL} from "../../../apiConfig.js";
function StartVerification() {
  // const [sessionID, setsessionID] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  const [magicSent, setmagicSent] = useState(false);
  const [magicSentEnabled, setmagicSentEnabled] = useState(false);

  const { account } = useAuthStore();
 
  if (account.userId&&account.identityVerified ){
    window.location.href = `/en/profile/address`;
    
  }else
  {
    fetch(`${API_URL}/identity-report?data=${account.userId}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status&&!magicSentEnabled) {
          window.location.href = `/en/success`;
        } else {
          setShowLoader(false);
        }
      });
  }

  const getYoti = () => {
    return new Promise((resolve, reject) => {
      fetch(`${API_URL}/identityVerification?data=${account.userId}`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            resolve({
              status: true,
              url: `https://api.yoti.com/idverify/v1/web/index.html?sessionID=${data.data.sessionId}&sessionToken=${data.data.clientSessionToken}`,
            });
          } else {
            resolve({ status: false, msg: data.msg });
          }
        });
    });
  };
  const handleMagic = () => {
    setmagicSentEnabled(true);
    
    setmagicSent(-1);
    getYoti().then((yoti) => {
      
      if (yoti.status) {
        var myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("to", account.primaryEmailAddress);
        urlencoded.append("link", yoti.url);
        urlencoded.append("name", account.firstName + " " + account.lastName);

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
          redirect: "follow",
        };

        fetch(`${API_URL}/magic-link`, requestOptions)
          .then((response) => response.text())
          .then((result) => {
            

            if (JSON.parse(result).status) {
              setmagicSent(true);
            }
          })
          .catch((error) => {
            
            setmagicSent(false);
          });
      }
    });
  };
  const handleContinue = () => {
    fetch(`${API_URL}/identityVerification?data=${account.userId}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          window.location.href = `https://api.yoti.com/idverify/v1/web/index.html?sessionID=${data.data.sessionId}&sessionToken=${data.data.clientSessionToken}`;
        } else {
          alert(data.msg);
        }
      });
  };
  return (
    <Layout>
      {showLoader ? <CustomLoader /> : ""}
      <div className="ContainerContent__MainMaxWidth statrtVerification">
        <div className="statrtVerification__wrapper">
          <Grid container>
            <Grid item xs={12}>
              <Typography className="statrtVerification__heading" variant="h2">
                Become a seller
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
         
            <Grid item xs={12} className="statrtVerification__Container">
              <img className="statrtVerification__icon" src="/icons/verifyIcon.svg" />
            
              <Typography variant="h2" className="statrtVerification__title">
                Verify your identity to start selling now
              </Typography>
              <Grid container>
         
                <Grid item xs={12} md={12}>
                  <Typography variant="h2" className="statrtVerification__description">
                    To do this, we'll need the following information:
                  </Typography>
          
                </Grid>
             
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <ol className="statrtVerification__list">
                    <li className="statrtVerification__liststep">A photo of your ID document.
                    <div className=" yoti_image_box">
                    <img src="/images/1.png" className="yoti_image"/>  
                    <img src="/images/2.png" className="yoti_image"/>  
                    <img src="/images/3.png" className="yoti_image"/>  
                    
                     </div></li>
                    
                    <li className="statrtVerification__liststep">A quick scan of your face.</li>
                    <li className="statrtVerification__liststep">
                      A good quality camera with good lighting conditions.
                    </li>
                  </ol>
                </Grid>
              </Grid>
              {account && Object.keys(account).length > 0 && account.primaryEmailAddress && !magicSent && (
                <span className="statrtVerification__liststep">
                  <a href="#" onClick={handleMagic}>
                    Email me a link to complete the verification process on my mobile
                  </a>
                </span>
              )}
              {magicSent && (
                <span className="statrtVerification__liststep">
                  Your verification link has been sent at {account.primaryEmailAddress}
                </span>
              )}
              {magicSent == -1 && <CustomLoader />}
              {account && Object.keys(account).length > 0 ? (
                <Button className="statrtVerification__btn" onClick={handleContinue}>
                  Continue on Web
                </Button>
              ) : (
                <Button className="statrtVerification__btn" href="/signin">
                  Sign In
                </Button>
              )}
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
export default withApollo()(withCatalogItems(inject("routingStore", "uiStore")(StartVerification)));
