# WeatherTop2
A web app to keep track of the weather data from WeatherTop devices.
Allows members to add their own weather stations and readings,
visualise the data on charts and view the stations on a map.

The app was developed in the model/view/controller pattern 
using expressjs framework and handlebars templating engine.
[Fomantic-ui](https://fomantic-ui.com/) CSS framework has been used for styling.

### Deployed app
https://grzegorz-weathertop2.glitch.me/

### Video presentation
https://youtu.be/1vNQe_ej5CA

## Main features
* User accounts, signup and login
* Station latitude and longitude
* Weather dashboard, latest reading with unit conversions
* Min/max temperature, pressure and wind speed values for stations
* Icons on station panel
* Individual pages for each station
* Add new station
* Add new reading
* Delete station
* Delete reading
* Temperature, wind and pressure trends arrows
* Stations sorted alphabetically
* Users can edit their personal details and password
* Automatically add new reading using OpenWeather API
* Station readings plotted on charts
* Map view showing stations
* Adding new stations through the map
* Forms validation
* Restricting access to other user's stations

## Deployment
    git clone https://github.com/grzpiotrowski/weathertop2.git
    cd weathertop2
    npm i

In weathertop2 root directory rename .env_sample file to .env and put your Open Weather API key in place of YOUR_OPENWEATHER_API_KEY.

    npm start

## Resources
* Handlebars Helpers \
  https://github.com/helpers/handlebars-helpers \
  https://github.com/helpers/handlebars-helpers#compare \
  https://github.com/helpers/handlebars-helpers#append
* Creating custom handlebars helpers \
  https://www.npmjs.com/package/express-handlebars#helpers \
  https://stackoverflow.com/a/44354612
* Serving static files in Express \
  http://expressjs.com/en/starter/static-files.html#serving-static-files-in-express
* Handlebars Subexpressions \
  https://handlebarsjs.com/guide/expressions.html#subexpressions
* Lodash - min, max property in object array \
  https://lodash.com/docs/#minBy \
  https://lodash.com/docs/#maxBy \
  https://lodash.com/docs/4.17.15#map
* Array sorting \
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
* Date \
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
* Leaflet Map \
  https://leafletjs.com/examples/quick-start/
  https://leafletjs.com/reference-1.6.0.html#marker
  https://leafletjs.com/reference-1.6.0.html#featuregroup
  https://leafletjs.com/reference.html#latlng
* Hiding API Key with nodejs \
  https://monsterlessons-academy.com/posts/how-to-hide-api-keys-with-node-js
* CSS \
  https://www.w3schools.com/cssref/pr_pos_z-index.asp
* Semantic UI \
  https://semantic-ui.com/modules/tab.html#/settings
* jQuery Selectors \
  https://www.w3schools.com/jquery/jquery_ref_selectors.asp
* Loading a Frappe chart in a hidden div \
  https://github.com/frappe/charts/issues/249
* Async function \
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

### Images
Vector graphics used in this project were generated using DALL·E 2 AI system
that can create realistic images and art from a description in natural language. \
I was lucky enough to get the access to this amazing tool just when I was working on this project. \
Link to DALL·E 2 website: \
https://openai.com/dall-e-2/

Favicon generated using: https://favicon.io/favicon-generator/