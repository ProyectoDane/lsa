# ATENCION
Usar YARN, NO usar NPM

# instrucciones para poder hacer build y deploy en simulador
1. yarn
2. pararse en node_modules/react-native/trird-party/glog-0.3.4 y ejecutar ../../scripts/ios-configure-glog.sh
3. buscar el archivo findMatchingSimulator.js en node_modules/react-native/local-cli/runIOS y reemplazar la version.indexOf('iOS') !== 0 con !version.includes('iOS')
4. listar los simuladores con xcrun simctl list
5. bootear el simulador con xcrun simctl boot "id del simulador"
6. abrir la app simulator
7. ejecutar react-native --run-ios --simulator="nombre del simulador" (ie "iPhone 5s")