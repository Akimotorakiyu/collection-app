import axios from "axios";

let myAxios = axios.create();

myAxios.interceptors.request.use(value => {
  return value;
});

// myAxios.interceptors.response.use(
//   value => {
//     return value;
//   }
// );

export default myAxios;

/**
 * 为myAxios设置token
 * @remarks https://jwt.io/introduction/
 * @param AUTH_TOKEN - AUTH_TOKEN
 */
export function setAuthorization(authorization: string) {
  myAxios.defaults.headers.common["Authorization"] = authorization;
}
