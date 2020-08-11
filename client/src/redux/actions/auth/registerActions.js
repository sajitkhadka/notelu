import axios from "axios";
import { server } from "../../../config";

export const submitRegister = (user, fn) => {
  console.log(user);
  axios
    .post(`${server}/api/users/register`, {
      name: user.name,
      email: user.email,
      dob: user.bdate,
      password: user.password,
    })
    .then((response) => {
      fn(true, response.data.message);
    })
    .catch((err) => {
      if (err.response) {
        fn(false, err.response.data.message);
      } else {
        fn(false, "There was a network issue!");
      }
    });
};
