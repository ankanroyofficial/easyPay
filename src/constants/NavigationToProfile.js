import AsyncStorage from '@react-native-async-storage/async-storage';

export const navigateTo = async(val,navigation) => {
    // const navigation = useNavigation()
    let slug = await AsyncStorage.getItem("slug");
    if (val == slug) {
        navigation.navigate("MyProfile", { PublicSlug: val })
    } else {
        navigation.navigate("PublicProfile", { PublicSlug: val })
    }
}