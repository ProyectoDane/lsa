# Installation

## Android

1. yarn
2. npx react-native link
3. npm run android

## iOS

1. yarn
2. npx react-native link
3. npx pod-install
4. npm run ios

# Linting

`npm run lint` for report.  
`npm run lint -- --fix` to fix issues.

# TODO

1. Dedup base header props scattered among all the components
2. Add tests
3. Remove CategoriesDownload comp and move code to Downloads comp
4. Remove old redux code (redux is not being used now. it was used to control page scroll)
