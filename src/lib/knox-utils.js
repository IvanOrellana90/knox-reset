import fetch from "node-fetch";
import knoxTokenLibraryJs from "knox-token-library-js";
import dotenv from "dotenv";

// Load Environment Variables
dotenv.config();

// Get Values from Environment Variables
const knoxApi = process.env.KNOX_API;
const clientId = process.env.KNOX_CLIENT_ID;
const publicKey = process.env.KNOX_PUBLIC_KEY;

// Get Knox Access Token For API Calls
export async function getAccessToken() {
  console.log("Getting access token");

  let signedClientId = knoxTokenLibraryJs.generateSignedClientIdentifierJWT(
    "knox-restart/keys.json",
    clientId
  );
  const params = {
    clientIdentifierJwt: signedClientId,
    base64EncodedStringPublicKey: publicKey,
    validityForAccessTokenInMinutes: 30,
  };

  const response = await fetch(knoxApi + "/ams/v1/users/accesstoken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const json = await response.json();
  const singedAccessToken = knoxTokenLibraryJs.generateSignedAccessTokenJWT(
    "knox-restart/keys.json",
    json.accessToken
  );

  return singedAccessToken;
}

// Get Devices from Knox by Page Number
export async function getDevicesByPage(accessToken, page = 0) {
  console.log(`Getting devices for page ${page}`);

  const response = await fetch(knoxApi + `/kcs/v1/kc/devices?pageNum=${page}`, {
    headers: {
      "x-knox-apitoken": accessToken,
    },
  });
  const json = await response.json();
  return json.deviceList;
}

// Get Devices Count from Knox
export async function getDevicesCount(accessToken) {
  console.log("Getting devices count");

  const response = await fetch(knoxApi + "/kcs/v1/kc/devices?pageSize=1", {
    headers: {
      "x-knox-apitoken": accessToken,
    },
  });
  const json = await response.json();
  return json.totalCount;
}

// Send command to Knox devices
export async function sendCommand(accessToken, command, devices) {
  console.log("Sending command to devices");

  var data = {
    command: command,
    devices: devices,
  };

  const response = await fetch(knoxApi + "/kcs/v1/kc/devices/command", {
    method: "PUT",
    headers: {
      "X-KNOX-APITOKEN": accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.status == 200) {
    const data = "OK";
    return data;
  } else {
    const json = await response.json();
    return json.data;
  }
}

// Getting all devices
export async function getDevices(accessToken) {
  console.log("Getting all devies");

  const deviceCount = await getDevicesCount(accessToken);
  const pageNum = deviceCount / 100;
  const devices = [];

  for (let i = 0; i < pageNum; i++) {
    const responseDevices = await getDevicesByPage(accessToken, i);
    devices.push(...responseDevices);
  }

  return devices;
}

// Restart client devices
export async function restartClient(name, tags) {
  console.log(`Restarting client ${name}`);

  const accessToken = await getAccessToken();
  const devices = await getDevices(accessToken);

  const filteredDevices = devices.filter((device) => {
    return tags.every((tag) => device.tags?.includes(tag));
  });
  console.log(`Found ${filteredDevices.length} devices`);
  const deviceIds = filteredDevices.map((device) => device.deviceUId);
  const result = await sendCommand(accessToken, "REBOOT", deviceIds);
  return `*${name}* restarted with *${
    deviceIds.length
  }* devices and tags: *${tags.join("*, *")}* \n    Status: *${result}*`;
}

// Restart device
export async function restartDevice(tag, companyTag = null) {
  console.log(`Restarting device with tag ${tag}`);

  const accessToken = await getAccessToken();
  const devices = await getDevices(accessToken);
  const filteredDevices = devices.filter((device) => {
    const tagged = device.tags?.includes(tag);
    let companyTagged = true;
    if (companyTag) companyTagged = device.tags?.includes(companyTag);

    return tagged && companyTagged;
  });

  if (filteredDevices.length === 1) {
    const deviceIds = filteredDevices.map((device) => device.deviceUId);
    const result = await sendCommand(accessToken, "REBOOT", deviceIds);
    return `*Dispositivos* reiniciados: *${deviceIds.length}* con el tag: *${tag}* \n    Estado: *${result}*`;
  } else {
    return `Verifica tu tag: *${tag}*. Numero de dispositivos: *${filteredDevices.length}*, debe ser igual a 1`;
  }
}
