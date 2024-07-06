# LemmEncode - Let Me Encode!

LemmEncode is a simple encoding library that uses a combination of a secret key and a random salt to encode and decode strings. The encoded output is in Base64 format, ensuring that it can be easily stored and transmitted. The use of a random salt ensures that the encoded outputs are always different, making dictionary and brute force attacks more difficult.

## Installation

You can install the package using npm:

```bash
npm install lemmencode
```

## Usage

### Importing the Library

First, import the necessary functions from the library:

```javascript
import { encodeString, decodeString } from "lemmencode";
```

### Encoding a String

To encode a string, use the `encodeString` function. You need to provide the data you want to encode and a secret key.

```javascript
const data = "Hello, World!";
const key = "mySecretKey";
const encodedData = encodeString(data, key);

console.log("Encoded Data:", encodedData);
// Example output: "ZDgxYTc4ZGY2M2M3MzJiMTYwN2YyNGM0Oj09QUFBQXhBeUFBQUFBQUFBSWFBQUFBQUFBRjdtZ2R3PT0="
```

### Decoding a String

To decode a string, use the `decodeString` function. You need to provide the encoded data and the same secret key used for encoding.

```javascript
const decodedData = decodeString(encodedData, key);

console.log("Decoded Data:", decodedData);
// Output: "Hello, World!"
```

## Functions

### `encodeString(data: string, key: string): string`

Encodes the given data using the provided key.

- `data`: The string you want to encode.
- `key`: The secret key used for encoding.

**Returns:** A Base64 encoded string that includes a random salt.

### `decodeString(encodedData: string, key: string): string`

Decodes the given encoded data using the provided key.

- `encodedData`: The Base64 encoded string that you want to decode.
- `key`: The secret key used for decoding.

**Returns:** The original string data.

## Example

```javascript
import { encodeString, decodeString } from "lemmencode";

const key = "mySecretKey";
const data = "Sensitive Information";

// Encoding the data
const encodedData = encodeString(data, key);
console.log("Encoded Data:", encodedData);
// Example output: "ZDgxYTc4ZGY2M2M3MzJiMTYwN2YyNGM0Oj09QUFBQXhBeUFBQUFBQUFBSWFBQUFBQUFBRjdtZ2R3PT0="

// Decoding the data
const decodedData = decodeString(encodedData, key);
console.log("Decoded Data:", decodedData);
// Output: "Sensitive Information"
```

## Security Note

While LemmEncode provides a basic level of security through obfuscation, it is not a substitute for robust cryptographic algorithms for securing highly sensitive data. For more secure applications, consider using established cryptographic libraries and practices.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
