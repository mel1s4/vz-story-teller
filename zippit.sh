rm -f vz-story-teller.zip
rm -rf vz-story-teller
mkdir -p vz-story-teller/frontend/dist
cp *.php vz-story-teller
cp -r frontend/dist/* vz-story-teller/frontend/dist/
zip -r vz-story-teller.zip vz-story-teller
rm -rf vz-story-teller
