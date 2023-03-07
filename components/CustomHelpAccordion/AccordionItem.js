import React from "react";

class AccordionItem extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
        this.state = {
            visibility: false
        }
    }
    
    handleToggleVisibility() {
        this.setState((prevState) => {
            return {
                visibility: !prevState.visibility,
            }
        })
    }
    render() {
        const activeStatus = this.state.visibility ? 'active' : ''

        return (
            <div>
                <button className="accordion__button faq__question" style={{borderBottom:`${this.state.visibility == true?"1px solid white":"1px solid #B8B8B8"}`}} onClick={this.handleToggleVisibility}>{this.props.hiddenText.label}<span>{this.state.visibility? <img className="helpAccordion__arrowUp" src="/icons/arrowUp.png" />: <img src="/icons/arrowRight.png" />}</span></button>
                <p className={`accordion__content ${activeStatus} faq__answer`}>
                {
                    this.props.hiddenText.value
                }
                </p>
                
            </div>
        );
    }
}
export default AccordionItem;