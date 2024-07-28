import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, CircularProgress, Snackbar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SESSIONS, SUBJECTS } from "../../constants";
import { deleteSession, getAllSessions } from "../../constants/api/session";
import { getAllSubjects } from "../../constants/api/subject";
import { ResponsiveDialog } from "../dialogs/DeleteDialog";

const ViewAllSessions = () => {
  const [deleteSessionOpen, setDeleteSessionOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    error,
    data: sessionsData,
  } = useQuery({
    queryKey: [SESSIONS],
    queryFn: () => getAllSessions(),
  });

  const { data: subjectsData } = useQuery({
    queryKey: [SUBJECTS],
    queryFn: () => getAllSubjects(),
  });
  console.log(subjectsData);
  return (
    <div className="w-full h-full">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isError}
        message={error?.message}
        key={"top" + "center"}
        autoHideDuration={1200}
      />
      <div className="flex flex-row justify-between items-center">
        <div className="font-bold text-3xl">Sessions</div>

        <Button
          onClick={() => navigate("/sessions/add")}
          variant="contained"
          color="primary"
          size="large"
          disabled={subjectsData?.data?.length === 0}
        >
          <div>Add New Session</div>
        </Button>
      </div>
      <div>
        <div className="flex flex-col max-h-[75vh] rounded-md overflow-hidden mt-10">
          <div className="flex-grow overflow-auto">
            {isLoading ? (
              <div className="w-full flex items-center justify-center my-10">
                <CircularProgress size={30} color="primary" />
              </div>
            ) : (
              <table className="relative w-full border">
                <thead>
                  <tr>
                    <th className="sticky top-0 px-6 py-3 text-blue-900 bg-blue-300">
                      ID
                    </th>
                    <th className="sticky top-0 px-6 py-3 text-blue-900 bg-blue-300 text-center">
                      Subject
                    </th>
                    <th className="sticky top-0 px-6 py-3 text-blue-900 bg-blue-300 text-center">
                      Duration (mins)
                    </th>
                    <th className="sticky top-0 px-6 py-3 text-blue-900 bg-blue-300 text-center">
                      Created Date
                    </th>
                    <th className="sticky top-0 px-6 py-3 text-blue-900 bg-blue-300 text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y bg-gray-100">
                  {sessionsData?.data?.map((session) => (
                    <tr key={session?.id}>
                      <td className="px-6 py-3">{session?.id}</td>
                      <td className="px-6 py-3 text-center">
                        {session?.subject?.name}
                      </td>
                      <td className="px-6 py-3 text-center">
                        {session?.duration}
                      </td>
                      <td className="px-6 py-3 text-center">
                        {session?.createdDate}
                      </td>
                      <td className="px-6 py-3 flex justify-center items-center">
                        <div className="flex flex-row justify-end items-center space-x-4">
                          <Button
                            className="w-10 h-8"
                            variant="outlined"
                            color="primary"
                            onClick={() =>
                              navigate(`/sessions/edit/${session?.id}`)
                            }
                          >
                            <FontAwesomeIcon
                              className="fa fa-plus"
                              icon={faPencil}
                            />
                          </Button>
                          <Button
                            className="w-10 h-8"
                            variant="outlined"
                            color="error"
                            onClick={() => {
                              setSelectedSessionId(session?.id);
                              setDeleteSessionOpen(true);
                            }}
                          >
                            <FontAwesomeIcon
                              className="fa fa-plus"
                              icon={faTrash}
                            />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <ResponsiveDialog
        open={deleteSessionOpen}
        setOpen={setDeleteSessionOpen}
        deleteObjectId={selectedSessionId}
        deleteFunction={deleteSession}
        invalidateQuery={SESSIONS}
      />
    </div>
  );
};

export default ViewAllSessions;
