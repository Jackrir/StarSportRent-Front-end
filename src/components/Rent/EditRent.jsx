import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { baseUrl } from '../baseURL';
import Select from 'react-select';
import getCookie from '../baseURL';
import refreshToken from '../RefreshToken';

class EditRent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rentId: 0,
            OldUserId: 0,
            userId: 0,
                startTime: "",
                finishTime: "",
                status: "",

            text : ["","","","","",""],
            ua: ["Необрано користувача", "Немає дат", "Необран статус", "Назад", "Змінити оренду", "Змінити"],
            en: ["Invalid user", "Invalid date", "Invalid status", "Back", "Edit rent", "Edit"],


            isLoaded1: false,
            isLoaded2: false,
            optionsUserId: null,
        }

        this.editRent = this.editRent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


        this.changeUserId = this.changeUserId.bind(this);
        this.changeStartTime = this.changeStartTime.bind(this);
        this.changeFinishTime = this.changeFinishTime.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
    }

    editRent(RentId,UserId, StartTime, FinishTime, Status) {
        const newAccount = {
            RentId: RentId,
            UserId: UserId,
            StartTime: StartTime,
            FinishTime: FinishTime,
            Status: Status
        }
        fetch(baseUrl + "/db/Rent/Update", {
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
        if(this.state.userId != 0) {
            if(this.state.startTime.length > 0 && this.state.finishTime.length > 0){
                if(this.state.status.length > 0){
                    this.editRent(this.state.rentId, this.state.userId, this.state.startTime, this.state.finishTime, this.state.status);
                } else{
                    alert(this.state.text[2])
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


    changeUserId = (selectedOptions) => {
        this.setState({ userId: selectedOptions.value });
    }

    changeStartTime(event) {
        this.setState({ startTime: event.target.value });
    }

    changeFinishTime(event) {
        this.setState({ finishTime: event.target.value });
    }

    changeStatus(event) {
        this.setState({ status: event.target.value });
    }

    back() {
        window.location.href = "/db";
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

        this.getUser()

        fetch(baseUrl + "/db/Rent/GetId/" + this.props.match.params.RentId,
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
                rentId: result.rentId,
                OldUserId: result.userId,
                startTime: result.startTime,
                finishTime: result.finishTime,
                status: result.status
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
                        <label className="form-group" style={{ width: "600px" }}> RentId
                            <label className="form-control"> {this.state.rentId} </label>
                                </label>
                                <label className="form-group" style={{ width: "600px" }}> OldUserId
                            <label className="form-control"> {this.state.OldUserId} </label>
                                </label>
                                <label className="form-group" style={{ width: "600px" }}> UserId
                        <Select options={this.state.optionsUserId} onChange={this.changeUserId}>
                                    </Select>
                                </label>
                                <label className="form-group" style={{ width: "600px" }}> StartTime
                            <input className="form-control" type="datetime-local" id="StartTime" name="StartTime" value={this.state.startTime} onChange={this.changeStartTime} />
                            </label>
                            <label className="form-group" style={{ width: "600px" }}> FinishTime
                            <input className="form-control" type="datetime-local" id="FinishTime" name="FinishTime" value={this.state.finishTime} onChange={this.changeFinishTime} />
                            </label>
                            <label className="form-group" style={{ width: "600px" }}> Status
                            <select className="form-control" value={this.state.status} onChange={this.changeStatus}>
                                    <option selected value="Rent" >Rent</option>
                                    <option value="Finish">Finish</option>
                                </select>
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

export default EditRent;