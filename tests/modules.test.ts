import { describe, expect, test } from "@jest/globals";
import { decodeString, encodeString } from "../dist";

const MY_SECRET_KEY = "mySecretKey";
const WRONG_SECRET_KEY = "wrongSecretKey";

describe("Module - Encode & Decode", () => {
  test("Encoding and decoding a simple text", () => {
    const mySimpleString = "this is my simple string";

    // Encode the string
    const encodedString = encodeString(mySimpleString, MY_SECRET_KEY);

    // Decode the string
    const decodedString = decodeString(encodedString, MY_SECRET_KEY);

    // Check that the decoded string matches the original string
    expect(decodedString).toBe(mySimpleString);
  });

  test("Different encodings for the same input with same key", () => {
    const mySimpleString = "this is my simple string";

    // Encode the string multiple times
    const encodedString1 = encodeString(mySimpleString, MY_SECRET_KEY);
    const encodedString2 = encodeString(mySimpleString, MY_SECRET_KEY);

    // Check that the encoded strings are different
    expect(encodedString1).not.toBe(encodedString2);

    // Decode both strings and ensure they match the original string
    const decodedString1 = decodeString(encodedString1, MY_SECRET_KEY);
    const decodedString2 = decodeString(encodedString2, MY_SECRET_KEY);

    expect(decodedString1).toBe(mySimpleString);
    expect(decodedString2).toBe(mySimpleString);
  });

  test("Fail to decode with the wrong key", () => {
    const mySimpleString = "this is my simple string";

    // Encode the string
    const encodedString = encodeString(mySimpleString, MY_SECRET_KEY);

    // Attempt to decode the string with the wrong key
    const decodedString = decodeString(encodedString, WRONG_SECRET_KEY);

    // Check that the decoded string does not match the original string
    expect(decodedString).not.toBe(mySimpleString);
  });

  test("Fail to decode a corrupted encoded string", () => {
    const mySimpleString = "this is my simple string";

    // Encode the string
    const encodedString = encodeString(mySimpleString, MY_SECRET_KEY);

    // Corrupt the encoded string by changing a character
    const corruptedEncodedString =
      encodedString.slice(0, -1) +
      (encodedString.slice(-1) === "A" ? "B" : "A");

    // Attempt to decode the corrupted encoded string
    const decodedCorruptedString = decodeString(
      corruptedEncodedString,
      MY_SECRET_KEY
    );

    // Check that the decoded string does not match the original string
    expect(decodedCorruptedString).not.toBe(mySimpleString);
  });

  test("Encoding and decoding an empty string", () => {
    const emptyString = "";

    // Encode the empty string
    const encodedString = encodeString(emptyString, MY_SECRET_KEY);

    // Decode the empty string
    const decodedString = decodeString(encodedString, MY_SECRET_KEY);

    // Check that the decoded string matches the original string
    expect(decodedString).toBe(emptyString);
  });

  test("Encoding and decoding a long string", () => {
    const longString = "a".repeat(1000); // A long string of 1000 'a' characters

    // Encode the long string
    const encodedString = encodeString(longString, MY_SECRET_KEY);

    // Decode the long string
    const decodedString = decodeString(encodedString, MY_SECRET_KEY);

    // Check that the decoded string matches the original string
    expect(decodedString).toBe(longString);
  });

  test("Encoding and decoding a string with special characters", () => {
    const specialCharString = "!@#$%^&*()_+-=[]{}|;':,.<>?/~`";

    // Encode the string with special characters
    const encodedString = encodeString(specialCharString, MY_SECRET_KEY);

    // Decode the string with special characters
    const decodedString = decodeString(encodedString, MY_SECRET_KEY);

    // Check that the decoded string matches the original string
    expect(decodedString).toBe(specialCharString);
  });
});
