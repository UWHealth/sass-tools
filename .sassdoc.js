const pkg = require('./package.json');

module.exports = {
    dest: './docs',
    exclude: ['./test/*'],
    package: {
        title: 'UW Health Sass Tools',
        name: '@uwhealth/sass-tools',
        version: pkg.version,
        license: pkg.license,
        homepage: pkg.homepage,
        description: pkg.description
    },
    theme: 'default',
    autofill: ["requires", "throws", "content"],
    groups: {
        undefined: "general",
        config: "Configuration"
    },
    'no-update-notifier': false,
    verbose: true,
    strict: false,
    display: {
        alias: true
    }
}
