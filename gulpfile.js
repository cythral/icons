const
    gulp = require('gulp'),
    less = require('less'),
    fs = require('fs'),
    path = require('path'),
    lessPluginCleanCSS = require('less-plugin-clean-css'),
    cleanCSSPlugin = new lessPluginCleanCSS({advanced: true}),
    exec = require('child_process').execSync;
    

gulp.task('default', () => {
    exec("icon-font-generator src/svg/*.svg -o dist -c false -n ci");
    
    less.render(fs.readFileSync("src/less/style.less").toString(), {
        filename: path.resolve("src/less/style.less"),
        plugins: [cleanCSSPlugin]

    }).then(output => {
        var css = output.css;
        var codes = JSON.parse(fs.readFileSync("dist/ci.json").toString());

        for(let code of Object.keys(codes)) {
            css = css.replace(`{${code}}`, codes[code]);
        }

        fs.writeFileSync("dist/ci.css", css);
        
    });
});