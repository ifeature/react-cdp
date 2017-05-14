import querystring from 'querystring';

function createRequest(url, options = {}) {
    return fetch(url, {
        method: options.method || 'GET',
        body: options.body || null,
        headers: options.headers || {}
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(data => data);
}

class Api {
    constructor(config = {}) {
        Object.assign(this, ...config);
    }

    search(config) {
        const query = querystring.stringify(config);
        return createRequest(`/search?${query}`);
    }

    addTask({ title, category }) {
        return createRequest('/tasks', {
            method: 'POST',
            body: JSON.stringify({ title, category }),
            headers: { 'Content-Type': 'application/json' }
        });
    }

    editTask({ id, title, description, done }) {
        return createRequest(`/tasks/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, description, done }),
            headers: { 'Content-Type': 'application/json' }
        });
    }

    loadTasks() {
        return createRequest('/tasks');
    }

    loadCategories() {
        return createRequest('/categories');
    }

    addCategory({ title, parent }) {
        return createRequest('/categories', {
            method: 'POST',
            body: JSON.stringify({ title, parent }),
            headers: { 'Content-Type': 'application/json' }
        });
    }

    updateCategory({ id, title }) {
        return createRequest(`/categories/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title }),
            headers: { 'Content-Type': 'application/json' }
        });
    }

    deleteCategory({ id }) {
        return createRequest(`/categories/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export default Api;
