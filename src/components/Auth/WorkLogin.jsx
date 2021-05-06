import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { baseUrl } from '../baseURL';
import getCookie from '../baseURL';

class WorkLogin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Login: "",
            Passord: "",
            text: ["", "", "", "", ""],
            ua: ["Назад", "Вхід", "Логін", "Пароль", "Увійти"],
            en: ["Back", "LogIn", "Login", "Password", "LogIn"],

        }

        this.Login = this.Login.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


        this.changeLogin = this.changeLogin.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    setCookie(name, value, options = {}) {

        options = {
            path: '/',
            // при необходимости добавьте другие значения по умолчанию
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    }

    async Login(Login, Password) {
        const newAccount = {
            login: Login,
            password: Password
        }
        fetch(baseUrl + "/WorkerAuth/Login", {
            method: 'POST',
            body: JSON.stringify(newAccount),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'same-origin'
        }).then(result => result.json())
        .then(response => {
            if(response?.message) {
                alert(response.message)
            } else {
                this.setCookie("Jwt", response.token, { 'max-age': 3600 });
                this.setCookie("refreshToken", response.refreshToken, { 'max-age': 3600 });
                window.location.href = `/workpanel`;
            }
        }).catch(error => {
            console.error('Error:', error);
        })
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    handleSubmit = event => {
        if (this.validateEmail(this.state.Login)) {
            if (this.state.Password.length >= 6 && this.state.Password.length <= 20) {
                this.Login(this.state.Login, this.state.Password);
            } else {
                alert("Неверный пароль")
            }
        } else {
            alert("Неверная почта")
        }
        event.preventDefault();
    }

    changeLogin(event) {
        this.setState({ Login: event.target.value });
    }

    changePassword(event) {
        this.setState({ Password: event.target.value });
    }

    back() {
        window.location.href = "/index";
    }

    componentDidMount() {
        let l = getCookie("lan");
        if (l == "ua") {
            this.setState({ text: this.state.ua });
        } else if (l == "en") {
            this.setState({ text: this.state.en });
        } else {
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
                > {this.state.text[0]}
                </Button>
                <div className="col-12">

                </div>
                <div style={{ width: "600px", height: "480px", marginLeft: "20%", marginTop: "10%" }}>
                    <h2 style={{ alingCenter: "center", marginLeft: "150px", marginBottom: "40px" }}>{this.state.text[1]}</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className="form-group" style={{ width: "600px" }}> {this.state.text[2]}
                                <input className="form-control" id="Login" name="Login" value={this.state.Login} onChange={this.changeLogin} />
                            </label>
                            <label className="form-group" style={{ width: "600px" }}> {this.state.text[3]}
                                <input className="form-control" type="password" id="Password" name="Password" value={this.state.Password} onChange={this.changePassword} />
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

export default WorkLogin;