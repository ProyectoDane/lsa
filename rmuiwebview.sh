#!/bin/bash
   
dir="${PWD}/node_modules/react-native/React";

sed -i'.bak' '/RCTWebView/d' "${dir}/React.xcodeproj/project.pbxproj"
rm -f "${dir}/React.xcodeproj/project.pbxproj.bak"
rm -f "${dir}/Views/RCTWebView.m"
rm -f "${dir}/Views/RCTWebView.h"
rm -f "${dir}/Views/RCTWebViewManager.m"
rm -f "${dir}/Views/RCTWebViewManager.h"
