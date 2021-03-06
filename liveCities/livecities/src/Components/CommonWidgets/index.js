import React from 'react';
import {
  Platform,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  ActivityIndicator,
  Linking,
  Alert } from 'react-native';
import {Colors} from '@Themes';


const CommonWidgets = {

    renderStatusBar(color) {
        if (Platform.OS === 'android') {
            return (
                <StatusBar
                backgroundColor = {color}
                barStyle = {'light-content'}
                translucent />
            );
        }

        return (
            <View style = {{ height: 20 }}>
                <StatusBar
                backgroundColor = {color}
                barStyle = {'light-content'}
                translucent />
            </View>
        );
    },

    renderHiddenStatusBar(){
        return <StatusBar hidden={true} />
    }
}

export default CommonWidgets;
