import hbs from "hbs"
import * as prismicH from '@prismicio/helpers'

// Adds extend : extend the layout from your template
// see {{#extend "title" }} on index.hbs and pet.hbs
var blocks = {};
hbs.registerHelper("extend", function (name, context) {
  var block = blocks[name];
  if (!block) {
    block = blocks[name] = [];
  }
  block.push(context.fn(this));
});
// Adds the incoming extensions into the layout
hbs.registerHelper("block", function (name) {
  var val = (blocks[name] || []).join("\n");
  // clear the block
  blocks[name] = [];
  return val;
});


/* Add the Prismic Helpers to handlebars
https://prismic.io/docs/technical-reference/prismicio-helpers?version=v2
asDate, asHTML, asLink, asText, documentToLinkField, isFilled */
Object.keys(prismicH).forEach(key => {
  hbs.registerHelper(key, prismicH[key])
});


export { hbs }