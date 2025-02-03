[![DOI](https://zenodo.org/badge/DOI/10.1093/nar/gkae1118.svg)](https://doi.org/10.1093/nar/gkae1118)
[![DOI](https://zenodo.org/badge/DOI/10.1093/nar/gkaa793.svg)](https://doi.org/10.1093/nar/gkaa793)
[![Bluesky](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fpublic.api.bsky.app%2Fxrpc%2Fapp.bsky.actor.getProfile%2F%3Factor%3Dbgee.org&query=%24.followersCount&style=social&logo=bluesky&label=Follow%20%40bgee.org)](https://bsky.app/profile/bgee.org)
[![Mastodon](https://img.shields.io/mastodon/follow/109308703977124988?style=social&label=Follow%20%40bgeedb&domain=https%3A%2F%2Fgenomic.social)](https://genomic.social/%40bgeedb)

# Requirements

- NodeJS 16.x.x or fewer
- Yarn

# Installation

1. Have the tools asked in the requirements
2. At the root of the project, run the command:
````shell
yarn install
````
3. Run the project in dev with the following command:
````shell
yarn start
````

# Build

There are 2 commands to build the application.

````shell
yarn build
#or
yarn archive
````

The first command will build the app to be ready for production.
The second one will prepare the application to be deployed as an archive.

DO NOT FORGET
Be careful with the version set in config.json, it will impact the app in production or in archive.

# FAQ

### Where are the images?

The images are stored externally of the project.
You will find the path of the images in the config.json at the key `imageDomain`.
Be careful, the image used for the 'external icon' link is directly defined in the SCSS.
If you are moving it, don't forget to change the path.

### Use of Node 17.x.x

Node 17.x.x doesn't work with create-react-app. So it will be impossible to build the app.
It's recommended to use NodeJS 16.x.x or fewer.

### Font size matrix

````
$size-7: 12px;
$size-6: 1rem (= 14px)
$size-5: 1.1rem (= 15.4px)
$size-4: 1.2rem (= 16.8px)
$size-3: 1.5rem (= 21px)
````

