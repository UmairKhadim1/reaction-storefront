import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';

export default function OppositeContentTimeline() {
    return (
        <React.Fragment>
            <div className="timeline">
                <Timeline className="timeline__lists" align="alternate">
                    <TimelineItem>
                        <TimelineOppositeContent>
                            <Typography className="timeline__time" color="textSecondary">12 may 2021 10:32 pm</Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            {/* <TimelineDot > */}
                            <img className="timeline__icon" src="/icons/tickIcon.png" />
                            {/* </TimelineDot> */}
                            <TimelineConnector className="timeline__connector" />
                        </TimelineSeparator>
                        <TimelineContent>
                        <div className="timeline__contentContainer">
                               <div className="timeline__contentBox">
                                    <Typography className="timeline__contentStepNo" varient="h5" component="h2">Step 1</Typography>
                                    <Typography className="timeline__contentTitle" varient="h5" component="h2">Order Processed</Typography>
                               </div>
                               <img className="timeline__contentStepIcon" src= "/icons/trackingProcessed.svg"/>
                            </div>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineOppositeContent>
                            <Typography className="timeline__time" color="textSecondary">12 may 2021 10:32 pm</Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            {/* <TimelineDot > */}
                            <img className="timeline__icon" src="/icons/tickIcon.png" />
                            {/* </TimelineDot> */}
                            <TimelineConnector className="timeline__connector" />
                        </TimelineSeparator>
                        <TimelineContent>
                            <div className="timeline__contentContainer">
                               <div className="timeline__contentBox">
                                    <Typography className="timeline__contentStepNo" varient="h5" component="h2">Step 2</Typography>
                                    <Typography className="timeline__contentTitle" varient="h5" component="h2">Order Shipped</Typography>
                               </div>
                               <img className="timeline__contentStepIcon" src= "/icons/trackingShipped.svg"/>
                            </div>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineOppositeContent>
                            <Typography className="timeline__time" color="textSecondary">12 may 2021 10:32 pm</Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            {/* <TimelineDot > */}
                            <img className="timeline__icon" src="/icons/tickIcon.png" />
                            {/* </TimelineDot> */}
                            <TimelineConnector className="timeline__connector" />
                        </TimelineSeparator>
                        <TimelineContent>
                            <div className="timeline__contentContainer">
                               <div className="timeline__contentBox">
                                    <Typography className="timeline__contentStepNo" varient="h5" component="h2">Step 3</Typography>
                                    <Typography className="timeline__contentTitle" varient="h5" component="h2">Order En Route</Typography>
                               </div>
                               <img className="timeline__contentStepIcon" src= "/icons/trackingEnRoute.svg"/>
                            </div>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineOppositeContent>
                            <Typography className="timeline__time" color="textSecondary">12 may 2021 10:32 pm</Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            {/* <TimelineDot > */}
                            <img className="timeline__icon" src="/icons/tickIcon.png" />
                            {/* </TimelineDot> */}
                            <TimelineConnector className="timeline__connector" />
                        </TimelineSeparator>
                        <TimelineContent>
                            <div className="timeline__contentContainer">
                               <div className="timeline__contentBox">
                                    <Typography className="timeline__contentStepNo" varient="h5" component="h2">Step 4</Typography>
                                    <Typography className="timeline__contentTitle" varient="h5" component="h2">Order Arrived</Typography>
                               </div>
                               <img className="timeline__contentStepIcon" src= "/icons/trackingArrived.svg"/>
                            </div>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </div>
        </React.Fragment>
    );
}