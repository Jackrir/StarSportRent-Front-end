import { rowCountSelector } from '@material-ui/data-grid';
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { baseUrl } from '../baseURL';
import getCookie from '../baseURL';
import refreshToken from '../RefreshToken';

class EditCategory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            CategoryId: 0,
            Name: "",
            Info: "",


            text : ["","","",""],
            ua: ["Введіть назву", "Назад", "Змінити категорію", "Змінити"],
            en: ["Enter a name "," Back "," Edit category "," Edit "],


            isLoaded: false
        }

        this.editCategory = this.editCategory.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


        this.changeName = this.changeName.bind(this);
        this.changeInfo = this.changeInfo.bind(this);
    }

    editCategory(CategoryId, Name, Info) {
        const newAccount = {
            CategoryId: CategoryId,
            Name: Name,
            Info: Info
        }
        fetch(baseUrl + "/db/Category/Update", {
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
        if(this.state.Name != ""){
            this.editCategory(this.state.CategoryId,this.state.Name, this.state.Info);
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

        fetch(baseUrl + "/db/Category/GetId/" + this.props.match.params.CategoryId,
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
                        isLoaded: true,
                        CategoryId: result.categoryId,
                        Name: result.name,
                        Info: result.info
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
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
                    > {this.state.text[1]}
                </Button>
                    <div className="col-12">

                    </div>
                    <div style={{ width: "600px", height: "480px", marginLeft: "20%", marginTop: "10%" }}>
                        <h2 style={{ alingCenter: "center", marginLeft: "150px", marginBottom: "40px" }}>{this.state.text[2]}</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                            <label className="form-group" style={{ width: "600px" }}> CategoryId
                            <label className="form-control"> {this.state.CategoryId} </label>
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
                                > {this.state.text[3]}
                    </button>
                            </div>
                        </form>

                    </div>
                </div>
            );
        }
    }
}

export default EditCategory;