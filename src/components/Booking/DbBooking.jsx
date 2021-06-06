import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { DataGrid } from '@material-ui/data-grid';
import { baseUrl } from '../baseURL';
import getCookie from '../baseURL';
import refreshToken from '../RefreshToken';

class DbBooking extends Component {

    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { field: 'bookingId', headerName: 'BookingId', width: 200 },
                { field: 'itemId', headerName: 'ItemId', width: 200 },
                { field: 'userId', headerName: 'UserId', width: 200 },
                { field: 'finishBooking', headerName: 'FinishBooking', width: 200 }
            ],
            rows: [],



            text : ["","",""],
            ua: ["Додати", "Змінити", "Видалити"],
            en: [ "Add "," Edit "," Delete "],

            isLoaded: false,
            currentRow: null
        }

        this.dataGridDemo = this.dataGridDemo.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    addBooking() {
        window.location.href = "/addBooking";
    }

    setSelection(row) {
        this.setState({ currentRow: row[0] });
    }

    editBooking() {
        if(this.state.currentRow != null){
            window.location.href = `/editBooking/${this.state.currentRow}`;
        } else{
            alert("Выберите поле");
        }
    }

    deleteSucces(id) {
        fetch(baseUrl + "/db/Booking/Delete/" + id, {
            method: "DELETE",
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
                    this.componentDidMount()
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

    deleteBooking() {
        if(this.state.currentRow != null){
            let isSucces = window.confirm(`Удалить бронирование с ${this.state.currentRow} id ?`);
            if(isSucces){
                this.deleteSucces(this.state.currentRow);
                this.state.currentRow = null;
            }
        } else{
            alert("Выберите поле");
        }
    }

    dataGridDemo(state) {
        return (
            <div style={{ height: 700, width: '100%' }}>
                <Button
                    className="btn btn-primary btn-lg disabled"
                    onClick={(event) => this.addBooking()}
                    style={{ width: '100%', backgroundColor: '#006F00', marginBottom: "20px" }}
                > {this.state.text[0]}
                </Button>
                <DataGrid rows={state.rows} columns={state.columns} pageSize={11}
                    onSelectionModelChange={(newSelection) => {
                        this.setSelection(newSelection.selectionModel);
                      }}
                />
                <Button
                    className="btn btn-primary btn-lg disabled"
                    onClick={(event) => this.editBooking()}
                    style={{ width: '45%', backgroundColor: '#006F00', marginTop: "20px", marginRight: "10%" }}
                > {this.state.text[1]}
                </Button>
                <Button
                    className="btn btn-primary btn-lg disabled"
                    onClick={(event) => this.deleteBooking()}
                    style={{ width: '45%', backgroundColor: '#003600', marginTop: "20px" }}
                > {this.state.text[2]}
                </Button>
            </div>
        );
    }

    fillRows(result) {
        var res = [];
        var i = 0;
        result.forEach(element => {
            res[i] = {
                id: element.bookingId,
                bookingId: element.bookingId,
                itemId: element.itemId,
                userId: element.userId,
                finishBooking: element.finishBooking
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
        fetch(baseUrl + "/db/Booking/Get", {
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
            refreshToken().then(
                this.componentDidMount())
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

export default DbBooking;