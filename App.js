import React, {useState, useEffect} from 'react';
import { Text, View, Image, LogBox, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer, useIsFocused  } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WebView } from 'react-native-webview';

import {vw, vh} from 'react-native-expo-viewport-units'

import mainBg from './splash1.png'

import MapPinIcon from './mapPin.png'
import NewsFeedIcon from './newsFeed.png'
import AccountIcon from './account.png'

export default function App() {

  function splashScreen({navigation})
  {
      // setTimeout(() => {
      //     navigation.navigate('Listings')
      // }, 1500);

      const Btns = ({colorText, bg, text, link}) => {
        return <>
          <TouchableOpacity onPress={() => {navigation.navigate(link)}} style={{width: 130, height: 45, backgroundColor: bg, position: 'relative', marginLeft: 15, marginRight: 15, borderRadius: 10}}>
            <Text style={{color: colorText, fontSize: 20, textAlign: 'center', marginTop: 8, fontWeight: 'bold'}}>{text}</Text>
          </TouchableOpacity>

        </>
      }
      return(
        <TouchableOpacity activeOpacity={.9} style={{ backgroundColor: 'black' }} onPress={() => {navigation.navigate('Listings')}}>
          <Image source={mainBg} style={{width: vw(100), height: vh(100)}} />

          <View style={{position: 'absolute', bottom: 120, width: vw(100)}}>
            
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Btns colorText={'#002ACE'} bg={'#F6FB00'} text={'Listings'} link={'Listings'}/>
              <Btns colorText={'#F6FB00'} bg={'#002ACE'} text={'Login'} link={'Profile'} />
            </View>

          </View>
          <View style={{position: 'absolute', bottom: 80, width: vw(100)}}>
            <View style={{justifyContent: 'center', alignItems: 'center',marginBottom: -20}}>
                <Text style={{fontSize: 15, color: 'white'}}>Are you a content creator or a business?</Text>
                <Text onPress={() => navigation.navigate('PricingAcutal')} style={{fontSize: 15, color: '#F6FB00', textDecorationLine: 'underline'}}>work with us</Text>
            </View>
          </View>

        </TouchableOpacity>
      );
  }
  function ListingsScreen()
  {
      const [key, setKey] = useState(0)
      let isFocused = useIsFocused();
      useEffect(() => {
        if(isFocused)
        {
          console.log(isFocused)
          setKey(prev => prev + 1)
          isFocused = false
        }
      }, [isFocused]);

      const runFirst = `
        // alert('Script injected');
    
        document.getElementsByClassName('nav-button-wrap color-bg')[0].style.visibility = 'hidden'; // hide menu
    
        true; // note: this is required, or you'll sometimes get silent failures
      `;
      return (
        <View style={{height: vh(95)}}>
          <WebView 
            key={key}
            source={{ uri: 'https://www.mrkudos.com/listings' }}
            injectedJavaScript={runFirst}
          />
        </View>
      );
  }

  function FeaturedFeedScreen()
  {
      const runFirst = `
      // alert('Script injected');

      document.getElementsByClassName('nav-button-wrap color-bg')[0].style.visibility = 'hidden'; // hide menu

      true; // note: this is required, or you'll sometimes get silent failures
    `;
    return (
      <View style={{height: vh(95)}}>
        <WebView 
          source={{ uri: 'https://www.mrkudos.com/featured-feed' }}
          injectedJavaScript={runFirst}
        />
      </View>
    );
  }

  function ProfileScreen()
  {
      const runFirst = `
        // alert('Script injected');

        document.getElementsByClassName('nav-button-wrap color-bg')[0].style.visibility = 'hidden'; // hide menu

        true; // note: this is required, or you'll sometimes get silent failures
      `;
    return (
      <View style={{height: vh(95)}}>
        <WebView 
          source={{ uri: 'https://www.mrkudos.com/login' }}
          injectedJavaScript={runFirst}
        />
      </View>
    );
  }

  function PricingPage()
  {
    const runFirst = `
        // alert('Script injected');

        document.getElementsByClassName('nav-button-wrap color-bg')[0].style.visibility = 'hidden'; // hide menu

        true; // note: this is required, or you'll sometimes get silent failures
      `;
    return (
      <View style={{height: vh(95)}}>
        <WebView 
          source={{ uri: 'https://www.mrkudos.com/login' }}
          injectedJavaScript={runFirst}
        />
      </View>
    );
  }

  function pricingPageActual()
  {
      const runFirst = `
      // alert('Script injected');

      document.getElementsByClassName('nav-button-wrap color-bg')[0].style.visibility = 'hidden'; // hide menu

      true; // note: this is required, or you'll sometimes get silent failures
    `;
    return (
      <View style={{height: vh(95)}}>
        <WebView 
          source={{ uri: 'https://www.mrkudos.com/pricing' }}
          injectedJavaScript={runFirst}
        />
      </View>
    );
  }

  const Tab = createBottomTabNavigator();
  const MyTheme = {
    dark: false,
    colors: {
      primary: '#FFFFFF',
      background: '#FFFFFF',
      card: '#e86b45',
      text: '#FFFFFF',
      border: '#42CBC6',
      notification: '#42CBC6',
    },
  };
  // const MyTheme = {
  //   dark: false,
  //   colors: {
  //     primary: '#e86b45',
  //     background: '#e86b45',
  //     card: '#FFFFFF',
  //     text: '#e86b45',
  //     border: '#e86b45',
  //     notification: '#e86b45',
  //   },
  // };

  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator>
        <Tab.Screen name="Splash" component={splashScreen} options={{tabBarStyle: {display: 'none'}, tabBarShowLabel: false, headerShown: false, tabBarButton: (props) => null }} />
        <Tab.Screen name="Listings" component={ListingsScreen} options={{ tabBarShowLabel: true, headerShown: false,  tabBarIcon: ({focused}) => (<Image style={[{width :25, height: 25, marginTop: 2, }, focused ? {opacity: 1} : {opacity: 0.4}]} source={MapPinIcon} />), }} />
        <Tab.Screen name="Feed" component={FeaturedFeedScreen} options={{ tabBarShowLabel: true, headerShown: false, tabBarIcon: ({focused}) => (<Image style={[{width :25, height: 25, marginTop: 2, }, focused ? {opacity: 1} : {opacity: 0.4}]} source={NewsFeedIcon} />), }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarShowLabel: true, headerShown: false, tabBarIcon: ({focused}) => (<Image style={[{width :25, height: 25, marginTop: 2, }, focused ? {opacity: 1} : {opacity: 0.4}]} source={AccountIcon} />), }} />
        <Tab.Screen name="Pricing" component={PricingPage} options={{ tabBarShowLabel: false, headerShown: false, tabBarButton: (props) => null }} />
        <Tab.Screen name="PricingAcutal" component={pricingPageActual} options={{ tabBarShowLabel: false, headerShown: false, tabBarButton: (props) => null }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}