import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col } from "react-grid-system";
import Loading from "react-loading";
import { Link } from "react-router-dom";
import ServerAPI from "../../../services/ServerAPI";
import { HandleServerErrors, FinderShift, FindListShift } from "./utils";
import ButtonPost from "./component/MyTeamMember/ButtonPost";
import { Shift } from "./interface/Shift";

const MyTeamMembersAE: React.FC = () => {
  const [pageSize, setPageSize] = useState<string>("50");
  const [pageNumber, setPageNumber] = useState<string>("1");
  const [pageLimit, setPageLimit] = useState<string>("");
  const [search, setSearch] = useState<string>(
    "search[main_position_id]=8b91c0e8-a0f5-4a13-97b3-5d0ab69170db"
  );
  const [members, setmembers] = useState<Array<GenericObject>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchmembers = useCallback(async (): Promise<void> => {
    try {
      const response: GenericObject = await ServerAPI.get(
        `/integrations/agendrix/my-organization-members-ae?page=${pageNumber}&page_size=${pageSize}${
          pageLimit ? `&limit=${pageLimit}` : ""
        }${search ? `&${search}` : ""}`
      );
      const result = await response.json();
      if (response.ok) setmembers([...result.data]);
      else HandleServerErrors(result);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [pageLimit, pageNumber, pageSize, search]);

  useEffect(() => {
    fetchmembers();
  }, [fetchmembers]);

  const [btnPost, setbtnPost] = useState<any>();

  useEffect(() => {
    const test = async () => {
      const liste: string[] = await FinderShift();
      const resp: Shift[][] = [];

      await liste.map((id: string) => {
        const parse = async () => {
          resp.push(await FindListShift(id));
          return resp;
        };

        return parse().then((respo) => {
          if (liste.length === respo.length) {
            setbtnPost(<ButtonPost liste={respo}></ButtonPost>);
          }
        });
      });
    };
    test();
  }, [setbtnPost]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex justify-center">
      <a className="absolute top-0 left-0 m-4" href="/home">
        {"<--"}
      </a>
      <div className="w-11/12">
        <h1 className="text-2xl text-center mt-4 mb-6 underline">
          My Agendrix's Organization members
        </h1>
        <div className="flex justify-between my-6">{btnPost}</div>
        <div className="flex justify-between my-6">
          <div className="flex">
            <span className="mr-2 my-auto">Page Size: </span>
            <input
              className="block border border-gray-800 text-gray-800 rounded-md p-1"
              type="text"
              value={pageSize}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPageSize(e.target.value)
              }
            />
          </div>
          <div className="flex">
            <span className="mr-2 my-auto">Page Number: </span>
            <input
              className="block border border-gray-800 text-gray-800 rounded-md p-1"
              type="text"
              value={pageNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPageNumber(e.target.value)
              }
            />
          </div>
          <div className="flex">
            <span className="mr-2 my-auto">Page Limit: </span>
            <input
              className="block border border-gray-800 text-gray-800 rounded-md p-1"
              type="text"
              placeholder="50"
              defaultValue={pageLimit}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPageLimit(e.target.value)
              }
            />
          </div>
          <div className="flex">
            <span className="mr-2 my-auto">Search: </span>
            <input
              className="block border border-gray-800 text-gray-800 rounded-md p-1"
              type="text"
              placeholder="search[name]=elvis"
              defaultValue={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const {
                  target: { value },
                } = e;

                if ((value.includes("search") && value.includes("=")) || !value)
                  setSearch(e.target.value);
              }}
            />
          </div>
        </div>
        <Container>
          <Row className="border-b-2 border-gray-400 mb-2">
            <Col sm={2}>full Name</Col>
            <Col sm={1}>birth date</Col>
            <Col sm={3}>email</Col>
            <Col sm={3}>address</Col>
            <Col sm={2}>phone</Col>
            <Col sm={1}>---</Col>
          </Row>
          {members.map((membersAE: GenericObject, index: number) => (
            <Row
              className="mb-2 text-xs 	border-b-2	border-b-amber-300"
              key={index}
            >
              <Col sm={2}>{membersAE.profile.full_name}</Col>
              <Col sm={1}>{membersAE.profile.birthdate || "-"}</Col>
              <Col sm={3}>{membersAE.profile.email}</Col>
              <Col sm={3}>{membersAE.profile.civic_address}</Col>
              <Col sm={2}>{membersAE.profile.phone_1_number}</Col>
              <Col sm={1}>
                <Link
                  to={{
                    pathname:
                      "/integrations/agendrix/detail-member-time-entries",
                    state: {
                      membersAE: membersAE,
                    },
                  }}
                >
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Details
                  </button>
                </Link>
              </Col>
            </Row>
          ))}
        </Container>
      </div>
    </div>
  );
};

export default MyTeamMembersAE;
