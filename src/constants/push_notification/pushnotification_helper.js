import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import axiosInstance from '../AxiosCallPage';
// import { useContext } from 'react';
// import { myContext } from '../ContextApi';

export const requestUserPermission = async () => {
    try {
        // console.log("requestUserPermission----------")
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
            // console.log('Authorization status:', authStatus);
            GetFCMToken();
        }
    } catch (error) {
        console.log("requestUserPermission", error)
    }
}

const GetFCMToken = async () => {
    try {
        let fcmtoken = await AsyncStorage.getItem("fcmtoken")
        // console.log("old token", fcmtoken)
        if (fcmtoken === null) {
            const newFCMToken = await messaging().getToken();
            // console.log("newFCMToken..................",newFCMToken)
            if (newFCMToken) {
                // console.log("newFCMToken", newFCMToken)
                await AsyncStorage.setItem("fcmtoken", newFCMToken)
            }
        }
    } catch (error) {
        console.log("GetFCMToken", error)
    }
}
const gototaskdetails = async (val, navigation, tab) => {
    // const { setTaskdetailsData, setNewOfferPageMessageArry } = useContext(myContext)
    try {
        const res = {
            "jsonrpc": "2.0",
            "params": {
                "slug": val
            }
        }
        const data = await axiosInstance.post("get-task-details", res)
        // console.log(data.data)
        if (data.data.result) {
            let a = data.data.result;
            let oldTaskdata = data.data.result.task;
            oldTaskdata.lowest_offers = a.lowest_offers;
            oldTaskdata.highest_offers = a.highest_offers;
            oldTaskdata.nearbyfixeroffer = a.nearbyfixeroffer;
            oldTaskdata.recommended_fixer_sort_based_on_rating = a.recommended_fixer_sort_based_on_rating

            setTaskdetailsData(oldTaskdata)

            // setTaskdetailsData(data.data.result.task)
            // setNewOfferPageMessageArry([])
            navigation.navigate('TaskDetails', { show: oldTaskdata, tab: tab })
        }
    } catch (error) {
        console.log("getData_taskdetails---------- notifihelper ", error)
    }
}
// const navigate_which_page = (type, item, navigation) => {
//     // 'task', 'dispute', 'message','profile'
//     if (type == "task") {
//         gototaskdetails(item.slug)
//     } else if (type == "task_offer") {
//         gototaskdetails(item.slug)
//     } else if (type == "task_question") {
//         gototaskdetails(item.slug)
//     } else if (type === "dispute") {
//         navigation.push('DisputesDetails', { id: item.id, slug: item.slug })
//     } else if (type === "message") {
//         navigation.push('ChatPage', { show: item.slug })
//     } else if (type == "withdraw") {
//         navigation.navigate('Finance')
//     } else if (type == "profile") {
//         navigation.navigate("BasicInfo_intro")
//     } else if (type == "notification_preference") {
//         navigation.navigate("NotificationPreferences")
//     }
// }


const navigate_which_page = async (type, item) => {
    console.log(type)
    let slug = await AsyncStorage.getItem("slug");
    if (type == "task") {
        gototaskdetails(item.slug, "")
    } else if (type == "task_offer") {
        gototaskdetails(item.slug, "offer")
    } else if (type == "task_question") {
        gototaskdetails(item.slug, "question")
    } else if (type == "dispute") {
        setNotificationLoader(false)
        navigation.navigate('DisputesDetails', { id: item.id, slug: item.slug })
        // } else if (type == "task_question") {
    } else if (type == "my_profile_page") {
        setNotificationLoader(false)
        navigation.navigate("MyProfile", { PublicSlug: slug })
    } else if (type == "document") {
        setNotificationLoader(false)
        navigation.navigate("NewDocumentUploadPageWithSelfi")
    } else if (type == "message") {
        setNotificationLoader(false)
        navigation.navigate('ChatPage', {
            show: item.slug,
        })
    } else if (type == "withdraw") {
        setNotificationLoader(false)
        navigation.navigate('Finance')
    } else if (type == "profile") {
        setNotificationLoader(false)
        navigation.navigate("BasicInfo_intro")
    } else if (type == "notification_preference") {
        setNotificationLoader(false)
        navigation.navigate("NotificationPreferences")
    }
}

export const notificationListner = (navigation) => {
    try {
        // Assume a message-notification contains a "type" property in the data payload of the screen to open
        messaging().onNotificationOpenedApp(remoteMessage => {
            // console.log('Notification caused app to open from background state:',remoteMessage.notification);
            // console.log("remoteMessage----", remoteMessage);
            navigate_which_page(remoteMessage.data.type, remoteMessage.data, navigation)
        });
        // Check whether an initial notification is available
        messaging().getInitialNotification().then(remoteMessage => {
            if (remoteMessage) {
                // console.log('Notification caused app to open from quit state:',remoteMessage.notification);
            }
            // console.log("remoteMessage................2", remoteMessage)
            if (remoteMessage !== null) {
                // console.log("remoteMessage................", remoteMessage.data.slug);
                // console.log("remoteMessage................1", remoteMessage.data.type);
                navigate_which_page(remoteMessage.data.type, remoteMessage.data, navigation)
            }
        });
        messaging().onMessage(async remoteMessage => {
            console.log("notification when app open.....", remoteMessage.data.message)
        })
    } catch (error) {
        console.log("notificationListner.....", error)
    }
}