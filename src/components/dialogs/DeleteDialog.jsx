/* eslint-disable react/prop-types */
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const ResponsiveDialog = ({
  open,
  setOpen,
  deleteObjectId,
  deleteFunction,
  invalidateQuery,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const queryClient = useQueryClient();

  const { isLoading, isPending, mutate } = useMutation({
    mutationFn: ({ id }) => deleteFunction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [invalidateQuery] });
      handleClose();
    },
  });

  const handleSubmit = () => {
    mutate({ id: deleteObjectId });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSubmit} autoFocus>
            {isLoading || isPending ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Yes"
            )}
          </Button>
          <Button
            variant="outlined"
            color="error"
            autoFocus
            onClick={handleClose}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
