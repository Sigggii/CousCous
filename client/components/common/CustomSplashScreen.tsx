import { Animated, Image, StyleSheet } from "react-native";
import { View } from "../Themed";
import Text = Animated.Text;

export const CustomSplashScreen = (props: { splashMessage: string }) => {
  const { splashMessage } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}> CousCous</Text>
      <Image
        style={styles.image}
        source={require("../../assets/images/general/couscous<3.png")}
      />
      <Text style={styles.message}> {splashMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  message: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  image: {
    width: "75%",
    height: "35%",
    resizeMode: "contain",
  },
});
