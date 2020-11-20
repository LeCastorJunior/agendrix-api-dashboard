import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col } from "react-grid-system";
import Loading from "react-loading";

import ServerAPI from "../../../services/ServerAPI";
import { HandleServerErrors } from "./utils";

const MyOrganizationPositions: React.FC = () => {
  const [pageSize, setPageSize] = useState<string>("50");
  const [pageNumber, setPageNumber] = useState<string>("1");
  const [pageLimit, setPageLimit] = useState<string>("");
  const [sort, setSort] = useState<string>("sort[rank]=asc");
  const [search, setSearch] = useState<string>("");
  const [positions, setPositions] = useState<Array<GenericObject>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchPositions = useCallback(async (): Promise<void> => {
    try {
      const response: GenericObject = await ServerAPI.get(
        `/integrations/agendrix/my-organization-positions?page=${pageNumber}&page_size=${pageSize}${
          pageLimit ? `&limit=${pageLimit}` : ""
        }${sort ? `&${sort}` : ""}${search ? `&${search}` : ""}`
      );
      const result = await response.json();

      if (response.ok) setPositions([...result.data]);
      else HandleServerErrors(result);
    } catch (e) {
      alert(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [pageLimit, pageNumber, pageSize, search, sort]);

  useEffect(() => {
    fetchPositions();
  }, [fetchPositions]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex justify-center">
      <a className="absolute top-0 left-0 m-4" href="/home">
        {"<--"}
      </a>
      <div className="w-11/12">
        <h1 className="text-2xl text-center mt-4 mb-6 underline">
          My Agendrix's Organization Positions
        </h1>
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
            <span className="mr-2 my-auto">Sort: </span>
            <input
              className="block border border-gray-800 text-gray-800 rounded-md p-1"
              type="text"
              placeholder="sort[name]=asc"
              defaultValue={sort}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const {
                  target: { value },
                } = e;
                const upperCaseValue = value.toUpperCase();

                if (
                  upperCaseValue.includes("ASC") ||
                  upperCaseValue.includes("DESC") ||
                  !value
                )
                  setSort(value);
              }}
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
          <Row className="border-b-2 border-gray-800 mb-2">
            <Col sm={4}>Rank</Col>
            <Col sm={4}>Name</Col>
            <Col sm={4}>Color</Col>
          </Row>
          {positions.map((position: GenericObject, index: number) => (
            <Row className="mb-2" key={index}>
              <Col sm={4}>{position.rank}</Col>
              <Col sm={4}>{position.name}</Col>
              <Col sm={4}>{position.color || "-"}</Col>
            </Row>
          ))}
        </Container>
      </div>
    </div>
  );
};

export default MyOrganizationPositions;
