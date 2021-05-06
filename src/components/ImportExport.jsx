import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { baseUrl } from './baseURL';
import getCookie from './baseURL';

class ImportExport extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    handleSubmit = event => {
        let formData = new FormData();

        formData.append('file', this.fileInput.current.files[0]);
        formData.append('filename', this.fileInput.current.files[0].name);

        fetch(baseUrl + "/ImportExport/Import", {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'token': getCookie("Jwt"),
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
        event.preventDefault();
    }

    export() {
        fetch(baseUrl + "/ImportExport/Export", {
            method: "GET",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'token': getCookie("Jwt"),
                'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'same-origin'
        })
            .then(response => response.blob())
            .then(blob => {
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = "db " + new Date() + ".xlsx";
                document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
                a.click();
                a.remove();  //afterwards we remove the element again         
            });;
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <input className="form-control-file" type="file" name="file" ref={this.fileInput} style={{ width: '30%', paddingTop: "200px", marginRight: "10%" }} />
                    <Button
                        className="btn btn-primary btn-lg disabled"
                        type="submit"
                        style={{ width: '45%', backgroundColor: '#006F00', marginTop: "10px", marginRight: "10%" }}
                    > Import
                </Button>
                <Button
                    className="btn btn-primary btn-lg disabled"
                    onClick={(event) => this.export()}
                    style={{ width: '45%', backgroundColor: '#003600', marginTop: "10px" }}
                > Export
                </Button>
                </form>
            </div>
        )
    }


}

export default ImportExport