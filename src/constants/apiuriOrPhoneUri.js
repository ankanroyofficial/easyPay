export const apiuriOrPhoneUri = (val) => {
    let a = val.split("/")
    return a.length > 1 ? "phone" : "api"
}