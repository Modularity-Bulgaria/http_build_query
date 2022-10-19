const chunk = (str, size) => {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }

  return chunks;
};

function encodeUTFAlphabet(data) {
  const value = data instanceof Object ? JSON.stringify(data) : String(data);
  return value
    .replace(/ |\t|\s|\r|\n/gi, "")
    .split("")
    .map((character) => {
      // matches only non Latin alphabet characters
      if (!character.match(/[a-zA-Z]/) && character.match(/\p{L}/u)) {
        const hex = character.charCodeAt().toString(16);
        return "\\u" + "0000".substring(0, 4 - hex.length) + hex;
      }
      return character;
    })
    .join("");
}

function percentEncoding(value) {
  return String(value)
    .split("")
    .map((character) => {
      if (character.match(/ /)) {
        return "+";
      }
      if (!character.match(/\p{L}|\p{N}/u)) {
        let hex = Buffer.from(character).toString("hex");
        if (hex.length > 2) {
          hex = chunk(hex, 2).join("%");
        }
        return `%${hex}`.toUpperCase();
      }
      return character;
    })
    .join("");
}

function encodeURIRequest(request) {
  function encodeValue(value, isNestedValue = false, addComma = false) {
    if (value instanceof Object) {
      let newValue = "";
      const keys = Object.keys(value);
      for (let i = 0; i < keys.length; i++) {
        if (i === 0) {
          newValue += Array.isArray(value) ? "[" : "{";
        }

        const currentKey = keys[i];
        const nestedValue = value[currentKey];

        if (Array.isArray(value)) {
          newValue += `${encodeValue(nestedValue, true, i < keys.length - 1)}`;
        } else {
          newValue += `"${currentKey}":${encodeValue(
            nestedValue,
            true,
            i < keys.length - 1
          )}`;
        }
      }
      newValue += Array.isArray(value) ? "]" : "}";
      return newValue;
    }
    let processedValue = value;
    if (isNestedValue && typeof value === "string") {
      processedValue = `"${value}"`;
    }
    if (addComma) {
      processedValue += ",";
    }
    return processedValue;
  }

  let encodedRequest = "";
  for (const [key, value] of Object.entries(request)) {
    if (encodedRequest.length > 0) {
      encodedRequest += "&";
    }
    const newValue = percentEncoding(encodeValue(value));
    encodedRequest += `${key}=${newValue}`;
  }
  return encodeUTFAlphabet(encodedRequest);
}

module.exports = {
  encodeUTFAlphabet,
  encodeURIRequest,
  percentEncoding,
};
