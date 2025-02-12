/* eslint-disable no-unused-vars */
import { jwtDecode } from 'jwt-decode';

const isTokenExpired = (token) => {
    if (!token) return true;

    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp < currentTime;

};
const isRefTokenExp = (token) => {
    if (!token) return true;

    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp < currentTime;

};

export { isRefTokenExp, isTokenExpired };

