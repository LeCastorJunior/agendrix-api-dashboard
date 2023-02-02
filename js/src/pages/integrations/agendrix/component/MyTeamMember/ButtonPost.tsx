import React, { useState } from "react";
import { Shift } from "../../interface/Shift";

interface Rider {
  liste: Shift[][];
}

const ButtonPost: React.FC<Rider> = ({ liste }) => {
  const [response, setResponse] = useState<string>();

  const handleClick = async () => {
    await fetch("http://localhost:4444/api/v2/test/ping", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listeRider: liste,
      }),
    }).then((response) => {
      console.log(response.headers.get("Content-Type"));
      console.log(response.status);
      if (response.status === 200) {
        setResponse("Ok. Dernier envoie le : " + new Date().toISOString());
      }
    });
    //const json = await result.json();
    console.log(response);
  };
  return (
    <button
      onClick={handleClick}
      className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Send All {response}
    </button>
  );
};

export default ButtonPost;
