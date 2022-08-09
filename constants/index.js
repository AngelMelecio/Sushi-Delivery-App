import icons from "./icons";
import images from "./images";
import { COLORS, SIZES, FONTS } from "./theme";
const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

export { icons, images, COLORS, SIZES, FONTS, mailFormat };

export function userValidation(name, email, phone, address, password = null, password2 = null) {
    if (name.length < 3)
        return ("Ingresa un nombre de usuario mas largo!")
    if (email.length === 0)
        return ("Ingresa un correo electrónico!")
    if (!email.match(mailFormat))
        return ("Correo electrónico no válido!")

    if (phone.length > 0 && phone.length != 10)
        return ("Número telefónico no válido!")

    if (password !== null && password2 !== null && password.length < 8)
        return ("Ingresa 8 caracteres en tu contraseña como minimo!")

    if (password !== null && password2 !== null && password != password2)
        return ("Las contraseñas no coinciden!")

    return true
}


