import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from './res/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Alphabetical,
  AlphabeticalNavigationOptions,
  Category,
  DaneSplashScreen,
  Download,
  DownloadNavigationOptions,
  Home,
  HomeNavigationOptions,
  Information,
  InformationNavigationOptions,
  Register,
  Search,
  SearchNavigationOptions,
  SplashScreen,
  VideoPlayer,
  VideoPlayerNavigationOptions,
  VideoSplash,
} from './components';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
// eslint-disable-next-line import/no-deprecated
import { StyleSheet, Text } from 'react-native';

import 'react-native-gesture-handler';
// eslint-disable-next-line sort-imports
import React from 'react';

const Analytics = analytics();

const HomeStack = createStackNavigator();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={Home}
        options={HomeNavigationOptions}
      />
      <HomeStack.Screen
        name="Category"
        component={Category}
        options={Category.navigationOptions}
      />
      <HomeStack.Screen
        name="VideoPlayer"
        component={VideoPlayer}
        options={VideoPlayerNavigationOptions}
      />
    </HomeStack.Navigator>
  );
};

const SearchStackScreen = () => {
  const SearchStack = createStackNavigator();

  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={Search}
        options={SearchNavigationOptions as StackNavigationOptions}
      />
      <SearchStack.Screen
        name="VideoPlayerScreen"
        component={VideoPlayer}
        options={VideoPlayerNavigationOptions}
      />
    </SearchStack.Navigator>
  );
};

const AlphabeticalStackScreen = () => {
  const AlphabeticalStack = createStackNavigator();

  return (
    <AlphabeticalStack.Navigator>
      <AlphabeticalStack.Screen
        name="AlphabeticalScreen"
        component={Alphabetical}
        options={AlphabeticalNavigationOptions}
      />
      <AlphabeticalStack.Screen
        name="VideoPlayerAlphatical"
        component={VideoPlayer}
        options={VideoPlayerNavigationOptions}
      />
    </AlphabeticalStack.Navigator>
  );
};

const InformationStack = createStackNavigator();
const InformationStackScreen = () => {
  return (
    <InformationStack.Navigator>
      <InformationStack.Screen
        name="Información"
        component={Information}
        options={InformationNavigationOptions}
      />
    </InformationStack.Navigator>
  );
};

const DownloadStack = createStackNavigator();
const DownloadStackScreen = () => {
  return (
    <DownloadStack.Navigator>
      <DownloadStack.Screen
        name="Download"
        component={Download}
        options={DownloadNavigationOptions}
      />
    </DownloadStack.Navigator>
  );
};

const screenStyles = (color: string) =>
  StyleSheet.create({ text: { fontWeight: 'bold', color: color } });

const getScreenOptions = (label: string, iconName: string) => ({
  tabBarLabel: label,
  tabBarIcon: ({ color }: { color: string }) =>
    label === 'Alphabetical' ? (
      <Text
        style={screenStyles(color).text}
        numberOfLines={1}
        ellipsizeMode="clip"
      >
        ABC
      </Text>
    ) : (
      <MaterialCommunityIcons
        name={iconName}
        size={26}
        style={{ color: color }}
      />
    ),
});

const TabStack = createBottomTabNavigator();

export const App = (): ReactElement => {
  const [timePassed, setTimePassed] = useState(false);
  const [secondTimePassed, setSecondTimePassed] = useState(false);
  const [viewedVideo, setViewedVideo] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [skipped, setSkipped] = useState(false);

  const _start = useCallback(async () => {
    const hasViewedVideo = await AsyncStorage.getItem('hasViewedVideo');
    setViewedVideo(hasViewedVideo === 'true');
    const hasRegistered = await AsyncStorage.getItem('hasRegistred');
    setRegistered(hasRegistered === 'true');
    const _skipped = await AsyncStorage.getItem('skipped');
    setSkipped(_skipped === 'true');
    setTimeout(() => {
      setTimePassed(true);
    }, 1500);
  }, []);

  useEffect(() => {
    void _start(); // eslint-disable-line no-void
  }, [_start]);

  useEffect(() => {
    setTimeout(() => {
      setSecondTimePassed(true);
    }, 5000);
  }, []);

  const onEndVideo = async () => {
    await AsyncStorage.setItem('hasViewedVideo', 'true');
    setViewedVideo(true);
  };

  const onRegistered = async () => {
    await Analytics.logEvent('registered');
    await AsyncStorage.setItem('hasRegistred', 'true');
    setRegistered(true);
    setSkipped(false);
  };

  const onSkipped = async () => {
    await Analytics.logEvent('skip_register');
    await AsyncStorage.setItem('skipped', 'true');
    setRegistered(false);
    setSkipped(true);
  };

  const SplashScreens = () => {
    // eslint-disable-next-line functional/no-let
    let componentToShow = null;
    // eslint-disable-next-line functional/no-loop-statement
    while (!componentToShow) {
      if (!timePassed) {
        componentToShow = <SplashScreen />;
      } else if (!secondTimePassed) {
        componentToShow = <DaneSplashScreen />;
      } else if (!viewedVideo) {
        componentToShow = <VideoSplash onEnd={onEndVideo} />;
      } else if (!registered && !skipped) {
        componentToShow = (
          <Register onRegister={onRegistered} onSkipped={onSkipped} />
        );
      } else {
        // eslint-disable-next-line no-console
        console.log('aca se muestra el resto de pantallas');
        componentToShow = (
          <TabStack.Navigator
            backBehavior="none"
            screenOptions={getTabScreenOptions()}
          >
            <TabStack.Screen
              name="Home"
              component={HomeStackScreen}
              options={getScreenOptions('Home', 'home-outline')}
            />
            <TabStack.Screen
              name="Download"
              component={DownloadStackScreen}
              options={getScreenOptions('Download', 'download')}
            />
            <TabStack.Screen
              name="Alphabetical"
              component={AlphabeticalStackScreen}
              options={getScreenOptions('Alphabetical', 'alphabetical')}
            />
            <TabStack.Screen
              name="Search"
              component={SearchStackScreen}
              options={getScreenOptions('Search', 'magnify')}
            />
            <TabStack.Screen
              name="Information"
              component={InformationStackScreen}
              options={getScreenOptions('Information', 'information-outline')}
            />
          </TabStack.Navigator>
        );
      }
    }

    return componentToShow;
  };

  const getTabScreenOptions = () => ({
    tabBarShowLabel: false,
    tabBarActiveTintColor: Colors.TAB_BAR_ACTIVE_ICON,
    tabBarInactiveTintColor: Colors.THEME_SECONDARY,
    tabBarActiveBackgroundColor: Colors.THEME_PRIMARY,
    tabBarStyle: { backgroundColor: Colors.THEME_PRIMARY },
    tabBarInactiveBackgroundColor: 'tranparent',
    headerShown: false,
  });

  return (
    <NavigationContainer>
      <SplashScreens />
    </NavigationContainer>
  );
};
