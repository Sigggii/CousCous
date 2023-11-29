import axios from "axios"

export const getSplashMessage = async () => {
  try {
    const { data } = await axios.get<string>(
      process.env.EXPO_PUBLIC_SERVER_IP + "message",
    )
    return data
  } catch (error) {
    return "I <3 you !!!!"
  }
}
