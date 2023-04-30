import axios from "axios";
import jwtDecode from "jwt-decode";

const API_URL = "http://localhost:11000/auth/realms/fencedev/protocol/openid-connect/";

class AuthService {

    login(username, password) {
        const grant_type = "password";
        const auth_header = "Basic Y29yZTplYzUxNTBjYi1jM2I5LTQ5ODctYWRkMC1jMzM4YjU0MThlMDQ =";
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        params.append('grant_type', grant_type);
        return axios
            .post(API_URL + "token", params, {
                headers: {
                    'Authorization': auth_header,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => {
                if (response.data) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    localStorage.setItem("kcJwt", response.data.access_token);
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("kcJwt");
    }

    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            return user;
        }else{
            return null;
        }
    }

    getKcJwt() {
        const kcJwt = localStorage.getItem("kcJwt");
        if(typeof kcJwt == "string"){
            return kcJwt;
        }else{
            return null;
        }
    }

    isExpired(){
        const token = localStorage.getItem("kcJwt");
        if(!token){
            return true;
        }else{
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            const isExpired = decoded.exp < currentTime;
            return isExpired;
        }
        
    }

    getDecodedJwt(){
        if(!this.isExpired()){
            const kcJwt = this.getKcJwt();
            if(typeof kcJwt == "string"){
                return jwtDecode(kcJwt); 
            }else{
                return null;
            }
        }else{
            return null;
        }
    }
}

export default new AuthService();