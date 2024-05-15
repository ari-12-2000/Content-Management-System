import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import UsersTable from "./components/UsersTable";
import { Users, UserType, dom } from "./types/Types";
const App = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [render, setRender] = useState<dom>({form:false, delete:false});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<UserType> = await axios.get("/");
        setUsers(response.data);//
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [render]);

  return (
    <>
      <h1 className="text-2xl text-center uppercase font-bold my-4">
        Content Mangement System
      </h1>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <UsersTable users={users} setRender={setRender} render={render}/>
      )}
    </>
  );
};

export default App;
