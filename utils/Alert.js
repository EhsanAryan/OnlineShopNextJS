import swal from "sweetalert";

export const Alert = (title, text, icon=null, buttonText="OK") => {
    return swal({
        title,
        text,
        icon,
        button: buttonText
    });
}

export const Confirm = (title, text, icon=null, cancelText="Cancel", confirmText="OK", dangerMode=true) => {
    return swal({
        title,
        text,
        icon,
        buttons: [cancelText, confirmText],
        dangerMode
    });
}