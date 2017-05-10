import querystring from 'querystring';

class Api {
    constructor() {

    }

    search(config) {
        const query = querystring.stringify(config);
        return fetch(`/search?${query}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(response => {
                return response;
            });
    }
}

export default Api;
