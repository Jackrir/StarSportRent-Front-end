import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { DataGrid } from '@material-ui/data-grid';
import { baseUrl } from '../baseURL';
import getCookie from '../baseURL';
import refreshToken from '../RefreshToken';

class DelayRent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { field: 'rentId', headerName: 'RentId', width: 200 },
                { field: 'userId', headerName: 'UserId', width: 200 },
                { field: 'startTime', headerName: 'StartTime', width: 200 },
                { field: 'finishTime', headerName: 'FinishTime', width: 200 },
                { field: 'status', headerName: 'Status', width: 130 }
            ],
            rows: [],



            text : [""],
            ua: ["Назад"],
            en: [ "Back "],

            isLoaded: false,
            currentRow: null
        }

        this.dataGridDemo = this.dataGridDemo.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    back() {
        window.location.href = "/workpanel";
    }

    dataGridDemo(state) {
        return (
            <div style={{ height: 700, width: '100%' }}>
                <Button
                    className="btn btn-primary btn-lg disabled"
                    onClick={(event) => this.back()}
                    style={{ width: '20%', backgroundColor: '#003F00', marginBottom: "20px", marginTop: "50px" }}
                > {this.state.text[0]}
                </Button>
                <DataGrid rows={state.rows} columns={state.columns} pageSize={11}
                />
            </div>
        );
    }

    fillRows(result) {
        var res = [];
        var i = 0;
        result.forEach(element => {
            res[i] = {
                id: i,
                rentId: element.rentId,
                userId: element.userId,
                startTime: element.startTime,
                finishTime: element.finishTime,
                status: element.status
            };
            i++;
        });
        return res;
    }

    componentDidMount() {
        if (getCookie("Jwt") == null) {
            window.location.href="/workerlogin";
        }
        let l = getCookie("lan");
        if (l == "ua") {
            this.setState({ text: this.state.ua});
        } else if (l == "en") {
            this.setState({ text: this.state.en});
        }
        fetch(baseUrl + "/Worker/GetDelayRent", {
            method: "GET",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'token': `${getCookie("Jwt")}`,
                'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'same-origin'
        })
        .then(result => result.json())
    .then(response => {
        if(response?.message) {
            //refreshToken().then(
                //this.componentDidMount())
        } else {
            this.setState({
                isLoaded: true,
                rows: this.fillRows(response)
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
                this.dataGridDemo(this.state)
            );
        }
    }
}

export default DelayRent;