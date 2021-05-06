import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { baseUrl } from '../baseURL';
import getCookie from '../baseURL';
import refreshToken from '../RefreshToken';


class AddCategory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Name: "",
            Info: "",

            text : ["","","",""],
            ua: ["Введіть назву", "Назад", "Додати категорію", "Додати"],
            en: ["Enter a name "," Back "," Add category "," Add "],

        }

        this.addCategory = this.addCategory.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


        this.changeName = this.changeName.bind(this);
    }


    addCategory(Name, Info) {
        const newAccount = {
            Name: Name,
            Info: Info
        }
        fetch(baseUrl + "/db/Category/Add", {
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
            this.addCategory(this.state.Name, this.state.Info);
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

export default AddCategory;