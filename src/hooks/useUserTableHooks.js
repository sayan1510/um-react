import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, fetchUsers } from "../redux/Store";

export const useFetchUsers = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchUsers("http://localhost:3001/users")
    );
  }, [dispatch]);

  return users;
};

export const useUserNavigation = () => {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/user-form");
  };

  const handleEdit = (user) => {
    navigate(`/user-form/${user.id}`);
  };

  return { handleAdd, handleEdit };
};

export const useUserDeletion = () => {
  const dispatch = useDispatch();

  const handleDelete = (user) => {
    dispatch(deleteUser(user));
  };

  return handleDelete;
};
