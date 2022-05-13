cd front-end
npm install
npm run build
mkdir -p ../back-end/src/main/resources/static
cp -r build/* ../back-end/src/main/resources/static
cd ../back-end
./gradlew clean build
cp build/libs/* docker/ -f
cp sql_script/nss_db.sql docker/init.sql -f
cd docker
docker-compose up --build -d
cd ../../selenium_test
sleep 60
./gradlew test

