const
    gulp = require('gulp'),
    less = require('less'),
    fs = require('fs'),
    path = require('path'),
    lessPluginCleanCSS = require('less-plugin-clean-css'),
    cleanCSSPlugin = new lessPluginCleanCSS({advanced: true}),
    exec = require('child_process').execSync,
    
    lessSrcFile = "src/less/style.less",
    lessPagesFile = "src/less/pages.less";
    

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

gulp.task('pages.html', () => {
    exec("mkdir -p public/img");
    exec("cp -r src/img/* public/img");
    
    for(let filename of fs.readdirSync("src/html/pages/")) {
        let file = fs.readFileSync("src/html/pages/"+filename).toString();
        file = file.replace(/\{\{include:(.*?)\}\}/g, function(matches, n1) {
            return fs.readFileSync("src/html/includes/"+n1+".html");
        });

        file = file.replace(/\{\{var:(.*?)\}\}/g, function(matches, n1) {
            return {
                title: filename.replace(".html", ""),
                year: new Date().getFullYear()
            }[n1] || "";
        });

        fs.writeFileSync("public/"+filename, file);
    }
});


gulp.task('pages.css', () => {
    exec("mkdir -p public/css");
    let lessPagesString = fs.readFileSync(lessPagesFile).toString();

    less.render(lessPagesString, {
        filename: path.resolve(lessPagesFile),
        plugins: [cleanCSSPlugin]
    }).then(output => fs.writeFileSync("public/css/pages.css", output.css));
});

gulp.task("pages", [ "pages.html", "pages.css" ]);