import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    SafeAreaView,
} from 'react-native';
import { withRtl } from 'react-native-easy-localization-and-rtl';
import strings from './../../../../constants/lng/LocalizedStrings';
import axiosInstance from '../../../../constants/AxiosCallPage';
import { myContext } from '../../../../constants/ContextApi';
import LoaderPage from '../../../../components/LoaderPage';
import { Colors } from '../../../../constants/colors';
import Header from '../../../../components/ListingHeader';
import ListingMapComponent from './listingComponent/ListingMapComponent';
import ListingCardComponent from './listingComponent/ListingCardComponent';
function ListAllServices({ navigation }) {
    const {
        setListAllServicesData,
        listCardOrMap,
        isListAllServicesload, setIsListAllServicesload,
        setListAllServicesDataForMap,
        listing_Categories,
        listing_KeyWord,
        listing_Lat,
        listing_Lng,
        listing_Type,
        listing_distance
    } = useContext(myContext)
    const [loader, setLoader] = useState(false)
    useEffect(async () => {
        isGetListDataLoad()
        return () => {
            isGetListDataLoad()
        }
    }, []);
    const isGetListDataLoad = () => {
        if (!isListAllServicesload) {
            getListData()
        }
    }
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
    const getListData = async () => {
        try {
            let cateIds = await getFilterCategoryIds(listing_Categories);
            setLoader(true)
            const res = {
                "params": {
                    "keyword": listing_KeyWord,
                    "category": cateIds,
                    "lat": listing_Lat,
                    "lng": listing_Lng,
                    "distance": listing_distance,
                    "type": listing_Type
                }
            }
            const data = await axiosInstance.post("show-service-listings", res)
            // console.log(cateIds)
            if (data.data.result) {
                setIsListAllServicesload(true)
                setListAllServicesData(data.data.result.listing_categories)
                setListAllServicesDataForMap(data.data.result.listing_for_map)
                setLoader(false)
            }
        } catch (error) {
            console.log("getListData", error)
        }
    }
    return (
        <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
            <View style={{
                backgroundColor: Colors.grayf8,
                flex: 1
            }}>
                <Header back name={strings.MORESCREEN.LISTALLSERVICES} />
                {loader ?
                    <LoaderPage />
                    :
                    listCardOrMap ?
                        <ListingCardComponent />
                        :
                        <ListingMapComponent />
                }
            </View>
        </SafeAreaView>
    );
}
export default withRtl(ListAllServices);