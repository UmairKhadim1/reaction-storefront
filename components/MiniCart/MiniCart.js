import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import { withStyles } from "@material-ui/core/styles";
import MiniCartComponent from "@reactioncommerce/components/MiniCart/v1";
import CartItems from "components/CartItems";
import CartEmptyMessage from "@reactioncommerce/components/CartEmptyMessage/v1";
import IconButton from "@material-ui/core/IconButton";
import CartIcon from "mdi-material-ui/Cart";
import Router from "translations/i18nRouter";
import Badge from "@material-ui/core/Badge";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import withCart from "containers/cart/withCart";
import CustomMiniCart from "./CustomMiniCart";
const styles = ({ palette, zIndex }) => ({
  popper: {
    marginTop: "0.5rem",
    marginRight: "1rem",
    zIndex: zIndex.modal,
  },
  cart: {
    backgroundColor: palette.common.white,
  },
  emptyCart: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 360,
    height: 320,
    border: palette.borders.default,
  },
  badge: {
    width: 20,
    height: 20,
    top: -5,
    left: 7,
    backgroundColor: "#D8213B !important",
  },
  cart__basket: {
    width: "40px",
    height: "40px",
    marginLeft: "18px",
    marginRight: "10px",
    backgroundColor: "#F0F0F0",
    backdropFilter: " blur(20px)",
    "&:hover": {
      backgroundColor: "#D8213B",
      color: "#FFFFFF",
    },
  },
});

class MiniCart extends Component {
  static propTypes = {
    cart: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.object),
      checkout: PropTypes.shape({
        itemTotal: PropTypes.shape({
          displayAmount: PropTypes.string,
        }),
        taxTotal: PropTypes.shape({
          displayAmount: PropTypes.string,
        }),
      }),
    }),
    classes: PropTypes.object.isRequired,
    hasMoreCartItems: PropTypes.bool,
    loadMoreCartItems: PropTypes.func,
    onChangeCartItemsQuantity: PropTypes.func,
    onRemoveCartItems: PropTypes.func,
    uiStore: PropTypes.shape({
      isCartOpen: PropTypes.bool.isRequired,
      openCart: PropTypes.func.isRequired,
      closeCart: PropTypes.func.isRequired,
    }),
  };

  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.setPopoverAnchorEl = (element) => {
      this.anchorElement = element;
    };
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  handleClickOutside(event) {
    try {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        this.setState({poperShow:false})
        const { closeCart } = this.props.uiStore;
        closeCart();
      }
    } catch (err) {
     
    }
  }
  state = {
    anchorElement: null,
    poperShow:false
  };

  anchorElement = null;

  handlePopperOpen = () => {
    this.setState({poperShow:true})

    const {
      uiStore: { openCart },
    } = this.props;
    openCart();
  };

  handleClick = () => Router.push("/");

  handleCheckoutButtonClick = () => {
    const { closeCart } = this.props.uiStore;
    closeCart();
    Router.push("/cart/checkout");
  };

  handlePopperClose = () => {
    const { closeCart } = this.props.uiStore;
    closeCart(0);
  };

  handleEnterPopper = () => {
    // const { openCart } = this.props.uiStore;
    // openCart();
  };
  handleLeavePopper = () => {};

  handleOnClick = () => {
    // const { closeCart } = this.props.uiStore;
    // closeCart();
    // Router.push("/cart");
    this.setState({poperShow:true})

    const { openCart } = this.props.uiStore;
    openCart();
  };

  handleItemQuantityChange = (quantity, cartItemId) => {
    const { onChangeCartItemsQuantity } = this.props;

    onChangeCartItemsQuantity({ quantity, cartItemId });
  };

  handleRemoveItem = async (itemId) => {
    const { onRemoveCartItems } = this.props;
    await onRemoveCartItems(itemId);
  };

  renderMiniCart() {
    const { cart, classes, hasMoreCartItems, loadMoreCartItems } = this.props;

    if (cart && Array.isArray(cart.items) && cart.items.length) {
      return (
        <CustomMiniCart
          cart={cart}
          hasMoreCartItems={hasMoreCartItems}
          onRemoveItemFromCart={this.handleRemoveItem}
          onChangeCartItemQuantity={this.handleItemQuantityChange}
          onLoadMoreCartItems={loadMoreCartItems}
          onCheckoutButtonClick={this.handleCheckoutButtonClick}
        />
        // <MiniCartComponent

        //   cart={cart}
        //   onCheckoutButtonClick={this.handleCheckoutButtonClick}
        //   components={{
        //     QuantityInput: "div",
        //     CartItems: (cartItemProps) => (
        //       <CartItems
        //         {...cartItemProps}
        //         hasMoreCartItems={hasMoreCartItems}
        //         onRemoveItemFromCart={this.handleRemoveItem}
        //         onChangeCartItemQuantity={this.handleItemQuantityChange}
        //         onLoadMoreCartItems={loadMoreCartItems}
        //       />
        //     )
        //   }}
        // />
      );
    }

    return (
      <div className={classes.emptyCart}>
        <div>
          <CartEmptyMessage onClick={this.handleClick} />
        </div>
      </div>
    );
  }

  render() {
    const { cart, classes, uiStore } = this.props;
    const { isCartOpen } = uiStore;
    const id = isCartOpen ? "simple-popper" : null;
    return (
      <Fragment>
        <div ref={this.setPopoverAnchorEl}>
          <IconButton
            color="inherit"
            // onMouseEnter={this.handlePopperOpen}
            // onMouseLeave={this.handlePopperClose}
            onClick={this.handleOnClick}
            className={classes.cart__basket}
          >
            {cart && cart.totalItemQuantity > 0 ? (
              <Badge badgeContent={cart.totalItemQuantity} color="primary" classes={{ badge: classes.badge }}>
                <img className="minicart__basketIcon" src="/icons/basket.svg" />
                {/* <CartIcon className="minicart__basketIcon" /> */}
              </Badge>
            ) : (
              <img className="minicart__basketIcon" src="/icons/basket.svg" />
            )}
          </IconButton>
        </div>
        {
          // this.state.poperShow && 
          (
          <Popper
            ref={this.setWrapperRef}
            className={classes.popper+ " cart-box-custom"}
            id={id}
            open={isCartOpen}
            // open={true}
            anchorEl={this.anchorElement}
            onMouseEnter={this.handleEnterPopper}
            onMouseLeave={this.handleLeavePopper}
          >
            <div className={classes.cart}>{this.renderMiniCart()}</div>
          </Popper>
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles, { name: "SkMiniCart" })(withCart(inject("uiStore")(MiniCart)));
