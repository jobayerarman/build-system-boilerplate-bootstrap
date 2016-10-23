# Front-End Build System with Bootstrap

[![built with Gulp](https://img.shields.io/badge/-gulp-eb4a4b.svg?logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAAYAAAAOCAMAAAA7QZ0XAAAABlBMVEUAAAD%2F%2F%2F%2Bl2Z%2FdAAAAAXRSTlMAQObYZgAAABdJREFUeAFjAAFGRjSSEQzwUgwQkjAFAAtaAD0Ls2nMAAAAAElFTkSuQmCC)](http://gulpjs.com/)
[![Dependency Status](https://david-dm.org/jobayerarman/build-system-boilerplate-bootstrap.svg)](https://david-dm.org/jobayerarman/build-system-boilerplate-bootstrap)
[![devDependency Status](https://david-dm.org/jobayerarman/build-system-boilerplate-bootstrap/dev-status.svg)](https://david-dm.org/jobayerarman/build-system-boilerplate-bootstrap#info=devDependencies)

Build system boilerplate using LESS bootstrap.

Folder structure using [SASS Guidelines](http://sass-guidelin.es/) for easy workflow.

* The development code is in the [`src/`](src) directory.
* The build process relies on [`gulp`](http://gulpjs.com/).
* The `gulp` tasks can be found in the [`gulpfile.js`](gulpfile.js)
  file.

## Setup

1. Install [`Node.js`](https://nodejs.org/) and
   [`npm`](http://blog.npmjs.org/post/85484771375/how-to-install-npm).
2. Run `npm install`
3. Run `gulp serve`

## Development

You should be able to work almost entirely in the [`src/`](src)
directory.

While developing run `gulp` as this will watch
the [`src/`](src) dir and output to [`dist/`](dist) directory.

## Directory Structure

```
project-name/
├── dist/
|   ├── css/
│   |   ├── style.css
│   |   └── style.min.css
|   ├── img/
|   ├── js/
│   |   ├── script.js
│   |   └── script.min.js
|   └── public/
|				├── indext.html
|   		└── about.html
├── src/
|   ├── css/
│   |   ├── main.css
│   |   └── main.min.css
|   ├── img/
|   ├── js/
│   |   ├── script.js
│   |   └── script.min.js
|   ├── less/
|   |   ├── 1-vendor/
|   |   ├── 2-utils/
|   |   ├── 3-base/
|   |   ├── 4-layout/
|   |   ├── 5-component/
|   |   ├── 6-themes/
|   |   ├── 7-pages/
|   |   ├── main.less
|   |   └── README.md
|   ├── site/
|   |   ├── pages/
|   |   |		|── index.html
|   |   |		└── about.html
|   |   |── templates/
|   |   |		|── partials/
|   |   |		└── layout.html
├── gulpfile.js
├── LICENSE
├── package.json
└── README.md
```

## Need help?
Feel free to [create an issue](https://github.com/jobayerarman/build-system-boilerplate-bootstrap/issues), [tweet me](https://twitter.com/JobayerArman), or [send me an email](mailto:carbonjha@gmail.com). I'd be glad to help where I can!
