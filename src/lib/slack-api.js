export async function sendMessageBotRestart(tag) {
  console.log("Using Slack API " + tag);

  try {
    const response = await fetch(process.env.REACT_APP_SLACK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: "<@U01TNL05BE2> knox restart " + tag }),
    });
    if (response.ok || response.status === 0) {
      return "Todo bien con el reinicio";
    } else {
      return "Respuesta de red OK pero respuesta de HTTP no OK";
    }
  } catch (error) {
    console.log(error);
    return "Hubo un problema con la petición Fetch";
  }
}
