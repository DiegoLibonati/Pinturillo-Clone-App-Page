import React, { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm: any = {}, formValidations: any = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      // @ts-ignore:next-line
      if (formValidation[formValue] !== null) {
        return false;
      }
    }
    return true;
  }, [formValidation]);

  const createValidators = () => {
    const formCheckedValues = {};

    for (const formField of Object.keys(formValidations)) {
      for (const tupla in formValidations[formField]) {
        const [fn, errorMessage] = formValidations[formField][tupla];
        // @ts-ignore:next-line
        formCheckedValues[`${formField}Valid`] = fn(formState[formField])
          ? null
          : errorMessage;

        if (!fn(formState[formField])) break;
      }
    }
    setFormValidation(formCheckedValues);
  };

  useEffect(() => {
    createValidators();
    // eslint-disable-next-line
  }, [formState]);

  return {
    ...formState,
    ...formValidation,
    isFormValid,
    formState,
    onInputChange,
    onResetForm,
  };
};
