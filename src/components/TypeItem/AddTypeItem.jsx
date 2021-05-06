import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { baseUrl } from '../baseURL';
import Select from 'react-select';
import getCookie from '../baseURL';
import refreshToken from '../RefreshToken';


class AddTypeItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            itemId: 0,
                typeId: 0,

            text : ["","","","","",""],
            ua: ["Необрано обладнання", "Необрано тип", "", "Назад", "Додати зв'язок типу та обладнання", "Додати"],
            en: ["Invalid item", "Invalid type", "", "Back", "Add typeItem", "Add"],

            isLoaded1: false,
            isLoaded2: false,
            optionsTypeId: null,
            optionsItemId: null,
        }

        this.addTypeItem = this.addTypeItem.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


        this.changeItemId = this.changeItemId.bind(this);
        this.changeTypeId = this.changeTypeId.bind(this);
    }


    addTypeItem(ItemId,TypeId) {
        const newAccount = {
            ItemId: ItemId,
            TypeId: TypeId
        }
        fetch(baseUrl + "/db/TypeItem/Add", {
            method: 'POST',
            body: JSON.stringify(newAccount),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'token': getCookie("Jwt"),
                'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'same-origin'
        }).then(
            (response) => {
                if (response.ok) {
                    alert("Ok");
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

    handleSubmit = event => {
        if(this.state.itemId != 0) {
            if(this.state.typeId != 0){
                this.addTypeItem(this.state.itemId, this.state.typeId);
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

    changeTypeId = (selectedOptions) => {
        this.setState({ typeId: selectedOptions.value });
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

    fillTypeId(result) {
        var res = [];
        var i = 0;
        result.forEach(element => {
            res[i] = {
                value: element.typeId,
                label: element.typeId + " " + element.name
            };
            i++;
        });
        return res;
    }

    getType() {
        fetch(baseUrl + "/db/TypeOfItem/Get", {
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
                        optionsTypeId: this.fillTypeId(result)
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

        this.getItem();
        this.getType();
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
                > {this.state.text[3]}
                </Button>
                <div className="col-12">

                </div>
                <div style={{ width: "600px", height: "480px", marginLeft: "20%", marginTop: "10%" }}>
                    <h2 style={{ alingCenter: "center", marginLeft: "150px", marginBottom: "40px" }}>{this.state.text[4]}</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                        <label className="form-group" style={{ width: "600px" }}> ItemId
                        <Select options={this.state.optionsItemId} onChange={this.changeItemId}>
                                    </Select>
                                </label>
                                <label className="form-group" style={{ width: "600px" }}> TypeId
                        <Select options={this.state.optionsTypeId} onChange={this.changeTypeId}>
                                    </Select>
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

export default AddTypeItem;