import React, { useState } from 'react';
import {Text, TouchableOpacity } from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
// import { backgroundColor } from 'styled-system';
import { Colors } from './../constants/colors';
import Normalize from './../helpers/Dimens';

function ModalCustomText({ label, style, textStyle, onChange }) {
    const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();

    const [isActive, setIsActive] = useState(false);

    const handlePress = () => {
        setIsActive(!isActive);
        onChange(!isActive);
    };

    return (
        <TouchableOpacity onPress={handlePress} style={{ height: Normalize(30), backgroundColor: isActive ? Colors.primary : Colors.white, marginBottom: Normalize(5), justifyContent: "center", alignItems: "center" }}>
            {label ? (<Text style={{ fontSize: Normalize(15), color: isActive ? Colors.white : Colors.primary }}>{label}</Text>) : null}
        </TouchableOpacity>
    );
}

export default withRtl(ModalCustomText);