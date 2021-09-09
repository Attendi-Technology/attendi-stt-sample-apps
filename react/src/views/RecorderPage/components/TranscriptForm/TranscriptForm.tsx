import { useCallback } from "react";
import { Button, Box } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { useClipboard } from "use-clipboard-copy";

interface RecordingDetailsProps {
  transcript: string;
  closeRecording: React.MouseEventHandler<HTMLButtonElement>;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: "100%",
      width: "100%",
    },
    audioPlayer: {
      height: 60,
      width: "100%",
      display: "flex",
      alignItems: "center",
      marginBottom: 30,
    },
    transcript: {
      border: "1px solid #979797",
      padding: "15px 30px 30px 30px",
      height: "32vh",
    },
    h4: {
      color: "#2F3539",
      fontFamily: "Roboto Mono",
      fontSize: 16,
      fontWeight: 550,
      letterSpacing: 0,
    },
    buttonContainer: {
      display: "flex",
      marginTop: 30,
    },
    leftContainer: {
      float: "left",
    },
    leftButtons: {
      height: 40,
      width: 200,
      padding: "10px 17px",
      marginRight: 20,
      borderRadius: 4,
      backgroundColor: "#FE855D",
      color: "#FFFFFF",
      textTransform: "uppercase",
      fontSize: 12,
      fontWeight: "bold",
      letterSpacing: 2.7,
      textAlign: "center",
    },
    closeButton: {
      height: 40,
      width: 200,
      padding: "10px 17px",
      marginRight: 20,
      borderRadius: 4,
      backgroundColor: "#FE855D",
      color: "#FFFFFF",
      textTransform: "uppercase",
      fontSize: 12,
      fontWeight: "bold",
      letterSpacing: 2.7,
      textAlign: "center",
    },
  }),
);

export const TranscriptForm = (props: RecordingDetailsProps) => {
  const clipboard = useClipboard();
  const handleCopy = useCallback(() => {
    clipboard.copy(props.transcript);
  }, [clipboard, props.transcript]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <div className={classes.audioPlayer}>
        <audio controls src={audioSrc} />
      </div> */}
      <div className={classes.transcript}>
        <h4 className={classes.h4}>Transcript</h4>
        <Box height="80%" overflow="auto">
          {props.transcript}
        </Box>
      </div>
      <div className={classes.buttonContainer}>
        <div className={classes.leftContainer}>
          <Button
            className={classes.leftButtons}
            startIcon={<AssignmentIcon />}
            onClick={() => handleCopy()}
          >
            Kopieer tekst
          </Button>

          <Button
            className={classes.closeButton}
            onClick={props.closeRecording}
          >
            Sluiten
          </Button>
        </div>
      </div>
    </div>
  );
};
