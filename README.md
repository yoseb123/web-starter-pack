web-starter-pack
=====
Files that I commonly use on web development projects

#### Building JavaScript and SASS
**First:**  
Install npm dependencies using command `npm install`  

**Then:**  
Build JavaScript and CSS continuously (i.e., build and watch) using command `npm run build`  

#### Building behavior
- All SASS stylesheets (css/*.scss) will be concatenated and minified into one file (all.min.css)
- All JavaScript files (js/*.js) that aren't minified (i.e., filename doesn't have a substring .min) will be bundled using [Browserify](http://browserify.org) and minified into a file with the original file name suffixed with .min.js

#### Included CSS Grid
The grid.css and grid.min.css files (css/) are a custom [bootstrap](http://getbootstrap.com/customize) build including only the Grid System and Responsive Utilities.

#### Note
If you're cloning this to start a project, make sure to remove/edit the README.md and package.json files.
