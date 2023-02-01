import React, { useEffect } from "react";
import { Shift } from "../../interface/Shift";

interface Props {
  liste: Shift[][];
}

const ButtonPost: React.FC<Props> = ({ liste }) => {
  let testType: string = "123";
  useEffect(() => {
    liste.map((listeSchiftByRider) => {
      console.log(
        "listeSchiftByRider foreach n°: " + liste.indexOf(listeSchiftByRider)
      );
      //console.log("Rider Id: " +listeSchiftByRider[0].member_id)
      console.log(listeSchiftByRider);
    });
  }, [liste]);

  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Send All
    </button>
  );
};

export default ButtonPost;
