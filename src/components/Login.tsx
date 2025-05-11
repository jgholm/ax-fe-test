import { Button, Card, Input, Text, tokens } from "@fluentui/react-components";
import axios from "axios";
import type { FormEvent } from "react";

interface LoginProps {
  authAs: (username: string) => void;
}

const usersEndpoint = "http://localhost:3000/users";

const Login = ({ authAs }: LoginProps) => {
  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const users = fetchUsers();
    users.then((response) => {
      const user = response.data.find(
        (user: { username: string; password: string }) => {
          return (
            user.username === formData.get("username") &&
            user.password === formData.get("password")
          );
        }
      );
      if (user) {
        authAs(user.username);
      } else {
        alert("Invalid username or password");
      }
    });
  };

  const fetchUsers = async () => {
    return await axios.get(usersEndpoint);
  };
  return (
    <div
      style={{
        width: "400px",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "100px",
      }}
    >
      <Card
        appearance="filled-alternative"
        style={{ alignItems: "center", display: "flex" }}
      >
        <Text size={700} weight="bold" as="h1">
          Log in
        </Text>
        <form onSubmit={(e) => handleLogin(e)}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "200px",
              gap: tokens.spacingVerticalM,
              marginTop: tokens.spacingVerticalL,
            }}
          >
            <Input
              type="text"
              placeholder="Username"
              appearance="outline"
              name="username"
            />
            <Input
              type="password"
              placeholder="Password"
              appearance="outline"
              name="password"
            />
            <Button appearance="primary" type="submit">
              Log in
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default Login;
