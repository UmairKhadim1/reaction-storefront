import React, { useState } from "react";
import Layout from "../../components/Layout";
import { withApollo } from "lib/apollo/withApollo";
import { Grid, Typography, TextField, TextareaAutosize, Button } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import inject from "hocs/inject";
import withCatalogItems from "containers/catalog/withCatalogItems";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import { locales } from "translations/config";
const useStyles = makeStyles((theme) => ({}));
function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("New Contact Us Query");
  const [message, setMessage] = useState("");
  const [submitSuccess, setsubmitSuccess] = useState(false);
  const [submitFail, setsubmitFail] = useState(false);
  const [Errors, setError] = useState("");
  const dispatchMessage = () => {
    var data = `email=${email}&message=${message}&phone=${phone}&subject=${subject}&name=${name}`;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
      
        if(JSON.parse(this.responseText).status){
            setName();setEmail();setMessage();setPhone();setSubject(); setsubmitSuccess(true);
        }else
        {
            setsubmitFail(true);
        }
      }
    });
    
    // xhr.open("POST", "http://localhost:4100/contact-us");
     xhr.open("POST", `https://identity.landofsneakers.com/contact-us`);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xhr.send(data);

   
  };

  const contacUsHandler = () => {
 
    if (validate(name, phone, email, message,subject)) {

    
      dispatchMessage();

    } else {
      
    }
  };
  const validate = (name, phone, email, message,subject) => {
    let error = {};
    let isValid = true;
    if (!name) {
      isValid = false;

      error.name = "Name is required";
    } else {
      error.name = null;
    }

    if (!subject) {
      isValid = false;

      error.subject = "Subject is required";
    } else {
      error.subject = null;
    }
    if (!phone) {
      isValid = false;
      error.phone = "Phone is required";
    } else {
      error.phone = null;
    }

    if (!email) {
      isValid = false;
      error.email = "Email is required";
    } else if (!validateEmail(email)) {
      isValid = false;
      error.email = "Enter a valid email";
    } else {
      error.email = null;
    }

    if (!message) {
      isValid = false;
      error.message = "Message is required";
    } else {
      error.message = null;
    }
    setError(error);
    return isValid;
  };
  const _handleFieldChange = ({ key, value }) => {
    switch (key) {
      case "name":
        // code block
        setName(value);
        break;
      case "phone":
        // code block
        setPhone(value);
        break;
      case "email":
        // code block
        setEmail(value);
        break;
      case "subject":
        // code block
        setSubject(value);
        break;
      case "message":
        // code block
        setMessage(value);
        break;
      default:
      // code block
    }
  };
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
    // return true;
  };
  return (
    <Layout>
      <div className="ContainerContent__MainMaxWidth">
        <div className="contactus">
          <Grid container>
            <Grid xs={12} md={6}>
              <Grid container>
                <Grid item>
                  <Typography className="contactus__pagename" variant="h5" component="h2">
                    Contact Us
                  </Typography>
                  <Typography className="contactus__mainHeading" variant="h5" component="h2">
                    we are here for you! How can we help?
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <div className={"formRow"}>
                    <Typography variant="h6" className="contactus_inputLabel">
                      Name<span className="mark-rquired">*</span>
                    </Typography>
                    <TextField
                      className="contactus_inputinput"
                      placeholder="Please enter your name"
                      onChange={(event) => _handleFieldChange({ key: "name", value: event.target.value })}
                    />
                    <p className="mt-0">
                      {" "}
                      <small className="inline-error ml-15 ">{Errors.name} </small>
                    </p>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className={"formRow"}>
                    <Typography variant="h6" className="contactus_inputLabel">
                      Email<span className="mark-rquired">*</span>
                    </Typography>
                    <TextField
                      className="contactus_inputinput"
                      placeholder="Please enter your email"
                      onChange={(event) => _handleFieldChange({ key: "email", value: event.target.value })}
                    />
                    <p className="mt-0">
                      {" "}
                      <small className="inline-error ml-15 ">{Errors.email} </small>
                    </p>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className={"formRow"}>
                    <Typography variant="h6" className="contactus_inputLabel">
                      Phone<span className="mark-rquired">*</span>
                    </Typography>
                    <TextField
                      className="contactus_inputinput"
                      placeholder="Please enter your phone"
                      onChange={(event) => _handleFieldChange({ key: "phone", value: event.target.value })}
                    />
                    <p className="mt-0">
                      {" "}
                      <small className="inline-error ml-15 ">{Errors.phone} </small>
                    </p>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className={"formRow"}>
                    <Typography variant="h6" className="contactus_inputLabel">
                    Subject <span className="mark-rquired">*</span>
                       
                    </Typography>
                    <TextField
                      className="contactus_inputinput"
                      placeholder="Subject"
                      onChange={(event) => _handleFieldChange({ key: "subject", value: event.target.value })}
                    />
                    <p className="mt-0">
                    {" "}
                    <small className="inline-error ml-15 "> {Errors.subject}</small>
                  </p>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className={"formRow"}>
                    <Typography variant="h6" className="contactus_inputLabel">
                      Message <span className="mark-rquired">*</span>
                    </Typography>
                    <textarea
                      rows={10}
                      className="contactus_inputmessage mb-0"
                      aria-label="empty textarea"
                      placeholder="Enter your message here"
                      onChange={(event) => _handleFieldChange({ key: "message", value: event.target.value })}
                    />
                    <p className="mt-0">
                      {" "}
                      <small className="inline-error ml-15 mt-0 ">{Errors.message} </small>
                    </p>
                  </div>
                {submitSuccess&&
                    <React.Fragment>
                    <p className="mt-0 success-response">Your response has been sbmitted.</p>
                    </React.Fragment>}
                    {
                        submitFail&&
                        <p className="mt-0">
                        {" "}
                        <small className="inline-error ml-15 mt-0 ">We were unable to record your response at the moment, try later. </small>
                      </p>
                    }
                    <br/>
                </Grid>
                <Grid item xs={12} className="mb-center-flex">
                
                    
                    <React.Fragment>
                      <Button className="contactus__sendBtn" onClick={contacUsHandler} disabled={submitSuccess}>
                    Send Message
                  </Button>
                  </React.Fragment>
                
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="contactus__socialMediaContainer">
                {/*<div className="contactus__socialMediaRow">
                                   <span className="contactus__socialMediaIcon"><img src="/icons/phoneIcon.png"/></span>
                                   <Typography className="contactus__socialMediaIconLabel" variant="h5" component="h2">+42 554 434 4404</Typography>
    </div>*/}
                <div className="contactus__socialMediaRow">
                  <span className="contactus__socialMediaIcon">
                    <img src="/icons/mailIcon.png" />
                  </span>
                  <Typography className="contactus__socialMediaIconLabel" variant="h5" component="h2">
                    info@landofsneakers.com
                  </Typography>
                </div>
                <div className="contactus__socialMediaRow">
                  <span className="contactus__socialMediaIcon contactus__locationIcon">
                    <img src="/icons/locationIcon.png" />
                  </span>
                  <Typography className="contactus__socialMediaIconLabel" variant="h5" component="h2">
                    15 Upper Grosvenor Street London W1K 7PJ
                  </Typography>
                </div>
              </div>
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
export default withApollo()(withCatalogItems(inject("routingStore", "uiStore")(Contact)));
