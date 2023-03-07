import NextApp from "next/app";
import React from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ContextProviders } from "context/ContextProviders";
import { ComponentsProvider } from "@reactioncommerce/components-context";
import components from "custom/componentsContext";
import theme from "custom/reactionTheme";
 import 'react-phone-number-input/style.css';
 import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/thumbs/thumbs.min.css"
import 'rc-slider/assets/index.css';
//  import "react-responsive-carousel/lib/styles/carousel.min.css";
//  import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
//  import "../Assets/style/globallStyle.css";
import "../Assets/style/custom.css";
 import "../Assets/style/customNevigationItem.css";
 import "../Assets/style/Footer.css";
 import "../Assets/style/forgotPasswordModal.css";
 import "../Assets/style/Header.css";
 import "../Assets/style/HomePage.css";
 import "../Assets/style/Layout.css";
 import "../Assets/style/LoginModal.css";
 import "../Assets/style/productDetail.css";
 import "../Assets/style/ResetPasswordModal.css";
 import "../Assets/style/SignupModal.css";
 import "../Assets/style/verificationModal.css";
 import "../Assets/style/customLoader.css";
 import "../Assets/style/collection.css";
 import "../Assets/style/variantDetail.css";
 import "../Assets/style/Cart.css";
 import "../Assets/style/CustomCartItem.css";
 import "../Assets/style/checkout.css";
 import "../Assets/style/checkoutLogin.css";
 import "../Assets/style/AllProducts.css"
 import "../public/font/MyFontsWebfontsKit.css";
 import 'react-toastify/dist/ReactToastify.css';
export default class App extends NextApp {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, ...rest } = this.props;

    return (
      <ContextProviders pageProps={pageProps}>
        <ComponentsProvider value={components}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...rest} {...pageProps} />
          </MuiThemeProvider>
        </ComponentsProvider>
      </ContextProviders>
    );
  }
}
