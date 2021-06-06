import React, { Component } from 'react';
import getCookie from './baseURL';

class Index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lan: null,
            text : ["","","",""],
            ua: ["Увійти (тільки для адміністратора та працівника)", "Зручний додаток для працы знами. Де ви зможете бронуювати та пыдбирати під конкретний спорт одяг та спорядження.", "Скачати","Увійти (тільки для працівників)"],
            en: ["Login (admin and worker only)", "Convenient application for banners. Where you can book and choose clothes and equipment for a specific sport. ", "Download", "Login (worker only)"],
            appStyle1: {
                backgroundColor: "",
              },
        
              appStyle2: {
                backgroundColor: "",
              }
        }

        this.changeRadio = this.changeRadio.bind(this);
    }

    submit() {
        window.location.href = "/adminlogin";
    }

    worker() {
        window.location.href = "/workerlogin";
    }

    changeRadio (event) {
        console.log(this.state.lan)
        event.preventDefault();
        let newStyle1;
        let newStyle2;
        if(this.state.lan === "ua") {
            newStyle1 = { backgroundColor: "#00A100" };
            newStyle2 = {  backgroundColor: "" };
            document.cookie = "lan=en";
            this.setState({ text: this.state.en });
        } else {
            newStyle1 = {  backgroundColor:  "" };
            newStyle2 = {  backgroundColor: "#00A100" };
            document.cookie = "lan=ua";
            this.setState({ text: this.state.ua });
        }
        this.setState({ lan : event.target.value, appStyle1: newStyle1, appStyle2: newStyle2});
    }

    componentDidMount() {
        let l = getCookie("lan");
        if(l != "ua" && l != "en") {
            document.cookie = "lan=en";
            let newStyle1 = { backgroundColor: "#00A100" };
            this.setState({ lan : "en", appStyle1: newStyle1, text: this.state.en});
        } else if (l == "ua") {
            let newStyle1 = { backgroundColor: "#00A100" };
            this.setState({ lan : "ua", appStyle2: newStyle1, text: this.state.ua});
        } else if (l == "en") {
            let newStyle1 = { backgroundColor: "#00A100" };
            this.setState({ lan : "en", appStyle1: newStyle1, text: this.state.en});
        }
        
    }

    render() {
        return (
            <div style={{ width: "1879px", height: "970px", backgroundImage: "url(./Wall.jpg)" }}>
                <nav class="navbar navbar-light bg-light">
                    <span class="navbar-brand mb-0 h1">StarSportRent</span>
                    <div class="btn-group btn-group-toggle" data-toggle="buttons" onChange={this.changeRadio} style={{marginLeft: "60%"}}>
                        <label class="btn btn-secondary" style={this.state.appStyle1}>
                            <input type="radio" name="options" id="option1" autocomplete="off" value="en"/> en
                        </label>
                        <label class="btn btn-secondary" style={this.state.appStyle2}>
                            <input type="radio" name="options" id="option2" autocomplete="off" value="ua" /> ua
                        </label>
                    </div>
        <button class="btn btn-outline-success my-2 my-sm-0" style={{marginLeft: "1%"}} onClick={this.submit}>{this.state.text[0]}</button>
                </nav>
                <div style={{ width: "500px", height: "170px", marginLeft: "70%", marginTop: "250px", backgroundColor: "#858585", opacity: 0.8, borderRadius: "20px" }}>
                    <p style={{ paddingTop: "20px", paddingLeft: "20px", paddingRight: "20px" }} class="text-white">
                    {this.state.text[1]}
                    </p>
                    <button style={{ marginLeft: "30%", marginRight: "20%", width: "200px", height: "50px" }} class="btn btn-success">{this.state.text[2]}</button>
                </div>
            </div>
        );
    }
}

export default Index;