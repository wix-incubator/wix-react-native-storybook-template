# storybook Server
Storybook server is a project used to host Storybook for React Native instance. It includes addons, and quick way to configure storybook.
This project also has a boilerplate that you can use to work locally.

## Server
Since React Native storybook talks through websockets, we only need one server to support multiple projects/users.
This server can be used to host storybook, so users could download the app to their phone, enter the code shown on screen
(or scan QR code for it) and start playing around with your stories.

Steps:
1. Clone the project.
2. Yarn install.
3. Host the project anywhere you want.
4. Run `npm run start`.

Inside `server` directory there are example entry files (index.ios.js) to see how your app could look like for hosted
project (it allows user to enter code displayed in storybook so he could use hosted server).

## Locally
If you want to have a quick boilerplate with addons or if you want to use storybook for development, this project can help you too.

Steps:
1. Install package `yarn add wix-react-native-storybook-server`.
2. Install storybook in project `node ./node_modules/.bin/wix-storybook-install`. Include installed files to git.
3. Copy these scripts to your package.json:
```
"storybook": "(adb reverse tcp:8081 tcp:8081 || true) && (adb reverse tcp:7007 tcp:7007 || true) && storybook start -p 7007 -c ./storybook/local",
"loki-test": "loki test --skipStories 'No Loki'",
"loki-update": "loki update --skipStories 'No Loki'",
"loki-approve": "loki approve"
```
4. (If not using REACT NATIVE NAVIGATION) Uncomment the code in storybook/local/storybook.js. Change `#YOUR_APP_NAME#` to your app.
5. Run `npm run storybook`.

### Addons
* [react-docgen](https://github.com/mihalik/react-storybook-addon-docgen)
* [storybook addon knobs](https://github.com/storybooks/storybook/tree/master/packages/addon-knobs)
* [storybook smart knobs (auto generates knobs)](https://github.com/lucasconstantino/storybook-addon-smart-knobs);
* [storybook usage](https://github.com/Gongreg/storybook-usage);

### Custom features
* Custom design (main area is hidden in favor of bigger sidebar)
* All tabs in sidebar are displayed at same time, to reduce tab switching.
* Contains entry screen to insert remote server address in hosted mode.

