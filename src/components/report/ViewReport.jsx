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
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { SUBJECTS } from "../../constants";
import { getReport } from "../../constants/api/report";
import { getAllSubjects } from "../../constants/api/subject";

const ViewReport = () => {
  const [errorMsg, setErrorMsg] = useState("");

  const { isLoading, isPending, mutate, isError, data } = useMutation({
    mutationFn: ({ startDate, endDate, subjectId }) =>
      getReport(startDate, endDate, subjectId),
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
      startData: null,
      endDate: null,
      subjectId: null,
    },
    validationSchema: Yup.object({
      startData: Yup.string().required("Start date is required"),
      endDate: Yup.date().required("End date is required"),
    }),
    onSubmit: (values) => {
      mutate({
        startDate: values.startData["$d"],
        endDate: values.endDate["$d"],
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
          <div className="w-3/12">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="Start Date"
                  value={formik.values.startData}
                  onChange={(value) => formik.setFieldValue("startData", value)}
                  onBlur={formik.handleBlur}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={
                        formik.touched.startData &&
                        Boolean(formik.errors.startData)
                      }
                      helperText={
                        formik.touched.startData && formik.errors.startData
                      }
                    />
                  )}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="w-3/12">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="End Date"
                  value={formik.values.endDate}
                  onChange={(value) => formik.setFieldValue("endDate", value)}
                  onBlur={formik.handleBlur}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={
                        formik.touched.endDate && Boolean(formik.errors.endDate)
                      }
                      helperText={
                        formik.touched.endDate && formik.errors.endDate
                      }
                    />
                  )}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="w-3/12 mt-2">
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
              disabled={
                formik.values.startData === null ||
                formik.values.endDate === null
              }
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
          Note: Start Date and end Date need to be selected to generate report
        </p>
        <div className="flex flex-col rounded-md overflow-hidden mt-10">
          {data && (
            <div className="flex-grow">
              {isLoading ? (
                <div className="w-full flex items-center justify-center my-10">
                  <CircularProgress size={30} color="primary" />
                </div>
              ) : (
                <div>
                  <div className="font-bold text-xl my-3">Sessions</div>
                  <table className="relative w-full border">
                    <thead>
                      <tr>
                        <th className="sticky top-0 px-6 py-3 text-blue-900 bg-blue-300 text-center">
                          Subject
                        </th>
                        <th className="sticky top-0 px-6 py-3 text-blue-900 bg-blue-300 text-center">
                          Duration (mins)
                        </th>
                        <th className="sticky top-0 px-6 py-3 text-blue-900 bg-blue-300 text-center">
                          Created Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y bg-gray-100">
                      {data?.data?.sessions?.map((session, index) => (
                        <tr key={index}>
                          <td className="px-6 py-3 text-center">
                            {session?.subject?.name}
                          </td>
                          <td className="px-6 py-3 text-center">
                            {session?.duration}
                          </td>
                          <td className="px-6 py-3 text-center">
                            {session?.createdDate}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="font-bold text-xl mt-20 mb-3">Breaks</div>
                  <table className="relative w-full border mb-10">
                    <thead>
                      <tr>
                        <th className="sticky top-0 px-6 py-3 text-blue-900 bg-blue-300 text-center">
                          Duration (mins)
                        </th>
                        <th className="sticky top-0 px-6 py-3 text-blue-900 bg-blue-300 text-center">
                          Created Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y bg-gray-100">
                      {data?.data?.breaks?.map((breakObject, index) => (
                        <tr key={index}>
                          <td className="px-6 py-3 text-center">
                            {breakObject?.duration}
                          </td>
                          <td className="px-6 py-3 text-center">
                            {breakObject?.createdDate}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewReport;
