

export function requestInerceptor(resource, init) {
    return fetch( resource, {
        ...init,
        headers: {
            'content-type': 'application/json',
            ...init.headers
        }
    })

};

export function responseInterceptor(response) {
    if(response.ok) {
        return response.json();
    } else {
        return response.json().then(data => {
            let error = new Error(response.status);
            error.response = data;
            error.status = response.status;
            throw error;
        })
    }

};