const baseURL = (path = "") => `http://loaclhost:4040/api/company/${path}`;

const signUp = data => {
  return fetch(baseURL(), {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

const login = credentials => {
  return fetch(baseURL("login"), {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

const update = (id, data) => {
  return fetch(baseURL(id), {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

const remove = id => {
  return fetch(baseURL(id), {
    method: "DELETE"
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

const getAll = () => {
  return fetch(baseURL())
    .then(response => response.json())
    .catch(error => console.log(error));
};

const getById = id => {
  return fetch(baseURL(id))
    .then(response => response.json())
    .catch(error => console.log(error));
};

export default {
  signUp,
  login,
  update,
  remove,
  getAll,
  getById
};
