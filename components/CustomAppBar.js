import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  AppBar: {
    background: 'white',
    border: 0,
    color: '#37373b',
    padding: '0 30px',
  },
});

const CustomAppBar = props => {
    const classes = useStyles()
    return ( 
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar>
          <Typography variant="h5" >
            CovArchive2020
          </Typography>
        </Toolbar>
      </AppBar>
     );
}
 
export default CustomAppBar;
