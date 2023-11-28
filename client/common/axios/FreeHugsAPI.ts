import { SERVER_IP } from "@env"
import axios from "axios"

import { FreeHugBody } from "./models"

export const giveHug = async (data: FreeHugBody) => {
  console.log(data)
  await axios.post(process.env.SERVER_IP + "give-hug", data)
}
