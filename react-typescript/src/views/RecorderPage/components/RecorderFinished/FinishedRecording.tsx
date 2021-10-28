import { Button, CircularProgress, Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexDirection: "column",
    },
    uploadSpinner: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    uploadText: {
      wordWrap: "break-word",
      marginBottom: theme.spacing(2),
      textAlign: "center",
    },
    savedText: {
      wordWrap: "break-word",
      marginBottom: theme.spacing(4),
      textAlign: "center",
    },
    closeButton: {
      backgroundColor: "#FE855D",
      color: "#FFFFFF",
      borderRadius: 4,
      textTransform: "uppercase",
      fontSize: 18,
      fontWeight: "bold",
      letterSpacing: 2.7,
      textAlign: "center",
      marginBottom: theme.spacing(2),
    },
  }),
);

interface IFinishedRecordingProps {
  finishedRecording: React.MouseEventHandler<HTMLButtonElement>;
  isProcessing: boolean;
  isProcessed: boolean;
}

export const FinishedRecording = ({
  finishedRecording,
  isProcessing,
  isProcessed,
}: IFinishedRecordingProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {isProcessing && (
        <div className={classes.uploadSpinner}>
          <CircularProgress />

          <p className={classes.uploadText}>Opname aan het uploaden...</p>
        </div>
      )}

      {isProcessed && <p className={classes.savedText}>Opgeslagen!</p>}

      <Button
        disabled={isProcessing}
        className={classes.closeButton}
        onClick={finishedRecording}
      >
        Toon Transcript
      </Button>
    </div>
  );
};
