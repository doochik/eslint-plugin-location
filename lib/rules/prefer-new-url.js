"use strict";

// eslint-disable-next-line jsdoc/require-jsdoc
function reportError(context, node, obj) {
    context.report(Object.assign({
        message: "Use new URL(location) instead",
        node
    }, obj));
}

/**
 * Returns true for "location.foo" for "foo.location.bar"
 * @param {ASTNode} node The AST node to check
 * @returns {boolean} Check result
 */
function isNodeWithPropertyLocation(node) {
    const result = node.type === "MemberExpression" && (
        node.property.name === "location" ||
        node.object.name === "location"
    );

    if (result) {
        return true;
    }

    if (node.object) {
        return isNodeWithPropertyLocation(node.object);
    }

    return false;
}


module.exports = {
    meta: {
        docs: {
            description: "Forbid location.href.replace() in favor new URL()"
        },
        schema: [{
            type: "object",
            properties: {
                hyphens: { type: "array" }
            }
        }],
        fixable: false
    },
    create(context) {
        return {
            CallExpression(node) {

                // accept only obj.prop()
                if (node.callee.type !== "MemberExpression") {
                    return;
                }

                // .replace()
                if (node.callee.property.name !== "replace") {
                    return;
                }

                // .href.replace()
                if (node.callee.object.type !== "MemberExpression" || node.callee.object.property.name !== "href") {
                    return;
                }

                // location.href.replace()
                const hrefParent = node.callee.object.property.parent;
                const locationIsParent = isNodeWithPropertyLocation(hrefParent);

                if (!locationIsParent) {
                    return;
                }

                reportError(context, node);
            }
        };
    }
};
