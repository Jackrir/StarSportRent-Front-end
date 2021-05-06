import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { baseUrl } from '../baseURL';
import getCookie from '../baseURL';
import Select from 'react-select';
import refreshToken from '../RefreshToken';


class AddTypeOfItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            CategoryId: 0,
            Name: "",
            Info: "",

            text : ["","","","",""],
            ua: ["Введіть назву", "Виберіть категорію", "Назад", "Додати тип", "Додати"],
            en: ["Enter a name", "Choose a category", "Back", "Add type", "Add"],


            isLoaded: false,
            optionsCategoryId: null
        }

        this.addTypeOfItem = this.addTypeOfItem.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


        this.changeName = this.changeName.bind(this);
        this.changeInfo = this.changeInfo.bind(this);
        this.changeCategoryId = this.changeCategoryId.bind(this);
    }


    addTypeOfItem(CategoryId, Name, Info) {
        const newAccount = {
            CategoryId: CategoryId,
            Name: Name,
            Info: Info
        }
        fetch(baseUrl + "/db/TypeOfItem/Add", {
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
        if (this.state.LocationId != 0) {
            if (this.state.Name != "") {
                this.addTypeOfItem(this.state.CategoryId, this.state.Name, this.state.Info);
            } else {
                alert(this.state.text[0])
            }
        } else {
            alert(this.state.text[1])
        }
        event.preventDefault();
    }

    changeCategoryId = (selectedOptions) => {
        this.setState({ CategoryId: selectedOptions.value });
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


    fillCategoryId(result) {
        var res = [];
        var i = 0;
        result.forEach(element => {
            res[i] = {
                value: element.categoryId,
                label: element.categoryId + " " + element.name,
            };
            i++;
        });
        return res;
    }

    componentDidMount() {
        let l = getCookie("lan");
        if (l == "ua") {
            this.setState({ text: this.state.ua});
        } else if (l == "en") {
            this.setState({ text: this.state.en});
        }

        fetch(baseUrl + "/db/Category/Get", {
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
                        isLoaded: true,
                        optionsCategoryId: this.fillCategoryId(result)
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    render() {
        if (!this.state.isLoaded) {
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
                > {this.state.text[2]}
                </Button>
                <div className="col-12">

                </div>
                <div style={{ width: "600px", height: "480px", marginLeft: "20%", marginTop: "10%" }}>
                    <h2 style={{ alingCenter: "center", marginLeft: "150px", marginBottom: "40px" }}>{this.state.text[3]}</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className="form-group" style={{ width: "600px" }}> CategoryId
                        <Select options={this.state.optionsCategoryId} onChange={this.changeCategoryId}>
                                </Select>
                            </label>
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
                            > {this.state.text[4]}
                    </button>
                        </div>
                    </form>

                </div>
            </div>
        );
        }
    }
}

export default AddTypeOfItem;