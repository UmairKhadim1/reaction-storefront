import React from 'react'
import AccordionItem from './AccordianItem';
class Accordion extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="accordion">
                {this.props.hiddenTexts.map((hiddenText) => <AccordionItem key={hiddenText.label} hiddenText={hiddenText} />)}
            </div>
        );
    }
}
export default Accordion;

