import { MaterialIcons } from "@expo/vector-icons"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Link, Tabs } from "expo-router"
import { Pressable, useColorScheme } from "react-native"

import Colors from "../../constants/Colors"

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"]
  color: string
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}
export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Free Hugs",
          message: "Hugs",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="heartbeat" color={color} />
          ),
          headerRight: () => (
            <Link href="/settings" asChild>
              <Pressable>
                {({ pressed }) => (
                  <MaterialIcons
                    name="settings"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="todo"
        options={{
          title: "ToDo",
          message: "Tab Two",
          tabBarIcon: ({ color }) => <TabBarIcon name="tasks" color={color} />,
          // ToDo make settings globally in header, so I dont have to do it for every page separatly
          headerRight: () => (
            <Link href="/settings" asChild>
              <Pressable>
                {({ pressed }) => (
                  <MaterialIcons
                    name="settings"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  )
}
