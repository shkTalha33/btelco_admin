import { useSelector } from "react-redux";

export const useAuth = () => {
    //getting token from local storage
    const isLogin = useSelector(state => state.auth.isLogin)

    //checking whether token is preset or not
    if (isLogin) {
        return true;
    } else {
        return false
    }
};