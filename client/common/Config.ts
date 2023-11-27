import { StorageKeys, UserConfigs } from "./models"

export const userConfigs: UserConfigs = {
  Cucumber: {
    name: "Cucumber",
    realName: "Maria",
    freeHugTopicReceive: "free-hugs-Cucumber",
    freeHugTopicSend: "free-hugs-Jona",
  },
  Jona: {
    name: "Jona",
    realName: "Simeon",
    freeHugTopicReceive: "free-hugs-Jona",
    freeHugTopicSend: "free-hugs-Cucumber",
  },
}

export const storageKeys: StorageKeys = {
  currentUser: "current_user",
}
