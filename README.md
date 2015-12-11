web-starter-pack
=====
A project scaffold for front-end web development

### Workspace Setup
1. Remove commit history
  - `rm -rf .git`
2. Install dependencies
  - `npm install`
3. Build JavaScript and SASS
  - `npm run build`
4. Intialize a new repository (optional)
  - `git init`
5. Add an origin (optional)
  - `git remote add origin <url>`
6. Set upstream to track this repo for changes (optional)
  - `git remote add upstream <url>`

### Workspace Building Behavior
- Building of JavaScript and SASS is accomplished using [Gulp](http://gulpjs.com)
- Continuously watches files for changes and rebuilds if necessary
- Building behavior is defined in (gulpfile.js)

#### SASS
- All SASS stylesheets (css/***/**.scss) should be imported into (css/common.scss), which will be minified, vendor prefixed, and written to the file (css/all.min.css)

##### Other Included Stylesheets
1. Grid
  - grid.css and grid.min.css files (css/) are a custom [bootstrap](http://getbootstrap.com/customize) build including only the Grid System and Responsive Utilities.
2. Reset
  - reset.scss in (css/) from (http://meyerweb.com/eric/tools/css/reset/)

#### JavaScript
- All JavaScript files (js/***/**.js) that aren't bundled (i.e., aren't in the (js/bundle) directory and filename doesn't have a substring .min or .dev) will be bundled using [Browserify](http://browserify.org).
- The bundled files will be written to the (js/bundle) directory as:
  - A minified version (<filename>.min.js)
  - A non-minified version (<filename>.dev.js), which can be used during development for debugging.
- Link to the files in the (js/bundle) directory
