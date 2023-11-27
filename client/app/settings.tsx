import { useContext } from "react"
import { Button, StyleSheet } from "react-native"

import { CurrentUserContext } from "../common/CurrentUserProvider"
import { View } from "../components/Themed"

export default function ModalScreen() {
  const { updateCurrentUser } = useContext(CurrentUserContext)

  const onLogOut = async () => {
    await updateCurrentUser(null)
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
