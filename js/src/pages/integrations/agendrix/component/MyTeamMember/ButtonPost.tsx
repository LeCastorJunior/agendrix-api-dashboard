import React, { useState } from "react";
import { Shift } from "../../interface/Shift";

interface Rider {
  liste: Shift[][];
}

const ButtonPost: React.FC<Rider> = ({ liste }) => {
  const [response, setResponse] = useState<string>();
  const [SheetId, setSheetId] = useState<string>("Sheet ID");

  const handleClick = async () => {
    await fetch("http://54.38.191.163:3000/api/v2/test/ping", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listeRider: liste,
        sheetId: SheetId
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
    <div className="flex">
      <button
        onClick={handleClick}
        className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Send All {response}
      </button>
      <input
      className="block border border-gray-800 text-gray-800 rounded-md p-1 m-2"
      type="text"
      placeholder={SheetId}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setSheetId(e.target.value)
      }
      >
      </input>
    </div>
  );
};

export default ButtonPost;
