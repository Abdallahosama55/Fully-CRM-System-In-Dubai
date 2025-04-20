import { AccessToken } from "livekit-server-sdk";
import { generateRandomAlphanumeric } from "views/VirtualSupport/utils";

const apiKey = "APIcgAvk8uzagxt";
const apiSecret = "sr1ipg9PBotFMBVvwmxxz9QU6mutxm0j5gwhtE3w2aH";

const createToken = (userInfo, grant) => {
  const at = new AccessToken(apiKey, apiSecret, userInfo);
  at.addGrant(grant);
  return at.toJwt();
};

export default async function generateAgentToken(deskId) {
  try {
    const roomName = `room-${generateRandomAlphanumeric(4)}-${generateRandomAlphanumeric(
      4,
    )}-${deskId}`;
    const identity = `identity-${generateRandomAlphanumeric(4)}`;

    const grant = {
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canPublishData: true,
      canSubscribe: true,
    };

    const token = await createToken({ identity }, grant);
    const result = {
      identity,
      accessToken: token,
    };

    return result;
  } catch (e) {
    console.log(e?.message, e);
  }
}
