//export const baseUrl = 'https://b20c443ec594.ngrok.io/api';
//export const baseUrl = 'https://localhost:44309/api';
export const baseUrl = 'https://starsportrent.azurewebsites.net/api';
export default function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}