import { useSelector } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { getUser, getUserGroup } from "../store/selectors/user";
import { Link } from "react-router-dom";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  listContainer: {
    margin: "16px 0",
    border: "1px solid gray",
    width: "max-content",
  },
});

const Profile = () => {
  const userData = useSelector((state) => getUser(state));
  const userGroup = useSelector((state) => getUserGroup(state));

  const classes = useStyles();

  return (
    <div>
      <h2>Hi, {userData.first_name}!</h2>

      {userGroup.length > 0 && (
        <>
          <div>Here is your list</div>
          <div className={classes.listContainer}>
            <List component="nav" aria-label="secondary mailbox folders">
              {userGroup.map((group) => (
                <>
                  <ListItem button>
                    <ListItemText
                      primary={`${group.first_name} ${group.last_name}, ${group.email}`}
                    />
                  </ListItem>
                </>
              ))}
            </List>
          </div>
        </>
      )}
      <div>
        Want to{" "}
        <Link to={`/profile/${userData.id}/manage`}>
          change {userGroup.length > 0 ? "it" : "your list"}
        </Link>
        ?
      </div>
    </div>
  );
};

export default Profile;
