import {
  Button,
  CircularProgress,
  InputAdornment,
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
import { GET_SUBJECT, SUBJECTS } from "../../constants";
import { editSubject, getSubjectById } from "../../constants/api/subject";

const EditSubject = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading: isGetSubjectLoading, data: subjectData } = useQuery({
    queryKey: [GET_SUBJECT],
    queryFn: () => getSubjectById(id),
    enabled: !!id,
  });

  const queryClient = useQueryClient();

  const { isLoading, isPending, mutate, isError } = useMutation({
    mutationFn: ({
      id,
      name,
      knowledgeLevel,
      numberOfChapters,
      numberOfChaptersCovered,
      deadline,
    }) =>
      editSubject(
        id,
        name,
        knowledgeLevel,
        numberOfChapters,
        numberOfChaptersCovered,
        deadline
      ),
    onSuccess: (data) => {
      queryClient.setQueryData([SUBJECTS, { id: data?.data?.id }], data?.data);
      navigate("/subjects");
    },
    onError: (err) => {
      setErrorMsg(err?.response?.data);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: subjectData?.data?.name,
      knowledgeLevel: subjectData?.data?.knowledgeLevel,
      dateTime: dayjs(subjectData?.data?.deadline),
      chaptersAvailable: subjectData?.data?.numberOfChapters,
      chaptersCovered: subjectData?.data?.numberOfChaptersCovered,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      knowledgeLevel: Yup.number()
        .min(0, "Must be greater than or equal to 0")
        .max(100, "Must be less than or equal to 100")
        .required("Knowledge Level is required"),
      dateTime: Yup.date().required("Date and Time are required"),
      chaptersAvailable: Yup.number()
        .min(0, "Must be greater than or equal to 0")
        .required("Number of Chapters Available is required"),
      chaptersCovered: Yup.number()
        .min(0, "Must be greater than or equal to 0")
        .required("Number of Chapters Covered is required"),
    }),
    onSubmit: (values) => {
      mutate({
        id,
        name: values.name,
        knowledgeLevel: values.knowledgeLevel,
        numberOfChapters: values.chaptersAvailable,
        numberOfChaptersCovered: values.chaptersCovered,
        deadline: values.dateTime["$d"],
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
        <div className="font-bold text-3xl">Edit Subject</div>
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
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="Name"
                    color="primary"
                    size="medium"
                    fullWidth
                    value={formik.values.name || subjectData?.data?.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </div>
                <div className="w-1/2">
                  <TextField
                    id="knowledgeLevel"
                    name="knowledgeLevel"
                    label="Knowledge Level"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">%</InputAdornment>
                      ),
                    }}
                    fullWidth
                    value={
                      formik.values.knowledgeLevel ||
                      subjectData?.data?.knowledgeLevel
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.knowledgeLevel &&
                      Boolean(formik.errors.knowledgeLevel)
                    }
                    helperText={
                      formik.touched.knowledgeLevel &&
                      formik.errors.knowledgeLevel
                    }
                  />
                </div>
              </div>
              <div className="mt-10">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      label="Basic date time picker"
                      value={
                        formik.values.dateTime ||
                        dayjs(subjectData?.data?.deadline)
                      }
                      onChange={(value) =>
                        formik.setFieldValue("dateTime", value)
                      }
                      onBlur={formik.handleBlur}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={
                            formik.touched.dateTime &&
                            Boolean(formik.errors.dateTime)
                          }
                          helperText={
                            formik.touched.dateTime && formik.errors.dateTime
                          }
                        />
                      )}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="flex space-x-5 justify-between w-full mt-10">
                <div className="w-1/2">
                  <TextField
                    id="chaptersAvailable"
                    name="chaptersAvailable"
                    label="Number of Chapters Available"
                    fullWidth
                    value={
                      formik.values.chaptersAvailable ||
                      subjectData?.data?.numberOfChapters
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.chaptersAvailable &&
                      Boolean(formik.errors.chaptersAvailable)
                    }
                    helperText={
                      formik.touched.chaptersAvailable &&
                      formik.errors.chaptersAvailable
                    }
                  />
                </div>
                <div className="w-1/2">
                  <TextField
                    id="chaptersCovered"
                    name="chaptersCovered"
                    label="Number of Chapters Covered"
                    fullWidth
                    value={
                      formik.values.chaptersCovered ||
                      subjectData?.data?.numberOfChaptersCovered
                    }
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
                " Edit Subject"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditSubject;
