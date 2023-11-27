export type UserNames = "Cucumber" | "Jona"

export const freeHugsTopicPrefix = __DEV__ ? "test-free-hugs-" : "free-hugs-"
export type FreeHugsTopicPrefix = typeof freeHugsTopicPrefix

export type UserConfig = {
  name: UserNames
  realName: string
  freeHugTopicReceive: `${FreeHugsTopicPrefix}${UserNames}`
  freeHugTopicSend: `${FreeHugsTopicPrefix}${UserNames}`
}

export type UserConfigs = Record<UserNames, UserConfig>
export type StorageKeys = {
  currentUser: string
}
