import React, { Component } from 'react';
import { Button } from 'reactstrap';
import getCookie from './baseURL';


class WorkerPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {

            text : ["","","","","",""],
            ua: ["Створення оренди", "Бронювання", "Обслуговування", "Просрочення", "Розрахунок", "Вихід"],
            en: ["Create rent", "Booking", "Maintenance","Delay","Calculate","LogOut"],

        }
    }
    
    toCreateRent() {
        window.location.href = "/createrent";
    }

    toBookingRent() {
        window.location.href = "/bookingrent";
    }

    toDelay() {
        window.location.href = "/delay";
    }
    
    toPay() {
        window.location.href = "/pay";
    }

    toMaintenance() {
        window.location.href = "/maintenance";
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

      deleteCookie(name) {
        this.setCookie(name, "", {
          'max-age': -1
        })
      }

    back() {
        this.deleteCookie("Jwt");
        this.deleteCookie("refreshToken");
        window.location.href = "/worklogin";
    }

    componentDidMount() {
        if (getCookie("Jwt") == null) {
            window.location.href="/adminlogin";
        }
        let l = getCookie("lan");
        if (l == "ua") {
            this.setState({ text: this.state.ua});
        } else if (l == "en") {
            this.setState({ text: this.state.en});
        }
        if (getCookie("Jwt") == null) {
            window.location.href="/workerlogin";
        }
    }

    render() {
        return (
            <div className="container">
                <Button
                    className="btn btn-primary btn-lg disabled"
                    onClick={(event) => this.back()}
                    style={{ width: '20%', backgroundColor: '#003F00', marginBottom: "20px", marginTop: "50px" }}
                > {this.state.text[5]}
                </Button>
                <div className="col-12">

                </div>
                <div style={{ width: "600px", height: "480px", marginLeft: "20%", marginTop: "10%" }}>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                        <Button
                    className="btn btn-primary btn-lg disabled"
                    onClick={(event) => this.toCreateRent()}
                    style={{ width: '600px', backgroundColor: '#00AF00', marginBottom: "20px" }}
                > {this.state.text[0]}
                </Button>
                <Button
                    className="btn btn-primary btn-lg disabled"
                    onClick={(event) => this.toBookingRent()}
                    style={{ width: '600px', backgroundColor: '#00AF00', marginBottom: "20px" }}
                > {this.state.text[1]}
                </Button>
                <Button
                    className="btn btn-primary btn-lg disabled"
                    onClick={(event) => this.toMaintenance()}
                    style={{ width: '600px', backgroundColor: '#00AF00', marginBottom: "20px" }}
                > {this.state.text[2]}
                </Button>
                <Button
                    className="btn btn-primary btn-lg disabled"
                    onClick={(event) => this.toDelay()}
                    style={{ width: '600px', backgroundColor: '#00AF00', marginBottom: "20px" }}
                > {this.state.text[3]}
                </Button>
                <Button
                    className="btn btn-primary btn-lg disabled"
                    onClick={(event) => this.toPay()}
                    style={{ width: '600px', backgroundColor: '#00AF00', marginBottom: "20px"}}
                > {this.state.text[4]}
                </Button>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}

export default WorkerPanel;