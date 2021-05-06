import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { baseUrl } from '../baseURL';
import getCookie from '../baseURL';
import refreshToken from '../RefreshToken';


class AddItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Name: "",
            Info: "",
            URLphoto: "",
            CostPerHour: 0,
            Status: "",
            Cost: 0,
            Size: "",

            text : ["","","","",""],
            ua: ["Введіть назву", "Назад", "Додати обладнання", "Додати","Не всі данні заповненні"],
            en: ["Enter a name "," Back "," Add item "," Add ", "Fill all fields"],

        }

        this.addItem = this.addItem.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


        this.changeName = this.changeName.bind(this);
        this.changeInfo = this.changeInfo.bind(this);
        this.changeURLphoto = this.changeURLphoto.bind(this);
        this.changeCostPerHour = this.changeCostPerHour.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.changeCost = this.changeCost.bind(this);
        this.changeSize = this.changeSize.bind(this);
    }


    addItem(Name, Info, URLphoto, CostPerHour, Status, Cost, Size) {
        const newAccount = {
            Name: Name,
            Info: Info,
            URLphoto: URLphoto,
            CostPerHour: CostPerHour,
            Status: Status,
            Cost: Cost,
            Size: Size
        }
        fetch(baseUrl + "/db/Item/Add", {
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
                        alert("Ok");
                    }
                },
                (error) => {
                    alert(error);

                }
            );
    }

    handleSubmit = event => {
        if(this.state.Name != ""){
            if(this.state.URLphoto != "" && this.state.Status != "" &&  this.state.Size != "")
            {
                if(this.state.CostPerHour > 0 && this.state.Cost > 0)
                {
                    this.addItem(this.state.Name, this.state.Info, this.state.URLphoto, this.state.CostPerHour, this.state.Status, this.state.Cost, this.state.Size);
                }
                else 
                {
                    alert(this.state.text[4])
                }
            }
            else 
            {
                alert(this.state.text[4])
            }
            
        } else{
            alert(this.state.text[0])
        }
        event.preventDefault();
    }

    changeName(event) {
        this.setState({ Name: event.target.value });
    }

    changeInfo(event) {
        this.setState({ Info: event.target.value });
    }

    changeURLphoto(event) {
        this.setState({ URLphoto: event.target.value });
    }

    changeCostPerHour(event) {
        this.setState({ CostPerHour: parseInt(event.target.value) });
    }

    changeStatus(event) {
        this.setState({ Status: event.target.value });
    }

    changeSize(event) {
        this.setState({ Size: event.target.value });
    }

    changeCost(event) {
        this.setState({ Cost: parseInt(event.target.value) });
    }
    

    back() {
        window.location.href = "/db";
    }

    componentDidMount() {
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
                    <h2 style={{ alingCenter: "center", marginLeft: "150px", marginBottom: "40px" }}>{this.state.text[2]}</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className="form-group" style={{ width: "600px" }}> Name
                            <input className="form-control" id="Name" name="Name" value={this.state.Name} onChange={this.changeName} />
                            </label>
                            <label className="form-group" style={{ width: "600px" }}> Info
                            <input className="form-control" id="Info" name="Info" value={this.state.Info} onChange={this.changeInfo} />
                            </label>
                            <label className="form-group" style={{ width: "600px" }}> URLphoto
                            <input className="form-control" id="URLphoto" name="URLphoto" value={this.state.URLphoto} onChange={this.changeURLphoto} />
                            </label>
                            <label className="form-group" style={{ width: "600px" }}> CostPerHour
                            <input className="form-control" type="number" id="CostPerHour" name="CostPerHour" value={this.state.CostPerHour} onChange={this.changeCostPerHour} />
                            </label>
                            <label className="form-group" style={{ width: "600px" }}> Status
                            <select className="form-control" value={this.state.Status} onChange={this.changeStatus}>
                                    <option selected value="Rent" >Rent</option>
                                    <option value="Ok">Ok</option>
                                    <option value="Booking">Booking</option>
                                    <option value="Maintenances">Maintenances</option>
                                </select>
                            </label>
                            <label className="form-group" style={{ width: "600px" }}> Size
                            <input className="form-control" id="Size" name="Size" value={this.state.Size} onChange={this.changeSize} />
                            </label>
                            <label className="form-group" style={{ width: "600px" }}> Cost
                            <input className="form-control" type="number" id="Cost" name="Cost" value={this.state.Cost} onChange={this.changeCost} />
                            </label>
                            <button
                                className="btn btn-primary btn-lg disabled"
                                type="submit"
                                style={{ width: '600px', backgroundColor: '#00AF00', marginBottom: "20px", marginTop: "50px" }}
                            > {this.state.text[3]}
                    </button>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}

export default AddItem;