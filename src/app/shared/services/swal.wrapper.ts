import Swal, { SweetAlertIcon } from "sweetalert2";

export function SwalFire(title: string, text: string, icon: SweetAlertIcon) {
  Swal.fire({
    title: title,
    text: text,
    heightAuto: false,
    icon: icon
  })
}

export function SwalFireNoButtons(title: string, text: string, icon: SweetAlertIcon, timeout: number) {
  Swal.fire({
    title: title,
    text: text,
    heightAuto: false,
    showConfirmButton: false,
    icon: icon,
    timer: timeout
  })
}