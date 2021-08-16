import { Button } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        activeRecord: {
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
        }
    })
);

interface IStartRecordingProps {
    startRecorder(): void;
}

const StartRecording = ({ startRecorder }: IStartRecordingProps) => {
    const handleStart = () => {
        startRecorder()
    };

    const classes = useStyles();
    return (
        <div>
            <Button
                className={classes.activeRecord}
                onClick={handleStart}>
                Nieuwe opname
            </Button>
        </div>

    );
};

export default StartRecording;