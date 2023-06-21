import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import Header from '../../../../components/Header'
import axiosInstance from '../../../../constants/AxiosCallPage'
import NewLoaderPage from '../../../../components/NewLoaderPage'
import { FlatList } from 'react-native'
import Normalize from '../../../../helpers/Dimens'
import { Colors } from '../../../../constants/colors'
import images from '../../../../constants/images'
import globalstyles from '../../../../constants/globalStyles/Global_Styles'
import { useContext } from 'react'
import { myContext } from '../../../../constants/ContextApi'
import { useNavigation } from '@react-navigation/native'


const { height, width } = Dimensions.get("window")

export default function VoucherList(props) {

    const navigation = useNavigation()
    const { voucherDetails, setVoucherDetails } = useContext(myContext)
    const { amount } = props.route.params
    const [voucherList, setVoucherList] = useState([])
    const [notApplicableVoucherList, setNotApplicableVoucherList] = useState([])
    const [loader, setLoader] = useState(false)


    useEffect(() => {
        getVouchersList()
    }, [])

    const getVouchersList = async () => {
        try {
            setLoader(true)
            const data = {
                "params": {
                    "keyword": "",
                    "budget_amount": (amount).toString(),
                    // "budget_amount": "20"
                }
            }

            // console.log(data)

            const res = await axiosInstance.post("list-of-vouchers", data)
            // console.log("..................", res.data.result)
            if (res.data.result) {
                let d = res.data.result;
                let newArr = []
                d.vouchers.map((item) => {
                    item.isAvailable = true
                    newArr.push(item)
                })
                d.vouchers_not_applicable.map((item) => {
                    item.isAvailable = false
                    newArr.push(item)
                })
                setVoucherList(newArr)
                setLoader(false)

            }
        } catch (error) {
            setLoader(false)
            console.log("getVouchersList", error)
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.grayf8 }} >
            <Header
                name={"Vouchers"}
                back
            />
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginHorizontal: width * 0.0333 }} >

                    {voucherList.map((item, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    setVoucherDetails({price:item.price, voucher_code: item.voucher_code, id: item.id })
                                    navigation.goBack()
                                }}
                                activeOpacity={item.isAvailable ? 0 : 1}
                                disabled={item.isAvailable ? false : true}
                                key={index} style={{
                                    width: width * 0.45,
                                    height: width * 0.45,
                                    backgroundColor: item.isAvailable ? Colors.secondaryBackground : "#E8E8E8",
                                    marginTop: width * 0.0333,
                                    borderRadius: Normalize(8),
                                    elevation: 2,
                                    borderWidth: voucherDetails != null && voucherDetails.id == item.id ? Normalize(1) : 0,
                                    borderColor: Colors.secondaryBorder,
                                    overflow: "hidden"
                                }}>
                                <View style={{ width: width * 0.20, height: width * 0.20, position: "absolute", right: Normalize(15), bottom: Normalize(15), justifyContent: "center", alignItems: "center", opacity: 0.6 }} >
                                    <Image source={item.isAvailable ? images.logo_secondary : images.logo_grey} style={{ height: "90%", width: "90%", resizeMode: "cover" }} />
                                </View>
                                <View style={{ flex: 1, padding: Normalize(12) }} >
                                    <Text style={[globalstyles.plantext_bold, { fontSize: Normalize(20), color: item.isAvailable ? Colors.primary : Colors.grey }]} >$ {Math.round(item.price)}</Text>
                                    <Text style={[globalstyles.plantext_regular, { fontSize: Normalize(14), color: item.isAvailable ? Colors.primary : Colors.greylightText }]} >is deducted from your task budget amount</Text>
                                </View>
                                {!item.isAvailable && <View style={{ width: "100%", paddingVertical: Normalize(5), position: "absolute", justifyContent: "center", alignItems: "center", opacity: 0.6, backgroundColor: Colors.greylightText, bottom: 0 }} >
                                    <Text style={[globalstyles.plantext_bold, { color: Colors.white, fontSize: Normalize(13) }]} >Not Applicable</Text>
                                </View>}
                            </TouchableOpacity>
                        )
                    })}

                </View>
                {loader && <NewLoaderPage />}
            </View>
        </SafeAreaView>
    )
}