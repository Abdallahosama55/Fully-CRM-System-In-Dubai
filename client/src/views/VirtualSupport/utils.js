import { LocalParticipant } from "livekit-client";

const NOTIFICATION_SOUND = "notification_sound";

export const enableNotificationSound = () => {
  localStorage.setItem(NOTIFICATION_SOUND, "true");
};
export const disableNotificationSound = () => {
  localStorage.setItem(NOTIFICATION_SOUND, "false");
};
export const getNotificationSound = () => {
  const is = localStorage.getItem(NOTIFICATION_SOUND);
  return is === "true" ? true : false;
};

export const initNotificationSound = () => {
  if (
    localStorage.getItem(NOTIFICATION_SOUND) === undefined ||
    localStorage.getItem(NOTIFICATION_SOUND) === null
  )
    localStorage.setItem(NOTIFICATION_SOUND, "true");
};

export function generateRandomAlphanumeric(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export function extractSystemCommand(str) {
  const regex = /<systemCommand>(.*?)<\/systemCommand>/s;
  const match = regex.exec(str);
  if (match) {
    let extractedText = match[1].trim();

    // Convert keys and values to JSON compatible format
    extractedText = extractedText.replace(/(\w+):/g, '"$1":').replace(/'/g, '"');

    try {
      const parsedObject = JSON.parse(extractedText);
      console.log("parsedObject", parsedObject);
      return parsedObject;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  } else {
    console.log("No match found");
    return null;
  }
}

export function segmentToChatMessage(s, existingMessage, participant) {
  const msg = {
    message: s.final ? s.text : `${s.text} ...`,
    name: participant instanceof LocalParticipant ? "You" : "Luna",
    isSelf: participant instanceof LocalParticipant,
    timestamp: existingMessage?.timestamp ?? Date.now(),
  };
  return msg;
}

export function calculateTotalPrice(list) {
  let totalPrice = 0;

  // Loop through each item in the array
  for (let i = 0; i < list.length; i++) {
    const item = list[i];

    // Get the quantity and price of the current item
    const quantity = item.quantity;
    const price = item.productVariant?.price || 0;

    // Calculate the subtotal for the current item (quantity * price)
    const subtotal = quantity * price;

    // Add the subtotal to the total price
    totalPrice += subtotal;
  }

  return totalPrice;
}
