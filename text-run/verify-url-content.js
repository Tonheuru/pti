// A Text-Runner step implementation
// to verify that the server response at the URL printed in bold
// contains the text printed as a code block in the document.

const request = require("request-promise-native");

module.exports = async function({ nodes, formatter, searcher }) {
  const url = searcher.tagContent(["boldtext", "strongtext"]);
  const expected = searcher.tagContent("fence");
  const actual = await request(url);
  console.log(actual);
  if (!actual.includes(expected)) {
    throw new Error("mismatching URL content");
  }
};
