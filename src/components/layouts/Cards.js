import { sendMessageBotRestart } from "../../lib/slack-api";
import { Alert } from "flowbite-react";
import { Card } from "flowbite-react";
import { useState } from "react";
import { useAuth } from "../../content/AuthContext";

const tagRegExp = /\b(TOR)\d{1,2}(E|S)((-)\w{1,3}){1,2}\b/g;

export default function Cards({ devices, facility }) {
  const [response, setResponse] = useState();

  const { user } = useAuth();

  const handleRestart = async ({ target: { value } }) => {
    setResponse("");
    sendMessageBotRestart("Ivan").then((res) => setResponse(res));
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          {response && (
            <Alert color="success">
              <span>
                <span className="font-medium">
                  El reinicio se ha enviado con éxito!{" "}
                </span>
                <hr />
                Revise el dispositivo para comprobar el reinicio. Es importante
                tener en consideración que el reinicio puede demorar unos
                segundos según la conexión del dispositivo a internet.
              </span>
            </Alert>
          )}
          <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            {devices.map((item, index) => {
              return (
                <Card key={index}>
                  <div className="">
                    {item.tags.map((tag, index) => {
                      if (tag.match(tagRegExp)) {
                        return (
                          <h5
                            className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                            key={index}
                          >
                            {tag}
                          </h5>
                        );
                      }
                      return false;
                    })}
                  </div>
                  <div className="">
                    <button
                      onClick={handleRestart}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      value={item.deviceUId}
                      key={index}
                    >
                      Reiniciar
                    </button>
                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    <p className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
                      Ultima actualización:{" "}
                      {new Intl.DateTimeFormat("es-ES", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        hour12: false,
                      }).format(item.lastChange)}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
