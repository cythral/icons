const
    gulp = require('gulp'),
    less = require('less'),
    fs = require('fs'),
    path = require('path'),
    lessPluginCleanCSS = require('less-plugin-clean-css'),
    cleanCSSPlugin = new lessPluginCleanCSS({advanced: true}),
    webfontSrc = require("webfonts-generator"),
    axios = require("axios"),
    exec = require("child_process").execSync,
    Parser = require("dom-parser");
    
    lessSrcFile = "src/less/style.less",
    lessPagesFile = "src/less/pages.less";

var webfont = async function(options) {
    return new Promise((resolve, reject) => {
        webfontSrc(options, (err, result) => {
            resolve(result);
        });
    });
};
    

gulp.task('default', async () => {
    exec("mkdir -p public/latest");
    
    let codepoints = (await axios.get("https://icons.cythral.com/latest/ci.json")).data;
    let files = fs.readdirSync("src/svg");
    let lastCode = null;

    for(let file in files) {
        files[file] = "src/svg/"+files[file];
    }

    for(let point in codepoints) {
        codepoints[point] = codepoints[point].replace("\\", "0x");
        lastCode = codepoints[point];
    }

    lastCode++;

    let result = await webfont({
        files,
        dest: "public/latest",
        fontName: "ci",
        types: ["svg", "ttf", "woff", "woff2", "eot"],
        startCodepoint: lastCode,
        codepoints
    });

    let parser = new Parser(), 
    doc = parser.parseFromString(result.svg), 
    codes = {};
        
    for(let glyph of doc.getElementsByTagName("glyph")) {
        codes[glyph.getAttribute("glyph-name")] = glyph.getAttribute("unicode").replace("&#x", "\\").replace(";", "");
    }

    fs.writeFileSync("./public/latest/ci.json", JSON.stringify(codes));

    let lessSrcString = fs.readFileSync(lessSrcFile).toString();
    let extraLess = "";
    for(let code in codes) {
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
                title: filename !== "index.html" ? filename.replace(".html", "") + " - Cythral Icons" : "Cythral Icons",
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