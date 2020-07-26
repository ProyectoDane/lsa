#### ATENCION ⚠️
Usar YARN, **NO** usar NPM  

#### IMPORTANTE ❗️
El script rmuiwebview.sh se debe correr una vez instalado el proyecto para borrar referencias a UIWebView en el root del proyecto
Ver https://medium.com/@ivanpagac_5657/how-to-solve-itms-90809-deprecated-api-usage-with-reactnative-0-60-in-ci-pipeline-132ca60dcf60

#### ATENCION (ios) ⚠️
1. El proyecto ahora usa pods en ios para la dependecia de react native firebase, es necesario hacer **pod install** en la carpeta de ios
2. Abrir el proyecto con el archivo **.xcworkspace** dentro de la carpeta ios.

## Instrucciones para poder hacer build y deploy en simulador (ios):

  #### OPCION 1 🛠 (Manual):
  1. **yarn**
  2. Pararse en **node_modules/react-native/** y ejecutar **./scripts/ios-install-third-party.sh**
  3. Pararse en **node_modules/react-native/trird-party/glog-0.3.4** y ejecutar **../../scripts/ios-configure-glog.sh**
  4. Buscar el archivo **findMatchingSimulator.js** en **node_modules/react-native/local-cli/runIOS** y reemplazar la sentencia `version.indexOf('iOS') !== 0` por `!version.includes('iOS')`
  5. Buscar el archivo **findMatchingSimulator.js** en **node_modules/react-native/local-cli/runIOS** y reemplazar la sentencia `simulator.availability !== '(available)'` por `!simulator.isAvailable`
  6. Seguir las instrucciones de este comment https://github.com/facebook/react-native/pull/25146#issuecomment-533995604
  7. Listar los simuladores con **xcrun simctl list**
  8. Bootear el simulador con **xcrun simctl boot "id del simulador"** (por ej: xcrun simctl boot "iPhone X")
  9. Abrir la app simulator
  10. Ejecutar **npx react-native run-ios --simulator="nombre del simulador"** (por ej: npx react-native run-ios --simulator="iPhone X")

  #### OPCION 2 🚀 (Automática):
  1. sh ios-setup.sh (corre todos los pasos mencionados en la **OPCION 1**)

