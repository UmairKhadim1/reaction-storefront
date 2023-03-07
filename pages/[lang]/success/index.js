import React, { useState } from "react";
import Layout from "../../../components/Layout";
import { withApollo } from "lib/apollo/withApollo";
import { Grid, Typography, Button } from "@material-ui/core";
import inject from "hocs/inject";
import withCatalogItems from "containers/catalog/withCatalogItems";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import Helmet from "react-helmet";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import { locales } from "translations/config";
import { useRouter } from "next/router";
import useAuthStore from "hooks/globalStores/useAuthStore";
import {API_URL} from "../../../apiConfig.js"

function VerificationSuccess() {
  const [checks, setChecks] = useState(null);
  const [userStatus, setuserStatus] = useState(null);
  const [verificationResult, setverificationResult] = useState(null);

  const router = useRouter();
  const { account } = useAuthStore();
  
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
  React.useEffect(() => {
    setTimeout(function () {

      
      if (account.userId && !checks) {

        fetch(`${API_URL}/identity-report?data=${account.userId}`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status) {
              
              if (data.isComplete == "COMPLETED"||data.isComplete == "EXPIRED") {
                setChecks(data.data.results);
                setverificationResult(data.data.verification_status);
              } else {
                setverificationResult(-1)
              }
            } else {
              setuserStatus(data.status);
            }
          });
      }
    }, 3000);
  });
  return (
    <Layout>
    <Helmet
    title={"Identity Verification "}
  />
      <div className="ContainerContent__MainMaxWidth verificationSuccess">
        <div className="verificationSuccess__wrapper">
          <Grid container>
            <Grid item xs={12}>
              <Typography className="verificationSuccess__heading" variant="h2">
                Become a seller
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} className="verificationSuccess__Container">
              <img
                className="verificationSuccess__icon"
                src={verificationResult==true ? "/icons/successfullyIcon.svg" : "/icons/ErrorIcon.svg"}
              />
              <Typography variant="h2" className="verificationSuccess__title">
                {userStatus==false?"Invalid request":
                  verificationResult == null
                  ? "Fetching ..."
                  :verificationResult == -1
                  ? "Processing ..."
                  : verificationResult == true
                  ? "Success"
                  : "Unable to verify ID"}
              </Typography>
              <Grid container>
                <Grid item xs={12} md={10}>
                  <Typography variant="h2" className="verificationSuccess__description">
                    {userStatus==false?"You have not started identity verification process.":
                      verificationResult == -1
                      ? "We are currently procesing your documents.":
                      verificationResult == null
                      ? "We are fetching results for your request."
                      : verificationResult == true
                      ? "Your ID has been verified, you are now officially a LOS seller."
                      : " Sorry, unfortunately we could not verify your ID. Please try again. "}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <div className="verificationSuccess__list">
                    {checks
                      ? Object.keys(checks).map((checkName) => (
                          <div className="verificationSuccess__listRow">
                            <img
                              className="verificationSuccess__listIcon"
                              src={
                                checks[checkName]["value"] == "APPROVE"
                                  ? "/icons/greenCheck.svg"
                                  : "/icons/crossErrorYoti.svg"
                              }
                            />
                            <h2 className="verificationSuccess__liststep">
                              {checkName.replaceAll("_", " ")}{" "}
                              {checks[checkName]["reason"] ? (
                                <span className="fs-18">( {checks[checkName]["reason"].replaceAll("_", " ")} )</span>
                              ) : (
                                ""
                              )}
                            </h2>
                          </div>
                        ))
                      : ""}
                  </div>
                </Grid>
              </Grid>
              {userStatus==false?(
                <Button className="statrtVerification__btn" onClick={handleContinue}>
                  Start Now
                </Button>
              ):verificationResult == false ? (
                <Button className="statrtVerification__btn" onClick={handleContinue}>
                  Try Again
                </Button>
              ) : (
                ""
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
export default withApollo()(withCatalogItems(inject("routingStore", "uiStore")(VerificationSuccess)));
