import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const USER_DETAIL = gql`
  query ($id: Int!) {
    user(id: $id) {
      id
      username
      active
      account {
        __typename
        ... on Customer {
          name
        }
        ... on DeliveryAgent {
          name
        }
      }
    }
  }
`;

export default function User() {
  const { id } = useParams();
  const userId = parseInt(id);
  console.log("id", userId);

  const { data } = useQuery(USER_DETAIL, {
    variables: { id: userId },
  });

  console.log("data", data);

  return (
    <div className="container">
      <h1>User Details</h1>
      {data && (
        <>
          <p>ID: {data.user.id}</p>
          <p>Username: {data.user.username}</p>
          <p>Active: {data.user.active ? "Yes" : "No"}</p>
          <p>Account Type: {data.user.account.__typename}</p>
          {data.user.account.__typename === "Customer" && (
            <p>Name: {data.user.account.name}</p>
          )}
          {data.user.account.__typename === "DeliveryAgent" && (
            <p>Name: {data.user.account.name}</p>
          )}
        </>
      )}
    </div>
  );
}
