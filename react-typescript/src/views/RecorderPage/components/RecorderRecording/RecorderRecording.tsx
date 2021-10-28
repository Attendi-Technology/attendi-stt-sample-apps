import { Button, Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    activePause: {
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
    activeStop: {
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

interface IRecorderProps {
  pauseRecorder: React.MouseEventHandler<HTMLButtonElement>;
  resumeRecorder: React.MouseEventHandler<HTMLButtonElement>;
  stopRecorder: React.MouseEventHandler<HTMLButtonElement>;
  isRecording: boolean;
  isPaused: boolean;
}

export const RecorderRecording = ({
  pauseRecorder,
  stopRecorder,
  resumeRecorder,
  isRecording,
  isPaused,
}: IRecorderProps) => {
  const classes = useStyles();
  return (
    <>
      <Button className={classes.activeStop} onClick={stopRecorder}>
        Stop opname
      </Button>

      {isRecording && (
        <Button className={classes.activePause} onClick={pauseRecorder}>
          Pauzeren
        </Button>
      )}

      {isPaused && (
        <Button className={classes.activePause} onClick={resumeRecorder}>
          Hervatten
        </Button>
      )}
    </>
  );
};
