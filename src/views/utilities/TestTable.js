import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useState } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CustomizedTables({ patientRecordState }) {
  const [tableFile, setTableFile] = useState([]);
  useEffect(() => {
    if (patientRecordState.status == "success") {
      if (patientRecordState.patientData.record.length > 0) {
        console.log("true")
        let data = [], cnt = 0;
        for (let i of patientRecordState.patientData.record) {
          console.log(i)
          for (let j of i.diagonisReport) {
            cnt++;
            data.push({ sr: cnt, category: "diagnosis", fileName: j })
          }

          for (let j of i.drugsReport) {
            cnt++;
            data.push({ sr: cnt, category: "drugs", fileName: j })
          }

          for (let j of i.treatmentReport) {
            cnt++;
            data.push({ sr: cnt, category: "treatment", fileName: j })
          }
        }
        console.log(data)
        setTableFile([...data]);
      }
    }
  }, [])


  return (
    <TableContainer  component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sr No.</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">Show</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableFile.map((row) => (
            <StyledTableRow key={row.sr}>
              <StyledTableCell align="right">{row.sr}</StyledTableCell>
              <StyledTableCell align="right">{row.category}</StyledTableCell>
              <StyledTableCell align="right"><a href={`https://${row.fileName}.ipfs.w3s.link`} target="_blank">Show</a></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
