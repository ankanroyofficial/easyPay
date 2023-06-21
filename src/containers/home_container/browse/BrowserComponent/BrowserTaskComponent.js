import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, Image, FlatList, RefreshControl, Pressable, ActivityIndicator, Dimensions } from 'react-native';
import { withRtl } from 'react-native-easy-localization-and-rtl';
import images from '../../../../constants/images';
import strings from '../../../../constants/lng/LocalizedStrings';
import Normalize from '../../../../helpers/Dimens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../../../constants/colors';
import { myContext } from '../../../../constants/ContextApi';
import Toast from "react-native-simple-toast"
import { ImageLink } from '../../../../constants/LinkPage';
import axiosInstance from '../../../../constants/AxiosCallPage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { LogBox } from 'react-native';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import NewLoaderPage from '../../../../components/NewLoaderPage';
import { countPage } from '../../../../components/BrowserTaskPageCount';
import Pusher from 'pusher-js';
import pusherConfig from './../../../../../pusher.json';
function BrowserTaskComponent() {
    const navigation = useNavigation()
    const flatlistRef = useRef(null);
    const {
        searchToggle,
        browserLat,
        browserLng,
        distance,
        browsertype,
        browserLocation,
        taskData, setTaskData,
        setTaskDataForMap,
        keyWord,
        isOpenOfferin_filter,
        filter_Categories,
        browserTaskloader, setBrowserTaskloader,
        setTaskdetailsData,
        browsertaskTotalPage, setBrowsertaskTotalPage,
        browsertaskCurrentPage, setBrowsertaskCurrentPage,
        browserTaskFooterText, setBrowserTaskFooterText,
        setNewOfferPageMessageArry, setNewOfferPageMessageWithTaskerArry, order_by
    } = useContext(myContext)
    LogBox.ignoreLogs(['Setting a timer for a long period of time'])
    const [refreshing, setRefreshing] = useState(false);

    const [footerLoader, setFooterLoader] = useState(false);
    const getFilterCategoryIds = async (val) => {
        let a = val;
        let newArr = []
        a.map((item) => {
            if (item.isSelected) {
                newArr.push(item.id)
            }
        })
        return newArr.toString();
    }
    const isLoad = async () => {
        try {
            const isBrowserTaskloader = await AsyncStorage.getItem("isBrowserTaskloader")
            if (isBrowserTaskloader == "true") {
                getData_withoutloader()
                getTaskForMapPage()
                await AsyncStorage.setItem("isBrowserTaskloader", "false")
            }
        } catch (error) {
            console.log("isLoad", error)
        }
    }
    useEffect(() => {
        isLoad()
        const willFocusSubscription = navigation.addListener('focus', () => {
            isLoad()
        });
        return willFocusSubscription;
    }, []);

    const getData_withoutloader = async () => {
        try {
            let cateIds = await getFilterCategoryIds(filter_Categories);
            const res = {
                "jsonrpc": "2.0",
                "params": {
                    "keyword": keyWord,
                    "min_search_budget": "",
                    "max_search_budget": "",
                    "category_id": cateIds,
                    "subcategory_id": "",
                    "lat": browserLat,
                    "lng": browserLng,
                    "distance": distance,
                    "type": browsertype,
                    "order_by": order_by == "1" ? "1" : isOpenOfferin_filter ? "" : order_by,
                    "open_offer": "false",
                    "show_available_task_only": "Y",
                    "page": "1"
                }
            }
            // console.log("browse-task====> 6", res)
            const data = await axiosInstance.post("browse-task", res)
            if (data.data.tasks) {
                setBrowserTaskFooterText("")
                setBrowsertaskCurrentPage(1)
                await AsyncStorage.setItem("isBrowserTaskloader", "false")
                setBrowsertaskTotalPage(countPage(data.data.limit, data.data.total_result))
                setTaskData(data.data.tasks)
                setBrowserTaskloader(false)
            }
        } catch (error) {
            setBrowserTaskloader(false)
            console.log("getData_withoutloader", error)
        }
    }
    const Onload_GetData = async () => {
        try {
            let cateIds = await getFilterCategoryIds(filter_Categories);
            const res = {
                "jsonrpc": "2.0",
                "params": {
                    "keyword": keyWord,
                    "min_search_budget": "",
                    "max_search_budget": "",
                    "category_id": cateIds,
                    "subcategory_id": "",
                    "lat": browserLat,
                    "lng": browserLng,
                    "distance": distance,
                    "type": browsertype,
                    "order_by": order_by == "1" ? "1" : isOpenOfferin_filter ? "" : order_by,
                    "open_offer": "false",
                    "show_available_task_only": "Y",
                    "page": "1"
                }
            }

            console.log("browse-task====> 7", res.params)

            const data = await axiosInstance.post("browse-task", res)
            // console.log("onload.................", countPage(data.data.limit, data.data.total_result))
            if (data.data) {
                setBrowserTaskFooterText("")
                setBrowsertaskCurrentPage(1)
                setBrowsertaskTotalPage(countPage(data.data.limit, data.data.total_result))
                setTaskData(data.data.tasks)
            }
        } catch (error) {
            setBrowserTaskloader(false)
            console.log("Onload_GetData", error)
        }
    }
    const getTaskForMapPage = async () => {
        try {
            let cateIds = await getFilterCategoryIds(filter_Categories);
            const res = {
                "jsonrpc": "2.0",
                "params": {
                    "keyword": keyWord,
                    "min_search_budget": "",
                    "max_search_budget": "",
                    "category_id": cateIds,
                    "subcategory_id": "",
                    "lat": browserLat,
                    "lng": browserLng,
                    "distance": distance,
                    "type": browsertype,
                    "order_by": order_by == "1" ? "1" : isOpenOfferin_filter ? "" : order_by,
                    "open_offer": "false",
                    "show_available_task_only": "Y"
                }
            }
            // console.log("getTaskForMapPage====>", res)
            let data = await axiosInstance.post("browse-task-for-map", res)
            // console.log("onload.................", countPage(data.data.limit, data.data.total_result))
            if (data.data) {
                //    console.log((data.data.tasks).length)
                setTaskDataForMap(data.data.tasks)
            }
        } catch (error) {
            setBrowserTaskloader(false)
            console.log("getTaskForMapPage", error)
        }
    }
    const getstatus = val => {
        var stat = "";
        if (val == 1) {
            stat = strings.BROWSEFILTER.DRAFT
        } else if (val == 2) {
            stat = strings.BROWSEFILTER.OPEN
        } else if (val == 3) {
            stat = strings.BROWSEFILTER.ASSIGNED
        } else if (val == 4) {
            stat = strings.BROWSEFILTER.COMPLETED
        } else if (val == 5) {
            stat = strings.BROWSEFILTER.COMPLETED
        } else if (val == 6 || val == 8) {
            stat = strings.BROWSEFILTER.CANCELLED
        }
        return stat;
    };
    const onRefresh = () => {
        setRefreshing(true);
        Toast.show(strings.ERROR.REFRESHING)
        setBrowserTaskFooterText("")
        Onload_GetData()
        getTaskForMapPage()
        setRefreshing(false)
    };
    const budgetOrOpenStatus = (item) => {
        if (item.tot_bids != 0) {
            return getstatus(item.status)
        } else {
            if (item.budget == 0) {
                return "Open to"
            } else {
                return `$ ${item.budget}`
            }
        }
    }
    const dateConvert = (val) => {

        // console.log(val.date,val.time)

        let dateTime = val.date + " " + val.time
        let m = moment(dateTime, "YYYY-MM-DD hh:mm:ss").format('ddd Do MMM,YY hh:mm A');
        return m;
    }
    const gototaskdetails = async (val) => {
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
                setNewOfferPageMessageArry([])
                setNewOfferPageMessageWithTaskerArry([])

                let a = data.data.result;
                let oldTaskdata = data.data.result.task;

                oldTaskdata.lowest_offers = a.lowest_offers;
                oldTaskdata.highest_offers = a.highest_offers;
                oldTaskdata.nearbyfixeroffer = a.nearbyfixeroffer;
                oldTaskdata.recommended_fixer_sort_based_on_rating = a.recommended_fixer_sort_based_on_rating
                setTaskdetailsData(oldTaskdata)
                navigation.push('TaskDetails', { show: oldTaskdata })
            }
        } catch (error) {
            console.log("getData_taskdetails---------- browsertask", error)
        }

    }
    const BrowserTaskCard = ({ item }) => {
        return (
            <Pressable
                onPress={() => {

                    // console.log(item)
                    gototaskdetails(item.slug)

                }}
                style={{ flex: 1, flexDirection: "row", paddingRight: Normalize(1) }} >
                <View style={{ width: Normalize(34), height: "100%", }} ></View>
                <View style={{ flex: 1, borderRadius: Normalize(10), borderWidth: 1, borderColor: Colors.boxBorder, paddingLeft: Normalize(38) }} >
                    <View style={{ flex: 1, justifyContent: "center", paddingRight: Normalize(10) }} >

                        {/* title */}
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                            <Text numberOfLines={1} style={[globalstyles.plantext_bold, { fontSize: Normalize(12), color: Colors.primary, width: "68%" }]} >{item.title}</Text>
                            <Text style={[globalstyles.plantext_bold, { fontSize: Normalize(11), color: Colors.secondary }]} >{budgetOrOpenStatus(item)}</Text>
                        </View>

                        {/* ASAP */}
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                            <View style={{ flexDirection: "row" }} >
                                <MaterialIcons
                                    name="date-range"
                                    color={Colors.primary}
                                    size={Normalize(12)} />
                                <Text numberOfLines={1}
                                    style={
                                        [globalstyles.plantext_regular,
                                        {
                                            fontSize: Normalize(12),
                                            color: Colors.grey,
                                            paddingLeft: Normalize(3),
                                            paddingRight: Normalize(6),
                                        }
                                        ]}>{item.date_type == "O" ? dateConvert(item) : "As soon as possible"}</Text>
                            </View>
                            {(item.tot_bids == 0 && item.budget == 0) && <Text style={[globalstyles.plantext_bold, { fontSize: Normalize(11), color: Colors.secondary }]} >Offer</Text>}
                        </View>
                        {/* location */}
                        <View style={{ flexDirection: "row", alignItems: "center" }} >
                            <Ionicons
                                name="ios-location-sharp"
                                color={Colors.primary}
                                size={Normalize(12)} />
                            <Text numberOfLines={1} style={[globalstyles.plantext_regular, { fontSize: Normalize(12), color: Colors.grey, paddingLeft: Normalize(3), paddingRight: Normalize(6), width: "68%" }]} >{item.type == "P" ? item.location : "Remote"}</Text>
                        </View>
                        {/* category */}
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                            <View style={{ flexDirection: "row", alignItems: "center" }} >
                                <View style={{ height: Normalize(13), width: Normalize(13) }} >
                                    <Image source={{ uri: ImageLink.homeCategory + `${(item.get_category.black_image != null) ? item.get_category.black_image : item.get_category.image}` }} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                </View>
                                <Text style={[globalstyles.plantext_bold, { fontSize: Normalize(10.5), color: Colors.grey, paddingLeft: Normalize(3) }]} >
                                    {item.get_category.name}
                                </Text>
                            </View>
                            {
                                item.tot_bids != 0 &&
                                <Text style={[globalstyles.plantext_bold, { fontSize: Normalize(10.5), color: Colors.grey, paddingLeft: Normalize(3) }]} >
                                    {item.tot_bids} {item.tot_bids > 1 ? "Offers" : "Offer"}
                                </Text>}
                        </View>
                        {item.get_question_count > 0 &&
                            <Text style={[globalstyles.plantext_bold, { fontSize: Normalize(10.5), color: Colors.grey, paddingLeft: Normalize(3), textAlign: "right" }]} >
                                {item.get_question_count} {item.get_question_count > 1 ? "Questions" : "Question"}
                            </Text>}
                    </View>
                </View>
                <View style={{
                    width: Normalize(56),
                    height: Normalize(56),
                    borderRadius: Normalize(56) / 2,
                    backgroundColor: Colors.white,
                    borderWidth: 1,
                    borderColor: Colors.disableText,
                    position: "absolute",
                    left: 0,
                    top: Normalize(12),
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden"
                }} >
                    {
                        item.get_user.profile_picture != null ?

                            <Image
                                resizeMode="cover"
                                source={{ uri: ImageLink.ProfilePhoto + item.get_user.profile_picture }}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    // borderRadius: Normalize(56) / 2,
                                    resizeMode: "cover"
                                }}
                            />
                            :
                            <AntDesign
                                name={"user"}
                                color={Colors.secondary}
                                size={Normalize(23)} />}
                </View>
            </Pressable>
        )
    }
    function handleInfinityScroll(event) {
        let mHeight = event.nativeEvent.layoutMeasurement.height;
        let cSize = event.nativeEvent.contentSize.height;
        let Y = event.nativeEvent.contentOffset.y;

        // console.log('mHeight--------------', mHeight);
        // console.log('cSize--------------', cSize);
        // console.log('Y--------------', Y);

        if (Math.ceil(mHeight + Y) >= cSize) {
            return true;
        } else {
            return false;
        }
    };
    const increasepageCount = () => {
        try {
            if (browsertaskTotalPage > browsertaskCurrentPage) {
                setFooterLoader(true)
                let a = browsertaskCurrentPage
                setBrowsertaskCurrentPage(a + 1)
                getData_afterScrollDown(a + 1)
                getTaskForMapPage()
            } else if (browsertaskTotalPage == browsertaskCurrentPage) {
                let b = browsertaskCurrentPage
                // getData_afterScrollDown(b)
                // Toast.show("There is no more tasks")
                setBrowserTaskFooterText("End")

            } else if (browsertaskTotalPage < browsertaskCurrentPage) {
                // Toast.show("There is no more tasks")
                setBrowserTaskFooterText("End")
            } else {
                console.log("errorrrrrrrrrrrrrrrrrrrrrrrrr")
            }
        } catch (error) {
            console.log("increasepageCount - ", error)
        }
    }
    const getData_afterScrollDown = async (val) => {
        try {
            let cateIds = await getFilterCategoryIds(filter_Categories);
            const res = {
                "jsonrpc": "2.0",
                "params": {
                    "keyword": keyWord,
                    "min_search_budget": "",
                    "max_search_budget": "",
                    "category_id": cateIds,
                    "subcategory_id": "",
                    "lat": browserLat,
                    "lng": browserLng,
                    "distance": distance,
                    "type": browsertype,
                    "order_by": order_by == "1" ? "1" : isOpenOfferin_filter ? "" : order_by,
                    "open_offer": "false",
                    "show_available_task_only": "Y",
                    "page": val
                }
            }
            console.log("browse-task====> 77", res.params)
            const data = await axiosInstance.post("browse-task", res)
            if (data.data.tasks) {
                tempLoader = false;
                setBrowserTaskFooterText("")
                await AsyncStorage.setItem("isBrowserTaskloader", "false")
                setBrowsertaskTotalPage(countPage(data.data.limit, data.data.total_result))
                // console.log("res.params.page====> ", data.data.total_result)

                let oldTask = taskData;
                let newTask = data.data.tasks;
                let newModifiedTasks = [...oldTask, ...newTask]
                setTaskData(newModifiedTasks);
                setFooterLoader(false)
                setBrowserTaskloader(false)
            }
        } catch (error) {
            setBrowserTaskloader(false)
            setFooterLoader(false)
            console.log("getData_afterScrollDown", error)
        }
    }
    const getAllData = () => {
        const pusher = new Pusher(pusherConfig.key, pusherConfig);
        let channel = pusher.subscribe("eazypay-development");
        channel.bind('task-assign-event', function (data) {
            if (data) {
                console.log("new task assign browser ---------------")
                Onload_GetData()
                getTaskForMapPage()
            }
        })
        channel.bind('post-task', function (data) {
            if (data) {
                console.log("new task browser ---------------")
                Onload_GetData()
                getTaskForMapPage()
            }
        })
        channel.bind('bid-apply-event', function (data) {
            if (data) {
                console.log("new bid browser ---------------")
                Onload_GetData()
                getTaskForMapPage()
            }
        })
        channel.bind('bid-withdraw-event', function (data) {
            if (data) {
                console.log(" withdraw browser ---------------")
                Onload_GetData()
                getTaskForMapPage()
            }
        })
    }
    useEffect(async () => {
        getAllData()
    }, [])
    return (
        <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
            {/* task cards */}
            <View style={{ flex: 1, paddingHorizontal: Normalize(16), backgroundColor: Colors.white, paddingTop: searchToggle ? 50 : 0 }}>
                {
                    browserTaskloader || (browserLocation == "" || browserLat == "" || browserLng == "") ?
                        <NewLoaderPage />
                        :
                        taskData.length != 0 ?
                            <FlatList
                                // scrollEnabled={!footerLoader}
                                data={taskData}
                                ref={flatlistRef}
                                style={{ flex: 1 }}
                                initialNumToRender={30}
                                keyExtractor={(item, index) => index}
                                onScrollEndDrag={(event) => {
                                    if (handleInfinityScroll(event)) {
                                        // Toast.show("END");
                                        increasepageCount()
                                    }
                                }}
                                ListFooterComponent={() => {
                                    return (
                                        <Fragment>
                                            {browserTaskFooterText != "" && <Text numberOfLines={1} style={[globalstyles.plantext_regular, { textAlign: "center", color: Colors.lightGrey, marginBottom: Normalize(80), marginTop: Normalize(20) }]} >-----------------------------------  {browserTaskFooterText}  -----------------------------------</Text>}
                                        </Fragment>
                                    )
                                }}
                                renderItem={({ item, index }) => (
                                    <View key={index} style={{
                                        height: Normalize(86),
                                        width: "100%",
                                        marginTop: index == 0 ? Normalize(50) : 0,
                                        marginBottom: index + 1 == taskData.length ? browserTaskFooterText != "" ? 0 : Normalize(80) : Normalize(7),
                                    }} >
                                        {<BrowserTaskCard item={item} />}
                                    </View>

                                )}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                }
                                showsVerticalScrollIndicator={false}
                            />
                            :
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <View style={{ height: Normalize(110), width: Normalize(110) }} >
                                    <Image
                                        source={images.browserTask_notfound}
                                        style={{ height: "100%", width: "100%", resizeMode: "contain" }}
                                    />
                                </View>
                                <Text style={{ fontSize: Normalize(12), color: Colors.greylightText, textAlign: "center", paddingHorizontal: "3%", paddingVertical: "2%", fontFamily: "roboto-medium" }} >{strings.BROWSE.NOTASK}</Text>
                            </View>
                }
                {
                    footerLoader &&
                    <View style={{
                        height: "100%",
                        width: Normalize(30),
                        borderRadius: Normalize(30) / 2,
                        position: "absolute",
                        bottom: Normalize(70), left: (Dimensions.get("window").width / 2) - Normalize(15), justifyContent: "center", alignItems: "center"
                    }}>
                        <ActivityIndicator size={"large"} color={Colors.primary} />
                    </View>
                }
            </View>
        </SafeAreaView >
    );
}

export default withRtl(BrowserTaskComponent);