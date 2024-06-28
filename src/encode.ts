import * as crypto from "crypto";

function hashKey(key: string): string {
  return crypto.createHash("sha256").update(key).digest("hex");
}

export function EncodeString(data: string, key: string): string {
  const hashedKey = hashKey(key);
  const dataChars = data.split("");
  const keyChars = hashedKey.split("");

  const keyAsciiValues = keyChars.map((char) => char.charCodeAt(0));
  const totalKeyAsciiValue = keyAsciiValues.reduce(
    (sum, value) => sum + value,
    0
  );

  let encodedString = "";
  dataChars.forEach((char, index) => {
    const dataAsciiValue = char.charCodeAt(0);
    const indexOffset = index % hashedKey.length;
    const additionalOffset = hashedKey.charCodeAt(indexOffset);
    const encodedAsciiValue =
      dataAsciiValue + totalKeyAsciiValue + additionalOffset;
    const encodedChar = String.fromCharCode(encodedAsciiValue);
    encodedString += encodedChar;
  });

  return encodedString;
}
