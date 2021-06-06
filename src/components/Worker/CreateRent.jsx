import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { baseUrl } from '../baseURL';
import Select from 'react-select';
import getCookie from '../baseURL';
import refreshToken from '../RefreshToken';


class CreateRent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            itemId: 0,
            Info: "",
            URLphoto: "",
            CostPerHour: 0,
            Cost: 0,
            Size: "",

            textarea: "",
            time: "",
            costall: 0,
            userId: 0,




            text: ["", "", "", "", "", "", "", "", "", ""],
            ua: ["Назад", "Обладнання", "Створення оренди", "Інформація", "Вартість в час", "Розмір", "Вартість", "Час", "Вартість оренди", "Створити оренду"],
            en: ["Back", "Items", "Create rent", "Info", "CostPerHour", "Size", "Cost", "Time", "Cost", "Create rent"],

            isLoaded1: false,
            isLoaded2: false,
            optionsItemId: null,
            optionsUserId: null,

        }

        this.changeText = this.changeText.bind(this);
        this.changeTime = this.changeTime.bind(this);
    }

    createRent() {
        if(this.state.cost != 0 && this.state.userId != 0) {
            const newAccount = {
                data: this.state.textarea,
                time: this.state.time,
                id: this.state.userId
            }
            fetch(baseUrl + "/Worker/CreateRent", {
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

    getCost(time) {
        if (this.state.text != "") {
            const newAccount = {
                data: this.state.textarea,
                time: time
            }
            fetch(baseUrl + "/Worker/GetRentCost", {
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
                            costall: result.message
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

    changeText(event) {
        this.setState({ textarea: event.target.value });
    }

    getItemById(id) {
        fetch(baseUrl + "/db/Item/GetId/" + id,
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
            .then(
                (result) => {
                    this.setState({
                        Info: result.info,
                        URLphoto: result.urLphoto,
                        CostPerHour: result.costPerHour,
                        Cost: result.cost,
                        Size: result.size
                    });
                    console.log(this.state)
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )

    }

    changeItemId = (selectedOptions) => {
        this.setState({ itemId: selectedOptions.value });
        this.getItemById(selectedOptions.value)
    }

    changeUserId = (selectedOptions) => {
        this.setState({ userId: selectedOptions.value });
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
        fetch(baseUrl + "/Worker/GetItemStorage", {
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

    componentDidMount() {
        if (getCookie("Jwt") == null) {
            window.location.href = "/workerlogin";
        }
        this.getUser();
        this.getItem();
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
                > {this.state.text[0]}
                </Button>
                <div className="col-12">

                </div>
                <div>
                    <div style={{ width: "650px", height: "650px", marginLeft: "-15%", marginTop: "10%", position: "fixed", overflow: "auto" }}>
                        <h2 style={{ alingCenter: "center", marginLeft: "20px", marginBottom: "40px" }}>{this.state.text[1]}</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label className="form-group" style={{ width: "600px" }}>
                                    <Select options={this.state.optionsItemId} onChange={this.changeItemId}>
                                    </Select>
                                </label>
                                <label className="form-group" style={{ width: "600px" }}> {this.state.text[3]}
                                <label className="form-control"> {this.state.Info} </label>
                                </label>
                                <label className="form-group" style={{ width: "600px" }}> {this.state.text[4]}
                                <label className="form-control"> {this.state.CostPerHour} </label>
                                </label>
                                <label className="form-group" style={{ width: "600px" }}> {this.state.text[5]}
                                <label className="form-control"> {this.state.Size} </label>
                                </label>
                                <label className="form-group" style={{ width: "600px" }}> {this.state.text[6]}
                                <label className="form-control"> {this.state.Cost} </label>
                                </label>
                                <img style={{ height: 128, width: 128 }} src={this.state.URLphoto}></img>
                            </div>
                        </form>

                    </div>

                    <div style={{ width: "650px", height: "600px", marginLeft: "40%", marginTop: "10%", position: "fixed", overflow: "auto" }}>
                        <h2 style={{ alingCenter: "center", marginLeft: "150px", marginBottom: "40px" }}>{this.state.text[2]}</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label className="form-group" style={{ width: "600px" }}>
                                    <Select options={this.state.optionsUserId} onChange={this.changeUserId}>
                                    </Select>
                                </label>
                                <textarea class="form-control" value={this.state.textarea} onChange={this.changeText} style={{ height: "100px" }} />
                                <label className="form-group" style={{ width: "600px" }}> {this.state.text[7]}
                                    <input className="form-control" type="datetime-local" id="Time" name="Time" value={this.state.time} onChange={this.changeTime} />
                                </label>
                                <label className="form-group" style={{ width: "600px" }}> {this.state.text[8]}
                                    <label className="form-control"> {this.state.costall} </label>
                                </label>
                                <Button
                                    className="btn btn-primary btn-lg disabled"
                                    onClick={(event) => this.createRent()}
                                    style={{ width: '600px', backgroundColor: '#00AF00', marginBottom: "20px", marginTop: "50px" }}
                                > {this.state.text[9]}
                                </Button>
                            </div>
                        </form>

                    </div>
                </div>
            </div >
        );
    }
}

export default CreateRent;