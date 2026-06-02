// App.js - Smart Travel Ngũ Hành Sơn
// Main entry point with Navigation + Redux + Context

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Context Providers
import { AppProvider } from './context/AppContext';
import { DestinationProvider } from './context/DestinationContext';

// Auth Screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

// Main Screens
import HomeScreen from './screens/HomeScreen';
import DestinationListScreen from './screens/DestinationListScreen';
import SearchScreen from './screens/SearchScreen';
import DestinationDetailScreen from './screens/DestinationDetailScreen';
import MapScreen from './screens/MapScreen';
import DestinationMapDetailScreen from './screens/DestinationMapDetailScreen';

// AI Screens
import AIMenuScreen from './screens/AIMenuScreen';
import AIChatbotScreen from './screens/AIChatbotScreen';
import AIItineraryScreen from './screens/AIItineraryScreen';
import AIItineraryResultScreen from './screens/AIItineraryResultScreen';

// Itinerary Screens
import ItineraryScreen from './screens/ItineraryScreen';
import ItineraryDetailScreen from './screens/ItineraryDetailScreen';

// Favorite
import FavoriteDestinationScreen from './screens/FavoriteDestinationScreen';

// Profile Screens
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import UploadAvatarScreen from './screens/UploadAvatarScreen';
import ContactSupportScreen from './screens/ContactSupportScreen';
import NotificationScreen from './screens/NotificationScreen';

// Utility Screens
import LoadingScreen from './screens/LoadingScreen';
import ErrorScreen from './screens/ErrorScreen';
import EmptyStateScreen from './screens/EmptyStateScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ============================
// BOTTOM TAB NAVIGATOR
// ============================
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#0891b2',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Search') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Map') iconName = focused ? 'map' : 'map-outline';
          else if (route.name === 'AIMenu') iconName = focused ? 'sparkles' : 'sparkles-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';

          return (
            <View style={[styles.tabIconWrap, focused && styles.tabIconWrapActive]}>
              <Ionicons name={iconName} size={22} color={focused ? '#fff' : color} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Trang chủ' }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarLabel: 'Tìm kiếm' }} />
      <Tab.Screen name="Map" component={MapScreen} options={{ tabBarLabel: 'Bản đồ' }} />
      <Tab.Screen name="AIMenu" component={AIMenuScreen} options={{ tabBarLabel: 'AI' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Cá nhân' }} />
    </Tab.Navigator>
  );
}

// ============================
// MAIN APP
// ============================
export default function App() {
  return (
    <Provider store={store}>
      <AppProvider>
        <DestinationProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
              }}
            >
              {/* Auth */}
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

              {/* Main Tabs */}
              <Stack.Screen name="MainTabs" component={MainTabs} />

              {/* Destination */}
              <Stack.Screen name="DestinationList" component={DestinationListScreen} />
              <Stack.Screen name="DestinationDetail" component={DestinationDetailScreen} />
              <Stack.Screen name="DestinationMapDetail" component={DestinationMapDetailScreen} />

              {/* AI */}
              <Stack.Screen name="AIChatbot" component={AIChatbotScreen} />
              <Stack.Screen name="AIItinerary" component={AIItineraryScreen} />
              <Stack.Screen name="AIItineraryResult" component={AIItineraryResultScreen} />

              {/* Itinerary */}
              <Stack.Screen name="Itinerary" component={ItineraryScreen} />
              <Stack.Screen name="ItineraryDetail" component={ItineraryDetailScreen} />

              {/* Favorite */}
              <Stack.Screen name="FavoriteDestination" component={FavoriteDestinationScreen} />

              {/* Profile */}
              <Stack.Screen name="EditProfile" component={EditProfileScreen} />
              <Stack.Screen name="UploadAvatar" component={UploadAvatarScreen} />
              <Stack.Screen name="ContactSupport" component={ContactSupportScreen} />
              <Stack.Screen name="Notification" component={NotificationScreen} />

              {/* Utility */}
              <Stack.Screen name="Loading" component={LoadingScreen} />
              <Stack.Screen name="Error" component={ErrorScreen} />
              <Stack.Screen name="EmptyState" component={EmptyStateScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </DestinationProvider>
      </AppProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    height: 72,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    borderTopWidth: 0,
    shadowColor: '#0e7490',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 12,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  tabIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIconWrapActive: {
    backgroundColor: '#0891b2',
    shadowColor: '#0891b2',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
});
