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
        body: JSON.stringify({ text: "<@U04GRDLG55Y> World!" }),
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
