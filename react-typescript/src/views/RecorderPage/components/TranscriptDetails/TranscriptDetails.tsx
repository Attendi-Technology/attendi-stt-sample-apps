import {
  makeStyles,
  Theme,
  createStyles,
  Button,
  Typography,
} from "@material-ui/core";

interface TranscriptDetailsProps {
  transcript: string;
  closeRecording: React.MouseEventHandler<HTMLButtonElement>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      width: "90%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(3, 2),
    },
    transcript: {
      flex: 1,
      width: "100%",
      border: "1px solid #979797",
      padding: theme.spacing(3, 2),
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
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
      marginTop: "auto",
      marginBottom: theme.spacing(2),
    },
  }),
);

export const TranscriptDetails = (props: TranscriptDetailsProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4">Transcript</Typography>
      <Typography className={classes.transcript} gutterBottom>
        {props.transcript}
      </Typography>
      <Button className={classes.closeButton} onClick={props.closeRecording}>
        Sluiten
      </Button>
    </div>
  );
};
