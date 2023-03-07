import React, { Component } from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import { withStyles } from "@material-ui/core/styles";
const styles = (theme) => ({
    navbar:{
        marginLeft:"auto"
    }
})

import  CustomNavigationItem  from "./CustomNavigationItem";

class CustomNavigation extends Component {
  static propTypes = {
    classes: PropTypes.object,
    navItems: PropTypes.object
  };
  
  static defaultProps = {
    classes: {},
    navItems: {}
  };

  renderNavItem(navItem, index) {
    return <CustomNavigationItem key={index} navItem={navItem} />;
  }
  
  render() {
    const { navItems, classes } = this.props;

    // if (navItems && navItems.items) {
      return <nav className = {classes.navbar}>{[1].map(this.renderNavItem)}</nav>;
    // }

    // If navItems.items aren't available, skip rendering of navigation
    return null;
  }
}

export default withStyles(styles)(inject("navItems")(CustomNavigation));
