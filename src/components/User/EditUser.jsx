import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { baseUrl } from '../baseURL';
import getCookie from '../baseURL';
import refreshToken from '../RefreshToken';

class EditUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            UserId: 0,
            Email: "",
            Name: "",
            Role: "user",

            text : ["","","","","",""],
            ua: ["Невірний нік", "Невірна пошта", "Назад", "Змінити користувача", "Змінити"],
            en: ["Invalid nickname", "Invalid mail", "Back", "Edit user", "Edit"],


            isLoaded: false
        }

        this.editUser = this.editUser.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


        this.changeEmail = this.changeEmail.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeRole = this.changeRole.bind(this);
    }

    editUser(UserId, Email, Name, Role) {
        const newAccount = {
            UserId: UserId,
            Email: Email,
            Name: Name,
            Role: Role
        }
        fetch(baseUrl + "/db/User/Update", {
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

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    handleSubmit = event => {
        if (this.validateEmail(this.state.Email)){
            if(this.state.Name.length > 6 && this.state.Name.length < 20){
                this.editUser(this.state.UserId,this.state.Email, this.state.Name, this.state.Role);
            } else{
                alert(this.state.text[0])
            }
        } else{
            alert(this.state.text[1])
        }
        event.preventDefault();
    }

    changeEmail(event) {
        this.setState({ Email: event.target.value });
    }

    changeName(event) {
        this.setState({ Name: event.target.value });
    }

    changeRole(event) {
        this.setState({ Role: event.target.value });
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

        console.log(this.props.match.params.UserId)

        fetch(baseUrl + "/db/User/GetId/" + this.props.match.params.UserId,
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
                isLoaded: true,
                UserId: result.userId,
                Email: result.email,
                Name: result.name,
                Password: result.password,
                Role: result.role
            });
        }
    }).catch(error => {
        console.error('Error:', error);
    })
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
                            <label className="form-group" style={{ width: "600px" }}> UserId
                            <label className="form-control"> {this.state.UserId} </label>
                                </label>
                                <label className="form-group" style={{ width: "600px" }}> Email
                            <input className="form-control" id="Email" name="Email" value={this.state.Email} onChange={this.changeEmail} />
                                </label>
                                <label className="form-group" style={{ width: "600px" }}> Name
                            <input className="form-control" id="Name" name="Name" value={this.state.Name} onChange={this.changeName} />
                                </label>
                                <label className="form-group" style={{ width: "600px" }}> Role
                            <select className="form-control" value={this.state.Role} onChange={this.changeRole}>
                                        <option selected value="user" >user</option>
                                        <option value="admin">admin</option>
                                        <option value="worker">worker</option>
                                    </select>
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

export default EditUser;