import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { fetchUserData } from "../store/actions/fetchUserData";
import {getUser} from "../store/selectors/user";
import {Link} from "react-router-dom";

// const Profile = ({ match }) => {
const Profile = () => {
  // const { userId } = match.params;

  /*useEffect(() => {
    dispatch(fetchUserData(userId));
  }, []);*/

  const userData = useSelector(state => getUser(state));

  return <div>
    <h2>Hi, {userData.first_name}!</h2>
    <div>Want to check your <Link to={`/profile/${userData.id}/manage`}>list</Link>?</div>
  </div>;
};

export default Profile;
