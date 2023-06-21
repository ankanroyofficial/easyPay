
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useRef } from 'react'
import { View, Dimensions, TouchableOpacity ,SafeAreaView} from 'react-native'
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import { WebView } from 'react-native-webview';

const { height, width } = Dimensions.get("window")

function PaymentWebPage({route}) {
    const { apiUrl } = route.params;
    const webref=useRef()
    const navigation = useNavigation()
    const onNavigationStateChangeHandle=({url})=>{
        // console.log(url)
        if(url=="https://changicourt.com/dev/api/payment-fail"&&url=="https://changicourt.com/dev/api/payment-success"){
            // webref.current.stopLoading()
            // console.log(url)
            goBack()
        }else{
            console.log("else",url)
        }
    }
    const goBack=()=>{
        navigation.goBack()
    }
       return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>

        <View style={{ flex: 1 }} >
            <WebView
            ref={webref}
                source={{ uri: apiUrl }}
                // source={{ uri: "https://changicourt.com/dev/dashboard" }}
                style={{flex:1}}
                  onLoad={console.log("loaded")}
                  startInLoadingState
                onNavigationStateChange={onNavigationStateChangeHandle}
            />
            <TouchableOpacity onPress={goBack} style={{height:100}} ></TouchableOpacity>
        </View>
        </SafeAreaView>
    )
}
export default withRtl(PaymentWebPage);