# GetGud
## Getting started
Make sure you have cloned the repo onto your local machine. Then install all the dependancies involved.
### `npm install`
> If you don't have json-server installed. Install it globally.
> `npm install -g json-server`

Then you'll need to get an API Key from Riot Games and input it in `src/api.jsx`

Now you'll need to host the json-server that holds all the recent searches from users. You can change the port it uses in `src/NewApp.js` if you'd like. If not, it's going to try to find port 4000.

Now from the base project directory, run in your CLI
### `json-server -p 4000 -w searches.json`
Now, using another CLI, start the project.

`npm start`



## TODO

 - [ ] Only render the last few searches
 - [ ] Use cache/memory to not have match history re-fetch and render everytime you revisit
 - [ ] Better scaling on non-1080p monitors
 - [ ] Dynamically let people render more than the alloted champion mastery cards.
