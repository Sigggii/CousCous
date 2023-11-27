import { SERVER_IP } from "@env"
import axios from "axios"

import { FreeHugBody } from "./models"

export const giveHug = async (data: FreeHugBody) => {
  await axios.post(SERVER_IP + "give-hug", data)
}
