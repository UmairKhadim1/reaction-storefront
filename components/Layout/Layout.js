import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Header from "components/Header";
import Footer from "components/Footer";
import {Container} from "@material-ui/core";
import Head from "next/head";
const styles = (theme) => ({
  root: {
    minHeight: "100vh"
  },
  main: {
    flex: "1 1 auto",
    maxWidth: theme.layout.mainContentMaxWidth,
    marginLeft: "auto",
    marginRight: "auto",
  },
  article: {
    // padding: theme.spacing(3,0)
  }
});

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired
    }),
    viewer: PropTypes.object
  };

  static defaultProps = {
    classes: {}
  };

  render() {
    const { classes, children, shop, viewer } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <Header shop={shop} viewer={viewer} />
          <main className={classes.main}>
          {/*  */}
            <Container maxWidth="xl" className="LayoutContainer__MainMaxWidth">
            <article className={classes.article}>{children}</article>
            </Container>
          </main>
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Layout);
