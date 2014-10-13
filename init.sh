#!/usr/bin/env bash


for i in $(cat ./Plugins.txt | sed 's/#.*//'); 
do 
	cordova plugin add $i; 
done

cordova platform add android

npm i && bower i && cd ./test/ && bower i && cd ../ && grunt build && grunt serve
