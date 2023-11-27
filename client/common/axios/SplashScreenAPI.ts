import { SERVER_IP } from "@env"
import axios from "axios"

export const getSplashMessage = async () => {
  try {
    const { data } = await axios.get<string>(SERVER_IP + "message")
    return data
  } catch (error) {
    return "I <3 you !!!!"
  }
}
