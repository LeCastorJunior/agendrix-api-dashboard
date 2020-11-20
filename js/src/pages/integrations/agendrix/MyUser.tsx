import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-grid-system";
import Loading from "react-loading";

import ServerAPI from "../../../services/ServerAPI";
import { HandleServerErrors } from "./utils";

const MyUser: React.FC = () => {
  const [user, setUser] = useState<GenericObject>({
    email: "",
    profile: { first_name: "", last_name: "" },
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchProfile = async (): Promise<void> => {
    try {
      const response: GenericObject = await ServerAPI.get(
        "/integrations/agendrix/my-user"
      );
      const result = await response.json();

      if (response.ok) setUser(result.data);
      else HandleServerErrors(result);
    } catch (e) {
      alert(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex justify-center">
      <a className="absolute top-0 left-0 m-4" href="/home">
        {"<--"}
      </a>
      <div className="w-1/2">
        <h1 className="text-2xl text-center mt-4 mb-6 underline">
          My Agendrix's Profile
        </h1>
        <Container>
          <Row className="border-b-2 border-gray-800 mb-2">
            <Col sm={4}>Email</Col>
            <Col sm={4}>First Name</Col>
            <Col sm={4}>Last Name</Col>
          </Row>
          <Row className="mb-2">
            <Col sm={4}>{user.email}</Col>
            <Col sm={4}>{user.profile.first_name}</Col>
            <Col sm={4}>{user.profile.last_name}</Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default MyUser;
