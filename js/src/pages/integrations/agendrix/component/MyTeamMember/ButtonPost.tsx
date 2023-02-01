import React, { useEffect } from "react";
import { Shift } from "../../interface/Shift";

interface Rider {
  liste: Shift[][];
}

const ButtonPost: React.FC<Rider> = ({ liste }) => {
  useEffect(() => {
    liste.map((listeSchiftByRider) => {
      console.log(
        "listeSchiftByRider foreach n°: " + liste.indexOf(listeSchiftByRider)
      );
      console.log("Rider Id: " + listeSchiftByRider[0].member_id);
      console.log(listeSchiftByRider);
      return [];
    });
  }, [liste]);

  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Send All
    </button>
  );
};

export default ButtonPost;
