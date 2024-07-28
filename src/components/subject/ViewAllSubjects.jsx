import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, CircularProgress, Snackbar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SUBJECTS } from "../../constants";
import { deleteSubject, getAllSubjects } from "../../constants/api/subject";
import { ResponsiveDialog } from "../dialogs/DeleteDialog";

const ViewAllSubjects = () => {
  const [deleteSubjectOpen, setDeleteSubjectOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    error,
    data: subjectsData,
  } = useQuery({
    queryKey: [SUBJECTS],
    queryFn: () => getAllSubjects(),
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
        <div className="font-bold text-3xl">Subjects</div>

        <Button
          onClick={() => navigate("/subjects/add")}
          variant="contained"
          color="primary"
          size="large"
        >
          <div>Add New Subject</div>
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
                      Name
                    </th>
                    <th className="sticky top-0 px-6 py-3 text-blue-900 bg-blue-300 text-center">
                      Knowledge Level
                    </th>
                    <th className="sticky top-0 px-6 py-3 text-blue-900 bg-blue-300 text-center">
                      Number of Chapters
                    </th>
                    <th className="sticky top-0 px-6 py-3 text-blue-900 bg-blue-300 text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y bg-gray-100">
                  {subjectsData?.data?.map((subject) => (
                    <tr key={subject?.id}>
                      <td className="px-6 py-3">{subject?.id}</td>
                      <td className="px-6 py-3 text-center">{subject?.name}</td>
                      <td className="px-6 py-3 text-center">
                        {subject?.knowledgeLevel}%
                      </td>
                      <td className="px-6 py-3 text-center">
                        {subject?.numberOfChapters}
                      </td>
                      <td className="px-6 py-3 flex justify-center items-center">
                        <div className="flex flex-row justify-end items-center space-x-4">
                          <Button
                            className="w-10 h-8"
                            variant="outlined"
                            color="primary"
                            onClick={() =>
                              navigate(`/subjects/edit/${subject?.id}`)
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
                              setSelectedSubjectId(subject?.id);
                              setDeleteSubjectOpen(true);
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
        open={deleteSubjectOpen}
        setOpen={setDeleteSubjectOpen}
        deleteObjectId={selectedSubjectId}
        deleteFunction={deleteSubject}
        invalidateQuery={SUBJECTS}
      />
    </div>
  );
};

export default ViewAllSubjects;
