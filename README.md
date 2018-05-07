# Cythral Icons
Cythral Icons is a simple icon font using SVG images that was inspired by [Font Awesome](http://fontawesome.com).  The font includes several icons that are used across my projects in place of Font Awesome, where applicable.  Icons are added as needed and frequently revised.  

## Installation
If using the source files, the stylesheet you'll want to reference is dist/ci.css.  Each release on GitHub (starting with v0.2.2) will have the compiled stylesheet attached to it.  The easy and recommended way to include it is to use [jsdelivr](http://jsdelivr.com):

```html
<link rel="stylesheet" href="//cdn.jsdelivr.net/gh/cythral/icons/dist/ci.css">
```

## Usage
```html
<i class="ci ci-{iconname}"></i>
```

### Icons
- new 
- edit
- delete
- close
- save
- code
- urlmove

## Contributing
Contribution of new icons / revisions of current ones are welcome!  First, clone the repository and install the developer dependencies by running ```npm install ```.  All icons must be svg files, and go into the src/svg folder.  After editing or adding any icons, please run ```gulp``` to compile the font and stylesheet files.  The current icon set dimensions are 333.3334x333.3334px and have a 10px width stroke in most cases.  These numberss will likely change in the future.