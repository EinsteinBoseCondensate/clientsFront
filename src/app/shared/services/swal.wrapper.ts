import Swal, { SweetAlertIcon } from "sweetalert2";

export function SwalFire(title: string, text: string, icon: SweetAlertIcon){
    Swal.fire({
        title: title,
        text:text,              
      heightAuto: false,
      icon: icon
      })
}