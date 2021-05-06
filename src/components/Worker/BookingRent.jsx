import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { baseUrl } from '../baseURL';
import Select from 'react-select';
import getCookie from '../baseURL';


class BookingRent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: 0,
            items: "",
            time: "",
            cost: 0,

            text: ["", "","", "",""],
            ua: ["Оренда за бронюванням", "Назад","Створити оренду","Час","Вартість"],
            en: ["Rent by booking", "Back","Create rent","Time","Cost"],

            isLoaded1: false,
            optionsUserId: null,

        }
        this.changeUserId = this.changeUserId.bind(this);
        this.changeTime = this.changeTime.bind(this);
    }

    toRent() {
        if(this.state.cost != 0) {
            const newAccount = {
                id: this.state.userId,
                time: this.state.time
            }
            fetch(baseUrl + "/Worker/SuccessUserBooking", {
                method: 'POST',
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
                        window.location.href = "/workpanel";
                    }
                    else {
                        let res = response.json()
                        alert(res.message)
                    }
                },
                (error) => {
                    alert(error);
    
                }
            );
        }
    }

    fillItems(result) {
        var res = "";
        var i = 0;
        result.forEach(element => {
            res += element.itemId + " " + element.name + '\n'
        });
        return res;
    }

    getItems(id) {
        fetch(baseUrl + "/Worker/GetUserBooking/" + id, {
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
                        items: this.fillItems(result)
                    });
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            );
    }

    getCost(time) {
        if (this.state.items != "") {
            const newAccount = {
                id: this.state.userId,
                time: time
            }
            fetch(baseUrl + "/Worker/CostRentBooking", {
                method: 'POST',
                body: JSON.stringify(newAccount),
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
                            cost: result.message
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
    }



    changeTime(event) {
        this.setState({ time: event.target.value });
        this.getCost(event.target.value)
    }

    changeUserId = (selectedOptions) => {
        this.setState({ userId: selectedOptions.value });
        this.getItems(selectedOptions.value)
    }

    back() {
        window.location.href = "/workpanel";
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
                        isLoaded1: true,
                        optionsUserId: this.fillUserId(result)
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

    componentDidMount() {
        if (getCookie("Jwt") == null) {
            window.location.href = "/workerlogin";
        }
        this.getUser();
        let l = getCookie("lan");
        if (l == "ua") {
            this.setState({ text: this.state.ua });
        } else if (l == "en") {
            this.setState({ text: this.state.en });
        }
    }

    render() {
        return (
            <div className="container">
                <Button
                    className="btn btn-primary btn-lg disabled"
                    onClick={(event) => this.back()}
                    style={{ width: '20%', backgroundColor: '#003F00', marginBottom: "20px", marginTop: "50px" }}
                > {this.state.text[1]}
                </Button>
                <div className="col-12">

                </div>
                <div style={{ width: "600px", height: "480px", marginLeft: "20%", marginTop: "0%" }}>
                    <h2 style={{ alingCenter: "center", marginLeft: "150px", marginBottom: "40px" }}>{this.state.text[0]}</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className="form-group" style={{ width: "600px" }}> UserId
                        <Select options={this.state.optionsUserId} onChange={this.changeUserId}>
                                </Select>
                            </label>
                            <textarea class="form-control" readonly="true" value={this.state.items} style={{ height: "400px" }}></textarea>
                            <label className="form-group" style={{ width: "600px" }}> {this.state.text[3]}
                            <input className="form-control" type="datetime-local" id="Time" name="Time" value={this.state.time} onChange={this.changeTime} />
                            </label>
                            <label className="form-group" style={{ width: "600px" }}> {this.state.text[4]}
                            <label className="form-control"> {this.state.cost} </label>
                            </label>
                            <Button
                                className="btn btn-primary btn-lg disabled"
                                onClick={(event) => this.toRent()}
                                style={{ width: '600px', backgroundColor: '#00AF00', marginBottom: "20px", marginTop: "50px" }}
                            > {this.state.text[2]}
                            </Button>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}

export default BookingRent;