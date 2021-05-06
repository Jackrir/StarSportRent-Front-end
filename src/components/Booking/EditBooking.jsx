import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { baseUrl } from '../baseURL';
import Select from 'react-select';
import getCookie from '../baseURL';
import refreshToken from '../RefreshToken';

class EditBooking extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bookingId: 0,
            OldItemId: 0,
            itemId: 0,
            OldUserId: 0,
            userId: 0,
            finishBooking: "",

            text : ["","","","","","",""],
            ua: ["Необрано обладнання", "Немає дати", "", "Назад", "Змінити бронювання", "Змінити","Необрано користувача"],
            en: ["Invalid item", "Invalid date", "", "Back", "Edit booking", "Edit","Invalid user"],


            isLoaded1: false,
            isLoaded2: false,
            optionsItemId: null,
            optionsUserId: null,
        }

        this.editBooking = this.editBooking.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


        this.changeItemId = this.changeItemId.bind(this);
        this.changeUserId = this.changeUserId.bind(this);
        this.changeFinishBooking = this.changeFinishBooking.bind(this);
    }

    editBooking(BookingId,ItemId, UserId, FinishBooking) {
        const newAccount = {
            BookingId: BookingId,
            ItemId: ItemId,
            UserId: UserId,
            FinishBooking: FinishBooking
        }
        fetch(baseUrl + "/db/Booking/Update", {
            method: 'PUT',
            body: JSON.stringify(newAccount),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'token': getCookie("Jwt"),
                'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'same-origin'
        })
            .then(
                (response) => {
                    if (response.ok) {
                        alert("Ok");
                    }
                },
                (error) => {
                    alert(error);

                }
            );
    }

    handleSubmit = event => {
        if(this.state.itemId != 0) {
            if(this.state.finishBooking.length > 0){
                if(this.state.userId != 0) {
                    this.editBooking(this.state.bookingId, this.state.itemId, this.state.userId, this.state.finishBooking);
                } else {
                    alert(this.state.text[6])
                }
                
            } else{
                alert(this.state.text[1])
            }
        }
        else {
            alert(this.state.text[0])
        }
        event.preventDefault();
    }


    changeItemId = (selectedOptions) => {
        this.setState({ itemId: selectedOptions.value });
    }

    changeUserId = (selectedOptions) => {
        this.setState({ userId: selectedOptions.value });
    }

    changeFinishBooking(event) {
        this.setState({ finishBooking: event.target.value });
    }

    back() {
        window.location.href = "/db";
    }

    fillItemId(result) {
        var res = [];
        var i = 0;
        result.forEach(element => {
            res[i] = {
                value: element.itemId,
                label: element.itemId + " " + element.name
            };
            i++;
        });
        return res;
    }

    getItem() {
        fetch(baseUrl + "/db/Item/Get", {
            method: "GET",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'token': getCookie("Jwt"),
                'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'same-origin'
        })
            .then(result => result.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded1: true,
                        optionsItemId: this.fillItemId(result)
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded1: true,
                        error
                    });
                }
            );
    }

    fillUserId(result) {
        var res = [];
        var i = 0;
        result.forEach(element => {
            res[i] = {
                value: element.userId,
                label: element.userId + " " + element.name
            };
            i++;
        });
        return res;
    }

    getUser() {
        fetch(baseUrl + "/db/User/Get", {
            method: "GET",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'token': getCookie("Jwt"),
                'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'same-origin'
        })
            .then(result => result.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded2: true,
                        optionsUserId: this.fillUserId(result)
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded2: true,
                        error
                    });
                }
            );
    }

    componentDidMount() {

        let l = getCookie("lan");
        if (l == "ua") {
            this.setState({ text: this.state.ua});
        } else if (l == "en") {
            this.setState({ text: this.state.en});
        }

        this.getItem()
        this.getUser()

        fetch(baseUrl + "/db/Booking/GetId/" + this.props.match.params.BookingId,
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'token': getCookie("Jwt"),
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                credentials: 'same-origin'
            })
            .then(result => result.json())
    .then(result => {
        if(result?.message) {
            refreshToken().then(
                this.componentDidMount())
        } else {
            this.setState({
                isLoaded1: true,
                bookingId: result.bookingId,
                OldItemId: result.itemId,
                OldUserId: result.userId,
                finishBooking: result.finishBooking
            });
        }
    }).catch(error => {
        console.error('Error:', error);
    })
    }


    render() {
        if (!this.state.isLoaded1 && !this.state.isLoaded2) {
            return (
                <div className="text-center">
                    <i className="fa fa-spinner fa-spin"></i>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <Button
                        className="btn btn-primary btn-lg disabled"
                        onClick={(event) => this.back()}
                        style={{ width: '20%', backgroundColor: '#003F00', marginBottom: "20px", marginTop: "50px" }}
                    > {this.state.text[3]}
                </Button>
                    <div className="col-12">

                    </div>
                    <div style={{ width: "600px", height: "480px", marginLeft: "20%", marginTop: "10%" }}>
                        <h2 style={{ alingCenter: "center", marginLeft: "150px", marginBottom: "40px" }}>{this.state.text[4]}</h2>
                        <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                        <label className="form-group" style={{ width: "600px" }}> BookingId
                            <label className="form-control"> {this.state.bookingId} </label>
                                </label>
                                <label className="form-group" style={{ width: "600px" }}> OldItemId
                            <label className="form-control"> {this.state.OldItemId} </label>
                                </label>
                                <label className="form-group" style={{ width: "600px" }}> ItemId
                        <Select options={this.state.optionsItemId} onChange={this.changeItemId}>
                                    </Select>
                                </label>
                                <label className="form-group" style={{ width: "600px" }}> OldUserId
                            <label className="form-control"> {this.state.OldUserId} </label>
                                </label>
                                <label className="form-group" style={{ width: "600px" }}> UserId
                        <Select options={this.state.optionsUserId} onChange={this.changeUserId}>
                                    </Select>
                                </label>
                            <label className="form-group" style={{ width: "600px" }}> FinishBooking
                            <input className="form-control" type="datetime-local" id="FinishBooking" name="FinishBooking" value={this.state.finishBooking} onChange={this.changeFinishBooking} />
                            </label>
                            <button
                                className="btn btn-primary btn-lg disabled"
                                type="submit"
                                style={{ width: '600px', backgroundColor: '#00AF00', marginBottom: "20px", marginTop: "50px" }}
                            > {this.state.text[5]}
                    </button>
                        </div>
                    </form>

                    </div>
                </div>
            );
        }
    }
}

export default EditBooking;