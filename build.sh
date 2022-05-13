cd front-end
npm install
npm run build
mkdir -p ../back-end/src/main/resources/static
cp -r build/* ../back-end/src/main/resources/static
cd ../back-end
./gradlew clean build
heroku deploy:jar build/libs/code-0.0.1-SNAPSHOT.jar --app paper-workshop
