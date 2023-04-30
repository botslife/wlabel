import axios from 'axios';
import authHeader from './auth-header';

const COUNTRY_API_URL = 'http://localhost:11001/core/country';

class CountryService {
    getAllCountries() {
        return axios.get(COUNTRY_API_URL,{ headers: authHeader() });
    }
}

export default new CountryService();