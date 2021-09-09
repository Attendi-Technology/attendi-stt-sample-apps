import { Button } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    activePause: {
      display: "block",
      height: 60,
      width: 350,
      marginTop: 15,
      borderRadius: 4,
      backgroundColor: "#DDE9F7",
      color: "#5D728A",
      fontSize: 18,
      fontWeight: "bold",
      letterSpacing: 2.7,
      textAlign: "center",
    },
    activeStop: {
      display: "block",
      height: 60,
      width: 350,
      marginTop: 15,
      backgroundColor: "#C30404",
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
