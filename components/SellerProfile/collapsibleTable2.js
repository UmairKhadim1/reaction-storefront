import * as React from 'react';
import PropTypes from 'prop-types';
import { Box,Collapse,IconButton,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography,Paper} from "@material-ui/core"
import { format } from "date-fns";

import NewOrderDetail from "./OrderHistoryDetail";
function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const orderDate = format(
    row.createdAt,
    "MM/DD/YYYY"
  );
  const structStatus = (str) => {
     
    if(str == "coreOrderWorkflow/canceled" || str=="coreOrderWorkflow/processing"){
     let index = str.indexOf("/");
     let result = str.substr(index+1);
    
     return result;
    }
    return str;
}
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          {/* <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          > */}
          <div style={{color:"#D8213B",cursor:"pointer"}}  onClick={() => setOpen(!open)}>
            {open ? <span>Hide Details</span> : <span>Show Details</span>}
            </div>
          {/* </IconButton> */}
        </TableCell>
        <TableCell >{row.referenceId}</TableCell>
        <TableCell >{orderDate}</TableCell>
        <TableCell >{row.payments[0].status}</TableCell>
        <TableCell >{structStatus(row.status)}</TableCell>
        <TableCell >{row.account?row.account.name:row.email}</TableCell>
        <TableCell >{row.fulfillmentGroups[0].summary.total.displayAmount}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
               <NewOrderDetail data={row} />
            {/* <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box> */}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order ID</TableCell>
            <TableCell >Date</TableCell>
            <TableCell >Payment</TableCell>
            <TableCell >Fulfillment</TableCell>
            <TableCell >Customer</TableCell>
            <TableCell >Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         
          {props.items.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
