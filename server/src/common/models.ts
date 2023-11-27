export type UserNames = "Cucumber" | "Jona";

export type UserConfig = {
  name: UserNames;
  realName: string;
  freeHugTopicReceive: `free-hugs-${UserNames}`;
  freeHugTopicSend: `free-hugs-${UserNames}`;
};

export type UserConfigs = Record<UserNames, UserConfig>;
export type StorageKeys = {
  currentUser: string;
};

export type FreeHugBody = {
  sender: UserConfig;
  message: string;
};
