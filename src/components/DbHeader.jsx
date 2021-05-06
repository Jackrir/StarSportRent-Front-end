import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DbUser from './User/DbUser';
import DbRent from './Rent/DbRent';
import DbCategory from './Category/DbCategory';
import DbTypeOfItem from './TypeOfItem/DbTypeOfItem';
import DbItem from './Item/DbItem';
import DbMaintenance from './Maintenance/DbMaintenance';
import DbBooking from './Booking/DbBooking';
import DbTypeItem from './TypeItem/DbTypeItem';
import DbItemsInRent from './ItemsInRent/DbItemsInRent';
import ImportExport from './ImportExport';
import LogOut from './Auth/LogOut';
import getCookie from './baseURL';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (getCookie("Jwt") == null) {
    window.location.href="/adminlogin";
}

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" style={{ backgroundColor: '#007000' }}>
          <Tab label="User" {...a11yProps(0)} />
          <Tab label="Rent" {...a11yProps(1)} />
          <Tab label="Category" {...a11yProps(2)} />
          <Tab label="TypeOfItem" {...a11yProps(3)} />
          <Tab label="Item" {...a11yProps(4)} />
          <Tab label="Maintenance" {...a11yProps(5)} />
          <Tab label="Booking" {...a11yProps(6)} />
          <Tab label="TypeItem" {...a11yProps(7)} />
          <Tab label="ItemsInRent" {...a11yProps(8)} />
          <Tab label="ImportExport" {...a11yProps(9)} />
          <Tab label="LogOut" {...a11yProps(10)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <DbUser></DbUser>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DbRent></DbRent>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DbCategory></DbCategory>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DbTypeOfItem></DbTypeOfItem>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <DbItem></DbItem>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <DbMaintenance></DbMaintenance>
      </TabPanel>
      <TabPanel value={value} index={6}>
        <DbBooking></DbBooking>
      </TabPanel>
      <TabPanel value={value} index={7}>
        <DbTypeItem></DbTypeItem>
      </TabPanel>
      <TabPanel value={value} index={8}>
        <DbItemsInRent></DbItemsInRent>
      </TabPanel>
      <TabPanel value={value} index={9}>
        <ImportExport></ImportExport>
      </TabPanel>
      <TabPanel value={value} index={10}>
        <LogOut></LogOut>
      </TabPanel>
    </div>
  );
}