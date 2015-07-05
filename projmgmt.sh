MEDPLUS_HOME=/Users/sachin/Documents/workspace/SachinConnectAppsWS/MedPlusRoot/MedPlus-static

DOC_ROOT=/Library/WebServer/Documents
MEDPLUS_WEB_FOLDER_NAME=medplusweb

cd $MEDPLUS_HOME
/Users/sachin/Softwares/apache-maven-3.2.1/bin/mvn clean install -o

cd $DOC_ROOT'/'$MEDPLUS_WEB_FOLDER_NAME
rm -rf medplus.zip

cp $MEDPLUS_HOME'/target/MedPlus.zip' $DOC_ROOT'/'$MEDPLUS_WEB_FOLDER_NAME
unzip -o medplus.zip

echo 'Done.....Done'
