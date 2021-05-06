import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AdminLogin from './Auth/AdminLogin';
import Index from './GeneralPage';
import DbHeader from './DbHeader';
import AddUser from './User/AddUser';
import EditUser from './User/EditUser';
import AddRent from './Rent/AddRent';
import EditRent from './Rent/EditRent';
import AddCategory from './Category/AddCategory';
import EditCategory from './Category/EditCategory';
import AddTypeOfItem from './TypeOfItem/AddTypeOfItem';
import EditTypeOfItem from './TypeOfItem/EditTypeOfItem';
import AddItem from './Item/AddItem';
import EditItem from './Item/EditItem';
import AddMaintenance from './Maintenance/AddMaintenance';
import EditMaintenance from './Maintenance/EditMaintenance';
import AddBooking from './Booking/AddBooking';
import EditBooking from './Booking/EditBooking';
import AddTypeItem from './TypeItem/AddTypeItem';
import AddItemsInRent from './ItemsInRent/AddItemsInRent';
import WorkLogin from './Auth/WorkLogin';
import WorkPanel from './WorkerPanel';
import CalculateRent from './Worker/CalculateRent';
import DelayRent from './Worker/DelayRent';
import Maintenance from './Worker/Maintenance';
import BookingRent from './Worker/BookingRent';
import CreateRent from './Worker/CreateRent';




class Main extends Component {
    render() {
        return (
            <Switch>
                <Route path="/index" component={Index}></Route>

                <Route path="/adminlogin" component={AdminLogin}></Route>
                <Route path="/db" component={DbHeader}></Route>
                <Route path="/addUser" component={AddUser}></Route>
                <Route path="/editUser/:UserId" component={EditUser}></Route>
                <Route path="/addRent" component={AddRent}></Route>
                <Route path="/editRent/:RentId" component={EditRent}></Route>
                <Route path="/addCategory" component={AddCategory}></Route>
                <Route path="/editCategory/:CategoryId" component={EditCategory}></Route>
                <Route path="/addTypeOfItem" component={AddTypeOfItem}></Route>
                <Route path="/editTypeOfItem/:TypeOfItemId" component={EditTypeOfItem}></Route>
                <Route path="/addItem" component={AddItem}></Route>
                <Route path="/editItem/:ItemId" component={EditItem}></Route>
                <Route path="/addMaintenance" component={AddMaintenance}></Route>
                <Route path="/editMaintenance/:MaintenanceId" component={EditMaintenance}></Route>
                <Route path="/addBooking" component={AddBooking}></Route>
                <Route path="/editBooking/:BookingId" component={EditBooking}></Route>
                <Route path="/addTypeItem" component={AddTypeItem}></Route>
                <Route path="/addItemsInRent" component={AddItemsInRent}></Route>

                <Route path="/workerlogin" component={WorkLogin}></Route>
                <Route path="/workpanel" component={WorkPanel}></Route>
                <Route path="/pay" component={CalculateRent}></Route>
                <Route path="/delay" component={DelayRent}></Route>
                <Route path="/maintenance" component={Maintenance}></Route>
                <Route path="/bookingrent" component={BookingRent}></Route>
                <Route path="/createrent" component={CreateRent}></Route>

                <Redirect to="/index" component={Index}></Redirect>
            </Switch>
        );
    }
}

export default Main;