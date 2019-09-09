const pkg = require('./package.json');

module.exports = {
    dest: './docs',
    exclude: ['./test/**/*', 'test/*'],
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
        config: "Configuration",
        core: "Core API",
        grid: "Grid",
        utils: "Sass Utilities",
        math: "Math",
        undefined: "General",
    },
    sort: [
        'group<',
        'access>',
        'file>',
        'line<',
    ],
    basePath: 'https://github.com/UWHealth/sass-tools/tree/master/lib',
    'no-update-notifier': false,
    verbose: true,
    strict: false,
    privatePrefix: /^[_-]/g,
    display: {
        alias: true,
        access: ["public"]
    }
}
