const {
  percentEncoding,
  encodeURIRequest,
  encodeUTFAlphabet,
} = require("../encoding");

it("Should encode special characters into percentage encoding RFC1738 compatible", () => {
  expect(
    percentEncoding(
      JSON.stringify({
        amount: { amount: 2900 },
        stringValueWithWhiteSpace: "String Value",
      })
    )
  ).toEqual(
    "%7B%22amount%22%3A%7B%22amount%22%3A2900%7D%2C%22stringValueWithWhiteSpace%22%3A%22String+Value%22%7D"
  );
});

it("Should encode URI to RFC1738 compatible utf-8 characters", () => {
  expect(
    encodeURIRequest({
      amount: { amount: 2900 },
      stringValueWithWhiteSpace: "String Value",
      city: "Unlandstraße",
      arrayValues: [1, "string"],
    })
  ).toEqual(
    "amount=%7B%22amount%22%3A2900%7D&stringValueWithWhiteSpace=String+Value&city=Unlandstra\\u00dfe&arrayValues=%5B1%2C%22string%22%5D"
  );
  expect(
    encodeURIRequest({
      utfCharacter: "—",
    })
  ).toEqual("utfCharacter=%E2%80%94");
});

it("Should encode special characters to hexadecimal utf-8 compatible with PHP RFC1738", () => {
  expect(encodeUTFAlphabet("ß")).toEqual("\\u00df");
  expect(encodeUTFAlphabet("a")).toEqual("a");
});
