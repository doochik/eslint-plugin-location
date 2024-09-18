"use strict";

const rule = require("../../../lib/rules/prefer-new-url"),
    RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();

ruleTester.run("prefer-new-url", rule, {
    valid: [
        {
            code: "location.href = 'https://example.com'"
        },
        {
            code: "location.replace('https://example.com')"
        },
        {
            code: "window.location.replace('https://example.com')"
        },
        {
            code: "location.href = new URL('https://example.com');"
        },
        {
            code: "location = new URL('https://example.com');"
        }
    ],

    invalid: [
        {
            code: "location.replace.href.replace('foo', 'bar')",
            errors: [{ message: "Use new URL(location) instead" }]
        },
        {
            code: "window.location.replace.href.replace('foo', 'bar')",
            errors: [{ message: "Use new URL(location) instead" }]
        },
        {
            code: "const newUrl = location.href.replace(/[?&]*action=scroll-to-reports/, '');",
            errors: [{ message: "Use new URL(location) instead" }]
        },
        {
            code: "const newUrl = window.location.href.replace(/[?&]*action=scroll-to-reports/, '');",
            errors: [{ message: "Use new URL(location) instead" }]
        }
    ]
});
