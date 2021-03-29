import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import ContactFormScreen from '../screens/ContactFormScreen';
import URLFormScreen from '../screens/URLFormScreen';
import TextFormScreen from '../screens/TextFormScreen';
import QrGeneratorScreen from '../screens/QrGeneratorScreen';
import {
  BottomTabParamList,
  TabOneParamList,
  TabTwoParamList,
  TabThreeParamList
} from '../types';

const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Generate"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
    >
      <BottomTab.Screen
        name="Generate"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-add-circle" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Scan"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-scan-circle" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="List"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-list-circle" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={26} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: 'QR Generate' }}
      />
      <TabOneStack.Screen
        name="ContactForm"
        component={ContactFormScreen}
        options={{ headerTitle: 'QR Contact' }}
      />
      <TabOneStack.Screen
        name="URLForm"
        component={URLFormScreen}
        options={{ headerTitle: 'QR URL' }}
      />
      <TabOneStack.Screen
        name="TextForm"
        component={TextFormScreen}
        options={{ headerTitle: 'QR Text' }}
      />
      <TabOneStack.Screen
        name="QrGenerator"
        component={QrGeneratorScreen}
        options={{ headerTitle: 'QR' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'QR Scan' }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={TabThreeScreen}
        options={{ headerTitle: 'QR List' }}
      />
    </TabThreeStack.Navigator>
  );
}
