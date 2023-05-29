import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { Typography, Paper } from "@mui/material";

function Reports(props) {
  const dayjs = require("dayjs");

  const { rows, today } = props;

  //-------------- functions ---------------
  function convertDate(date) {
    if (!date) return null;

    let s = JSON.stringify(date.add(3, "hour"))
      .replace("T", " ")
      .replace("Z", "");
    return s.substring(1, s.length - 1);
  }

  return (
    <Paper
      className="paper"
      sx={{
        margin: "1vw",
        width: "35vw",
        height: "40vh",
        background: "rgba(0,0,0,0.3)",

        position: "absolute",
        right: "-37vw",
        bottom: "-2vh",
      }}
    >
      <Typography variant="h5">
        {today
          .add(3, "hour")
          .toString()
          .substring(0, today.add(3, "hour").toString().length - 13)}
      </Typography>


        <Typography sx={{marginTop:'5vh'}}>Number of Sentences today: {" " + rows.length}</Typography>

        <Typography sx={{marginTop:'1vh'}}>
          Highest Temperature:
          {" " +
            Math.max
              .apply(
                Math,
                rows.map((row) => row.data.temperature)
              )
              .toFixed(2)}°C
        </Typography>
        <Typography>
          Average Temperature:
          {" " +
            (
              rows
                .map((row) => row.data.temperature)
                .reduce((sum, next) => sum + next, 0) / rows.length
            ).toFixed(2)}°C
        </Typography>

        <Typography sx={{marginTop:'1vh'}}>
          Highest Humidity:
          {" " +
            Math.max
              .apply(
                Math,
                rows.map((row) => row.data.humidity)
              )
              .toFixed(2)}%
        </Typography>
        <Typography>
          Average Humidity:
          {" " +
            (
              rows
                .map((row) => row.data.humidity)
                .reduce((sum, next) => sum + next, 0) / rows.length
            ).toFixed(2)}%
        </Typography>
    </Paper>
  );
}

export default Reports;
