const IS_DEV = process.env.APP_VARIANT === "development"

export default {
  expo: {
    name: "CousCous",
    slug: "client",
    version: "1.0.0",
    notification: {
      icon: "./assets/images/couscous_icon.png",
    },
    orientation: "portrait",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      icon: "./assets/images/couscous_icon.png",
      package: IS_DEV ? "com.CousCous.CousCous.dev" : "com.CousCous.CousCous",
      versionCode: 1,
      googleServicesFile: IS_DEV
        ? "./google-services_dev.json"
        : "./google-services.json",
      adaptiveIcon: {
        foregroundImage: "./assets/images/couscous_icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: ["expo-router", "@react-native-firebase/app"],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "bf95c643-cc51-4a8b-91f9-f8c88b376928",
      },
    },
  },
}
