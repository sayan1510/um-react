import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, editUser } from "../redux/Store";
import { v4 as uuidv4 } from 'uuid';

export const useFormState = () => {
  const { id } = useParams();
  const existingUser = useSelector((state) =>
    state.users.length && state.users.find((user) => user.id === id)
  ) || {};

  const [formData, setFormData] = useState({
    fullName: existingUser.fullName || "",
    age: existingUser.age || "",
    email: existingUser.email || "",
    phone: existingUser.phone || "",
    image: existingUser.image || "",
  });

  return { formData, setFormData, existingUser };
};

export const useFormSubmit = (formData, existingUser) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (existingUser.id) {
      dispatch(editUser({ ...formData, id: existingUser.id }));
    } else {
      dispatch(addUser({ ...formData, id: uuidv4() }));
    }
    navigate("/");
  };

  return handleSubmit;
};

export const useSubmitButtonState = (formData, existingUser) => {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    if (existingUser.id) {
      const isUnchanged = Object.keys(formData).every(
        (key) => formData[key] === (existingUser[key] || "")
      );
      setIsSubmitDisabled(isUnchanged);
    } else {
      const isEmptyField = Object.values(formData).some(
        (value) => value === ""
      );
      setIsSubmitDisabled(isEmptyField);
    }
  }, [formData, existingUser]);

  return isSubmitDisabled;
};
