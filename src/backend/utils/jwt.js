import jwt, { JwtPayload } from "jsonwebtoken";

const DEFAULT_SIGN_OPTION = {
  expiresIn: "1h",
};

export function signJwtAccessToken(payload, options = DEFAULT_SIGN_OPTION) {
  const secret_key = process.env.ACCESS_TOKEN_SECRET;
  const token = jwt.sign(payload, secret_key, options);
  return token;
}

export function verifyJwt(token) {
  try {
    const secret_key = process.env.ACCESS_TOKEN_SECRET;
    const decoded = jwt.verify(token, secret_key);
    return decoded;
  } catch (error) {
    console.log("err: ", error);
    return null;
  }
}
