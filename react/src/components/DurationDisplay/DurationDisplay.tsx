import { createStyles, makeStyles } from "@material-ui/core/styles";

interface DurationDisplayProps {
  durationInSeconds: number;
}

const useStyles = makeStyles(() =>
  createStyles({
    duration: {
      fontSize: "2.4rem",
    },
  }),
);

const formatTime = (durationInSeconds: number) => {
  const getSeconds = `0${durationInSeconds % 60}`.slice(-2);
  const minutes = Math.floor(durationInSeconds / 60);
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(durationInSeconds / 3600)}`.slice(-2);

  return `${getHours} : ${getMinutes} : ${getSeconds}`;
};

export const DurationDisplay = (props: DurationDisplayProps) => {
  const classes = useStyles();

  return (
    <p className={classes.duration}>{formatTime(props.durationInSeconds)}</p>
  );
};
