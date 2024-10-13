import { API_URL } from "../config/constants";
import { requestInerceptor, responseInterceptor } from "../config/interceptor"


const request = async (resource, init) => {
    try {
            const response = await requestInerceptor(resource, init);

             return await responseInterceptor(response); 
            
    } catch( error ) {
        console.error(`Ha ocruttido un error al pedir el recurso ${resource} con el
            mensaje ${error.message}`)
            throw error;
    }
}




class ApiService{
    constructor(){}
 
    async getUserApi() {
        try {
            const response = await fetch("http://localhost/api/users", {
                method: "GET",
                headers: {
                    'content-type': 'application/json'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    async get( endpoint, params = {}, options = {} ){
        const url = new URL(API_URL + endpoint);
        Object.keys(params).forEach( key => url.searchParams.append(key, params[key]));
        return request(url, {
            method: 'GET',
            header: 'headers' in options ? options.headers : {},
            ...options
        })
    }

    
    async post ( endpoint, body, options = {} ) {
        const url  = new URL( API_URL + endpoint );
        return request(url, {
            method: 'post',
            headers: 'headers' in options ? options.headers : {},
            body: JSON.stringify(body),
            ...options
        })
    }

}

export default ApiService;