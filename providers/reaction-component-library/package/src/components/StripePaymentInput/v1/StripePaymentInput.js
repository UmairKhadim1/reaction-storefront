import React, { Component } from "react";
import PropTypes from "prop-types";
import { withComponents } from "@reactioncommerce/components-context";
import styled from "styled-components";
import { addTypographyStyles, CustomPropTypes } from "../../../utils";

const SecureCaption = styled.div`
  ${addTypographyStyles("StripePaymentInputCaption", "captionText")}
`;

const IconLockSpan = styled.span`
  display: inline-block;
  height: 20px;
  width: 20px;
`;

const Span = styled.span`
  vertical-align: super;
`;

class StripePaymentInput extends Component {
  state={}
  static propTypes = {
    /**
     * You can provide a `className` prop that will be applied to the outermost DOM element
     * rendered by this component. We do not recommend using this for styling purposes, but
     * it can be useful as a selector in some situations.
     */
    className: PropTypes.string,
    /**
     * If you've set up a components context using
     * [@reactioncommerce/components-context](https://github.com/reactioncommerce/components-context)
     * (recommended), then this prop will come from there automatically. If you have not
     * set up a components context or you want to override one of the components in a
     * single spot, you can pass in the components prop directly.
     */
    components: PropTypes.shape({
      /**
       * Secured lock icon
       */
      iconLock: PropTypes.node,
      /**
       * Pass either the Reaction StripeForm component or your own component that
       * accepts compatible props.
       */
      StripeForm: CustomPropTypes.component.isRequired
    }),
    /**
     * Pass true while the input data is in the process of being saved.
     * While true, the form fields are disabled.
     */
    isSaving: PropTypes.bool,
    /**
     * When this action's input data switches between being
     * ready for saving and not ready for saving, this will
     * be called with `true` (ready) or `false`
     */
    onReadyForSaveChange: PropTypes.func,
    /**
     * Called with an object value when this component's `submit`
     * method is called. The object may have `data`, `displayName`,
     * and `amount` properties.
     */
    onSubmit: PropTypes.func,
    /**
    * The text for the "Your Information is private and secure." caption text.
    */
    secureCaptionText: PropTypes.string
  };

  static defaultProps = {
    onReadyForSaveChange() {},
    onSubmit() {},
    secureCaptionText: "Your Information is private and secure."
  };

  componentDidMount() {
    const { onReadyForSaveChange } = this.props;
    onReadyForSaveChange(false);
  }

  async submit() {
    const { onSubmit } = this.props;
    const { token } = await this._stripe.createToken();
if(token){
    await onSubmit({
      displayName: `${token.card.brand} ending in ${token.card.last4}`,
      data: {
        stripeTokenId: token.id
      }
    });
    this.setState({stripeError:false})

  }else{
    this.setState({stripeError:true})
  }
  }

  handleChangeReadyState = (isReady) => {
    const { onReadyForSaveChange } = this.props;
    if (isReady !== this.lastIsReady) {
      onReadyForSaveChange(isReady);
    }
    this.lastIsReady = isReady;
  }

  render() {
    const { className, components: { iconLock, StripeForm }, secureCaptionText } = this.props;
    const { stripeError} = this.state;

    return (
      <div className={className}>
      {stripeError ?<p className="mt-5-stripe">
      {" "}
      <small className="inline-error ml-15 ">Enter correct payment details </small>
    </p>:""}
        <StripeForm
          isComplete={this.handleChangeReadyState}
          stripeRef={(stripe) => { this._stripe = stripe; }}
        />
        <SecureCaption>
          <IconLockSpan>{iconLock}</IconLockSpan> <Span>{secureCaptionText}</Span>
        </SecureCaption>
      </div>
    );
  }
}

export default withComponents(StripePaymentInput);
