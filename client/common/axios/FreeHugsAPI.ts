import axios from "axios"

import { FreeHugBody } from "./models"

export const giveHug = async (data: FreeHugBody) => {
  console.log(data)
  await axios.post(process.env.EXPO_PUBLIC_SERVER_IP + "give-hug", data)
}
