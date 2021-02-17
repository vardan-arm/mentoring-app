import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserData } from "../store/actions/fetchUserData";

const Profile = ({ match }) => {
  const dispatch = useDispatch();
  const { userId } = match.params;

  useEffect(() => {
    dispatch(fetchUserData(userId));
  }, []);

  return <div>Profile page for user {userId}</div>;
};

export default Profile;
