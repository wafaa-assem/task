import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const USER_LIST = gql`
  query {
    listUsers(input: { active: true }) {
      paginatorInfo {
        total
      }
      data {
        id
        username
        account {
          __typename
        }
      }
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(USER_LIST);
  console.log("data", data?.listUsers.data);
  console.log("loading", loading);
  console.log("error", error);

  return (
    <div className="container">
      <h1 className="header">User Accounts</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Account Type</th>
          </tr>
        </thead>
        <tbody>
          {data?.listUsers.data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <Link to={`/user/${user.id}`}>{user.username}</Link>
              <td>{user.account.__typename}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
