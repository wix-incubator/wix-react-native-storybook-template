# storybook Server
Storybook server is a project used to host Storybook for React Native instance. It includes addons, and quick way to configure storybook.

## Usage
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

## Working locally
If you want to have a quick boilerplate with addons or if you want to use storybook for development, this project can help you too.


Steps:
1. Download this project as node_module.
2. Copy `local` folder into your project.
3. Change `#YOUR_APP_NAME#` inside `local` folder.
4. Add npm script: `storybook start -p 7007 -c #PATH_TO_LOCAL_FOLDER#`

_Note: It assumes that you write stories in `stories` directory next to `local` directory. Of course you can change that._

### Addons
* #[react-docgen](https://github.com/mihalik/react-storybook-addon-docgen) -- Needs to be updated to storybook v3.
* [storybook addon knobs](https://github.com/storybooks/storybook/tree/master/packages/addon-knobs)
* [storybook smart knobs (auto generates knobs)](https://github.com/lucasconstantino/storybook-addon-smart-knobs);
* [storybook usage](https://github.com/Gongreg/storybook-usage);

### Custom features
* Custom design (main area is hidden in favor of bigger sidebar)
* All tabs in sidebar are displayed at same time, to reduce tab switching.
* Contains entry screen to insert remote server address in hosted mode.

