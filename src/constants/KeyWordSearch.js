export const is_search = (search_key, name) => {
    if (search_key == "") {
        return true
    } else {
        if (search_key.length > name.length) {
            return false
        } else {
            if (search_key.toUpperCase() == name.substring(0, search_key.length).toUpperCase()) {
                return true
            } else {
                return false
            }
        }
    }
}

export const isArrDataEmpty = (val) => {
    var count = 0
    val.map((item) => {
        if (item.isSelected) {
            ++count;
        }
    })
    return count > 0 ? false : true;
}