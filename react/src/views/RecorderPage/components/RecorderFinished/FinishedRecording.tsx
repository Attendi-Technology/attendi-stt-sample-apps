import { Button, CircularProgress } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    uploadSpinner: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    uploadText: {
      wordWrap: "break-word",
      marginBottom: 10,
      textAlign: "center",
    },
    savedText: {
      wordWrap: "break-word",
      marginBottom: 30,
      textAlign: "center",
    },
    closeButton: {
      height: 60,
      width: 350,
      marginTop: 15,
      backgroundColor: "#FE855D",
      color: "#FFFFFF",
      borderRadius: 4,
      textTransform: "uppercase",
      fontSize: 18,
      fontWeight: "bold",
      letterSpacing: 2.7,
      textAlign: "center",
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
    <div>
      {isProcessing && (
        <div className={classes.uploadSpinner}>
          <CircularProgress />

          <p className={classes.uploadText}>Opname aan het uploaden...</p>
        </div>
      )}

      {isProcessed && <p className={classes.savedText}>Opgeslagen!</p>}

      <Button className={classes.closeButton} onClick={finishedRecording}>
        Sluiten
      </Button>
    </div>
  );
};
