import { Button, Flex, message, Typography } from "antd";
import Box from "components/Box";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAcceptInvitation from "services/Invitation/Mutations/useAcceptInvitation";
export default function Invitation({ companyName, setActiveTab }) {
  const [search] = useSearchParams();
  const { invitationAcceptJoinCompany, isPending } = useAcceptInvitation({
    onSuccess: (data) => {
      if (data?.statusCode == 200) message.success("Invitation Accepted");
      setActiveTab("login");
      navigate("/");
    },
    onError: () => {
      message.error("Something went wrong");
    },
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!search.get("token")) {
      setActiveTab("login");
      navigate("/", {
        replace: true,
      });
    }
  }, []);
  const handleDecline = () => {
    setActiveTab("login");
    navigate("/");
  };
  const handleAccept = async () => {
    await invitationAcceptJoinCompany({
      token: search.get("token"),
    });
  };
  return (
    <section>
      <Box
        sx={{
          padding: "32px",
        }}>
        <Flex justify="center">
          <Typography.Title
            level={3}
            style={{
              color: "#006CE3",
            }}>
            Invitation
          </Typography.Title>
        </Flex>
        <Box
          sx={{
            textAlign: "center",
          }}>
          <Typography.Text
            style={{
              textAlign: "center",
              color: "#344054",
              fontSize: "16px",
            }}>
            {companyName} send you an invitation
          </Typography.Text>
        </Box>
        <Flex
          style={{
            marginTop: "24px",
          }}
          justify="center"
          gap={8}>
          <Button disabled={isPending} onClick={handleDecline}>
            Decline
          </Button>
          <Button onClick={handleAccept} loading={isPending} color="primary" type="primary">
            Accept
          </Button>
        </Flex>
      </Box>
    </section>
  );
}
