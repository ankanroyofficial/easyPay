import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  StatusBar,
  Platform,
  Alert,
  Modal,
} from 'react-native';
import Header from '../../../../components/Header';
import styles from './Styles';
import {withRtl, useRtlContext} from 'react-native-easy-localization-and-rtl';
import {Colors} from '../../../../constants/colors';
import images from '../../../../constants/images';
import strings from '../../../../constants/lng/LocalizedStrings';
import moment from 'moment';
import {addCommaAndTranslateInPersian} from '../../../../constants/NumberWithCommaAndInPersian';
import {engToPersian} from '../../../../constants/EnglishToPersian';
import {questionPersianTimeShow} from '../../../../constants/DateShow';
import {
  leftOrRight,
  rowOrRowreverse,
} from '../../../../constants/RowOrRowreverse';
import LoaderPage from '../../../../components/LoaderPage';
import {getTransactionNote} from '../../../../constants/NotesConvert';
import Toast from 'react-native-simple-toast';
import axiosInstance from '../../../../constants/AxiosCallPage';
import Normalize from '../../../../helpers/Dimens';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import {WebView} from 'react-native-webview';
import Button from './../../../../components/Button';
import {axiosUrl} from '../../../../constants/LinkPage';

export default function Finance({navigation}) {
  const {RtlStyles, isRtl, language, setLanguage} = useRtlContext();
  const [f_data, setF_data] = useState([]);
  const [tearning, setTearning] = useState('');
  const [tspending, setTspending] = useState('');
  const [cpaidt, setCpaidt] = useState('');
  const [cpaidp, setCpaidp] = useState('');
  const [tbalance, setTbalance] = useState('');
  const [loader, setLoader] = useState(false);
  const [bankDetails, setBankDetails] = useState(false);
  const [total_pageno, setTotal_pageno] = useState('0');
  const [temp_pageno, setTemp_pageno] = useState(1);

  const webref = useRef();
  const [isFocus, setIsFocus] = useState(false);
  const [balance, setBalance] = useState('');
  const [amount, setAmount] = useState('');
  const [ispaymentgateway, setIsPaymentgateway] = React.useState(false);
  const [loader2, setLoader2] = useState(false);
  const [apiUrl, setApiUri] = useState('');

  useEffect(() => {}, [ispaymentgateway]);

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

  const onNavigationStateChangeHandle = ({url}) => {
    if (url == `${axiosUrl.URL}payment-fail`) {
      onPressPamentGetWay();
    } else if (url == `${axiosUrl.URL}payment-cancel`) {
      onPressPamentGetWay();
    } else if (url == `${axiosUrl.URL}payment-success`) {
      setAmount('');
      if (Platform.OS == 'ios') {
        Alert.alert('Success!', 'Balence added Sucessfully', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      } else {
        Toast.show('Balence added Sucessfully');
      }
      setIsPaymentgateway(!ispaymentgateway);
    } else {
      // console.log(url)
    }
  };

  useEffect(() => {
    getData();
    isbankdetails();
  }, []);
  const isbankdetails = async () => {
    const data = await axiosInstance.post('payment-method-details');
    if (data.data.result.bank === null) {
      setBankDetails(false);
    } else {
      setBankDetails(true);
    }
  };
  const getData = async () => {
    try {
      setLoader(true);
      const res = {
        params: {
          page: 1,
        },
      };
      const data = await axiosInstance.post('finance', res);
      // console.log(data.data)
      if (data.data) {
        setF_data(data.data.transaction);
        setTearning(data.data.total_earning);
        setCpaidp(data.data.commision_poster);
        setCpaidt(data.data.commision);
        setTspending(data.data.total_spend);
        setTbalance(data.data.user.wallet_balance);

        setTotal_pageno(data.data.transaction_page_count);

        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  const inOrOut = val => {
    if (val === 'IN') {
      return 'ورودی';
    } else if (val === 'OUT') {
      return 'خروجی';
    } else {
      return 'error';
    }
  };

  const onpressNextButton = () => {
    var a = temp_pageno;
    var b = a + 1;
    get_listingData_after_NxtOrPre(b);
    setTemp_pageno(b);
  };
  const onpressPreviousButton = () => {
    var a = temp_pageno;
    var b = a - 1;
    get_listingData_after_NxtOrPre(b);
    setTemp_pageno(b);
  };

  const get_listingData_after_NxtOrPre = async val => {
    try {
      setLoader(true);
      const res = {
        params: {
          page: val,
        },
      };
      const data = await axiosInstance.post('finance', res);
      if (data.data) {
        setF_data(data.data.transaction);
        setTearning(data.data.total_earning);
        setCpaidp(data.data.commision_poster);
        setCpaidt(data.data.commision);
        setTspending(data.data.total_spend);
        setTbalance(data.data.user.wallet_balance);
        setTotal_pageno(data.data.transaction_page_count);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  return (
    <>
      {loader ? (
        <LoaderPage />
      ) : (
        <SafeAreaView
          style={{
            backgroundColor: Colors.primary,
            flex: 1,
            flexDirection: 'column',
          }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={styles.container}>
            <Header
              navigation={navigation}
              back
              name={strings.MORESCREEN.FINANCE}
            />

            <CurveDesing_Component  >
              <View style={globalstyles.container_only_padding}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{paddingBottom: Normalize(15)}}>
                  {/* *************first row********* */}
                  <View
                    style={{
                      flexDirection: rowOrRowreverse(language),
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        width: '49%',
                        height: Normalize(100),
                        borderRadius: 5,
                        borderColor: Colors.financeBack,
                        borderWidth: Normalize(1),
                        marginTop: Normalize(5),
                      }}>
                      <View style={{flex: 1, justifyContent: 'center'}}>
                        <View
                          style={{
                            height: Normalize(40),
                            width: Normalize(40),
                            backgroundColor: Colors.financeBack,
                            alignSelf: 'center',
                            borderRadius: Normalize(20),
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            resizeMode="contain"
                            style={{
                              width: '60%',
                              height: '60%',
                              alignSelf: 'center',
                            }}
                            source={images.te}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          backgroundColor: Colors.financeBack,
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: Normalize(10),
                            color: Colors.white,
                            fontFamily: 'roboto-bold',
                          }}>
                          {language == 'en'
                            ? 'Total Earning as a Tasker'
                            : 'درآمد کسب شده (مجری)'}
                        </Text>
                        <Text
                          style={{
                            color: '#fff',
                            marginHorizontal: 1,
                            fontSize: Normalize(11),
                            fontFamily: 'roboto-bold',
                          }}>
                          {strings.BROWSEFILTER.TOMAN}{' '}
                          {addCommaAndTranslateInPersian(
                            parseInt(tearning),
                            language,
                          )}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '49%',
                        height: Normalize(100),
                        borderRadius: 5,
                        borderColor: Colors.financeBack,
                        borderWidth: Normalize(1),
                        marginTop: Normalize(5),
                      }}>
                      <View style={{flex: 1, justifyContent: 'center'}}>
                        <View
                          style={{
                            height: Normalize(40),
                            width: Normalize(40),
                            backgroundColor: Colors.financeBack,
                            alignSelf: 'center',
                            borderRadius: Normalize(20),
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            resizeMode="contain"
                            style={{
                              width: '60%',
                              height: '60%',
                              alignSelf: 'center',
                            }}
                            source={images.cp}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          backgroundColor: Colors.financeBack,
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: Normalize(10),
                            color: Colors.white,
                            fontFamily: 'roboto-bold',
                          }}>
                          {language == 'en'
                            ? 'Commition Paid as a Tasker'
                            : 'کمیسیون کسر شده (مجری)'}
                        </Text>
                        <Text
                          style={{
                            color: '#fff',
                            marginHorizontal: 1,
                            fontSize: Normalize(11),
                            fontFamily: 'roboto-bold',
                          }}>
                          {strings.BROWSEFILTER.TOMAN}{' '}
                          {addCommaAndTranslateInPersian(
                            parseInt(cpaidt),
                            language,
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* *************second row********** */}
                  <View
                    style={{
                      flexDirection: rowOrRowreverse(language),
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        width: '49%',
                        height: Normalize(100),
                        borderRadius: 5,
                        borderColor: Colors.financeBack,
                        borderWidth: Normalize(1),
                        marginTop: Normalize(5),
                      }}>
                      <View style={{flex: 1, justifyContent: 'center'}}>
                        <View
                          style={{
                            height: Normalize(40),
                            width: Normalize(40),
                            backgroundColor: Colors.financeBack,
                            alignSelf: 'center',
                            borderRadius: Normalize(20),
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            resizeMode="contain"
                            style={{
                              width: '60%',
                              height: '60%',
                              alignSelf: 'center',
                            }}
                            source={images.ts}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          backgroundColor: Colors.financeBack,
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: Normalize(10),
                            color: Colors.white,
                            fontFamily: 'roboto-bold',
                          }}>
                          {language == 'en'
                            ? 'Total Spend as a Poster'
                            : 'پرداختی ها (کارفرما)'}
                        </Text>
                        <Text
                          style={{
                            color: '#fff',
                            marginHorizontal: 1,
                            fontSize: Normalize(11),
                            fontFamily: 'roboto-bold',
                          }}>
                          {strings.BROWSEFILTER.TOMAN}{' '}
                          {addCommaAndTranslateInPersian(
                            parseInt(tspending),
                            language,
                          )}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '49%',
                        height: Normalize(100),
                        borderRadius: 5,
                        borderColor: Colors.financeBack,
                        borderWidth: Normalize(1),
                        marginTop: Normalize(5),
                      }}>
                      <View style={{flex: 1, justifyContent: 'center'}}>
                        <View
                          style={{
                            height: Normalize(40),
                            width: Normalize(40),
                            backgroundColor: Colors.financeBack,
                            alignSelf: 'center',
                            borderRadius: Normalize(20),
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            resizeMode="contain"
                            style={{
                              width: '60%',
                              height: '60%',
                              alignSelf: 'center',
                            }}
                            source={images.cp}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          backgroundColor: Colors.financeBack,
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: Normalize(10),
                            color: Colors.white,
                            fontFamily: 'roboto-bold',
                          }}>
                          {language == 'en'
                            ? 'Commition Paid as a Poster'
                            : 'کمیسیون کسر شده (کارفرما)'}
                        </Text>
                        <Text
                          style={{
                            color: '#fff',
                            marginHorizontal: 1,
                            fontSize: Normalize(11),
                            fontFamily: 'roboto-bold',
                          }}>
                          {strings.BROWSEFILTER.TOMAN}{' '}
                          {addCommaAndTranslateInPersian(
                            parseInt(cpaidp),
                            language,
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* *************third row********** */}
                  <View
                    style={{
                      width: '100%',
                      height: Normalize(100),
                      borderRadius: 5,
                      borderColor: Colors.financeBack,
                      borderWidth: Normalize(1),
                      marginTop: Normalize(5),
                      alignSelf: 'center',
                    }}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                      <View
                        style={{
                          height: Normalize(40),
                          width: Normalize(40),
                          backgroundColor: Colors.financeBack,
                          alignSelf: 'center',
                          borderRadius: Normalize(20),
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          resizeMode="contain"
                          style={{
                            width: '60%',
                            height: '60%',
                            alignSelf: 'center',
                          }}
                          source={images.bl}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        backgroundColor: Colors.financeBack,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: Normalize(10),
                          color: Colors.white,
                          fontFamily: 'roboto-bold',
                        }}>
                        {language == 'en' ? 'Balance' : 'موجودی'}
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          marginHorizontal: 1,
                          fontSize: Normalize(11),
                          fontFamily: 'roboto-bold',
                        }}>
                        {strings.BROWSEFILTER.TOMAN}{' '}
                        {addCommaAndTranslateInPersian(
                          parseInt(tbalance),
                          language,
                        )}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: Normalize(20),
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        bankDetails
                          ? navigation.navigate('WithdrawMoney', {
                              balance: tbalance,
                            })
                          : Toast.show(
                              language == 'en'
                                ? 'Please add Bank account details to continue'
                                : 'لطفاً برای ادامه جزئیات حساب بانکی را اضافه کنید',
                            );
                      }}
                      style={{
                        width: '45%',
                        height: Normalize(32),
                        borderRadius: Normalize(5),
                        marginVertical: Normalize(10),
                        alignSelf: 'center',
                        backgroundColor: Colors.secondary,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: Normalize(14),
                          color: Colors.white,
                          fontFamily: 'Outfit-Medium',
                        }}>
                        {language == 'en' ? 'Withdraw Money' : 'درخواست واریز'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Wallet');
                      }}
                      style={{
                        width: '45%',
                        height: Normalize(32),
                        borderRadius: Normalize(5),
                        marginVertical: Normalize(10),
                        alignSelf: 'center',
                        backgroundColor: Colors.secondary,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: Normalize(14),
                          color: Colors.white,
                          fontFamily: 'Outfit-Medium',
                        }}>
                        Deposite Payment
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* <Text style={[globalstyles.plantext_Outfit_Medium, {
                    fontSize: Normalize(12), color: Colors.grey, marginTop: Normalize(50),
                    textAlign: 'center', marginBottom: Normalize(20)
                  }]}>To add your wallet ballance please deposit amount from your bank account</Text>

                  <Text style={[globalstyles.plantext_Outfit_Medium, { fontSize: Normalize(15), marginVertical: Normalize(10) }]}>Deposit amount</Text>

                  <TextInput
                    maxLength={7}
                    value={amount}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    placeholder={"Please enter amount here"}
                    onChangeText={(e) => setAmount(e)}
                    style={[globalstyles.textinputStyle,
                    {
                      borderColor: isFocus ? Colors.primary : Colors.disable_textinput_border,
                      backgroundColor: isFocus ? Colors.white : Colors.disable_textinput_background
                    }
                    ]}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                  /> */}

                  {/* <Button
                    style={{ marginTop: Normalize(40), marginBottom: 150 }}
                    onPress={updateButton}
                    name={loader ? "" : "Deposite Payment"}
                  > */}
                  {/* {
                      loader &&
                      <ActivityIndicator
                        size={"small"}
                        color={Colors.white}
                      />
                  //   } */}
                  {/* </Button> */}

                  {/* {
                    ispaymentgateway && 
                    <Modal
      animationType="fade"
      transparent={true}
      visible={ispaymentgateway}
      onRequestClose={() => {
        onPressPamentGetWay()
      }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>

        <View style={{ flex: 1, backgroundColor: Colors.white }} >
          <StatusBar backgroundColor={Colors.payment_blue} barStyle="default" />
          <View style={{ height: Normalize(50), width: "100%", flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#E8E8E8", borderBottomWidth: 1, backgroundColor: Colors.payment_blue }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
              <Text style={{
                fontSize: Normalize(14),
                fontFamily: 'roboto-bold',
                color: Colors.white
              }}>{strings.MAKEANOFFER.PAYMENT}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.5} onPress={onPressPamentGetWay} style={{ height: Normalize(50), width: Normalize(50), justifyContent: "center", alignItems: "center" }} >
              <Image source={images.crossWhite} style={{ height: Normalize(12), width: Normalize(12), resizeMode: "contain" }} />
            </TouchableOpacity>
          </View>
          <WebView
            ref={webref}
            source={{ uri: apiUrl }}
            style={{ flex: 1 }}
            onLoad={console.log("loaded")}
            onNavigationStateChange={onNavigationStateChangeHandle}
            startInLoadingState={true}
          />
        </View>
      </SafeAreaView>
    </Modal>
                  } */}
                  <View style={{paddingBottom: '2%'}} />

                  {/* pagination */}
                  {total_pageno > 1 && (
                    <View
                      style={{
                        height: Normalize(30),
                        marginTop: Normalize(7),
                        marginHorizontal: 5,
                        flexDirection: rowOrRowreverse(language),
                        justifyContent: 'space-between',
                      }}>
                      {1 < temp_pageno ? (
                        total_pageno > 1 ? (
                          <TouchableOpacity
                            onPress={onpressPreviousButton}
                            style={[styles.arrowButton]}>
                            <Image
                              style={styles.imageButton}
                              source={
                                language == 'en'
                                  ? images.arrowleftblack
                                  : images.arrowrightblaack
                              }
                            />
                          </TouchableOpacity>
                        ) : (
                          <View style={[styles.arrowButton]}>
                            <Image
                              style={styles.imageButton}
                              source={
                                language == 'en'
                                  ? images.arrowleftgrey
                                  : images.arrowrightgrey
                              }
                            />
                          </View>
                        )
                      ) : (
                        <View style={[styles.arrowButton]}>
                          <Image
                            style={styles.imageButton}
                            source={
                              language == 'en'
                                ? images.arrowleftgrey
                                : images.arrowrightgrey
                            }
                          />
                        </View>
                      )}
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%',
                          //  width: Normalize(35),
                          paddingHorizontal: Normalize(5),
                          backgroundColor: '#f5f5f5',
                          borderRadius: 10,
                          elevation: 0.8,
                        }}>
                        <Text style={[styles.h0, {fontSize: Normalize(14)}]}>
                          {language == 'en'
                            ? `${temp_pageno}/${total_pageno}`
                            : `${engToPersian(total_pageno)}/${engToPersian(
                                temp_pageno,
                              )}`}
                        </Text>
                      </View>
                      {total_pageno == temp_pageno ? (
                        <View style={[styles.arrowButton]}>
                          <Image
                            style={styles.imageButton}
                            source={
                              language == 'en'
                                ? images.arrowrightgrey
                                : images.arrowleftgrey
                            }
                          />
                        </View>
                      ) : total_pageno > temp_pageno ? (
                        <TouchableOpacity
                          onPress={onpressNextButton}
                          style={[styles.arrowButton]}>
                          <Image
                            style={styles.imageButton}
                            source={
                              language == 'en'
                                ? images.arrowrightblaack
                                : images.arrowleftblack
                            }
                          />
                        </TouchableOpacity>
                      ) : (
                        <View style={[styles.arrowButton]}>
                          <Image
                            style={styles.imageButton}
                            source={
                              language == 'en'
                                ? images.arrowrightgrey
                                : images.arrowleftgrey
                            }
                          />
                        </View>
                      )}
                    </View>
                  )}

                  <View style={{marginTop: Normalize(15)}}>
                    {f_data.map((item, index) => (
                      <View
                        style={{
                          width: '99%',
                          alignSelf: 'center',
                          flexDirection: 'row',
                          backgroundColor: Colors.white,
                          marginBottom: Normalize(6),
                          paddingVertical: Normalize(8),
                          elevation: Normalize(2),
                          borderRadius: 8,
                        }}
                        key={index}>
                        <View
                          style={{
                            flexDirection:
                              language === 'en' ? 'row' : 'row-reverse',
                            flex: 1,
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flexDirection:
                                language === 'en' ? 'row' : 'row-reverse',
                              width: '100%',
                            }}>
                            <View
                              style={{
                                flexDirection: 'column',
                                marginLeft: 15,
                                flex: 1,
                              }}>
                              <View
                                style={{
                                  flexDirection:
                                    language === 'en' ? 'row' : 'row-reverse',
                                  justifyContent: 'space-between',
                                }}>
                                <Text
                                  style={{
                                    color: Colors.primary,
                                    marginLeft: 0,
                                    fontFamily: 'roboto-medium',
                                    fontSize: Normalize(12),
                                    width: '50%',
                                    textAlign: leftOrRight(language),
                                    marginRight:
                                      language === 'en' ? 0 : Normalize(10),
                                  }}>
                                  {language == 'en'
                                    ? item.notes
                                    : getTransactionNote(item.notes, language)}
                                </Text>
                                <View
                                  style={{
                                    flexDirection:
                                      language === 'en' ? 'row' : 'row-reverse',
                                    alignSelf: 'center',
                                  }}>
                                  <Image
                                    style={{
                                      width: 17,
                                      height: 17,
                                      opacity: 0.6,
                                      alignSelf: 'center',
                                    }}
                                    source={images.calander}
                                    resizeMode="contain"
                                  />
                                  <Text
                                    style={{
                                      color: '#818181',
                                      marginLeft: 10,
                                      fontFamily: 'roboto-regular',
                                      fontSize: Normalize(11),
                                      alignSelf: 'center',
                                      marginRight: 10,
                                    }}>
                                    {language == 'en'
                                      ? moment(
                                          item.created_at,
                                          'YYYY-MM-DD',
                                        ).format('Do MMMM, YYYY')
                                      : questionPersianTimeShow(
                                          item.created_at,
                                        )}
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}>
                                <Text
                                  numberOfLines={1}
                                  style={{
                                    color: '#818181',
                                    marginLeft: language === 'en' ? 0 : 2,
                                    fontFamily: 'roboto-regular',
                                    lineHeight: Normalize(14),
                                    fontSize: Normalize(11.5),
                                    marginTop: 10,
                                    marginRight:
                                      language === 'en' ? 0 : Normalize(5),
                                    textAlign:
                                      language === 'en' ? 'left' : 'right',
                                  }}>
                                  {language == 'en' ? 'Type' : 'نوع تراکنش'} :{' '}
                                  {language === 'en'
                                    ? item.type
                                    : inOrOut(item.type)}
                                </Text>
                                <Text
                                  style={{
                                    color: '#1a3a4a',
                                    marginLeft: 10,
                                    fontFamily: 'roboto-medium',
                                    fontSize: Normalize(12),
                                    alignSelf: 'center',
                                    marginRight: 10,
                                    marginTop: 10,
                                  }}>
                                  {strings.BROWSEFILTER.TOMAN}{' '}
                                  {addCommaAndTranslateInPersian(
                                    parseInt(item.amount),
                                    language,
                                  )}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </CurveDesing_Component>
          </KeyboardAvoidingView>
        </SafeAreaView>
      )}
    </>
  );
}
