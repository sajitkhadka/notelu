import axios from "axios";

export const submitRegister = (user, fn) => {
  console.log(user);
  axios
    .post("https://note-lu.herokuapp.com/api/users/register", {
      name: user.name,
      email: user.email,
      dob: user.bdate,
      password: user.password,
    })
    .then((response) => {
      fn(response.data.success);
    })
    .catch((err) => {
      if (err.response) {
        fn(false, err.response.data.message);
      } else {
        fn(false, "There was a network issue!");
      }
    });
};
