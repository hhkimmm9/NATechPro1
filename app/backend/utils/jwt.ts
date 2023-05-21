import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "1h",
};

export function signJwtAccessToken(payload: JwtPayload, options: SignOption = DEFAULT_SIGN_OPTION) {
  const secret_key = process.env.ACCESS_TOKEN_SECRET;
  const token = jwt.sign(payload, secret_key!, options);
  return token;
}

export function verifyJwt(token: string) {
  try {
    const secret_key = process.env.ACCESS_TOKEN_SECRET;
    const decoded = jwt.verify(token, secret_key!);
    return decoded as JwtPayload;
  } catch (error) {
    console.log("err: ", error);
    return null;
  }
}



// helper 
export function extractTokenAndVerify(req: Request) {
    // verify token and extract userID
    const accessToken = req.headers.get("authorization");
    const token = accessToken?.split(' ')[1];
    const decodedToken = verifyJwt(token || "");
    if (!accessToken || !decodedToken) {
        return null;
    }
    return decodedToken
}