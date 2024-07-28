import { Button, CircularProgress, Snackbar, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { BREAKS, GET_BREAK } from "../../constants";
import { editBreak, getBreakById } from "../../constants/api/break";

const EditBreak = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading: isGetSubjectLoading, data: breakData } = useQuery({
    queryKey: [GET_BREAK],
    queryFn: () => getBreakById(id),
    enabled: !!id,
  });

  const queryClient = useQueryClient();

  const { isLoading, isPending, mutate, isError } = useMutation({
    mutationFn: ({ id, createdDate, duration }) =>
      editBreak(id, createdDate, duration),
    onSuccess: (data) => {
      queryClient.setQueryData([BREAKS, { id: data?.data?.id }], data?.data);
      navigate("/breaks");
    },
    onError: (err) => {
      setErrorMsg(err?.response?.data);
    },
  });

  const formik = useFormik({
    initialValues: {
      createdDate: dayjs(breakData?.data?.createdDate),
      duration: breakData?.data?.duration,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      createdDate: Yup.date().required("Date and Time are required"),
      duration: Yup.number()
        .min(0, "Must be greater than or equal to 0")
        .required("Duration is required"),
    }),
    onSubmit: (values) => {
      mutate({
        id,
        createdDate: values.createdDate["$d"],
        duration: values.duration,
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
                <div className="w-1/2 mt-2">
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

export default EditBreak;
