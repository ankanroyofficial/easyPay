import React, { createContext, useState } from 'react'
import strings from './lng/LocalizedStrings';

export const myContext = createContext();

export default function ContextApi(props) {
    const [fcmToken, setFcmToken] = useState("")
    const [token, setToken] = useState("")
    const [playStore_url, setPlayStore_url] = useState("")
    const [signup_from, setSignup_from] = useState("A")
    const [userSlugName, setUserSlugName] = useState("")
    const [userId, setUserId] = useState("")
    const [userName, setUserName] = useState("")
    const [ph_email_verify, setPh_email_verify] = useState(false)
    const [slugName, setSlugName] = useState()
    const [id, setId] = useState("")
    const [getSimililarTaskId, setGetSimililarTaskId] = useState("")
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [signupLocation, setSignupLocation] = useState({
        name: '',
        lat: '',
        lng: '',
    });
    const [tempSignupLocation, setTempSignupLocation] = useState("");
    const [tempPostLocation, setTempPostLocation] = useState("");
    const [category_id, setCategory_id] = useState("")
    const [category_image, setCategory_image] = useState("")
    const [subcategory_id, setSubcategory_id] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState("P")
    const [time, setTime] = useState("")
    const [viewTime, setViewTime] = useState("")
    const [date, setDate] = useState("")
    const [budget_type, setBudget_type] = useState("T")
    const [budget, setBudget] = useState("")
    const [hourly_rate, setHourly_rate] = useState("")
    const [number_of_hour, setNumber_of_hour] = useState("")
    const [location, setLocation] = useState("")
    const [lat, setLat] = useState("")
    const [lng, setLng] = useState("")
    const [image, setImage] = useState([])
    const [must_have, setMust_Have] = useState([])
    const [must_have_New, setMust_have_New] = useState("")




    const [date_type, setDate_type] = useState("B")

    // ***************extra useState for task**************
    const [imageFinalArray, setImageFinalArray] = useState([]);
    const [y2, setY2] = useState()
    const [d2, setD2] = useState()
    const [m2, setM2] = useState()
    const [taskDetails, setTaskDetails] = useState()
    const [taskdetailsData, setTaskdetailsData] = useState(null)
    const [engShowDate, setEngShowDate] = useState("");
    const [perShowDate, setPerShowDate] = useState("");
    const [apiImages, setApiImages] = useState([]);
    const [editOrpostsimilar, setEditOrpostsimilar] = useState("");
    const [allVerified, setAllVerified] = useState(false);

    // *************** useState for browsertask**************

    const [min_search_budget, setMin_search_budget] = useState(5);
    const [max_search_budget, setMax_search_budget] = useState(100000);
    const [min_budget, setMin_budget] = useState(0);
    const [max_budget, setMax_budget] = useState(0);
    const [browserCategory_id, setBrowserCategory_id] = useState("");
    const [browserSubcategory_id, setBrowserSubcategory_id] = useState("");
    const [browserLocation, setBrowserLocation] = useState("");
    const [browserLat, setBrowserLat] = useState("");
    const [browserLng, setBrowserLng] = useState("");
    const [distance, setDistance] = useState(20);
    const [prevDistance, setPrevDistance] = useState(20);
    const [from_date, setFrom_date] = useState("");
    const [to_date, setTo_date] = useState("");
    const [order_by, setOrder_by] = useState("");
    const [browsertype, setBrowsertype] = useState("")
    const [keyWord, setKeyWord] = useState("")
    const [isOpenOfferin_filter, setIsOpenOfferin_filter] = useState(false)
    const [from_D, setFrom_D] = useState("")
    const [from_M, setFrom_M] = useState("")
    const [from_Y, setFrom_Y] = useState("")
    const [to_D, setTo_D] = useState("")
    const [to_M, setTo_M] = useState("")
    const [to_Y, setTo_Y] = useState("")
    const [taskData, setTaskData] = useState([])
    const [taskDataForMap, setTaskDataForMap] = useState([])
    const [myTaskData, setMyTaskData] = useState([])
    const [selectedTaskType, setselectedTaskType] = useState("A")
    const [catagoryName, setCatagoryName] = useState("");
    const [subcatagoryName, setSubcatagoryName] = useState("")
    const [mytaskValue, setMytaskValue] = useState("")
    const [socketId, setSocketId] = useState("")
    const [allMsg, setAllMsg] = useState([])
    const [unreadMsg, setUnreadMsg] = useState([]);
    // *****************************  For Listing  ********************************
    const [lMS_id, setLMS_id] = useState("")
    const [lMS_category_title, setLMS_category_title,] = useState("")
    const [lMS_subcategory_title, setLMS_subcategory_title,] = useState("")
    const [lMS_category_id, setLMS_category_id] = useState("")
    const [lMS_subcategory_id, setLMS_subcategory_id] = useState("")
    const [lMS_title, setLMS_title] = useState("")
    const [lMS_search_tag, setLMS_search_tag] = useState([])
    const [lMS_description, setLMS_description] = useState("")
    const [lMS_package_price_1, setLMS_package_price_1] = useState("")
    const [lMS_package_id_1, setLMS_package_id_1] = useState("")
    const [lMS_package_name_1, setLMS_package_name_1] = useState("")
    const [lMS_package_description_1, setLMS_package_description_1] = useState("")
    const [lMS_package_price_2, setLMS_package_price_2] = useState("")
    const [lMS_package_id_2, setLMS_package_id_2] = useState("")
    const [lMS_package_name_2, setLMS_package_name_2] = useState("")
    const [lMS_package_description_2, setLMS_package_description_2] = useState("")

    const [lMS_package_price_3, setLMS_package_price_3] = useState("")
    const [lMS_package_id_3, setLMS_package_id_3] = useState("")
    const [lMS_package_name_3, setLMS_package_name_3] = useState("")
    const [lMS_package_description_3, setLMS_package_description_3] = useState("")

    const [lMS_package_price_4, setLMS_package_price_4] = useState("")
    const [lMS_package_id_4, setLMS_package_id_4] = useState("")
    const [lMS_package_name_4, setLMS_package_name_4] = useState("")
    const [lMS_package_description_4, setLMS_package_description_4] = useState("")

    const [lMS_package_price_5, setLMS_package_price_5] = useState("")
    const [lMS_package_id_5, setLMS_package_id_5] = useState("")
    const [lMS_package_name_5, setLMS_package_name_5] = useState("")
    const [lMS_package_description_5, setLMS_package_description_5] = useState("")


    const [lMS_type, setLMS_type] = useState("P")
    const [lMS_location, setLMS_location] = useState("")
    const [lMS_distance, setLMS_distance] = useState(20)
    const [lMS_prev_distance, setLMS_prev_distance] = useState(20)

    const [lMS_lat, setLMS_lat] = useState("")
    const [lMS_lng, setLMS_lng] = useState("")
    const [lMS_avalibility, setLMS_avalibility] = useState("")
    const [lMS_message, setLMS_message] = useState("")

    const [lMS_Multi_Images, setLMS_Multi_Images] = useState([])
    const [lMS_prev_Multi_Images, setLMS_prev_Multi_Images] = useState([])

    const [lMS_single_Images, setLMS_single_Images] = useState("")
    const [lMS_prev_single_Images, setLMS_prev_single_Images] = useState("")


    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [open3, setOpen3] = useState(false)
    const [open4, setOpen4] = useState(false)
    const [open5, setOpen5] = useState(false)



    const [mytaskloader, setMytaskloader] = useState(false)
    const [prev_dropdown, setPrev_dropdown] = useState("A")
    const [startLoader_myTask, setStartLoader_myTask] = useState("0")
    const [startLoader_BrowserTask, setStartLoader_BrowserTask] = useState("0")

    const [profileData, setProfileData] = useState(null)
    const [review_as_poster, setReview_as_poster] = useState([])
    const [review_as_tasker, setReview_as_tasker] = useState([])
    const [user_completed_task_as_poster, setUser_completed_task_as_poster] = useState(0)
    const [user_completed_task_as_tasker, setUser_completed_task_as_tasker] = useState(0)
    const [listData, setListData] = useState([])
    const [listAllServicesData, setListAllServicesData] = useState([])
    const [listAllServicesDataForMap, setListAllServicesDataForMap] = useState([])
    const [isListAllServicesload, setIsListAllServicesload] = useState(false)
    const [allCategory, setAllCategory] = useState([])
    const [allSubcategory, setAllSubcategory] = useState([])

    const [tierData, setTierData] = useState("")
    const [userData, setUserData] = useState("")
    const [allData, setAllData] = useState("")
    const [next_TierData, setNext_TierData] = useState("")
    const [tierDetails, setTierDetails] = useState("")
    const [review_as_poster_review_page, setReview_as_poster_review_page] = useState([])
    const [review_as_tasker_review_page, setReview_as_tasker_review_page] = useState([])
    const [listingCategory, setListingCategory] = useState([])

    const [defaultTask, setDefaultTask] = React.useState({ label: strings.MYTASKSCREEN.ALLTASK, value: "A" })

    const [phone_number, setPhone_numbe] = useState({ isActive: false, activeTitle: "" })
    const [email_Address, setEmail_Address] = useState({ isActive: false, activeTitle: "" })
    const [isopenOffer, setIsopenOffer] = useState(false)
    const [task_page_list, setTask_page_list] = useState([
        {
            "title": strings.POSTTASK.DETAILS
        },
        {
            "title": strings.POSTTASK.WHEN
        },
        {
            "title": strings.POSTTASK.IMAGE
        },
        {
            "title": strings.POSTTASK.BUDGET
        },
    ])

    const [tierLogo, setTierLogo] = useState("")
    const [islistingRefresh, setIslistingRefresh] = useState(false)
    const [listing_Page, setListing_Page] = useState("")
    const [activeTab, setActiveTab] = useState("");
    const [documentStatus, setDocumentStatus] = useState(false);
    const [recent_notification_count, setRecent_notification_count] = useState("0")
    const [choose_Categories, setChoose_Categories] = useState([])
    const [allSkill, setAllSkill] = useState([])
    const [alllanguage, setAlllanguage] = useState([])
    const [all_country_code, setall_Country_code] = useState([]);
    const [prof_pic, setProf_pic] = useState("");
    const [moreBalance, setMoreBalance] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    // my task

    const [whichSection, setWhichSection] = useState({
        tab: "tasker",
        section: "Posted",
        active: true
    })

    const [whichSection2, setWhichSection2] = useState({
        tab: "poster",
        section: "Offer&Question",
        active: true
    })

    // be a fixer
    const [country_id, setCountry_id] = useState('');
    const [country_value, setCountry_value] = useState('');

    const [nationality_id, setNationality_id] = useState('');
    const [nationality_value, setNationality_value] = useState('');

    const [editProfileaddress, setEditProfileaddress] = useState({
        name: '',
        lat: '',
        lng: '',
    });

    const [getAround, setGetAround] = useState([]);
    const [getAround_temporary, setGetAround_temporary] = useState([]);

    const [taskDetailsTitle, setTaskDetailsTitle] = useState('');
    const [catagory, setcatagory] = useState([]);

    const [taskCatagoryName, setTaskCatagoryName] = useState("");
    const [takingPhoneNoModal, setTakingPhoneNoModal] = useState(false);
    const [phone_Code, setPhone_Code] = useState('65');
    const [signupPhoneNumer_details, setSignupPhoneNumer_details] = useState({
        "created_at": null,
        "flag": "sg.png",
        "id": 196,
        "international_prefix": 0,
        "max_no_of_digitis": 8,
        "min_no_of_digits": 8,
        "name": "Singapore",
        "national_prefix": 0,
        "phonecode": 65,
        "sortname": "SG",
        "updated_at": null,
        "utc_dst": "+1"
    });

    const onPressOpenModalPh = () => {
        setTakingPhoneNoModal(!takingPhoneNoModal);
    };
    const [pin1, setPin1] = useState("")
    const [pin2, setPin2] = useState("")
    const [pin3, setPin3] = useState("")
    const [pin4, setPin4] = useState("")
    const [allNewMyTask, setAllNewMyTask] = React.useState(
        {
            as_a_eazypayer: {
                "active_task": [],
                "complete_task": [],
                "offers_or_questions": []
            },
            as_a_client: {
                "booked": [],
                "completed": [],
                "post_task": []
            }
        }
    )
    const [isMyTaskLoad, setIsMyTaskLoad] = useState(false);
    const [isBrowseTaskLoad, setIsBrowseTaskLoad] = useState(false);
    const [isBrowseMapLoad, setIsBrowseMapLoad] = useState(false);
    const [pin1_EditProfile, setPin1_EditProfile] = useState("")
    const [pin2_EditProfile, setPin2_EditProfile] = useState("")
    const [pin3_EditProfile, setPin3_EditProfile] = useState("")
    const [pin4_EditProfile, setPin4_EditProfile] = useState("")

    const [document_selection, setDocument_selection] = useState("National Identity Card/Driving Licence")
    const [front_uri, setFront_uri] = useState("");
    const [back_uri, setBack_uri] = useState("");
    const [front_details, setFront_details] = useState(null);
    const [back_details, setBack_details] = useState(null);

    const [front_details_prev, setFront_details_prev] = useState(null);
    const [back_details_prev, setBack_details_prev] = useState(null);

    const [isPhoneVerify, setIsPhoneVerify] = useState(false);
    const [isPhVerify, setIsPhVerify] = useState('N');

    const [isDefaultMytask_asposter, setIsDefaultMytask_asposter] = useState(false);
    const [isDefaultMytask_astasker, setIsDefaultMytask_astasker] = useState(false);
    const [prev_phone, setPrev_Phone] = useState('');
    const [prev_phoneCode, setPrev_phoneCode] = useState('');
    const [user_Certificate, setUser_Certificate] = useState([]);
    const [filter_Categories, setFilter_Categories] = useState([]);
    const [searchToggle, setSearchToggle] = useState(false);
    const [taskOrMap, setTaskOrMap] = useState(true);
    const [listCardOrMap, setlistCardOrMap] = useState("list");
    const [isAvaliable, setIsAvaliable] = useState(false)
    const [termAndCoModal, setTermAndCoModal] = useState(false)

    const [browserTaskloader, setBrowserTaskloader] = useState(false)
    const [isPrevFilterData, setIsPrevFilterData] = useState(false)

    const [mapzoomIN, setMapzoomIN] = useState(false)


    const [taskdetailsSlug, setTaskdetailsSlug] = useState("")

    const [browsertaskTotalPage, setBrowsertaskTotalPage] = useState(1)
    const [browsertaskCurrentPage, setBrowsertaskCurrentPage] = useState(1)
    const [browserTaskFooterText, setBrowserTaskFooterText] = useState("");
    const [certificateList, setCertificateList] = useState([])
    const [taskdetailsLoader, setTaskdetailsLoader] = useState(false)
    const [is_notification_pref_updated, setIs_notification_pref_updated] = useState(false)

    const [currentLocation, setCurrentLocation] = useState({
        latitude: 1.28967,
        longitude: 103.85007,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
    })
    const [newOfferPageMessageArry, setNewOfferPageMessageArry] = useState([])
    const [newOfferPageMessageWithTaskerArry, setNewOfferPageMessageWithTaskerArry] = useState([])
    const [isSettingSkillLoad, setIsSettingSkillLoad] = useState(false)
    const [isNewbeAFixerStep2load, setIsNewbeAFixerStep2Load] = useState(false)
    const [storageData, setStorageData] = useState();
    const [beAFixerAbout_me, setBeAFixerAbout_me] = useState('');
    const [beAFixerSelectProfilegallary, setBeAFixerSelectProfilegallary] = useState();
    const [beAFixerProfile_picture, setBeAFixerProfile_picture] = useState('');
    const [cancelOfferSucessModal, setCancelOfferSucessModal] = useState(false);
    const [makeAnOfferInitialPopupModal, setMakeAnOfferInitialPopupModal] = useState(false)
    const [isNotifyPrefLoad, setIsNotifyPrefLoad] = useState(false);

    const [notifications, setNotifications] = useState([]);
    const [notificationLoader, setNotificationLoader] = useState(false);
    const [notificationScrollLoader, setNotificationScrollLoader] = useState(false);
    const [empty, setEmpty] = useState(null);
    const [total_pageno, setTotal_pageno] = useState("0")
    const [temp_pageno, setTemp_pageno] = useState(1)
    const [isNotificationPageLoad, setIsNotificationPageLoad] = useState(false);
    const [drawerTabNaviData, setDrawerTabNaviData] = useState({
        "be_a_fixer_approval": "pending",
        "listing_count": 0,
        "notification_count": 0,
        "profile_image": null,
        "slug": "",
        "status": "W",
        "user_id": "",
        "user_name": "",
        "wallet_balance": 0
    })



    const [about_meForEditProfile, setAbout_meForEditProfile] = useState('');
    const [storageDataForEditProfile, setStorageDataForEditProfile] = useState();
    const [selectProfilegallaryForEditProfile, setSelectProfilegallaryForEditProfile] = useState();
    const [profile_pictureForEditProfile, setProfile_pictureForEditProfile] = useState('');
    const [listing_Categories, setListing_Categories] = useState([]);
    const [listing_KeyWord, setListing_KeyWord] = useState("")
    const [listing_Location, setListing_Location] = useState("")
    const [listing_Lat, setListing_Lat] = useState("")
    const [listing_Lng, setListing_Lng] = useState("")
    const [listing_tempLocation, setListing_tempLocation] = useState("");
    const [listing_Type, setListing_Type] = useState("A")

    const [listing_distance, setListing_distance] = useState(20);
    const [listing_prevDistance, setListing_prevDistance] = useState(20);
    const [listing_currentLocation, setListing_currentLocation] = useState({
        latitude: 1.28967,
        longitude: 103.85007,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
    })
    const [isListingMapLoad, setIsListingMapLoad] = useState(false);
    const [voucherDetails, setVoucherDetails] = useState(null);
    return (
        <myContext.Provider value={
            {
                fcmToken, setFcmToken,
                token, setToken,
                playStore_url, setPlayStore_url,
                signup_from, setSignup_from,
                userSlugName, setUserSlugName,
                userId, setUserId,
                ph_email_verify, setPh_email_verify,
                slugName, setSlugName,
                id, setId,
                getSimililarTaskId, setGetSimililarTaskId,
                forgotPasswordEmail, setForgotPasswordEmail,

                loginPassword, setLoginPassword,
                signupLocation, setSignupLocation,
                tempSignupLocation, setTempSignupLocation,
                tempPostLocation, setTempPostLocation,



                category_id, setCategory_id,
                category_image, setCategory_image,
                subcategory_id, setSubcategory_id,
                title, setTitle,
                description, setDescription,
                type, setType,
                time, setTime,
                viewTime, setViewTime,
                date, setDate,
                budget_type, setBudget_type,
                budget, setBudget,
                hourly_rate, setHourly_rate,
                number_of_hour, setNumber_of_hour,
                location, setLocation,
                lat, setLat,
                lng, setLng,
                image, setImage,
                must_have, setMust_Have,
                must_have_New, setMust_have_New,
                date_type, setDate_type,
                imageFinalArray, setImageFinalArray,
                y2, setY2,
                m2, setM2,
                d2, setD2,
                taskDetails, setTaskDetails,
                taskdetailsData, setTaskdetailsData,
                engShowDate, setEngShowDate,
                apiImages, setApiImages,
                perShowDate, setPerShowDate,
                editOrpostsimilar, setEditOrpostsimilar,

                min_budget, setMin_budget,
                max_budget, setMax_budget,



                min_search_budget, setMin_search_budget,
                max_search_budget, setMax_search_budget,
                browserCategory_id, setBrowserCategory_id,
                browserSubcategory_id, setBrowserSubcategory_id,
                browserLat, setBrowserLat,
                browserLng, setBrowserLng,
                distance, setDistance,
                prevDistance, setPrevDistance,
                from_date, setFrom_date,
                to_date, setTo_date,
                order_by, setOrder_by,
                browsertype, setBrowsertype,
                browserLocation, setBrowserLocation,
                from_D, setFrom_D,
                from_M, setFrom_M,
                from_Y, setFrom_Y,
                to_D, setTo_D,
                to_M, setTo_M,
                to_Y, setTo_Y,
                taskData, setTaskData,
                taskDataForMap, setTaskDataForMap,
                myTaskData, setMyTaskData,
                catagoryName, setCatagoryName,
                subcatagoryName, setSubcatagoryName,
                keyWord, setKeyWord,
                isOpenOfferin_filter, setIsOpenOfferin_filter,
                mytaskValue, setMytaskValue,
                allVerified, setAllVerified,
                socketId, setSocketId,
                allMsg, setAllMsg,
                unreadMsg, setUnreadMsg,





                // *****************************  For Listing  ********************************


                lMS_id, setLMS_id,
                lMS_category_title, setLMS_category_title,
                lMS_subcategory_title, setLMS_subcategory_title,
                lMS_category_id, setLMS_category_id,
                lMS_subcategory_id, setLMS_subcategory_id,
                lMS_title, setLMS_title,
                lMS_search_tag, setLMS_search_tag,
                lMS_description, setLMS_description,

                lMS_package_price_1, setLMS_package_price_1,
                lMS_package_id_1, setLMS_package_id_1,
                lMS_package_name_1, setLMS_package_name_1,
                lMS_package_description_1, setLMS_package_description_1,

                lMS_package_price_2, setLMS_package_price_2,
                lMS_package_id_2, setLMS_package_id_2,
                lMS_package_name_2, setLMS_package_name_2,
                lMS_package_description_2, setLMS_package_description_2,

                lMS_package_price_3, setLMS_package_price_3,
                lMS_package_id_3, setLMS_package_id_3,
                lMS_package_name_3, setLMS_package_name_3,
                lMS_package_description_3, setLMS_package_description_3,

                lMS_package_price_4, setLMS_package_price_4,
                lMS_package_id_4, setLMS_package_id_4,
                lMS_package_name_4, setLMS_package_name_4,
                lMS_package_description_4, setLMS_package_description_4,

                lMS_package_price_5, setLMS_package_price_5,
                lMS_package_id_5, setLMS_package_id_5,
                lMS_package_name_5, setLMS_package_name_5,
                lMS_package_description_5, setLMS_package_description_5,


                lMS_type, setLMS_type,
                lMS_location, setLMS_location,
                lMS_distance, setLMS_distance,
                lMS_prev_distance, setLMS_prev_distance,

                lMS_lat, setLMS_lat,
                lMS_lng, setLMS_lng,
                lMS_avalibility, setLMS_avalibility,
                lMS_message, setLMS_message,

                lMS_Multi_Images, setLMS_Multi_Images,
                lMS_single_Images, setLMS_single_Images,
                lMS_prev_single_Images, setLMS_prev_single_Images,
                lMS_prev_Multi_Images, setLMS_prev_Multi_Images,
                open, setOpen,
                open2, setOpen2,
                open3, setOpen3,
                open4, setOpen4,
                open5, setOpen5,

                mytaskloader, setMytaskloader,
                prev_dropdown, setPrev_dropdown,
                selectedTaskType, setselectedTaskType,
                startLoader_myTask, setStartLoader_myTask,
                startLoader_BrowserTask, setStartLoader_BrowserTask,
                profileData, setProfileData,

                review_as_poster, setReview_as_poster,
                review_as_tasker, setReview_as_tasker,
                user_completed_task_as_poster, setUser_completed_task_as_poster,
                user_completed_task_as_tasker, setUser_completed_task_as_tasker,
                listData, setListData,
                listAllServicesData, setListAllServicesData,
                listAllServicesDataForMap, setListAllServicesDataForMap,
                isListAllServicesload, setIsListAllServicesload,
                allCategory, setAllCategory,
                allSubcategory, setAllSubcategory,
                tierData, setTierData,
                userData, setUserData,
                allData, setAllData,
                next_TierData, setNext_TierData,
                tierDetails, setTierDetails,
                review_as_poster_review_page, setReview_as_poster_review_page,
                review_as_tasker_review_page, setReview_as_tasker_review_page,
                listingCategory, setListingCategory,
                task_page_list, setTask_page_list,
                defaultTask, setDefaultTask,
                phone_number, setPhone_numbe,
                email_Address, setEmail_Address,
                userName, setUserName,
                isopenOffer, setIsopenOffer,
                tierLogo, setTierLogo,
                islistingRefresh, setIslistingRefresh,
                listing_Page, setListing_Page,
                activeTab, setActiveTab,
                documentStatus, setDocumentStatus,
                recent_notification_count, setRecent_notification_count,
                choose_Categories, setChoose_Categories,
                allSkill, setAllSkill,
                alllanguage, setAlllanguage,
                all_country_code, setall_Country_code,
                prof_pic, setProf_pic,
                moreBalance, setMoreBalance,
                password, setPassword,
                confirmPassword, setConfirmPassword,

                // my task
                whichSection, setWhichSection,
                whichSection2, setWhichSection2,

                // be a fixer

                country_id, setCountry_id,
                country_value, setCountry_value,
                nationality_id, setNationality_id,
                nationality_value, setNationality_value,
                editProfileaddress, setEditProfileaddress,
                getAround, setGetAround,
                getAround_temporary, setGetAround_temporary,
                taskDetailsTitle, setTaskDetailsTitle,
                catagory, setcatagory,

                taskCatagoryName, setTaskCatagoryName,
                takingPhoneNoModal, setTakingPhoneNoModal,
                onPressOpenModalPh,
                phone_Code, setPhone_Code,
                signupPhoneNumer_details, setSignupPhoneNumer_details,
                pin1, setPin1,
                pin2, setPin2,
                pin3, setPin3,
                pin4, setPin4,
                allNewMyTask, setAllNewMyTask,
                isMyTaskLoad, setIsMyTaskLoad,
                isBrowseTaskLoad, setIsBrowseTaskLoad,
                isBrowseMapLoad, setIsBrowseMapLoad,
                pin1_EditProfile, setPin1_EditProfile,
                pin2_EditProfile, setPin2_EditProfile,
                pin3_EditProfile, setPin3_EditProfile,
                pin4_EditProfile, setPin4_EditProfile,

                document_selection, setDocument_selection,
                front_uri, setFront_uri,
                back_uri, setBack_uri,
                front_details, setFront_details,
                back_details, setBack_details,
                front_details_prev, setFront_details_prev,
                back_details_prev, setBack_details_prev,
                isPhoneVerify, setIsPhoneVerify,
                isPhVerify, setIsPhVerify,
                isDefaultMytask_asposter, setIsDefaultMytask_asposter,
                isDefaultMytask_astasker, setIsDefaultMytask_astasker,
                prev_phone, setPrev_Phone,
                prev_phoneCode, setPrev_phoneCode,
                user_Certificate, setUser_Certificate,
                filter_Categories, setFilter_Categories,
                listing_Categories, setListing_Categories,
                searchToggle, setSearchToggle,
                taskOrMap, setTaskOrMap,
                listCardOrMap, setlistCardOrMap,
                isAvaliable, setIsAvaliable,
                termAndCoModal, setTermAndCoModal,
                browserTaskloader, setBrowserTaskloader,
                isPrevFilterData, setIsPrevFilterData,
                taskdetailsSlug, setTaskdetailsSlug,
                mapzoomIN, setMapzoomIN,
                browsertaskTotalPage, setBrowsertaskTotalPage,
                browsertaskCurrentPage, setBrowsertaskCurrentPage,
                browserTaskFooterText, setBrowserTaskFooterText,
                certificateList, setCertificateList,
                notifications, setNotifications,
                isNotificationPageLoad, setIsNotificationPageLoad,
                empty, setEmpty,
                total_pageno, setTotal_pageno,
                temp_pageno, setTemp_pageno,
                notificationLoader, setNotificationLoader,
                notificationScrollLoader, setNotificationScrollLoader,
                taskdetailsLoader, setTaskdetailsLoader,
                is_notification_pref_updated, setIs_notification_pref_updated,
                currentLocation, setCurrentLocation,
                newOfferPageMessageArry, setNewOfferPageMessageArry,
                newOfferPageMessageWithTaskerArry, setNewOfferPageMessageWithTaskerArry,
                isSettingSkillLoad, setIsSettingSkillLoad,
                isNewbeAFixerStep2load, setIsNewbeAFixerStep2Load,
                storageData, setStorageData,
                beAFixerAbout_me, setBeAFixerAbout_me,
                beAFixerSelectProfilegallary, setBeAFixerSelectProfilegallary,
                beAFixerProfile_picture, setBeAFixerProfile_picture,
                cancelOfferSucessModal, setCancelOfferSucessModal,
                makeAnOfferInitialPopupModal, setMakeAnOfferInitialPopupModal,
                isNotifyPrefLoad, setIsNotifyPrefLoad,
                drawerTabNaviData, setDrawerTabNaviData,
                about_meForEditProfile, setAbout_meForEditProfile,
                storageDataForEditProfile, setStorageDataForEditProfile,
                selectProfilegallaryForEditProfile, setSelectProfilegallaryForEditProfile,
                profile_pictureForEditProfile, setProfile_pictureForEditProfile,

                listing_KeyWord, setListing_KeyWord,
                listing_Location, setListing_Location,
                listing_Lat, setListing_Lat,
                listing_Lng, setListing_Lng,
                listing_Type, setListing_Type,
                listing_distance, setListing_distance,
                listing_prevDistance, setListing_prevDistance,
                listing_tempLocation, setListing_tempLocation,
                listing_currentLocation, setListing_currentLocation,
                isListingMapLoad, setIsListingMapLoad,
                voucherDetails, setVoucherDetails
            }}
        >
            {props.children}
        </myContext.Provider>
    )
}
