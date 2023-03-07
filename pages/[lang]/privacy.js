import React from 'react'
import Layout from "../../components/Layout";
import { withApollo } from "lib/apollo/withApollo";
import { Grid, Typography } from "@material-ui/core";
import inject from "hocs/inject";
import withCatalogItems from "containers/catalog/withCatalogItems";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import { locales } from "translations/config";
function Privacy() {
    return (
        <Layout>
            <div className="ContainerContent__MainMaxWidth">
                <div className="privacyPolicy">
                    <Grid container>
                        <Grid item>
                            <Typography className="privacyPolicy__pagename" variant="h5" component="h2">Privacy Policy</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography className="privacyPolicy__contentTitle" variant="h5" component="h2">1. What Information do we collect?</Typography>
                            <div className="privacyPolicy__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="privacyPolicy__content privacyPolicy__content1">
                                    Personal information you disclose to us
                                </Typography>
                            </div>
                            <div className="privacyPolicy__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="privacyPolicy__content privacyPolicy__content1">
                                    In Short: We collect personal information that you provide to us.
                                </Typography>
                            </div>
                            <div className="privacyPolicy__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="privacyPolicy__content privacyPolicy__content1">
                                    We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services or otherwise when you contact us.
                                </Typography>
                            </div>
                            <div className="privacyPolicy__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="privacyPolicy__content privacyPolicy__content1">
                                    The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make and the products and features you use. The personal information we collect may include the following:
                                </Typography>
                            </div>
                            <div className="privacyPolicy__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="privacyPolicy__content privacyPolicy__content1">
                                    Personal Information Provided by You. We collect names; phone numbers; email addresses; mailing addresses; usernames; passwords; contact preferences; contact or authentication data; billing addresses; debit/credit card numbers; and other similar information.
                                </Typography>
                            </div>
                            <div className="privacyPolicy__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="privacyPolicy__content privacyPolicy__content1">
                                    Payment Data. We may collect data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument. All payment data is stored by Stripe. You may find their privacy notice link(s) here: https://stripe.com/gb/privacy.
                                </Typography>
                            </div>
                            <div className="privacyPolicy__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="privacyPolicy__content privacyPolicy__content1">
                                    Social Media Login Data. We may provide you with the option to register with us using your existing social media account details, like your Facebook, Twitter or other social media account. If you choose to register in this way, we will collect the information described in the section called "HOW DO WE HANDLE YOUR SOCIAL LOGINS?" below.
                                </Typography>
                            </div>
                            <div className="privacyPolicy__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="privacyPolicy__content privacyPolicy__content1">
                                    All personal information that you provide to us must be true, complete and accurate, and you must notify us of any changes to such personal information.
                                </Typography>
                            </div>
                            <div className="privacyPolicy__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="privacyPolicy__content privacyPolicy__content1">
                                    Information automatically collected
                                </Typography>
                            </div>
                            <div className="privacyPolicy__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="privacyPolicy__content privacyPolicy__content1">
                                    In Short: Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.
                                </Typography>
                            </div>
                            <div className="privacyPolicy__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="privacyPolicy__content privacyPolicy__content1">
                                    We automatically collect certain information when you visit, use or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.
                                </Typography>
                            </div>
                            <div className="privacyPolicy__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="privacyPolicy__content privacyPolicy__content1">
                                    Like many businesses, we also collect information through cookies and similar technologies.
                                </Typography>
                            </div>
                            <div className="privacyPolicy__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="privacyPolicy__content privacyPolicy__content1">
                                    The information we collect includes:
                                </Typography>
                            </div>
                            <div className="privacyPolicy__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="privacyPolicy__content privacyPolicy__content1">
                                    Log and Usage Data. Log and usage data is service-related, diagnostic, usage and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called 'crash dumps') and hardware settings).
                                </Typography>
                                <Typography xs={12} variant="h5" component="p" className="privacyPolicy__content privacyPolicy__content1">
                                    Device Data. We collect device data such as information about your computer, phone, tablet or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model Internet service provider and/or mobile carrier, operating system and system configuration information.
                                </Typography>

                                <Typography xs={12} variant="h5" component="p" className="privacyPolicy__content privacyPolicy__content1">
                                    Location Data. We collect location data such as information about your device's location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. Note however, if you choose to opt out, you may not be able to use certain aspects of the Services.
                                </Typography>
                            </div>
                            <div className="privacyPolicy__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="privacyPolicy__content privacyPolicy__content1">
                                    Information collected through our App
                                </Typography>
                            </div>
                            <div className="privacyPolicy__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="privacyPolicy__content privacyPolicy__content1">
                                    In Short:  We collect information regarding your geolocation, mobile device, push notifications, when you use our App.
                                </Typography>
                            </div>
                            <div className="privacyPolicy__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="privacyPolicy__content privacyPolicy__content1">
                                    If you use our App, we also collect the following information:
                                </Typography>
                                <Typography xs={12} variant="h5" component="p" className="privacyPolicy__content privacyPolicy__content1">
                                    Geolocation Information. We may request access or permission to and track location-based information from your mobile device, either continuously or while you are using our App, to provide certain location-based services. If you wish to change our access or permissions, you may do so in your device's settings.
                                </Typography>
                                <Typography xs={12} variant="h5" component="p" className="privacyPolicy__content privacyPolicy__content1">
                                    Mobile Device Access. We may request access or permission to certain features from your mobile device, including your mobile device's storage, social media accounts, sms messages, sensors, reminders, microphone, contacts, camera, calendar, bluetooth, and other features. If you wish to change our access or permissions, you may do so in your device's settings.
                                </Typography>
                                <Typography xs={12} variant="h5" component="p" className="privacyPolicy__content privacyPolicy__content1">
                                    Mobile Device Data. We automatically collect device information (such as your mobile device ID, model and manufacturer), operating system, version information and system configuration information, device and application identification numbers, browser type and version, hardware model Internet service provider and/or mobile carrier, and Internet Protocol (IP) address (or proxy server). If you are using our App, we may also collect information about the phone network associated with your mobile device, your mobile device’s operating system or platform, the type of mobile device you use, your mobile device’s unique device ID and information about the features of our App you accessed.
                                </Typography>
                                <Typography xs={12} variant="h5" component="p" className="privacyPolicy__content privacyPolicy__content1">
                                    Push Notifications. We may request to send you push notifications regarding your account or certain features of the App. If you wish to opt-out from receiving these types of communications, you may turn them off in your device's settings.
                                </Typography>
                                <Typography xs={12} variant="h5" component="p" className="privacyPolicy__content privacyPolicy__content1">
                                    This information is primarily needed to maintain the security and operation of our App, for troubleshooting and for our internal analytics and reporting purposes.
                                </Typography>
                            </div>
                            <div className="privacyPolicy__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="privacyPolicy__content privacyPolicy__content1">
                                    Information collected from other sources
                                </Typography>
                                <Typography xs={12} variant="h5" component="p" className="privacyPolicy__content privacyPolicy__content1">
                                    In Short:  We may collect limited data from public databases, marketing partners, social media platforms, and other outside sources.
                                </Typography>
                                <Typography xs={12} variant="h5" component="p" className="privacyPolicy__content privacyPolicy__content1">
                                    In order to enhance our ability to provide relevant marketing, offers and services to you and update our records, we may obtain information about you from other sources, such as public databases, joint marketing partners, affiliate programs, data providers, social media platforms, as well as from other third parties. This information includes mailing addresses, job titles, email addresses, phone numbers, intent data (or user behavior data), Internet Protocol (IP) addresses, social media profiles, social media URLs and custom profiles, for purposes of targeted advertising and event promotion. If you interact with us on a social media platform using your social media account (e.g. Facebook or Twitter), we receive personal information about you such as your name, email address, and gender. Any personal information that we collect from your social media account depends on your social media account's privacy settings.
                                </Typography>
                            </div>
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
export default withApollo()(withCatalogItems(inject("routingStore", "uiStore")(Privacy)));