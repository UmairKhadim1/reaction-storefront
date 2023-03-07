import React from 'react'
import Layout from "../../components/Layout";
import { withApollo } from "lib/apollo/withApollo";
import { Grid, Typography } from "@material-ui/core";
import inject from "hocs/inject";
import withCatalogItems from "containers/catalog/withCatalogItems";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import { locales } from "translations/config";
function Terms() {
    return (
        <Layout>
            <div className="ContainerContent__MainMaxWidth">
                <div className="terms">
                    <Grid container>
                        <Grid item>
                            <Typography className="terms__pagename" variant="h5" component="h2">Terms of use</Typography>

                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography className="terms__contentTitle" variant="h5" component="h2">Agreement to terms</Typography>
                            <div className="terms__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                    These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and LAND OF SNEAKERS LTD ("Company", “we”, “us”, or “our”), concerning your access to and use of the http://landofsneakers.com website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”). The Site provides an online marketplace for the following goods, products, and/or services: Sneakers, Clothing and accessories (the “Marketplace Offerings”). In order to help make the Site a secure environment for the purchase and sale of Marketplace Offerings, all users are required to accept and comply with these Terms of Use. You agree that by accessing the Site and/or the Marketplace Offerings, you have read, understood, and agree to be bound by all of these Terms of Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND/OR THE MARKETPLACE OFFERINGS AND YOU MUST DISCONTINUE USE IMMEDIATELY.
                                </Typography>
                            </div>
                            <div className="terms__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                    DISCONTINUE USE IMMEDIATELY. Supplemental terms and conditions or documents that may be posted on the Site from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Use at any time and for any reason. We will alert you about any changes by updating the “Last updated” date of these Terms of Use, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Terms of Use to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms of Use by your continued use of the Site after the date such revised Terms of Use are posted.
                                </Typography>
                            </div>
                            <div className="terms__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                    The information provided on the Site is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Site from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
                                </Typography>
                            </div>
                            <div className="terms__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                    The Site is intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Site or use the Marketplace Offerings.
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography className="terms__contentTitle" variant="h5" component="h2">Intellectual property rights</Typography>
                            <div className="terms__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                    Unless otherwise indicated, the Site and the Marketplace Offerings are our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, international copyright laws, and international conventions. The Content and the Marks are provided on the Site “AS IS” for your information and personal use only. Except as expressly provided in these Terms of Use, no part of the Site or the Marketplace Offerings and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
                                </Typography>
                            </div>
                            <div className="terms__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                    Provided that you are eligible to use the Site, you are granted a limited license to access and use the Site and to download or print a copy of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use. We reserve all rights not expressly granted to you in and to the Site, the Content and the Marks.
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography className="terms__contentTitle" variant="h5" component="h2">User Representations</Typography>
                            <div className="terms__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                    By using the Site or the Marketplace Offerings, you represent and warrant that:(1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Use; (4) you are not a minor in the jurisdiction in which you reside; (5) you will not access the Site or the Marketplace Offerings through automated or non-human means, whether through a bot, script or otherwise; (6) you will not use the Site for any illegal or unauthorized purpose; and (7) your use of the Site or the Marketplace Offerings will not violate any applicable law or regulation.
                                </Typography>
                            </div>
                            <div className="terms__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                    If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Site (or any portion thereof).
                                </Typography>
                            </div>
                            <div className="terms__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                    You may not use the Site or the Marketplace Offerings for any illegal or unauthorized purpose nor may you, in the use of Marketplace Offerings, violate any laws. Among unauthorized Marketplace Offerings are the following: intoxicants of any sort; illegal drugs or other illegal products; alcoholic beverages; games of chance; and pornography or graphic adult content, images, or other adult products. Postings of any unauthorized products or content may result in immediate termination of your account and a lifetime ban from use of the Site.
                                </Typography>
                            </div>
                            <div className="terms__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                    We are a service provider and make no representations as to the safety, effectiveness, adequacy, accuracy, availability, prices, ratings, reviews, or legality of any of the information contained on the Site or the Marketplace Offerings displayed or offered through the Site. You understand and agree that the content of the Site does not contain or constitute representations to be reasonably relied upon, and you agree to hold us harmless from any errors, omissions, or misrepresentations contained within the Site’s content. We do not endorse or recommend any Marketplace Offerings and the Site is provided for informational and advertising purposes only.
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography className="terms__contentTitle" variant="h5" component="h2">User Registration</Typography>
                            <div className="terms__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                    You may be required to register with the Site in order to access the Marketplace Offerings. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography className="terms__contentTitle" variant="h5" component="h2">Marketplace offerings</Typography>
                            <div className="terms__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                    We make every effort to display as accurately as possible the colors, features, specifications, and details of the Marketplace Offerings available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the Marketplace Offerings will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately reflect the actual colors and details of the products. All Marketplace Offerings are subject to availability, and we cannot guarantee that Marketplace Offerings will be in stock. Certain Marketplace Offerings may be available exclusively online through the Site. Such Marketplace Offerings may have limited quantities and are subject to return or exchange only according to our Return Policy.
                                </Typography>
                            </div>
                            <div className="terms__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                    We reserve the right to limit the quantities of the Marketplace Offerings offered or available on the Site. All descriptions or pricing of the Marketplace Offerings are subject to change at any time without notice, at our sole discretion. We reserve the right to discontinue any Marketplace Offerings at any time for any reason. We do not warrant that the quality of any of the Marketplace Offerings purchased by you will meet your expectations or that any errors in the Site will be corrected.
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography className="terms__contentTitle" variant="h5" component="h2">Purchases and Payment</Typography>
                            <div className="terms__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                    We accept the following forms of payment:
                                </Typography>
                            </div>
                            <div className="terms__contentContainer terms__contentList">
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                    -  Visa
                                </Typography>
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                    -  Mastercard
                                </Typography>
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                    -  American Express
                                </Typography>
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                    -  Discover
                                </Typography>
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                    -  PayPal
                                </Typography>
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                    -  Stripe
                                </Typography>
                            </div>
                            <div className="terms__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                    You agree to provide current, complete, and accurate purchase and account information for all purchases of the Marketplace Offerings made via the Site. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed. Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in Pound sterling.
                                </Typography>
                            </div>
                            <div className="terms__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                    You agree to pay all charges at the prices then in effect for your purchases and any applicable shipping fees, and you authorize us to charge your chosen payment provider for any such amounts upon placing your order. If your order is subject to recurring charges, then you consent to our charging your payment method on a recurring basis without requiring your prior approval for each recurring charge, until such time as you cancel the applicable order. We reserve the right to correct any errors or mistakes in pricing, even if we have already requested or received payment.
                                </Typography>
                            </div>
                            <div className="terms__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                    We reserve the right to refuse any order placed through the Site. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. These restrictions may include orders placed by or under the same customer account, the same payment method, and/or orders that use the same billing or shipping address. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers, or distributors.
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography className="terms__contentTitle" variant="h5" component="h2">RETURN POLICY</Typography>
                            <div className="terms__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                    Please review our Return Policy posted on the Site prior to making any purchases.
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography className="terms__contentTitle" variant="h5" component="h2">PROHIBITED ACTIVITIES</Typography>
                            <div className="terms__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                    You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                                </Typography>
                            </div>
                            <div className="terms__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                    As a user of the Site, you agree not to:
                                </Typography>
                            </div>
                            <div className="terms__contentContainer ">
                                <ol className="terms__contentMainPoint">
                                    <li className="terms__content terms__content1">  Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                                    <li className="terms__content terms__content1">  Make any unauthorized use of the Marketplace Offerings, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.</li>
                                    <li className="terms__content terms__content1">  Use a buying agent or purchasing agent to make purchases on the Site.</li>
                                    <li className="terms__content terms__content1">  Circumvent, disable, or otherwise interfere with security-related features of the Site, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Site and/or the Content contained therein.</li>
                                    <li className="terms__content terms__content1">  Engage in unauthorized framing of or linking to the Site.</li>
                                    <li className="terms__content terms__content1">  Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
                                    <li className="terms__content terms__content1">  Make improper use of our support services or submit false reports of abuse or misconduct.</li>
                                    <li className="terms__content terms__content1">  Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
                                    <li className="terms__content terms__content1">  Interfere with, disrupt, or create an undue burden on the Site or the networks or services connected to the Site.</li>
                                    <li className="terms__content terms__content1">  Attempt to impersonate another user or person or use the username of another user.</li>
                                    <li className="terms__content terms__content1">  Sell or otherwise transfer your profile.</li>
                                    <li className="terms__content terms__content1">  Use any information obtained from the Site in order to harass, abuse, or harm another person.</li>
                                    <li className="terms__content terms__content1">  Use the Marketplace Offerings as part of any effort to compete with us or otherwise use the Site and/or the Content for any revenue-generating endeavor or commercial enterprise.</li>
                                    <li className="terms__content terms__content1">  Decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Site.</li>
                                    <li className="terms__content terms__content1">  Attempt to bypass any measures of the Site designed to prevent or restrict access to the Site, or any portion of the Site.</li>
                                    <li className="terms__content terms__content1">  Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Marketplace Offerings to you.</li>
                                    <li className="terms__content terms__content1">  Delete the copyright or other proprietary rights notice from any Content.</li>
                                    <li className="terms__content terms__content1">  Copy or adapt the Site’s software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.</li>
                                    <li className="terms__content terms__content1">  Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party’s uninterrupted use and enjoyment of the Site or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Marketplace Offerings.</li>
                                    <li className="terms__content terms__content1">  Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats (“gifs”), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as “spyware” or “passive collection mechanisms” or “pcms”).</li>
                                    <li className="terms__content terms__content1"> Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Site, or using or launching any unauthorized script or other software.</li>
                                    <li className="terms__content terms__content1">  Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Site.</li>
                                    <li className="terms__content terms__content1">  Use the Site in a manner inconsistent with any applicable laws or regulations.</li>
                                </ol>

                            </div>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography className="terms__contentTitle" variant="h5" component="h2">Guidelines for reviews</Typography>
                            <div className="terms__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                We may provide you areas on the Site to leave reviews or ratings. When posting a review, you must comply with the following criteria: (1) you should have firsthand experience with the person/entity being reviewed; (2) your reviews should not contain offensive profanity, or abusive, racist, offensive, or hate language; (3) your reviews should not contain discriminatory references based on religion, race, gender, national origin, age, marital status, sexual orientation, or disability; (4) your reviews should not contain references to illegal activity; (5) you should not be affiliated with competitors if posting negative reviews; (6) you should not make any conclusions as to the legality of conduct; (7) you may not post any false or misleading statements; and (8) you may not organize a campaign encouraging others to post reviews, whether positive or negative. 
                                </Typography>
                            </div>
                            <div className="terms__contentContainer">
                                <Typography xs={12} variant="h5" component="p" className="terms__content terms__content1">
                                We may accept, reject, or remove reviews in our sole discretion. We have absolutely no obligation to screen reviews or to delete reviews, even if anyone considers reviews objectionable or inaccurate. Reviews are not endorsed by us, and do not necessarily represent our opinions or the views of any of our affiliates or partners. We do not assume liability for any review or for any claims, liabilities, or losses resulting from any review. By posting a review, you hereby grant to us a perpetual, non-exclusive, worldwide, royalty-free, fully-paid, assignable, and sublicensable right and license to reproduce, modify, translate, transmit by any means, display, perform, and/or distribute all content relating to reviews.
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
export default withApollo()(withCatalogItems(inject("routingStore", "uiStore")(Terms)));