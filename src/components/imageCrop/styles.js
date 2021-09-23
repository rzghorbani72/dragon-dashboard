import { makeStyles } from '@mui/styles';

// const size = 290;
export const useStyles = makeStyles(() => ({
  cropperRoot: {
    width: '100%'
  },
  cropContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    background: '#333',
    marginBottom: 20
  },
  dropBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    margin: '0 auto 20px',
    border: `1px dashed grey}`,
    borderRadius: 15,
    cursor: 'default',
    height: (props) => props.size,
    width: (props) => props.size
  },
  img: {
    width: '100%',
    height: '100%'
  },
  container: {
    marginBottom: 10
  },
  dpZoneLabel: {
    marginBottom: 32,
    color: 'blue',
    textAlign: 'center'
  },
  addBtn: {
    color: 'green',
    fontSize: 36
  },
  clearBtn: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.24)',
    padding: 6,
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.44)'
    }
  },
  canvas: {
    maxHeight: (props) => props.size - 10,
    maxWidth: (props) => props.size - 10
  },
  sliderWrapper: {
    flexGrow: 1
  }
}));
