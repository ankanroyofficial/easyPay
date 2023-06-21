import React, { Fragment } from 'react'
import { View, Text, Modal, ScrollView, Image, TouchableOpacity, TextInput, ActivityIndicator, Pressable } from 'react-native'
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import { Colors } from '../constants/colors';
import Normalize from '../helpers/Dimens';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Button from './Button';
import globalStyle_esyPay from '../constants/globalStyles/GlobalStyle_esyPay';

function WarningPage({ ispress,
    onPress,
    warningTitle,
    warningSubTitle,
    okOnpress,
    cancelOnpress,
     buttonTitle,
      color,
      buttonDisable
    }) {
    const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();

// console.log(buttonDisable)

    return (
        <Modal
            animationType="none"
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
                                    height: Normalize(50), width: Normalize(50), backgroundColor: color ? color : Colors.red_old,
                                    borderRadius: Normalize(25), alignSelf: 'center', justifyContent: 'center', alignItems: 'center'
                                }} >
                                    <FontAwesome
                                        name="trash"
                                        size={Normalize(30)}
                                        color={Colors.white}
                                    />
                                </View>
                            </View>
                            <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.primary, fontSize: Normalize(14), marginTop: Normalize(10), fontFamily: "Lato-Bold" }]}>{warningTitle}</Text>
                            <Text style={[globalStyle_esyPay.detailsText, {
                                fontSize: Normalize(13), marginVertical: Normalize(10),
                                marginHorizontal: Normalize(15), textAlign: 'center'
                            }]}>{warningSubTitle}</Text>
                        </View>
                       
                    </Fragment>



                </View>
                <TouchableOpacity
                    onPress={cancelOnpress}
                    style={{ height: Normalize(50), width: Normalize(50), borderRadius: Normalize(50) / 2, backgroundColor: Colors.white, elevation: 10, justifyContent: "center", alignItems: "center", marginTop: Normalize(10) }} >
                    <Entypo name="cross" color={Colors.textinput_inner_text} size={Normalize(35)} />
                </TouchableOpacity>
            </View>
        </Modal>
    )
}
export default withRtl(WarningPage);