import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";

import { RealtimeData } from "./components/RealtimeData/RealtimeData";
import { Typography, Paper } from "@mui/material";
import DateTimeFilter from "./components/Filters/DateTimeFilter";
function App() {
  const [beginDate, setBeginDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sentence, setSentence] = useState("");

  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");

  //------------------ POPUP FUNCTIONS ------------------
  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //-------------- table pagination -----------------
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //-------------- HELPFUL FUNCTIONS -----------------
  function convertDate(date) {
    if (!date) return null;

    let s = JSON.stringify(date.add(3, "hour"))
      .replace("T", " ")
      .replace("Z", "");
    return s.substring(1, s.length - 1);
  }

  return (
    <div className="App">
      <Typography variant="h4" sx={{ marginTop: "2vh" }}> Speaches S2T </Typography>

      <RealtimeData
                    beginDate={convertDate(beginDate)}
                    endDate={convertDate(endDate)}
                    sentence={sentence}
                    open={open}
                    setOpen={setOpen}
                    selectedRow={selectedRow}
                    setSelectedRow={setSelectedRow}
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    page={page}
                    setPage={setPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <DateTimeFilter
                    beginDate={beginDate}
                    setBeginDate={setBeginDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    sentence={sentence}
                    setSentence={setSentence}
      />
    </div>
  );
}

export default App;
