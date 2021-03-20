---
template: post
title: Over-The-Air Updates With CodePush For React Native 0.6+
slug: ota-updates-w-codepush-react-native
socialImage: /media/ota-update.png
draft: false
date: 2021-03-20T21:41:40.493Z
description: With over-the-air updates, it allows the engineers to develop
  mobile apps fast and iteratively just the web. The result is continuous
  improvements and better UX.
category: software
tags:
  - react-native
  - codepush
---
The documentation for Microsoft Codepush is quite messy, some are even deprecated or outdated, but after a few hours of researching, I finally finished setup and pushed my first OTA update using CodePush. Here I will share with you the lessons I have learnt.

[@giacomocerquone](https://twitter.com/giacomocerquone) has written a [great article](https://www.giacomocerquone.com/blog/microsoft-codepush-integration-in-react-native-0.60) that gives an insightful introduction to how CodePush works. Here is a brief summary:

- React Native bundles the code into a single JS file that interacts with the native code, e.g. the `IPA` file for iOS and `apk` file for Android. Over-the-air update is possible because CodePush can update the jsbundle that the app is interacting with.

Note, there is one outdated part in the article I linked above. For example, in the `Linking and JS implementation` section, the article says manual linking for `react-native-code-push` is required. This is no longer true, refer to the [official documentation](https://github.com/microsoft/react-native-code-push#getting-started). After you have created the deployment stages for CodePush via the AppCenter or the cli, and install the package via `npm i react-native-code-push` or `yarn add react-native-code-push`, then follow the [iOS setup](https://github.com/microsoft/react-native-code-push/blob/master/docs/setup-ios.md) and [Android setup](https://github.com/microsoft/react-native-code-push/blob/master/docs/setup-android.md) guides respectively.

If you don't have `appcenter-cli` installed, run `npm install -g appcenter-cli` before continuing.

After the setup, and after you distribute the app in TestFlight for iOS and Closed/Internal Testing on Google PlayStore, you can upate your JavaScript bundle over the air via the commands below:

```bash
appcenter login
appcenter apps set-current <owner>/<app-name>

appcenter codepush release-react -d <owner>/<app-name> -d <deployment-stage>
```

If you have followed the official documentation for iOS and Android setup, then your `<deployment-stage>` will be `Staging`. But if you have hardcoded the deployment key in your app like so:

```
const App = () => ...

export default code({ deploymentKey: 'KEY_FOR_PRODUCTION' })(App)
```

Then the `<deployment-stage>` should be `Production` instead. By default, `codepush` checks for an update when the app starts and it will install the update when the app next restarts. However, if you want to see your updates being applied more quickly, then you can configure your `CodePushOptions` like so:

```javascript
// check for updates, or apply an update if one exists every time
// the app returns to the foreground after being "backgrounded".
const codepushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME
}

export default codepush(codepushOptions)(App)
```

In conclusion, CI/CD for mobile app development can be quite tricky with the variety of tools being used, so I hope my articles can help resolve some of your confusions. If you have any questions, feel free to contact me via [email](mailto:0alexzhong0@gmail.com) or [Twitter](https://twitter.com/0alexzhong0).

Coming up next:

- How to setup Multi-Deployment or how to do a Dynamic Deployment Assignment.
- Use Firebase for A/B testing
