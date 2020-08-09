import axios from "axios";

export const addSubscriber = function (email, success) {
  axios
    .post("https://note-lu.herokuapp.com/api/subscribers/add", { email: email })
    .then(function (response) {
      success(true);
    })
    .catch(function (error) {
      success(false);
    });
};
