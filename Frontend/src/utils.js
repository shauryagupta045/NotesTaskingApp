import {toast} from "react-toastify";

export const handleSuccess = (msg) =>{
    toast.success(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        });

}

export const handlError = (msg) =>{
    toast.error(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
    });
}