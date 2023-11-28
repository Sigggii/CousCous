import messaging from "@react-native-firebase/messaging"
import { useContext } from "react"
import { Button, StyleSheet } from "react-native"

import { userConfigs } from "../common/Config"
import { CurrentUserContext } from "../common/CurrentUserProvider"
import { View } from "../components/Themed"

export default function ModalScreen() {
  const { currentUser, updateCurrentUser } = useContext(CurrentUserContext)

  const onLogOut = async () => {
    if (currentUser) {
      await messaging().unsubscribeFromTopic(
        userConfigs[currentUser].freeHugTopicReceive,
      )
      await updateCurrentUser(null)
    }
  }

  return (
    <View>
      <View style={styles.logoutView}>
        <Button title="Log out" onPress={onLogOut} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  logoutView: {
    marginTop: 50,
    justifyContent: "center",
  },
})
