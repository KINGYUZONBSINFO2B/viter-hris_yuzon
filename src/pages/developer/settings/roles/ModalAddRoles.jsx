import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import * as Yup from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../../../functions/custom-hooks/queryData";
import { apiVersion } from "../../../../functions/function-general";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "../../../../store/StoreAction";
import ModalWrapperSide from "../../../../partials/modals/ModalWrapperSide";
import { FaTimes } from "react-icons/fa";
import { Form, Formik } from "formik";
import {
  InputText,
  InputTextArea,
} from "../../../../components/form-inputs/FormInputs";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";

const ModalAddRoles = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developers/settings/roles/roles.php` //update records
          : `${apiVersion}/controllers/developers/settings/roles/roles.php`, //create records
        itemEdit
          ? "put" //put if update records,
          : "post", //post if create records
        values,
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: "roles" });

      if (data.success) {
        dispatch(setSuccess(true));
        dispatch(
          setMessage(
            `successfully ${itemEdit ? "updated" : "submitted"} roles`,
          ),
        );
        dispatch(setIsAdd(false));
      }
      if (data.success === false) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });
  const initVal = {
    ...itemEdit,
    role_name: "",
    role_description: "",
  };
  const yupSchema = Yup.object({
    role_name: Yup.string().trim().required(),
  });
  const handleCLose = () => {
    dispatch(setIsAdd(false));
  };
  return (
    <>
      <ModalWrapperSide
        handleClose={handleCLose}
        className="transition-all ease-in-out transform duration-200"
      >
        {/* Value */}
        <div className="modal-header relative mb-4">
          <h3 className="text-dark text-sm ">
            {itemEdit ? "Update" : "Add"}Role
          </h3>
          <button
            type="button"
            onClick={handleCLose}
            className="absolute top-0 right-4"
          >
            <FaTimes />
          </button>
        </div>
        {/* Body */}
        <div className="modal-body">
          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              mutation.mutate(values);
            }}
          >
            {(props) => {
              return (
                <Form className="h-full">
                  <div className="modal-form-container">
                    <div className="modal-container">
                      <div className="relative mt-5 mb-6">
                        <InputText
                          label="Name"
                          name="role_name"
                          type="text"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mt-5 mb-6">
                        <InputTextArea
                          label="Description"
                          name="role_description"
                          type="text"
                          disabled={mutation.isPending || !props.dirty}
                        />
                      </div>
                    </div>
                    <div className="modal-action">
                      <button
                        type="submit"
                        disabled={mutation.isPending || !props.dirty}
                        className="btn-modal-submit"
                      >
                        {mutation.isPending ? (
                          <ButtonSpinner />
                        ) : itemEdit ? (
                          "Save"
                        ) : (
                          "Add"
                        )}
                      </button>
                      <button
                        type="reset"
                        className="btn-modal-cancel"
                        onClick={handleCLose}
                        disabled={mutation.isPending}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </ModalWrapperSide>
    </>
  );
};

export default ModalAddRoles;
