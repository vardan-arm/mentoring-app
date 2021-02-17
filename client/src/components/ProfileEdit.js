import GroupManagement from "./registration/GroupManagement";
import { useHistory } from "react-router-dom";
import {updateUser} from "../store/actions/updateUser";
import {useDispatch} from "react-redux";


const ProfileEdit = ({ match}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { userId } = match.params;

  const handleCancel = () => history.push(`/profile/${userId}`);
  const handleSubmit = () => {
    dispatch(updateUser());
  }

  return <GroupManagement
    handleBack={handleCancel}
    onSubmit={handleSubmit}
    backText={'Cancel'}
    submitText={'Submit'}
  />;
};

export default ProfileEdit;
