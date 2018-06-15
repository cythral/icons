const
    gulp = require('gulp'),
    less = require('less'),
    fs = require('fs'),
    path = require('path'),
    lessPluginCleanCSS = require('less-plugin-clean-css'),
    cleanCSSPlugin = new lessPluginCleanCSS({advanced: true}),
    exec = require('child_process').execSync,
    
    lessSrcFile = "src/less/style.less";
    

gulp.task('default', () => {
    exec("mkdir -p public/latest");
    exec("icon-font-generator src/svg/*.svg -o public/latest -c false -n ci");
    
    let lessSrcString = fs.readFileSync(lessSrcFile).toString();
    let extraLess = "";
    let codes = JSON.parse(fs.readFileSync("public/latest/ci.json").toString());
    
    // add unicode characters to the css file
    for(let code of Object.keys(codes)) {
        extraLess += `&.ci-${code}:before { content: "${codes[code]}"; }`;
    }

    lessSrcString = lessSrcString.replace("{icons}", extraLess);

    less.render(lessSrcString, {
        filename: path.resolve(lessSrcFile),
        plugins: [cleanCSSPlugin]

    }).then(output => fs.writeFileSync("public/latest/ci.css", output.css));

});