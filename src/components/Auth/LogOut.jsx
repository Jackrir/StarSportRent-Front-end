import React, { Component } from 'react';

class LogOut extends Component {

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

    componentDidMount() {
        this.deleteCookie("Jwt");
        this.deleteCookie("refreshToken");
        window.location.href = `/index`;
    }

    render() {
        return (<div className="container"></div>)}
}

export default LogOut