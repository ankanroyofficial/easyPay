import React, { useEffect, Fragment } from 'react'
import { View, Text, Modal, TouchableOpacity } from 'react-native'
import { withRtl } from 'react-native-easy-localization-and-rtl';
import { Colors } from '../../../../constants/colors';
import { useNavigation } from "@react-navigation/native"
import Button from "../../../../components/Button"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import globalStyle_esyPay from '../../../../constants/globalStyles/GlobalStyle_esyPay';
import { fontfmliy } from '../../../../components/WhichFontFamily';
import { myContext } from '../../../../constants/ContextApi';
import { useContext } from 'react';

function PaymentRequiredModal({ ispress, onPress, bid_id, amount, taskSlug, taskerName }) {
    const navigation = useNavigation()
    const { setVoucherDetails } = useContext(myContext)
    const bookNowBotton = async () => {
        try {
            onPress()
            setVoucherDetails(null)
            navigation.navigate("PaymentReservation", { bid_id, amount, taskSlug, taskerName })
        } catch (error) {
            console.log("bookNowBotton", error)
        }
    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={ispress}
            onRequestClose={() => {
                onPress()
            }}
        >
            <View style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", justifyContent: "center", alignItems: "center" }} >
                <View style={{ padding: Normalize(20), width: "80%", backgroundColor: Colors.white, elevation: 10, borderRadius: Normalize(8) }} >
                    <Fragment>
                        <View style={{ alignItems: "center" }}>
                            <View style={{
                                height: Normalize(60), width: Normalize(60), backgroundColor: Colors.white, marginTop: Normalize(-50),
                                borderRadius: Normalize(30), alignItems: 'center', justifyContent: 'center'
                            }}>
                                <View style={{
                                    height: Normalize(50), width: Normalize(50), backgroundColor: Colors.secondary,
                                    borderRadius: Normalize(25), alignSelf: 'center', justifyContent: 'center', alignItems: 'center'
                                }} >
                                    <FontAwesome
                                        name="check"
                                        size={Normalize(30)}
                                        color={Colors.white}
                                    />
                                </View>
                            </View>
                            <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.primary, fontSize: Normalize(14), marginTop: Normalize(10), fontFamily: "Lato-Bold" }]}>{"Booking Details"}</Text>
                            <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.primary, fontSize: Normalize(11), lineHeight: Normalize(13), marginTop: Normalize(10), fontFamily: fontfmliy.regular }]}>{"Book now and securely reserve your\npayment to officially start your task"}</Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
                                <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.primary, fontSize: Normalize(12), marginTop: Normalize(10), fontFamily: "Lato-Bold" }]}>Offer prize</Text>
                                <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.primary, fontSize: Normalize(12), marginTop: Normalize(10), fontFamily: "Lato-Bold" }]}>$ {amount}</Text>
                            </View>
                            <View style={{ height: 1, width: '80%', backgroundColor: '#ddd', marginTop: Normalize(10) }} />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
                                <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.secondary, fontSize: Normalize(12), marginTop: Normalize(10), fontFamily: "Lato-Bold" }]}>Total to reserve</Text>
                                <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.secondary, fontSize: Normalize(12), marginTop: Normalize(10), fontFamily: "Lato-Bold" }]}>$ {amount}</Text>
                            </View>
                            <View style={{ height: 1, width: '80%', backgroundColor: '#ddd', marginTop: Normalize(10) }} />

                            <Text style={[globalStyle_esyPay.pageHeading, {
                                color: Colors.primary, fontSize: Normalize(11.5), lineHeight: Normalize(13), marginTop: Normalize(10),
                                fontFamily: fontfmliy.regular, textAlign: 'center'
                            }]}>{"Your payment will be securely reserved in the Eazypay safe payment system untill the task is completed, and you can release it yourself"}</Text>
                            <Text style={[globalStyle_esyPay.pageHeading, {
                                color: Colors.primary, fontSize: Normalize(11), lineHeight: Normalize(13), marginTop: Normalize(10),
                                fontFamily: fontfmliy.regular, textAlign: 'center'
                            }]}>{"If the task was not completed, the payment will be release back to you"}</Text>

                        </View>
                        <Button
                            name={"Book Now"}
                            onPress={bookNowBotton}
                            style={{ backgroundColor: Colors.secondary, marginTop: Normalize(20) }}
                        />
                    </Fragment>
                </View>
                <TouchableOpacity
                    onPress={onPress}
                    style={{ height: Normalize(50), width: Normalize(50), borderRadius: Normalize(50) / 2, backgroundColor: Colors.white, elevation: 10, justifyContent: "center", alignItems: "center", marginTop: Normalize(10) }} >
                    <Entypo name="cross" color={Colors.textinput_inner_text} size={Normalize(35)} />
                </TouchableOpacity>
            </View>

        </Modal>
    )
}
export default withRtl(PaymentRequiredModal);