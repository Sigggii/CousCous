import FontAwesome from "@expo/vector-icons/FontAwesome"
import messaging from "@react-native-firebase/messaging"
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"
import axios from "axios"
import { useFonts } from "expo-font"
import { SplashScreen, Stack } from "expo-router"
import { useContext, useEffect, useState } from "react"
import { useColorScheme, Vibration } from "react-native"

import { userConfigs } from "../common/Config"
import {
  CurrentUserContext,
  CurrentUserProvider,
} from "../common/CurrentUserProvider"
import { getSplashMessage } from "../common/axios/SplashScreenAPI"
import { freeHugsTopicPrefix } from "../common/models"
import { CustomSplashScreen } from "../components/common/CustomSplashScreen"
import { LoginScreen } from "../components/common/LoginScreen"

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router"

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)/Free Hugs",
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  })

  const [splashMessage, setSpashMessage] = useState<string>()
  axios.defaults.headers.common["Authorization"] =
    process.env.EXPO_PUBLIC_SECRET

  getSplashMessage().then((result) => {
    setSpashMessage(result)
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded && splashMessage) {
      SplashScreen.hideAsync()
    }
  }, [loaded, splashMessage])

  useEffect(() => {
    return messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.from?.startsWith("/topics/" + freeHugsTopicPrefix)) {
        Vibration.vibrate([500, 800, 600, 800])
      }
    })
  }, [])

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp((remoteMessage) => {
      Vibration.vibrate([500, 800, 600, 800])
    })

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          Vibration.vibrate([500, 800, 600, 800])
        }
      })
  }, [])

  if (!loaded || !splashMessage) {
    return null
  }

  return (
    <CurrentUserProvider>
      <RootLayoutNav splashMessage={splashMessage} />
    </CurrentUserProvider>
  )
}

function RootLayoutNav(props: { splashMessage: string }) {
  const colorScheme = useColorScheme()
  const [showSplashScreen, setShowSplashScreen] = useState(true)

  const { currentUser } = useContext(CurrentUserContext)

  useEffect(() => {
    if (
      currentUser === userConfigs.Cucumber.name ||
      currentUser === userConfigs.Jona.name
    )
      messaging()
        .subscribeToTopic(userConfigs[currentUser].freeHugTopicReceive)
        .then(() =>
          console.log(
            "subscribed to " + userConfigs[currentUser].freeHugTopicReceive,
          ),
        )
  }, [currentUser])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplashScreen(false)
    }, 3500)
    return () => clearTimeout(timeout)
  }, [])

  // ToDo hinbekommen, dass hier auch direkt das Theme genutzt wird
  if (showSplashScreen) {
    return (
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <CustomSplashScreen splashMessage={props.splashMessage} />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <LoginScreen>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ presentation: "modal" }} />
        </Stack>
      </LoginScreen>
    </ThemeProvider>
  )
}
