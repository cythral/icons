# Cythral Icons
Cythral Icons is a simple icon font using SVG images that was inspired by [Font Awesome](http://fontawesome.com).  The font includes several icons that are used across my projects in place of Font Awesome, where applicable.  Icons are added as needed and frequently revised.  

## Installation
If using the source files, the stylesheet you'll want to reference is dist/ci.css.  Each release on GitHub (starting with v0.2.2) will have a zip containing the compiled stylesheet and font files.  The easier and recommended way is to use the hosted version:

```html
<link rel="stylesheet" href="//icons.cythral.com/ci.css">
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
Contribution of new icons / revisions of current ones are welcome!  First, clone the repository and install the developer dependencies by running ```npm install ```.  All icons must be svg files, and go into the src/svg folder.  The current icon set dimensions are 333.3334x333.3334px and have a 10px width stroke in most cases.  These numbers will likely change in the future.
