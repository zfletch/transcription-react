import { parseString } from 'xml2js';

const xmlToJson = (xml) => {
  let json;
  parseString(xml, { explicitCharkey: true }, (_err, result) => {
    json = result;
  });

  return json;
};

export {
  xmlToJson,
};
