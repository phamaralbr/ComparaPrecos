import React from "react";
import { StyleSheet, View, Animated } from "react-native";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import { useFonts, Nunito_400Regular, Nunito_300Light } from "@expo-google-fonts/nunito";
import ProductList from "./components/ProductList";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeAreaView from "react-native-safe-area-view";

export default function App() {
  const AnimatedHeaderValue = new Animated.Value(0);
  const AnimateHeaderBackgroundColor = AnimatedHeaderValue.interpolate({
    inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
    outputRange: ["#000", "#000"],
    extrapolate: "clamp",
  });
  const AnimateHeaderHeight = AnimatedHeaderValue.interpolate({
    inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
    outputRange: [Header_Maximum_Height, Header_Minimum_Height],
    extrapolate: "clamp",
  });
  const AnimateHeaderFontSize = AnimatedHeaderValue.interpolate({
    inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
    outputRange: [34, 22],
    extrapolate: "clamp",
  });

  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_300Light,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
          <View style={styles.container}>
            <StatusBar style="light" />

            <ProductList AnimatedHeaderValue={AnimatedHeaderValue} Header_Maximum_Height={Header_Maximum_Height} />
            
            <Animated.View style={[styles.HeaderStyle, { height: AnimateHeaderHeight, backgroundColor: AnimateHeaderBackgroundColor }]}>
              <Animated.Text style={[styles.headerTitle, { fontSize: AnimateHeaderFontSize }]}> Comparar Preços </Animated.Text>
            </Animated.View>

          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
}

const Header_Maximum_Height = 300;
const Header_Minimum_Height = 60;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  HeaderStyle: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
  },

  headerTitle: {
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Nunito_300Light",
  },

});
