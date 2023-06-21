import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import {withRtl, useRtlContext} from 'react-native-easy-localization-and-rtl';
import axiosInstance from '../../../../constants/AxiosCallPage';
import {Colors} from './../../../../constants/colors';
import images from './../../../../constants/images';
import Normalize from './../../../../helpers/Dimens';
import Header from './../../../../components/Header';
import Button from './../../../../components/Button';
import strings from './../../../../constants/lng/LocalizedStrings';
import styles from './Styles';
import {axiosUrl} from '../../../../constants/LinkPage';
import Toast from 'react-native-simple-toast';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import {WebView} from 'react-native-webview';
import LoaderPage from '../../../../components/LoaderPage';
import {numberWithCommas} from '../../../../constants/NumberWithComma';
function Wallet({navigation}) {
  const webref = useRef();
  const {RtlStyles, isRtl, language, setLanguage} = useRtlContext();
  const [isFocus, setIsFocus] = useState(false);
  const [balance, setBalance] = useState('');
  const [amount, setAmount] = useState('');
  const [ispaymentgateway, setIsPaymentgateway] = React.useState(false);
  const [loader, setLoader] = useState(false);
  const [apiUrl, setApiUri] = useState('');
  useEffect(() => {
    getWalletData();
    return () => {
      getWalletData();
    };
  }, [ispaymentgateway]);

  const getWalletData = async () => {
    try {
      const res = await axiosInstance.post('fund-deposit');
      if (res.data.result) {
        setBalance(res.data.result.user_balance);
      }
    } catch (error) {
      console.log('Wallet Error', error);
    }
  };
  const updateButton = () => {
    if (amount.length == 0 || amount.trim() == '') {
      Toast.show('Please enter amount');
    } else {
      submit();
    }
  };
  const submit = async () => {
    try {
      if (amount > 100000) {
        Toast.show('Amount should be equal to or less than $ 100000');
      } else {
        setLoader(true);
        const data = {
          params: {
            amount: amount,
          },
        };
        const res = await axiosInstance.post('fund-deposit-submit', data);
        if (res.data.checkout_url) {
          setApiUri(res.data.checkout_url);
          onPressPamentGetWay();
          setLoader(false);
        }
        setLoader(false);
      }
    } catch (error) {
      console.log('error===', error);
    }
  };
  const onPressPamentGetWay = () => {
    if (ispaymentgateway === true) {
      setIsPaymentgateway(false);
      Toast.show(strings.ERROR.PAYMENTCANCEL);
    } else {
      setIsPaymentgateway(!ispaymentgateway);
    }
  };
  const PaymentgatewayModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={ispaymentgateway}
      onRequestClose={() => {
        onPressPamentGetWay();
      }}>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>
        <View style={{flex: 1, backgroundColor: Colors.white}}>
          <StatusBar backgroundColor={Colors.payment_blue} barStyle="default" />
          <View
            style={{
              height: Normalize(50),
              width: '100%',
              flexDirection: language == 'en' ? 'row' : 'row-reverse',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomColor: '#E8E8E8',
              borderBottomWidth: 1,
              backgroundColor: Colors.payment_blue,
            }}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: Normalize(14),
                  fontFamily: 'roboto-bold',
                  color: Colors.white,
                }}>
                {strings.MAKEANOFFER.PAYMENT}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onPressPamentGetWay}
              style={{
                height: Normalize(50),
                width: Normalize(50),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={images.crossWhite}
                style={{
                  height: Normalize(12),
                  width: Normalize(12),
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
          <WebView
            ref={webref}
            source={{uri: apiUrl}}
            style={{flex: 1}}
            onLoad={console.log('loaded')}
            onNavigationStateChange={onNavigationStateChangeHandle}
            startInLoadingState={true}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
  const onNavigationStateChangeHandle = ({url}) => {
    // console.log("....................", url)

    if (url == `${axiosUrl.URL}payment-fail`) {
      onPressPamentGetWay();
      navigation.goBack();
    } else if (url == `${axiosUrl.URL}payment-cancel`) {
      onPressPamentGetWay();
      navigation.goBack();
    } else if (url == `${axiosUrl.URL}payment-success`) {
      setAmount('');
      if (Platform.OS == 'ios') {
        Alert.alert('Success!', 'Balence added Sucessfully', [
          {text: 'OK', onPress: () => navigation.goBack()},
        ]);
      } else {
        Toast.show('Balence added Sucessfully');
        navigation.goBack();
      }
      setIsPaymentgateway(!ispaymentgateway);
    } else {
      // console.log(url)
    }
  };
  return (
    <SafeAreaView
      style={{backgroundColor: Colors.primary, flex: 1, flexDirection: 'column'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}>
        <Header back name={'Deposite Payment'} navigation={navigation} />
        {loader ? (
          <LoaderPage />
        ) : (
          <CurveDesing_Component  >
            <View style={globalstyles.container_only_padding}>
              <ScrollView
                // refreshControl={
                //   <RefreshControl
                //     refreshing={refreshing}
                //     onRefresh={onRefresh}
                //   />
                // }
                //
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                style={{flex: 1}}>
                <View style={{flex: 1, padding: 20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginTop: Normalize(20),
                    }}>
                    <Text
                      style={[
                        globalstyles.plantext_Outfit_Medium,
                        {fontSize: Normalize(25), alignSelf: 'center'},
                      ]}>
                      Balance :
                    </Text>
                    <Text
                      style={[
                        globalstyles.blue_Text,
                        {
                          fontSize: Normalize(20),
                          marginLeft: 10,
                          alignSelf: 'center',
                        },
                      ]}>
                      $ {balance == '' ? 0 : numberWithCommas(balance)}{' '}
                    </Text>
                  </View>
                </View>

                <Text
                  style={[
                    globalstyles.plantext_Outfit_Medium,
                    {
                      fontSize: Normalize(12),
                      color: Colors.grey,
                      marginTop: Normalize(50),
                      textAlign: 'center',
                      marginBottom: Normalize(20),
                    },
                  ]}>
                  To add your wallet ballance please deposit amount from your
                  bank account
                </Text>

                <Text
                  style={[
                    globalstyles.plantext_Outfit_Medium,
                    {fontSize: Normalize(15), marginVertical: Normalize(10)},
                  ]}>
                  Deposit amount
                </Text>

                <TextInput
                  maxLength={7}
                  value={amount}
                  keyboardType="numeric"
                  autoCapitalize="none"
                  placeholder={'Please enter amount here'}
                  onChangeText={e => setAmount(e)}
                  style={[
                    globalstyles.textinputStyle,
                    {
                      borderColor: isFocus
                        ? Colors.primary
                        : Colors.disable_textinput_border,
                      backgroundColor: isFocus
                        ? Colors.white
                        : Colors.disable_textinput_background,
                    },
                  ]}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                />

                <Button
                  style={{marginTop: Normalize(40), marginBottom: 150}}
                  onPress={updateButton}
                  name={loader ? '' : 'Deposite Payment'}>
                  {loader && (
                    <ActivityIndicator size={'small'} color={Colors.white} />
                  )}
                </Button>

                {ispaymentgateway && <PaymentgatewayModal />}
                <View style={{paddingBottom: '2%'}} />
              </ScrollView>
            </View>
          </CurveDesing_Component>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default withRtl(Wallet);
