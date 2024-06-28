import * as crypto from "crypto";

function hashKey(key: string): string {
  return crypto.createHash("sha256").update(key).digest("hex");
}

export function DecodeString(encodedData: string, key: string): string {
  const hashedKey = hashKey(key);
  const encodedChars = encodedData.split("");
  const keyChars = hashedKey.split("");

  const keyAsciiValues = keyChars.map((char) => char.charCodeAt(0));
  const totalKeyAsciiValue = keyAsciiValues.reduce(
    (sum, value) => sum + value,
    0
  );

  let decodedString = "";
  encodedChars.forEach((char, index) => {
    const encodedAsciiValue = char.charCodeAt(0);
    const indexOffset = index % hashedKey.length;
    const additionalOffset = hashedKey.charCodeAt(indexOffset);
    const originalAsciiValue =
      encodedAsciiValue - totalKeyAsciiValue - additionalOffset;
    const originalChar = String.fromCharCode(originalAsciiValue);
    decodedString += originalChar;
  });

  return decodedString;
}
