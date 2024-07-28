import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useState } from "react";
import { SUBJECTS } from "../../constants";
import { getPrediction } from "../../constants/api/prediction";
import { getAllSubjects } from "../../constants/api/subject";

const ViewPrediction = () => {
  const [errorMsg, setErrorMsg] = useState("");

  const { isLoading, isPending, mutate, isError, data } = useMutation({
    mutationFn: ({ subjectId }) => getPrediction(subjectId),
    onSuccess: () => {},
    onError: (err) => {
      setErrorMsg(err?.response?.data);
    },
  });

  const { data: subjectsData } = useQuery({
    queryKey: [SUBJECTS],
    queryFn: () => getAllSubjects(),
  });

  const formik = useFormik({
    initialValues: {
      subjectId: null,
    },
    onSubmit: (values) => {
      mutate({
        subjectId: values.subjectId,
      });
    },
  });

  return (
    <div className="w-full h-full">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isError}
        message={errorMsg}
        key={"top" + "center"}
        autoHideDuration={1200}
      />
      <div className="flex flex-row justify-between items-center">
        <div className="font-bold text-3xl">Report</div>
      </div>
      <div>
        <div className="flex space-x-3 mt-10">
          <div className="w-9/12 mt-2">
            <FormControl fullWidth>
              <InputLabel>Subject</InputLabel>
              <Select
                id="subjectId"
                name="subjectId"
                value={formik.values.subjectId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.subjectId && Boolean(formik.errors.subjectId)
                }
              >
                {subjectsData?.data?.map((subject) => (
                  <MenuItem key={subject?.id} value={subject?.id}>
                    {subject?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="w-3/12 flex justify-end mt-2">
            <Button
              onClick={formik.submitForm}
              className="w-10/12 h-14"
              variant="contained"
              disabled={formik.values.subjectId === null}
            >
              {isLoading || isPending ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Generate"
              )}
            </Button>
          </div>
        </div>
        <p className="text-yellow-600 mt-4 w-full bg-yellow-200 p-3 rounded-md">
          Note: Subject need to be selected to generate prediction
        </p>
        <div className="flex flex-col rounded-md overflow-hidden mt-10">
          {data && (
            <div className="flex-grow">
              {isLoading ? (
                <div className="w-full flex items-center justify-center my-10">
                  <CircularProgress size={30} color="primary" />
                </div>
              ) : (
                <div className="flex flex-col space-y-4 items-center">
                  <p className="text-lg w-full text-center bg-blue-300 rounded-md p-4">
                    Average Daily Study :{" "}
                    <span className="font-medium italic">
                      {data?.data?.averageDailyStudyMinutes} {" (mins)"}
                    </span>{" "}
                  </p>
                  <p className="text-lg w-full text-center bg-blue-300 rounded-md p-4">
                    Chapters Left To Cover :{" "}
                    <span className="font-medium italic">
                      {data?.data?.chaptersLeftToCover}
                    </span>{" "}
                  </p>
                  <p className="text-lg w-full text-center bg-blue-300 rounded-md p-4">
                    Predicted Knowledge Level :{" "}
                    <span className="font-medium italic">
                      {data?.data?.predictedKnowledgeLevel}
                    </span>{" "}
                  </p>
                  <p className="text-lg w-full text-center bg-blue-300 rounded-md p-4">
                    Required Daily Study Minutes :{" "}
                    <span className="font-medium italic">
                      {data?.data?.requiredDailyStudyMinutes} {" (mins)"}
                    </span>{" "}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPrediction;
