import { Dispatch, SetStateAction, useState } from "react";
import { Users, dom, Data } from "../types/Types";
import { Avatar, Button, IconButton } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import axios from "axios";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import Form from "./Form";

interface Props {
  users: Users[];
  setRender: Dispatch<SetStateAction<dom>>;
  render: dom;
}

let type: string = "CREATE",
  id: number = 0;
const UsersTable = ({ users, render, setRender }: Props) => {
  const [response, setResponse] = useState<[]>([]);
  const handleAdd_Or_Update_Or_DeleteUser = async (data?: Data) => {
    try {
      if (data) {
        console.log(data.inputs);
        if (type === "CREATE") {
          await axios.post("/", data.inputs);
        } else if (type === "UPDATE") {
          console.log(id);
          await axios.put(`/${id}`, data.inputs);
        }
        setResponse([]);
        setRender({ ...render, form: false });
      } else {
        await axios.delete(`/${id}`);
        setRender({ delete: true, form: false });
      }
    } catch (err) {
      console.log(err);
      setResponse(err.response.data.errors.undefined);
    }
  };

  return (
    <>
      {render.form ? (
        <Form
          type={type}
          setRender={setRender}
          handle={handleAdd_Or_Update_Or_DeleteUser}
          render={render}
          response={response}
        />
      ) : (
        <>
          <div className="w-full flex justify-center pb-4">
            <IconButton
              sx={{
                margin: "auto",
                padding: "10px",
                backgroundColor: "rgb(204 251 241)",
                "&:hover": {
                  backgroundColor: "rgb(94 234 212)", // Hover color
                },
              }}
              onClick={() => {
                type = "CREATE";
                id = 0;
                setRender({ ...render, form: true });
              }}
              color="primary"
            >
              <PersonAddIcon
                style={{ width: "80", height: "80", padding: "10px" }}
              />
            </IconButton>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="hidden sm:table-cell border  px-4 py-2">
                  Image
                </th>
                <th className="hidden sm:table-cell border  px-4 py-2">Name</th>
                <th className="hidden sm:table-cell border  px-4 py-2">
                  Date Of Birth
                </th>
                <th className="hidden sm:table-cell border  px-4 py-2">
                  Email
                </th>
                <th className="hidden sm:table-cell border  px-4 py-2">
                  Phone
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td
                    className={` ${
                      index % 2 === 0 && "bg-gray-300"
                    } grid grid-cols-1  h-28  sm:h-auto sm:font-normal   px-4 py-2 `}
                  >
                    <Avatar
                      className="m-auto "
                      sx={{ width: 90, height: 90 }}
                      src={user.image}
                      alt=""
                    />
                  </td>
                  <td
                    data-cell="Name"
                    className={`before:content-[attr(data-cell)_':'] ${
                      index % 2 === 0 && "bg-gray-300"
                    } grid grid-cols-2 gap-x-1  before:font-bold  text-left sm:table-cell sm:text-center sm:before:content-[''] sm:font-normal   px-4 py-2 `}
                  >
                    {user.name}
                  </td>
                  <td
                    data-cell="Date Of Birth"
                    className={`before:content-[attr(data-cell)_':'] ${
                      index % 2 === 0 && "bg-gray-300"
                    } grid grid-cols-2 gap-x-1  before:font-bold  text-left sm:table-cell  sm:text-center sm:before:content-[''] sm:font-normal   px-4 py-2 `}
                  >
                    {user.DateOfBirth.slice(0, 10)}
                  </td>
                  <td
                    data-cell="Email"
                    className={`before:content-[attr(data-cell)_':'] ${
                      index % 2 === 0 && "bg-gray-300"
                    } grid grid-cols-2 gap-x-1  before:font-bold  text-left sm:table-cell  sm:text-center sm:before:content-[''] sm:font-normal   px-4 py-2 `}
                  >
                    {user.email}
                  </td>
                  <td
                    data-cell="Phone"
                    className={`before:content-[attr(data-cell)_':'] ${
                      index % 2 === 0 && "bg-gray-300"
                    } grid grid-cols-2 gap-x-1  before:font-bold  text-left sm:table-cell  sm:text-center sm:before:content-[''] sm:font-normal   px-4 py-2 `}
                  >
                    {user.number}
                  </td>
                  <td
                    className={` ${
                      index % 2 === 0 && "bg-gray-300"
                    } grid grid-cols-2 text-left mt-4 sm:table-cell sm:mt-0 sm:h-auto sm:font-normal px-2 py-2 `}
                  >
                    <Button
                      color="success"
                      style={{
                        justifyContent: "flex-start",
                        border: "1px solid teal",
                        width:"0px"
                      }}
                    >
                      <BorderColorIcon
                        style={{ width: "30", height: "30" }}
                        onClick={() => {
                          type = "UPDATE";
                          id = user.id;
                          setRender({ ...render, form: true });
                        }}
                      />
                    </Button>
                    <Button
                      color="error"
                      style={{
                        justifyContent: "flex-start",
                        border: "1px solid teal",
                      }}
                      onClick={() => {
                        type = "DELETE";
                        id = user.id;
                        handleAdd_Or_Update_Or_DeleteUser();
                      }}
                    >
                      <DeleteIcon />
                      DELETE
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default UsersTable;
//if one td is grid and rest of all tds have dispaly table-cell, then all tds will appear side by side in a row.If all tds are grid then they will appear in a stack



