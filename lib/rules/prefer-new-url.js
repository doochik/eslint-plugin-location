"use strict";

// eslint-disable-next-line jsdoc/require-jsdoc
function reportError(context, node, obj) {
    context.report(Object.assign({
        message: "Use new URL(location) instead",
        node
    }, obj));
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
                const locationIsParent = hrefParent.type === "MemberExpression" && (
                    hrefParent.object.name !== "location" || (
                        hrefParent.object.object.type === "MemberExpression" && (
                            hrefParent.object.object.name !== "location"
                        )
                    )
                );

                if (!locationIsParent) {
                    return;
                }

                reportError(context, node);
            }
        };
    }
};
