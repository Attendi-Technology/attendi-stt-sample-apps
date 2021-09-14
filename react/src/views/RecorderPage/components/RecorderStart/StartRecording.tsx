import { Button } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    activeRecord: {
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

interface IStartRecordingProps {
  startRecorder(): void;
}

export const StartRecording = ({ startRecorder }: IStartRecordingProps) => {
  const handleStart = () => {
    startRecorder();
  };

  const classes = useStyles();
  return (
    <>
      <Button className={classes.activeRecord} onClick={handleStart}>
        Nieuwe opname
      </Button>
    </>
  );
};
