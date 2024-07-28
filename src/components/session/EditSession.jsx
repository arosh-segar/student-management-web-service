import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { GET_SESSION, SESSIONS, SUBJECTS } from "../../constants";
import { editSession, getSessionById } from "../../constants/api/session";
import { getAllSubjects } from "../../constants/api/subject";

const EditSession = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading: isGetSubjectLoading, data: sessionData } = useQuery({
    queryKey: [GET_SESSION],
    queryFn: () => getSessionById(id),
    enabled: !!id,
  });

  const { isLoading: isSubjectsLoading, data: subjectsData } = useQuery({
    queryKey: [SUBJECTS],
    queryFn: () => getAllSubjects(),
  });

  const queryClient = useQueryClient();

  const { isLoading, isPending, mutate, isError } = useMutation({
    mutationFn: ({ id, subjectId, createdDate, duration, chaptersCovered }) =>
      editSession(id, subjectId, createdDate, duration, chaptersCovered),
    onSuccess: (data) => {
      queryClient.setQueryData([SESSIONS, { id: data?.data?.id }], data?.data);
      navigate("/sessions");
    },
    onError: (err) => {
      setErrorMsg(err?.response?.data);
    },
  });

  const formik = useFormik({
    initialValues: {
      subjectId: sessionData?.data?.subjectId,
      createdDate: dayjs(sessionData?.data?.createdDate),
      duration: sessionData?.data?.duration,
      chaptersCovered: sessionData?.data?.chaptersCovered,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      subjectId: Yup.string().required("Subject is required"),
      createdDate: Yup.date().required("Date and Time are required"),
      duration: Yup.number()
        .min(0, "Must be greater than or equal to 0")
        .required("Duration is required"),
      chaptersCovered: Yup.number()
        .min(0, "Must be greater than or equal to 0")
        .required("Number of Chapters Covered is required"),
    }),
    onSubmit: (values) => {
      mutate({
        id,
        subjectId: values.subjectId,
        createdDate: values.createdDate["$d"],
        duration: values.duration,
        chaptersCovered: values.chaptersCovered,
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
        <div className="font-bold text-3xl">Edit Session</div>
      </div>
      {isGetSubjectLoading ? (
        <div className="w-full flex justify-center items-center my-20">
          <CircularProgress size={50} color="primary" />
        </div>
      ) : (
        <div className="h-full flex flex-col justify-between">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <div className="flex space-x-5 justify-between w-full mt-20">
                <div className="w-1/2">
                  {isSubjectsLoading ? (
                    <CircularProgress size={30} color="primary" />
                  ) : (
                    <div className="mt-[7px]">
                      <FormControl fullWidth>
                        <InputLabel>Subject</InputLabel>
                        <Select
                          id="subjectId"
                          name="subjectId"
                          value={
                            formik.values.subjectId ||
                            sessionData?.data?.subjectId
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.subjectId &&
                            Boolean(formik.errors.subjectId)
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
                  )}
                </div>
                <div className="w-1/2">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        label="Date and Time"
                        value={formik.values.createdDate}
                        onChange={(value) =>
                          formik.setFieldValue("createdDate", value)
                        }
                        onBlur={formik.handleBlur}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={
                              formik.touched.createdDate &&
                              Boolean(formik.errors.createdDate)
                            }
                            helperText={
                              formik.touched.createdDate &&
                              formik.errors.createdDate
                            }
                          />
                        )}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>
              <div className="flex space-x-5 justify-between w-full mt-10">
                <div className="w-1/2">
                  <TextField
                    id="duration"
                    name="duration"
                    label="Duration"
                    fullWidth
                    value={formik.values.duration}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.duration && Boolean(formik.errors.duration)
                    }
                    helperText={
                      formik.touched.duration && formik.errors.duration
                    }
                  />
                </div>
                <div className="w-1/2">
                  <TextField
                    id="chaptersCovered"
                    name="chaptersCovered"
                    label="Number of Chapters Covered"
                    fullWidth
                    value={formik.values.chaptersCovered}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.chaptersCovered &&
                      Boolean(formik.errors.chaptersCovered)
                    }
                    helperText={
                      formik.touched.chaptersCovered &&
                      formik.errors.chaptersCovered
                    }
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="flex w-full justify-end pb-5">
            <Button
              size="large"
              variant="contained"
              color="primary"
              type="submit"
              onClick={formik.handleSubmit}
            >
              {isLoading || isPending ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                " Edit Session"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditSession;
