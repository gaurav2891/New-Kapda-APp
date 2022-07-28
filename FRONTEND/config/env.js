import { DEV_BACKEND_URL, PROD_BACKEND_URL } from "@env";

// const DEV_BACKEND_URL = "http://192.168.1.4:8000";
// const PROD_BACKEND_URL = "https://kapdaa-app.herokuapp.com";
// console.log(DEV_BACKEND_URL);

export default __DEV__ ? DEV_BACKEND_URL : PROD_BACKEND_URL;
