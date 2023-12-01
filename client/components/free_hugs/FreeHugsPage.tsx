import { useContext, useState } from "react"
import { Image, Pressable, StyleSheet, Vibration } from "react-native"

import { userConfigs } from "../../common/Config"
import { CurrentUserContext } from "../../common/CurrentUserProvider"
import { giveHug } from "../../common/axios/FreeHugsAPI"
import { FreeHugBody } from "../../common/axios/models"
import { Text, View } from "../Themed"

export const FreeHugsPage = () => {
  const { currentUser } = useContext(CurrentUserContext)

  const [isHuged, setIsHuged] = useState<boolean>(false)

  // Function to set the state to false after 5 seconds
  const restHug = () => {
    setIsHuged(false)
  }

  const hugClicked = async (body: FreeHugBody) => {
    Vibration.vibrate([500, 800, 600, 800])
    giveHug(body)
    setIsHuged(true)

    // Use setTimeout to reset the state after 5 seconds
    const timer = setTimeout(restHug, 5000)

    // Clear the timer on component unmount (cleanup)
    return () => clearTimeout(timer)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titel}>{"I need a hug <3"}</Text>
      {currentUser === "Cucumber" && (
        <Pressable
          onPress={() =>
            hugClicked({ sender: userConfigs.Cucumber, message: "<3<3" })
          }
        >
          <Image
            style={styles.jonaImage}
            source={
              isHuged
                ? require("../../assets/images/jona_hearts.png")
                : require("../../assets/images/jona.png")
            }
          />
        </Pressable>
      )}

      {currentUser === "Jona" && (
        <Pressable
          onPress={() =>
            hugClicked({ sender: userConfigs.Jona, message: "<3<3" })
          }
        >
          <Image
            style={styles.cucumberImage}
            source={
              isHuged
                ? require("../../assets/images/cucumber_hearts.png")
                : require("../../assets/images/cucumber.png")
            }
          />
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titel: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 150,
  },
  cucumberImage: {
    width: 200,
    height: 240,
  },
  jonaImage: {
    width: 240,
    height: 240,
  },
})
