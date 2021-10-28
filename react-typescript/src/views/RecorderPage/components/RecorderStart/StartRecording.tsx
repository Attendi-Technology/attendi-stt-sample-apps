/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      display: "none",
    },
    activeRecord: {
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
    uploadRecording: {
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

interface IStartRecordingProps {
  startRecorder(): void;
  handleUpload(e: React.ChangeEvent<HTMLInputElement>): void;
}

export const StartRecording = ({
  startRecorder,
  handleUpload,
}: IStartRecordingProps) => {
  const classes = useStyles();
  return (
    <>
      <Button className={classes.activeRecord} onClick={startRecorder}>
        Nieuwe opname
      </Button>
      <input
        accept="audio/wav"
        className={classes.input}
        id="upload-button-file"
        type="file"
        onChange={handleUpload}
      />
      <label htmlFor="upload-button-file">
        <Button
          className={classes.uploadRecording}
          aria-label="upload audio"
          component="span"
        >
          Upload opname
        </Button>
      </label>
    </>
  );
};
