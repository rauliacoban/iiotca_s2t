import StartFirebase from "../FirebaseConfig";
import React, { useState } from "react";
import {ref, onValue, getDatabase} from 'firebase/database';
//import {Table} from 'react-bootstrap';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Dialog, TablePagination} from '@mui/material';
import Popup from "./Popup";
import Reports from "../Reports/Report";



const db = StartFirebase();

const dayjs = require('dayjs');
const today = dayjs().startOf('day');

//-------------- functions ---------------
function convertDate(date) {
    if (!date) return null;

    let s = JSON.stringify(date.add(3, "hour"))
      .replace("T", " ")
      .replace("Z", "");
    return s.substring(1, s.length - 1);
  }
function compareDate(a,b){
    if(a.data.date > b.data.date)
        return -1;
    else if (a.data.date < b.data.date)
        return 1;

    return 0;
}


export class RealtimeData extends React.Component{
    constructor(){
        super();
        this.state = {
            tableData: []
        }
    }

    componentDidMount(){
        const dbRef = ref(db, 'notificationRequests');

        onValue(dbRef, (snapshot)=>{
            let records = [];
            snapshot.forEach(s=>{
                let keyName = s.key;
                let data = s.val();

                records.push({"key": keyName, "data":data});
            });
            this.setState({tableData: records});
        });
    }

    render(){
        return(
            
          <Paper
            sx={{
                margin: "1vw",
                height: "82vh",
                background: "rgba(0,0,0,0.3)",

                position:'absolute',
                left:'1vw',
                bottom:'3vh',
            }}
            >
                <TableContainer sx={{maxHeight:'76vh', width: '60vw'}}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableCell  sx={{backgroundImage: "linear-gradient(0deg, #96c8fb 0%, #ddbdfc 74%)"}}>#</TableCell>
                            <TableCell  sx={{backgroundImage: "linear-gradient(0deg, #96c8fb 0%, #ddbdfc 74%)"}}>Date</TableCell>
                            <TableCell  sx={{backgroundImage: "linear-gradient(0deg, #96c8fb 0%, #ddbdfc 74%)"}}>Sentence</TableCell>
                        </TableHead>

                        <TableBody>
                            {this.state.tableData.sort(compareDate)
                                        .slice(this.props.page* this.props.rowsPerPage, this.props.page * this.props.rowsPerPage + this.props.rowsPerPage)
                                        .filter(rr=> (this.props.beginDate === null ? true : rr.data.date >= this.props.beginDate)
                                                            && (this.props.endDate === null ? true :rr.data.date <= this.props.endDate)
                                                            && (rr.data.speech.toLowerCase().indexOf(this.props.sentence) >= 0)
                                                        )
                                        .map((row, index)=>(
                                <TableRow onClick = {() => this.props.handleOpen(row)}>
                                    <TableCell>{this.props.page* this.props.rowsPerPage + index+1}</TableCell>
                                    <TableCell>{row.data.date.substring(0,row.data.date.length-10)}</TableCell>
                                    <TableCell>{row.data.speech.substring(0,100)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={this.state.tableData.filter(rr=> (this.props.beginDate === null ? true : rr.data.date >= this.props.beginDate)
                                                && (this.props.endDate === null ? true :rr.data.date <= this.props.endDate)
                                                && (rr.data.speech.toLowerCase().indexOf(this.props.sentence) >= 0)
                            ).length}
                    rowsPerPage={this.props.rowsPerPage}
                    page={this.props.page}
                    onPageChange={this.props.handleChangePage}
                    onRowsPerPageChange={this.props.handleChangeRowsPerPage}
                />
                
                
                <Popup open = {this.props.open} handleClose = {this.props.handleClose} row = {this.props.selectedRow}/>
                <Reports rows={this.state.tableData.filter(rr => (rr.data.date >= convertDate(today))
                                                                && (rr.data.date < convertDate(today.add(1,'day')))
                                                    )}  
                        today = {today}
                />
            </Paper>
        )
    }
}
