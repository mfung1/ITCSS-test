<h1 align="center">Christmas Checklist</h1>
<p align="center">This repo is a SCSS library used for the Christmas Checklist page</p>

**Required Technologies**

|Technology       |Version                  | URL                             |
|-----------------|-------------------------|---------------------------------|
| NPM             | Latest stable (8.11.2)  | https://www.npmjs.com/get-npm   |
| Node            | Latest stable           | https://nodejs.org/en/download/ |
| Sass (Node)     | 4.9.3                   | ```npm install -g node-sass ``` (You could just install this locally if you like) |

---
### Installation

All required packages are saved as dev dependencies in ```./package.json```.

To install, traverse to the project i.e:

```
cd ~/Documents/Tesco/Repos/online-creative-newsletter
```

Then run npm install (```npm install``` or ``` npm i ``` for short):

```
npm install
```

**Note:**
You'll need to be on the COLLEAGUE network as Energy blocks external URLs, including NPM repositories.

These packages are from the Public NPM, so ensure your .npmrc is configured to support this before installing.

--- 
### Build Process
This section documents the different build processes in this repo.

#### SCSS - Gulp Sass
All CSS (excluding overrides and local styles) are in ```/build/SCSS/```. This repo follows the ITCSS methodology by Harry Roberts (@CSSWizardry on Twitter). This means the SCSS is split into different layers. See the diagram below:

<img src="./docs/itcss.svg">

##### Layers
- **Settings** - Variable configurations for things like colors, fonts, sizes, etc...
- **Tools** - Globablly used mixins and functions.
- **Generic** - CSS resets and normalizing rules to create a foundation for your styles.
- **Elements** - Style rules for bare HTML elements (like ```h1```, or ```a```)
- **Objects** - Style rules for elements responsible for layout or structuring.
- **Components** - Style rules for UI components.
- **Trumps / Utilities** - Helper or utility rules that tweak Objects or Components by adjusting and override existing rules.

##### Reach
The general idea behind ITCSS is that it allows your specificty graph to be near-linear on trend. This means you increase speficity as you go down the stylesheet.

For example:

```
// This is really generic and not specific
p {
  color: #F00;
}

// This is really explicit and super specific
.pg-wrppr .hero .ddl-t1 {
  color: #F00;
}
```
#### Folder Structure

The folder structure is like:

```
- SCSS
  |- 01-Settings
  |- 02-Tools
  |- 03-Generic
  |- 04-Elements
  |- 05-Objects
  |- 06-Components
  |- 07-Utilities
  |- index.scss // Includes file
```

So each Layer (1 => 7) is included in ```index.scss```. This means that you are able to comment out the import statement for files (in each layer) which aren't used on that page, effectively you will only be compiling the SCSS out into the CSS you need for that page.

**For example:**
```
* index.scss *

// 01-Settings
@import ...;

// 02-Tools
@import ...;

// 03-Generic
@import ...;

// 04-Elements
@import ...;

// 05-Objects
@import ...;

// 06-Components
@import './06-Components/button.scss',
        './06-Components/promo-pairing.scss',
        //Not needed './06-Components/divider.scss',
        './06-Components/svg.scss',
        './06-Components/paragraphs.scss',
        './06-Components/label.scss';

// 07-Utilities
@import ...;
```

In this example, divider.scss was commented out in the imports, so it's not used. If the page doesn't use this file, then you reduce the overhead on unused CSS.

To compile the SCSS into CSS you can run:
```
gulp sass
```
This will concatenate, compile and minify and browser-prefix the contents of the .scss files in this repo.

The Gulp task can be found in ```christmas-checklist/gulpfile.js```.

The output is setup to go to ```christmas-checklist/dist/css/styles.min.css``` but this can be modified in the gulpfile if necessary.

Copy the contents of the compiled + minfied file (styles.min.css) into the CSS file for your page.

--- 
#### JavaScript - Gulp scripts


All JS (excluding local scripts) are in ```/build/JS/```.

**Edit files in:**
```
./build/JS/*
```

To concatenate and minify the JS you can run:
```
gulp scripts
```

The Gulp task can be found in ```christmas-checklist/gulpfile.js```.

The output is setup to go to ```christmas-checklist/dist/js/scripts.min.js``` but this can be modified in the gulpfile if necessary.

Copy the contents of the compiled + minfied file into the JS file for your page.

*Note: The current config does use babel if you're using ES6 syntax but try to keep to ES5 where possible*

---
#### Gulp Watch
You can run ```gulp``` on its own to watch for file changes (HTML, CSS or JS) and the page will live reload when you save the file. This will run at ```localhost:3000``` unless changed in the gulpfile.

This repository uses **BrowserSync**, which allows you to view the local environment across different devices and networks. The URL is tunneled under ```christmas-checklist.localtunnel.me```. This helps when checking with designers on new components before deploying into Store1 or Live.

*Note: You will need to stop and start the process if you are adding new files to the folder structure as BrowserSync gets the current structure on startup.*

---
### Common Errors

#### Node / NPM Errors
Commonly occurs if your NPM or Node version is past the current stable (LTS) version. I recommend using something like [NVM](https://github.com/creationix/nvm/blob/master/README.md) to manage your versions.

#### NPM Installation Error
You might get 404 errors when installing the packages if your .npmrc is set to a different NPM repository (i.e Nexus).
