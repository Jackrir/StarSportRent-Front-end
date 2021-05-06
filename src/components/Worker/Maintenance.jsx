import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { baseUrl } from '../baseURL';
import Select from 'react-select';
import getCookie from '../baseURL';
import refreshToken from '../RefreshToken';


class Maintenance extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ItemMaintenance: 0,
            ItemOK: 0,

            text: ["", "","",""],
            ua: ["Відправити на обслуговування", "Назад","Відправити", "Відправити у сховище"],
            en: ["Sent to maintenance", "Back","Sent", "Sent to storage"],

            isLoaded1: false,
            isLoaded2: false,
            optionsItemMaintenance: null,
            optionsItemOK: null,

        }


        this.changeItemMaintenance = this.changeItemMaintenance.bind(this);
        this.changeItemOK = this.changeItemOK.bind(this);
    }

    toOk() {
        fetch(baseUrl + "/Worker/MaintenanceToOk/" + this.state.ItemMaintenance, {
            method: 'GET',
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
                        window.location.href = "/workpanel";
                    }
                },
                (error) => {
                    alert(error);

                }
            );
    }

    itemToOk() {
        if(this.state.ItemMaintenance > 0) {
            this.toOk();
        }
    }

    toMaintenance() {
        fetch(baseUrl + "/Worker/OkToMaintenance/" + this.state.ItemOK, {
            method: 'GET',
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
                        window.location.href = "/workpanel";
                    }
                },
                (error) => {
                    alert(error);

                }
            );
    }

    itemToMaintenance() {
        if(this.state.ItemOK > 0) {
            this.toMaintenance();
        }
    }

    changeItemMaintenance = (selectedOptions) => {
        this.setState({ ItemMaintenance: selectedOptions.value });
    }


    changeItemOK = (selectedOptions) => {
        this.setState({ ItemOK: selectedOptions.value });
    }

    back() {
        window.location.href = "/workpanel";
    }

    fillItemMaintenance(result) {
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

    getItemMaintenance() {
        fetch(baseUrl + "/Worker/GetItemMaintenance", {
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
                        optionsItemMaintenance: this.fillItemMaintenance(result)
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

    fillItemOK(result) {
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

    getItemOK() {
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
                        isLoaded2: true,
                        optionsItemOK: this.fillItemOK(result)
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
        if (getCookie("Jwt") == null) {
            window.location.href="/workerlogin";
        }
        this.getItemMaintenance()
        this.getItemOK()
        let l = getCookie("lan")
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
                <div>
                    <div style={{ width: "600px", height: "480px", marginLeft: "-15%", marginTop: "10%", position:"fixed", overflow: "auto" }}>
                        <h2 style={{ alingCenter: "center", marginLeft: "20px", marginBottom: "40px" }}>{this.state.text[0]}</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label className="form-group" style={{ width: "600px" }}>
                                    <Select options={this.state.optionsItemOK} onChange={this.changeItemOK}>
                                    </Select>
                                </label>
                                <Button
                                    className="btn btn-primary btn-lg disabled"
                                    onClick={(event) => this.itemToMaintenance()}
                                    style={{ width: '600px', backgroundColor: '#00AF00', marginBottom: "20px", marginTop: "50px" }}
                                > {this.state.text[2]}
                                </Button>
                            </div>
                        </form>

                    </div>

                    <div style={{ width: "600px", height: "480px", marginLeft: "40%", marginTop: "10%", position:"fixed", overflow: "auto" }}>
                        <h2 style={{ alingCenter: "center", marginLeft: "150px", marginBottom: "40px" }}>{this.state.text[3]}</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label className="form-group" style={{ width: "600px" }}>
                                    <Select options={this.state.optionsItemMaintenance} onChange={this.changeItemMaintenance}>
                                    </Select>
                                </label>
                                <Button
                                    className="btn btn-primary btn-lg disabled"
                                    onClick={(event) => this.itemToOk()}
                                    style={{ width: '600px', backgroundColor: '#00AF00', marginBottom: "20px", marginTop: "50px" }}
                                > {this.state.text[2]}
                                </Button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}

export default Maintenance;