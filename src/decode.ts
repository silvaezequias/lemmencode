import * as crypto from "crypto";

function hashKey(key: string, salt: string): string {
  return crypto
    .createHash("sha256")
    .update(salt + key)
    .digest("hex");
}

export function decodeString(encodedData: string, key: string): string {
  const temperedString = Buffer.from(encodedData, "base64").toString("utf8");
  const [salt, encodedStringBase64] = temperedString.split(":");
  const encodedString = Buffer.from(encodedStringBase64, "base64").toString(
    "utf8"
  );

  const hashedKey = hashKey(key, salt);
  const encodedChars = encodedString.split("");
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
