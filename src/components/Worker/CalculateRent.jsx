import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { baseUrl } from '../baseURL';
import Select from 'react-select';
import getCookie from '../baseURL';
import refreshToken from '../RefreshToken';


class CalculateRent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rentId: "",
            cost:"",

            text : ["",""],
            ua: ["Розрахувати", "Назад"],
            en: ["Pay",  "Back"],

            isLoaded1: false,
            optionsRentId: null,

        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeRentId = this.changeRentId.bind(this);
    }

    handleSubmit = event => {
        if(this.state.cost.length != 0) {
            fetch(baseUrl + "/Worker/PayRent/" + this.state.rentId, {
                method: "GET",
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
                },
                (error) => {
                    alert(error);

                }
            );
        }
        event.preventDefault();
    }

    getCost(id) {
        fetch(baseUrl + "/Worker/CalculateRent/" + id, {
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

    changeRentId = (selectedOptions) => {
        this.getCost(selectedOptions.value);
        this.setState({ rentId: selectedOptions.value });
    }

    back() {
        window.location.href = "/workpanel";
    }

    fillRentId(result) {
        var res = [];
        var i = 0;
        result.forEach(element => {
            res[i] = {
                value: element.rentId,
                label: element.rentId
            };
            i++;
        });
        return res;
    }

    getRent() {
        fetch(baseUrl + "/Worker/GetRentInRent", {
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
                        optionsRentId: this.fillRentId(result)
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
            window.location.href="/workerlogin";
        }
        this.getRent();
        let l = getCookie("lan");
        if (l == "ua") {
            this.setState({ text: this.state.ua});
        } else if (l == "en") {
            this.setState({ text: this.state.en});
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
                <div style={{ width: "600px", height: "480px", marginLeft: "20%", marginTop: "10%" }}>
                    <h2 style={{ alingCenter: "center", marginLeft: "150px", marginBottom: "40px" }}>{this.state.text[4]}</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                        <label className="form-group" style={{ width: "600px" }}> RentId
                        <Select options={this.state.optionsRentId} onChange={this.changeRentId}>
                                    </Select>
                                </label>
                            <label className="form-control"> {this.state.cost} </label>
                            <button
                                className="btn btn-primary btn-lg disabled"
                                type="submit"
                                style={{ width: '600px', backgroundColor: '#00AF00', marginBottom: "20px", marginTop: "50px" }}
                            > {this.state.text[0]}
                    </button>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}

export default CalculateRent;