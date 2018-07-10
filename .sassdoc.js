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
        undefined: "General",
        config: "Configuration",
        core: "Core API",
        math: "Math",
        grid: "Grid",
        utils: "Sass Utilities"
    },
    sort: [
        'group<',
        'file<',
        'line<',
        'access',
    ],
    'no-update-notifier': false,
    verbose: true,
    strict: false,
    privatePrefix: /^[_-]/,
    display: {
        alias: true,
        access: ["public"]
    }
}
