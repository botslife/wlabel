export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    const kcJwt = localStorage.getItem('kcJwt');

    if (user && user.access_token) {
        return { Authorization: 'Bearer ' + kcJwt }; // for Spring Boot back-end
        //return { 'x-access-token': user.accessToken }; // for Node.js Express back-end
    } else {
        return null;

    }
}