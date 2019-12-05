import { green } from '@material-ui/core/colors';

export default () => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    display: 'inline-block',
    width: 60,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'center' as 'center',
    // color: theme.palette.text.secondary,
    margin: '0 5px',
    fontSize: 12,
    fontFamily: 'Roboto',
    '& p': {
      margin: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap' as 'nowrap',
    },
  },
  wrapper: {
    position: 'relative' as 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  circleProgress: {
    color: green[500],
    position: 'absolute' as 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
});
