# Cythral Icons
Cythral Icons is a simple icon font using SVG images that was inspired by [Font Awesome](http://fontawesome.com).  The font includes several icons that are used across my projects in place of Font Awesome, where applicable.  Icons are added as needed and frequently revised.  

## Installation
Add the following to your `<head>` tag:

```html
<link rel="stylesheet" href="//icons.cythral.com/latest/ci.css">
```

## Usage
```html
<i class="ci ci-{iconname}"></i>
```
## Icons
For a list of icons, please see the [Cythral 
Icons Website](https://icons.cythral.com)

## Contributing
Contribution of new icons / revisions of current ones are welcome!  First, clone the repository and install the developer dependencies by running ```npm install ```.  All icons must be svg files, and go into the src/svg folder.  The current icon set dimensions are 333.3334x333.3334px and have a 10px width stroke in most cases.  These numbers will likely change in the future.
