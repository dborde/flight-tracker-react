# flight-tracker-react
make sure to run wop.sh to remove artifactory registry from .npmrc
wow.sh = work on work for .npmrc
wop.sh = work on personal for .npmrc
cat .npmrc

flight tracker using react, react-leflet, and greatcircle
clone https://github.com/dborde/flight-tracker-react

$ yarn install
$ yarn run dev-server

$ yarn test -- --watch
$ yarn test -- -u to update test db snapshots

$ yarn run build
$ yarn run build:prod

$ heroku create flight-tracker-react
$ git push heroku master