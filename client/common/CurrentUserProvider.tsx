import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, JSX, useEffect, useState } from "react"

import { storageKeys } from "./Config"
import { UserNames } from "./models"

export type CurrentUserContextState = {
  currentUser: UserNames | null
  updateCurrentUser: (user: UserNames | null) => Promise<void>
}

const defaultValue: CurrentUserContextState = {
  currentUser: null,
  updateCurrentUser: async (user) => {},
}
export const CurrentUserContext =
  createContext<CurrentUserContextState>(defaultValue)

export const CurrentUserProvider = (props: { children: JSX.Element }) => {
  const [currentUser, setCurrentUser] = useState<
    CurrentUserContextState["currentUser"]
  >(defaultValue.currentUser)

  useEffect(() => {
    AsyncStorage.getItem(storageKeys.currentUser).then((user) =>
      setCurrentUser(user as UserNames),
    )
  }, [])

  const updateCurrentUser = async (user: UserNames | null) => {
    if (user) await AsyncStorage.setItem(storageKeys.currentUser, user)
    else await AsyncStorage.removeItem(storageKeys.currentUser)
    setCurrentUser(user)
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, updateCurrentUser }}>
      {props.children}
    </CurrentUserContext.Provider>
  )
}
