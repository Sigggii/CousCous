import { Image, StyleSheet } from "react-native"

import { Text, View } from "../../components/Themed"

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Under construction !</Text>
      <Image
        style={styles.jonaConstructionImage}
        source={require("../../assets/images/jona_construction.png")}
      />
      <Text style={styles.message}>Ein alter Wal ist kein D-Zug 🚂</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "orange",
  },
  message: {
    fontSize: 20,
    fontWeight: "bold",
  },
  jonaConstructionImage: {
    width: 200,
    height: 200,
  },
})
