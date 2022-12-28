export async function sendMessageBotRestart(tag) {
  console.log("Using Slack API " + tag);
  let myHeaders = new Headers({
    "Content-Type": "text/xml",
  });

  try {
    const response = await fetch(
      "https://hooks.slack.com/services/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",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: "<@U01TNL05BE2> knox restart " + tag }),
      }
    );
    if (response.ok) {
      console.log("Todo bien");
    } else {
      console.log("Respuesta de red OK pero respuesta de HTTP no OK");
    }
  } catch (error) {
    console.log("Hubo un problema con la petición Fetch:" + error.message);
  }
}
