import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, CircularProgress, Snackbar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BREAKS, SESSIONS } from "../../constants";
import { getAllBreaks } from "../../constants/api/break";
import { deleteSession } from "../../constants/api/session";
import { ResponsiveDialog } from "../dialogs/DeleteDialog";

const ViewAllBreaks = () => {
  const [deleteSessionOpen, setDeleteSessionOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    error,
    data: breaksData,
  } = useQuery({
    queryKey: [BREAKS],
    queryFn: () => getAllBreaks(),
  });
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
        <div className="font-bold text-3xl">Breaks</div>

        <Button
          onClick={() => navigate("/breaks/add")}
          variant="contained"
          color="primary"
          size="large"
        >
          <div>Add New Break</div>
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
                  {breaksData?.data?.map((breakObject) => (
                    <tr key={breakObject?.id}>
                      <td className="px-6 py-3">{breakObject?.id}</td>
                      <td className="px-6 py-3 text-center">
                        {breakObject?.duration}
                      </td>
                      <td className="px-6 py-3 text-center">
                        {breakObject?.createdDate}
                      </td>
                      <td className="px-6 py-3 flex justify-center items-center">
                        <div className="flex flex-row justify-end items-center space-x-4">
                          <Button
                            className="w-10 h-8"
                            variant="outlined"
                            color="primary"
                            onClick={() =>
                              navigate(`/breaks/edit/${breakObject?.id}`)
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
                              setSelectedSessionId(breakObject?.id);
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

export default ViewAllBreaks;
