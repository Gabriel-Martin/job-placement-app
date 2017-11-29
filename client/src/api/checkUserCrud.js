const baseURL = (path = "") => `http://localhost:4040/api/checkuser/${path}`;

const checkUser = () => {
  return fetch(baseURL(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

export default {
  checkUser
};
