import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { baseUrl } from '../baseURL';
import Select from 'react-select';
import getCookie from '../baseURL';
import refreshToken from '../RefreshToken';

class EditMaintenance extends Component {

    constructor(props) {
        super(props);

        this.state = {
            maintenanceId: 0,
            OldItemId: 0,
            itemId: 0,
                startTime: "",
                finishTime: "",

            text : ["","","","","",""],
            ua: ["Необрано обладнання", "Немає дат", "", "Назад", "Змінити огляд", "Змінити"],
            en: ["Invalid item", "Invalid date", "", "Back", "Edit maintenance", "Edit"],


            isLoaded1: false,
            isLoaded2: false,
            optionsItemId: null,
        }

        this.editMaintenance = this.editMaintenance.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


        this.changeItemId = this.changeItemId.bind(this);
        this.changeStartTime = this.changeStartTime.bind(this);
        this.changeFinishTime = this.changeFinishTime.bind(this);
    }

    editMaintenance(MaintenanceId,ItemId, StartTime, FinishTime) {
        const newAccount = {
            MaintenanceId: MaintenanceId,
            ItemId: ItemId,
            StartTime: StartTime,
            FinishTime: FinishTime
        }
        fetch(baseUrl + "/db/Maintenance/Update", {
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
            if(this.state.startTime.length > 0 && this.state.finishTime.length > 0){
                this.editMaintenance(this.state.maintenanceId, this.state.itemId, this.state.startTime, this.state.finishTime);
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

    changeStartTime(event) {
        this.setState({ startTime: event.target.value });
    }

    changeFinishTime(event) {
        this.setState({ finishTime: event.target.value });
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
                        isLoaded2: true,
                        optionsItemId: this.fillItemId(result)
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

        fetch(baseUrl + "/db/Maintenance/GetId/" + this.props.match.params.MaintenanceId,
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
                maintenanceId: result.maintenanceId,
                OldItemId: result.itemId,
                startTime: result.startTime,
                finishTime: result.finishTime
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
                        <label className="form-group" style={{ width: "600px" }}> MaintenanceId
                            <label className="form-control"> {this.state.maintenanceId} </label>
                                </label>
                                <label className="form-group" style={{ width: "600px" }}> OldItemId
                            <label className="form-control"> {this.state.OldItemId} </label>
                                </label>
                                <label className="form-group" style={{ width: "600px" }}> ItemId
                        <Select options={this.state.optionsItemId} onChange={this.changeItemId}>
                                    </Select>
                                </label>
                                <label className="form-group" style={{ width: "600px" }}> StartTime
                            <input className="form-control" type="datetime-local" id="StartTime" name="StartTime" value={this.state.startTime} onChange={this.changeStartTime} />
                            </label>
                            <label className="form-group" style={{ width: "600px" }}> FinishTime
                            <input className="form-control" type="datetime-local" id="FinishTime" name="FinishTime" value={this.state.finishTime} onChange={this.changeFinishTime} />
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

export default EditMaintenance;