import { baseUrl } from './baseURL';
import getCookie from './baseURL';

export default async function refreshToken() {
    fetch(baseUrl + "/RefreshToken/Refresh", {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'token': getCookie("refreshToken"),
            'Content-Type': 'application/json; charset=UTF-8'
        },
        credentials: 'same-origin'
    }).then(result => result.json())
    .then(response => {
        if(response?.message) {
            //alert(response.message)
        } else {
            setCookie("Jwt", response.token, { 'max-age': 3600 });
            setCookie("refreshToken", response.refreshToken, { 'max-age': 3600 });
        }
    }).catch(error => {
        console.error('Error:', error);
    })
}

export function setCookie(name, value, options = {}) {

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