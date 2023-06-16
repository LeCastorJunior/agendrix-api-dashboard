import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col } from "react-grid-system";
import Loading from "react-loading";

import ServerAPI from "../../../services/ServerAPI";
import axios from "axios";
import { HandleServerErrors } from "./utils";

const DetailsMembersTimeEntries: React.FC = (props: any) => {
  //todo: utilisation du use location
  const { membersAE } = props.location.state;

  const [members, setmembers] = useState<Array<GenericObject>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchmembers = useCallback(async (): Promise<void> => {
    try {
      const response: GenericObject = await ServerAPI.get(
        `/integrations/agendrix/detail-member-time-entries?search[position_id]=${membersAE.main_position_id}&search[member_id]=${membersAE.id}&search[from]=2023-01-01T00:00+00Z&search[to]=2023-01-31T00:00+00Z`
      );
      const result = await response.json();

      if (response.ok) setmembers([...result.data]);
      else HandleServerErrors(result);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [membersAE.id, membersAE.main_position_id]);

  useEffect(() => {
    fetchmembers();
  }, [fetchmembers]);

  const [data, setData] = useState<GenericObject>([]);
  //membersAE.id = 999815;
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await axios.get(
          `http://54.38.191.163:4444/api/v2/test/searchCriteria?id_rider=${membersAE.id}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [membersAE.id, membersAE.main_position_id]);

  const [response, setResponse] = useState(null);

  const handleClick = async () => {
    const result = await fetch("http://localhost:4444/api/v2/test/ping", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: data.rider,
        members: members,
      }),
    });
    const json = await result.json();
    setResponse(json);
    console.log(response);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex justify-center">
      <a
        className="absolute top-0 left-0 m-4"
        href="/integrations/agendrix/my-team-members-ae"
      >
        {"<--"}
      </a>
      <div className="w-11/12">
        <h1 className="text-2xl text-center mt-4 mb-6 underline">
          Detail Member Time Entries
        </h1>
        <Container>
          <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
            {Object.entries(data.rider ? data.rider : []).map(
              ([key, value]) => (
                <div className="flex flex-col pb-3" key={key ? key : 0}>
                  <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    {key}
                  </dt>
                  <dd className="text-lg font-semibold">{`${value}`}</dd>
                </div>
              )
            )}
          </dl>
        </Container>
        <Container>
          <div className="flex flex-col h-1 m-4 w-full bg-purple-300 border-opacity-50"></div>
        </Container>

        <Container>
          <Row className="border-b-2 border-gray-400 mb-2">
            <Col sm={1}>Date</Col>
            <Col sm={3}>Start_at</Col>
            <Col sm={3}>End_at</Col>
            <Col sm={1}>Approved</Col>
            <Col sm={1}>Regular_minutes</Col>
          </Row>
          {members.map((membersAE: GenericObject, index: number) => (
            <Row
              className="mb-2 text-xs 	border-b-2	border-b-amber-300"
              key={index}
            >
              <Col sm={1}>{membersAE.date}</Col>
              <Col sm={3}>{membersAE.start_at}</Col>
              <Col sm={3}>{membersAE.end_at}</Col>
              <Col sm={1}>{membersAE.approved.toString()}</Col>
              <Col sm={1}>{membersAE.regular_minutes}</Col>
            </Row>
          ))}
        </Container>
        <Container className="m-4">
          <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Send facture to Draft
          </button>
        </Container>
      </div>
    </div>
  );
};
export default DetailsMembersTimeEntries;
