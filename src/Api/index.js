import querystring from 'querystring';

function createRequest(url) {
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(data => data);
}

class Api {
    constructor() {

    }

    search(config) {
        const query = querystring.stringify(config);
        return createRequest(`/search?${query}`);
    }

    loadTasks() {
        return createRequest('/tasks');
    }

    loadCategories() {
        return createRequest('/categories');
    }

    addCategory({ title, parent }) {
        return fetch('/category', {
            method: 'POST',
            body: JSON.stringify({ title, parent }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => data);
    }

    editCategory({ id, title }) {
      return fetch(`/category${id}`, {
          method: 'PUT',
          body: JSON.stringify({ title }),
          headers: {
              'Content-Type': 'application/json'
          }
      })
          .then(response => {
              if (response.ok) {
                  return response.json();
              }
          })

    }
}

export default Api;
