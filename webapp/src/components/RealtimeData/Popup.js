import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import {
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

function Popup(props) {
  const { open, handleClose, row } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        //You can copy the code below in your theme
        "& .MuiPaper-root": {
          backgroundImage: "linear-gradient(315deg, #96c8fb 0%, #ddbdfc 74%)",
        },
        "& .MuiBackdrop-root": {
          backgroundColor: "transparent", // Try to remove this to see the result
        },
      }}
    >
      <DialogTitle>Sentence ID {" " + row.key}</DialogTitle>
      <DialogContent>
        {row ? (
          <>
            <Typography>
              Date:{" "}
              {" " + row.data.date.substring(0, row.data.date.length - 10)}
            </Typography>
            <Paper
              style={{
                margin: "1vw",
                minHeight: "8vh",
                background: "rgba(0,0,0,0.3)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {row.data.speech}
            </Paper>
            <Typography>Temperature:{" " + row.data.humidity.toFixed(2)}°C</Typography>
            <Typography>Humidity: {" " + row.data.temperature.toFixed(2)}%</Typography>
          </>
        ) : (
          <></>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Popup;
