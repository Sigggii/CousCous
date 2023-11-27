import AsyncStorage from "@react-native-async-storage/async-storage"
import { JSX, useContext, useEffect, useState } from "react"
import { Image, Pressable, StyleSheet } from "react-native"
import DeviceInfo from "react-native-device-info"

import { storageKeys, userConfigs } from "../../common/Config"
import {
  CurrentUserContext,
  CurrentUserContextState,
} from "../../common/CurrentUserProvider"
import { UserNames } from "../../common/models"
import { Text, View } from "../Themed"

// ToDo Make currentUser global State so if current user is changed in anyway,
// login screen is shown again
export const LoginScreen = (props: { children: JSX.Element }) => {
  const { currentUser, updateCurrentUser } = useContext(CurrentUserContext)
  const [macAdress, setMacAdress] = useState("")

  const { children } = props

  if (
    currentUser === userConfigs["Cucumber"].name ||
    currentUser === userConfigs["Jona"].name
  ) {
    return <>{children}</>
  }

  const onPlayerChosen = async (user: UserNames) => {
    await AsyncStorage.setItem(storageKeys.currentUser, user)
    await updateCurrentUser(user)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Wer bist du?</Text>
      <View style={styles.imageContainer}>
        <Pressable onPress={() => onPlayerChosen(userConfigs["Cucumber"].name)}>
          <Image
            style={styles.imageCucumber}
            source={require("../../assets/images/cucumber.png")}
          />
        </Pressable>
        <Pressable onPress={() => onPlayerChosen(userConfigs["Jona"].name)}>
          <Image
            style={styles.imageJona}
            source={require("../../assets/images/jona.png")}
          />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    fontSize: 40,
    fontWeight: "bold",
  },
  imageContainer: {
    marginTop: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  imageCucumber: {
    width: 130,
    height: 150,
    marginRight: 50,
  },
  imageJona: {
    width: 150,
    height: 150,
  },
})
