import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { DataGrid } from '@material-ui/data-grid';
import { baseUrl } from '../baseURL';
import getCookie from '../baseURL';
import refreshToken from '../RefreshToken';

class DbTypeItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { field: 'itemId', headerName: 'ItemId', width: 200 },
                { field: 'typeId', headerName: 'TypeId', width: 200 }
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

    addTypeItem() {
        window.location.href = "/addTypeItem";
    }

    setSelection(row) {
        this.setState({ currentRow: {itemId: row.itemId, typeId: row.typeId} });
    }

    deleteSucces(element) {
        fetch(baseUrl + "/db/TypeItem/Delete/" + element.typeId + "/" + element.itemId, {
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

    deleteTypeItem() {
        if(this.state.currentRow != null){
            let isSucces = window.confirm(`Удалить cвязь оборудования с ${this.state.currentRow.itemId} id и типом с ${this.state.currentRow.typeId} id?`);
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
                    onClick={(event) => this.addTypeItem()}
                    style={{ width: '100%', backgroundColor: '#006F00', marginBottom: "20px" }}
                > {this.state.text[0]}
                </Button>
                <DataGrid rows={state.rows} columns={state.columns} pageSize={11}
                    onSelectionChange={(newSelection) => { this.setSelection(this.state.rows[newSelection.rowIds]); }}
                />
                <Button
                    className="btn btn-primary btn-lg disabled"
                    onClick={(event) => this.deleteTypeItem()}
                    style={{ width: '45%', backgroundColor: '#003600', marginTop: "720px", marginLeft: "55%" }}
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
                id: i,
                itemId: element.itemId,
                typeId: element.typeId
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
        fetch(baseUrl + "/db/TypeItem/Get", {
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

export default DbTypeItem;