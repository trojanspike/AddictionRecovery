#!/usr/bin/env bash

base=$(pwd)

function end(){
for i in $(cat ./Plugins.txt | sed 's/#.*//'); 
do 
	cordova plugin add $i; 
done

echo "Crosswalk install into cordova "
echo "You need to add permission to platforms/android/AndroidManifest.xml"
echo "<uses-permission android:name=\"android.permission.ACCESS_WIFI_STATE\" />"
echo "<uses-permission android:name=\"android.permission.ACCESS_NETWORK_STATE\" />"
echo "============================================================================"
}

if [ ! -d "platforms/android/" ]; then
 cordova platform add android
fi

mkdir www && cordova platform add android && rm -Rf $base/engine && mkdir $base/engine && cd $base/engine && \
wget https://download.01.org/crosswalk/releases/crosswalk/android/stable/10.39.235.15/x86/crosswalk-cordova-10.39.235.15-x86.zip \
\
&& unzip crosswalk-cordova-10.39.235.15-x86.zip && rm -Rf ./crosswalk-cordova-10.39.235.15-x86.zip && \
\
cd $base && rm -Rf platforms/android/CordovaLib/* && cp -a engine/crosswalk-cordova-10.39.235.15-x86/framework/* platforms/android/CordovaLib/ \
\
&& cp engine/crosswalk-cordova-10.39.235.15-x86/VERSION platforms/android/ \
\
&& cd platforms/android/CordovaLib && android update project --subprojects --path . --target "android-19" && ant debug && cd $base \
&& npm i && bower i && cd ./test/ && bower i && cd ../ && grunt build && end
