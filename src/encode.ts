import * as crypto from "crypto";

function hashKey(key: string, salt: string): string {
  return crypto
    .createHash("sha256")
    .update(salt + key)
    .digest("hex");
}

export function encodeString(data: string, key: string): string {
  const salt = crypto.randomBytes(16);
  const hashedKey = hashKey(key, salt.toString("hex"));
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

  const encodedStringBase64 = Buffer.from(encodedString).toString("base64");
  const temperedString = `${salt.toString("hex")}:${encodedStringBase64}`;
  const result = Buffer.from(temperedString).toString("base64");

  return result;
}
