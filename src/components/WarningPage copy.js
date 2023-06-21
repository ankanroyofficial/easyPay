import React from 'react'
import { View, Text, Modal, ScrollView, Image, TouchableOpacity, TextInput, ActivityIndicator, Pressable } from 'react-native'
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Toast from 'react-native-simple-toast';
import { marginLeft } from 'styled-system';
import { Colors } from '../constants/colors';
import globalstyles from '../constants/globalStyles/Global_Styles';
import images from '../constants/images';
import strings from '../constants/lng/LocalizedStrings';
import { leftOrRight, rowOrRowreverse } from '../constants/RowOrRowreverse';
import Normalize from './../helpers/Dimens';



function WarningPage({ ispress, onPress, warningTitle, warningSubTitle, okOnpress, cancelOnpress }) {
    const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();

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
                <View style={{ paddingVertical: Normalize(10), width: Normalize(220), backgroundColor: Colors.white, padding: Normalize(15), borderRadius: 10 }} >
                    <View style={{ marginBottom: Normalize(15) }} >
                        <Text style={[globalstyles.plantext_Outfit_Medium,{color:Colors.primary,fontSize:Normalize(16),textAlign:"center",marginBottom: Normalize(4)}]}>{warningTitle}</Text>
                        <Text style={[globalstyles.plantext_outfit_regular,{color:Colors.greyText,fontSize:Normalize(14),textAlign:"center"}]}>{warningSubTitle}</Text>
                    </View>
                    <View style={{ flexDirection: rowOrRowreverse(language) }} >
                        <View style={{ height: Normalize(33), width: "100%", flexDirection: rowOrRowreverse(language), justifyContent: "space-evenly", marginBottom: Normalize(5) }} >
                            <TouchableOpacity
                                onPress={okOnpress}
                                style={{ height: "100%", width: "38%", backgroundColor: Colors.secondary, justifyContent: "center", alignItems: "center", borderRadius: 5 }} >
                                <Text
                                    style={[globalstyles.plantext_Outfit_Medium,{fontSize:Normalize(15),color:Colors.white}]}>{strings.POSTTASK.YES}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={cancelOnpress}
                                style={{ height: "100%", width: "38%", backgroundColor: Colors.primary, justifyContent: "center", alignItems: "center", borderRadius: 5 }} >
                                <Text
                                    style={[globalstyles.plantext_Outfit_Medium,{fontSize:Normalize(15),color:Colors.white}]}>{strings.POSTTASK.NO}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>

    )
}
export default withRtl(WarningPage);