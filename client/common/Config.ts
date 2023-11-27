import { StorageKeys, UserConfigs } from "./models"

export const userConfigs: UserConfigs = {
  Cucumber: {
    name: "Cucumber",
    realName: "Maria",
    freeHugTopicReceive: __DEV__
      ? "test-free-hugs-Cucumber"
      : "free-hugs-Cucumber",
    freeHugTopicSend: __DEV__ ? "test-free-hugs-Jona" : "free-hugs-Jona",
  },
  Jona: {
    name: "Jona",
    realName: "Simeon",
    freeHugTopicReceive: __DEV__ ? "test-free-hugs-Jona" : "free-hugs-Jona",
    freeHugTopicSend: __DEV__
      ? "test-free-hugs-Cucumber"
      : "free-hugs-Cucumber",
  },
}

export const storageKeys: StorageKeys = {
  currentUser: "current_user",
}
