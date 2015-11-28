web-starter-pack
=====
A project scaffold for front-end web development

#### Removing commit history and Changing origin
1. `rm -rf .git`
2. `git init`
3. `git remote add origin <url>`

#### Building JavaScript and SASS
1. Install npm dependencies using command `npm install`  
2. To build JavaScript and CSS continuously (i.e., build and watch) using command `npm run build`

#### Building behavior
- All SASS stylesheets (css/*.scss) should be imported into (css/common.scss), which will be minified, vendor prefixed, and written to the file (css/all.min.css)
- All JavaScript files (js/*.js) that aren't minified (i.e., filename doesn't have a substring .min) will be bundled using [Browserify](http://browserify.org) and minified into a file with the original file name suffixed with .min.js

#### Included Stylesheets
1. Grid
  - grid.css and grid.min.css files (css/) are a custom [bootstrap](http://getbootstrap.com/customize) build including only the Grid System and Responsive Utilities.
2. Reset
  - reset.scss in (css/) from (http://meyerweb.com/eric/tools/css/reset/)

#### Note
If you're forking/cloning this to start a project, make sure to remove/edit the README.md and package.json files.
