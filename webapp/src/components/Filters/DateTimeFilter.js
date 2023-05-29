import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { Typography, Paper, TextField } from "@mui/material";

function DateTimeFilter(props) {
  const { beginDate, setBeginDate, endDate, setEndDate, sentence, setSentence } = props;

  const handleChangeBegin = (value) => {
    //alert(JSON.stringify(value).replace("T", " ").replace("Z",""));
    //setBeginDate(JSON.stringify(value).replace("T", " ").replace("Z",""));
    setBeginDate(value);
  };

  const handleChangeEnd = (value) => {
    //alert(JSON.stringify(value).replace("T", " ").replace("Z",""));
    //setBeginDate(JSON.stringify(value).replace("T", " ").replace("Z",""));
    setEndDate(value);
  };
  return (
    <Paper
      style={{
        margin: "1vw",
        width: "35vw",
        height: "40vh",
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        position: "absolute",
        right: "1vw",
        top: "11vh",
      }}
    >
      <div className="flex-row">
        <Typography sx={{ margin: "1vw" }}> Start Date </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker
              value={beginDate}
              onChange={(value) => handleChangeBegin(value)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div sx={{ margin: "1vw" }}>
        <div className="flex-row">
          <Typography sx={{ margin: "1vw" }}> End Date </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker
                value={endDate}
                onChange={(value) => handleChangeEnd(value)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </div>

      <TextField variant="filled"
                label="Search for a sentence"
                value={sentence}

                onChange={(e) => {setSentence(e.target.value.toLowerCase())}}

                sx={{margin:"1vw", width:"75%"}}
      />

    </Paper>
  );
}

export default DateTimeFilter;
