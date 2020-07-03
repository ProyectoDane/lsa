# ATENCION
Usar YARN, NO usar NPM  

# ATENCION (ios)
1. El proyecto ahora usa pods en ios para la dependecia de react native firebase, es necesario hacer pod install en la carpeta de ios
2. abrir el proyecto con el archivo .xcworkspace dentro de la carpeta ios.

# instrucciones para poder hacer build y deploy en simulador (ios)
1. yarn
2. pararse en node_modules/react-native/ y ejecutar ./scripts/ios-install-third-party.sh
3. pararse en node_modules/react-native/trird-party/glog-0.3.4 y ejecutar ../../scripts/ios-configure-glog.sh
4. buscar el archivo findMatchingSimulator.js en node_modules/react-native/local-cli/runIOS y reemplazar la sentencia version.indexOf('iOS') !== 0 con !version.includes('iOS')
5. buscar el archivo findMatchingSimulator.js en node_modules/react-native/local-cli/runIOS y reemplazar la sentencia simulator.availability !== '(available)' con !simulator.isAvailable 
6. seguir las instrucciones de este comment https://github.com/facebook/react-native/pull/25146#issuecomment-533995604
7. listar los simuladores con xcrun simctl list
8. bootear el simulador con xcrun simctl boot "id del simulador" (xcrun simctl boot "iPhone X")
9. abrir la app simulator
10. ejecutar npx react-native run-ios --simulator="nombre del simulador" (npx react-native run-ios --simulator="iPhone X")