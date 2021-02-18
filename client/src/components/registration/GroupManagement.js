import { useForm, Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";
import WizardButtonsContainer from "../common/WizardButtonsContainer";
import { makeStyles } from "@material-ui/core/styles";
import formSlice from "../../store/form";
import { useDispatch, useSelector } from "react-redux";
import WizardStepContainer from "../common/WizardStepContainer";
import React, { useState, useEffect } from "react";
import { fetchAllEmployees } from "../../store/actions/fetchAllEmployees";
import { getAllEmployees } from "../../store/selectors/general";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getForm, getUserGroup } from "../../store/selectors/form";
import { MAX_ALLOWED_USERS_IN_GROUP } from "../../utils/constants";
import { registerUser } from "../../store/actions/registerUser";
import {getUser} from "../../store/selectors/user";

const useStyles = makeStyles({
  nextBtn: {
    position: "absolute",
    right: 12,
  },
  usersContainer: {
    minHeight: 100,
    minWidth: 500,
    border: "#c5cbd0 1px solid",
    marginRight: 32,
    borderRadius: 20,
  },
  dndContainer: {
    display: "flex",
    marginLeft: 16,
  },
  list: {
    padding: 8,
    width: 250,
  },
  groupedUsersList: {
    background: "#e5f9e0",
  },
  allUserList: {
    background: "#fbf7db",
  },
  listDraggingOver: {
    background: "#cbf3c1",
  },
});

// const GroupManagement = ({ handleBack, handleNext }) => {
const GroupManagement = ({ handleBack, onSubmit, backText, submitText }) => {
  const { handleSubmit, errors } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, []);

  const userInfo = useSelector((state) => getUser(state));

  useEffect(() => {
    // In edit profile mode, store user's groups in Store's `form` to have consistency with registration mode
    if (userInfo.id) {
      dispatch(formSlice.actions.updateData({ group: userInfo.group }));
    }
  }, [userInfo.group]);

  const existingFormData = useSelector((state) => getForm(state));
  // const groupedEmployees = useSelector((state) => getUserGroup(state));
  const groupedEmployeesFromFormData = useSelector((state) => getUserGroup(state));

  // If user is logged in (i.e., he edits previously saved list), get his groups from corresponding reducer.
  // Otherwise, this is a registration page, therefore show him all groups (from selector).
  const groupedEmployees = userInfo.id ? userInfo.group : groupedEmployeesFromFormData;

  const allEmployees = useSelector((state) => getAllEmployees(state));

  const [localGroupedEmployees, setLocalGroupedEmployees] = useState([]);
  const [localAllEmployees, setLocalAllEmployees] = useState([]);

  useEffect(() => {
    const groupedEmployeesIds = groupedEmployees.map((grpEmpl) => grpEmpl.id);
    // Remove all the employees coming from Redux from already grouped ones
    const filteredAllEmployees = allEmployees.filter(
      (employee) =>
        !groupedEmployeesIds.includes(employee.id) &&
        employee.email !== existingFormData.email
    );

    setLocalGroupedEmployees(groupedEmployees);
    setLocalAllEmployees(filteredAllEmployees);

    console.log("in effect", groupedEmployees);
  }, [allEmployees, groupedEmployees]);

  // console.log({ groupedEmployees });
  // console.log({ allEmployees });

  /*const onSubmit = (data) => {
    // dispatch(userSlice.actions.updateInfo(data));
    // handleNext();

    dispatch(saveUserData());
  };*/

  // TODO: seems this is useful for both frontend validation and handling errors coming from backend:
  //  https://medium.com/@andresss/using-material-ui-with-react-hook-form-is-this-simple-d8383941fafe

  /*
   * DnD stuff
   * */

  const getList = (id) =>
    id === "groupedEmployees" ? localGroupedEmployees : localAllEmployees;

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      if (source.droppableId === "allEmployees") {
        setLocalAllEmployees(items);
      } else {
        setLocalGroupedEmployees(items);

        // store changes in Redux
        dispatch(formSlice.actions.updateData({ group: items }));
      }
    } else {
      // Don't let adding more than allowed users in one group
      if (
        source.droppableId === "allEmployees" &&
        destination.droppableId === "groupedEmployees" &&
        localGroupedEmployees.length >= MAX_ALLOWED_USERS_IN_GROUP
      ) {
        return;
      }

      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      setLocalGroupedEmployees(result.groupedEmployees);
      setLocalAllEmployees(result.allEmployees);

      // store changes in Redux
      dispatch(
        formSlice.actions.updateData({ group: result.groupedEmployees })
      );
    }
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 16,
    margin: `0 0 8px 0`,
    color: "white",
    borderRadius: 20,

    // change background colour if dragging
    background: isDragging ? "#30969a" : "#136467",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  /**
   * Moves an item from one list to another list.
   */
  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const classes = useStyles();

  return (
    <>
      <WizardStepContainer title={"Create Group"}>
        <div className={classes.dndContainer}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="groupedEmployees">
              {(provided, snapshot) => {
                const extraClass = snapshot.isDraggingOver
                  ? classes.listDraggingOver
                  : "";

                return (
                  <div
                    ref={provided.innerRef}
                    className={`${classes.usersContainer} ${classes.list} ${classes.groupedUsersList} ${extraClass}`}
                  >
                    {localGroupedEmployees.map((item, index) => {
                      return (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              {item.first_name} {item.last_name}, {item.email}
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
            <Droppable droppableId="allEmployees">
              {(provided, snapshot) => {
                const extraClass = snapshot.isDraggingOver
                  ? classes.listDraggingOver
                  : "";

                return (
                  <div
                    ref={provided.innerRef}
                    className={`${classes.usersContainer} ${classes.list} ${classes.allUserList} ${extraClass}`}
                  >
                    {localAllEmployees.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            {item.first_name} {item.last_name}, {item.email}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </DragDropContext>
        </div>

        <WizardButtonsContainer>
          <Button variant="contained" color="primary" onClick={handleBack}>
            {backText}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            {submitText}
          </Button>
        </WizardButtonsContainer>
      </WizardStepContainer>
    </>
  );
};

export default GroupManagement;
