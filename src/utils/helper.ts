import axios, { AxiosError } from "axios";
import { KJUR } from "jsrsasign";
type generateZoomJWTType = {
  topic: string;
  password: string;
  userIdentity?: string;
  sessionKey?: string;
  roleType: 1 | 0;
};

export const errorResponse = (error: Error | AxiosError) => {
  if (axios.isAxiosError(error)) {
    let message = error.response ? error.response.data.message : error.message;
    throw new Error(message);
  } else if (error instanceof Error) {
    throw new Error(error.message);
  } else {
    throw new Error("Server Error Occurred!");
  }
};

export const isImageFile = (file: File): boolean => {
  const validImageExtensions = ["jpg", "jpeg", "png", "gif"];
  const fileExtension = file.name.split(".").pop()?.toLowerCase();

  return fileExtension ? validImageExtensions.includes(fileExtension) : false;
};

export function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

export function generateZoomJWT({
  topic,
  password,
  userIdentity,
  sessionKey,
  roleType,
}: generateZoomJWTType) {
  const iat = Math.round(new Date().getTime() / 1000);
  const exp = iat + 60 * 60 * 24;

  const oHeader = { alg: "HS256", typ: "JWT" };
  const sdkKey = process.env.NEXT_PUBLIC_ZOOM_SDK_KEY;
  const sdkSecret = process.env.NEXT_PUBLIC_ZOOM_SDK_SECRET;
  const oPayload = {
    app_key: sdkKey,
    iat,
    exp,
    tpc: topic,
    pwd: password,
    user_identity: userIdentity,
    session_key: sessionKey,
    role_type: roleType,
  };
  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);
  const signature = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, sdkSecret);
  return signature;
}
