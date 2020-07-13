BASE_PATH=$PWD

function log() {
    echo "\n$(tput setaf 2)$1\n"
    tput sgr0
}

function goto() {
    cd "$BASE_PATH/$1"
}

log "INSTALLING YARN 🚀"
npm -g i yarn
cd ios
log "INSTALLING COCOAPODS 🚀"
sudo gem install cocoapods
log "INSTALLING POD 🚀"
pod install

cd ..
log "RUNNING YARN 🚀"
yarn
goto "node_modules/react-native/"
log "INSTALLING IOS THIRD PARTY 🚀"
sh ./scripts/ios-install-third-party.sh
goto "node_modules/react-native/third-party/glog-0.3.4"
log "CONFIGURING IOS GLOG 🚀"
sh ../../scripts/ios-configure-glog.sh

log "RUNNING FILE REPLACING 🚀"
goto "/node_modules/react-native/local-cli/runIOS"

brew install gnu-sed

log "REPLACING IN findMatchingSimulator.js"
sed -i '' "s/version.indexOf('iOS') !== 0/!version.includes('iOS')/g" findMatchingSimulator.js
sed -i '' "s/simulator.availability !== '(available)'/!simulator.isAvailable/g" findMatchingSimulator.js

goto "/node_modules/react-native/React/Base"

log "REPLACING IN RCTModuleMethod.mm"
gsed -i '/  return RCTReadString(input, "__attribute__((unused))") ||/a RCTReadString(input, "__attribute__((__unused__))") ||' RCTModuleMethod.mm

log "SUCCESS 🎉"
