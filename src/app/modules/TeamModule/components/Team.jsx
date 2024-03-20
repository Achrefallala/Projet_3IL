import "./Team.css";
import { useState, useEffect } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensors,
  useSensor,
  DragOverlay,
  pointerWithin
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSwappingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import SortableUser from "./SortableUser";
import AddPlayerModal from "./AddPlayerModal"
import { Container, Row, Col, Button } from 'react-bootstrap';
import { fetchSubtitutes, setSubtitutes } from "../../../../redux/slices/subtitutesSlice";
import { useDispatch, useSelector } from "react-redux";
import { getPlayers } from "../../../../services/PlayerService";




const Team = () => {


  const [users, setUsers] = useState(() => {
    const data = [];
    for (let i = 1; i < 27; i++) {
      data.push({ _id: -i, playerNumber: -i });
    }
    return data;
  });
  const [activeId, setActiveId] = useState(null);
  const [showAddPlayer, setShowAddPlayer] = useState(false);


  const subtitutes = useSelector((state) => state.subtitutes.subtitutes);
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(fetchSubtitutes());
  }, [dispatch]);


  const handleShowModal = () => setShowAddPlayer(true);
  const handleCloseModal = () => setShowAddPlayer(false);

  const onDragEnd = async (event) => {

    const { active, over } = event;
    console.log("active id ", active, " over id ", over);
    if (!over?.id || active.id === over.id) {
      return;
    }

    const fromUsers = users.find(user => user._id === active.id);
    const toUsers = users.find(user => user._id === over.id);


    const fromSubtitutes = subtitutes.find(user => user._id === active.id);
    const toSubtitutes = subtitutes.find(user => user._id === over.id);

    console.log("fromUsers ", fromUsers)
    console.log("toUsers ", toUsers)
    console.log("fromSubtitutes ", fromSubtitutes)
    console.log("toSubtitutes ", toSubtitutes)

    if (fromUsers && toUsers) {
      console.log("here nigga");
      const oldIndex = users.findIndex((user) => user._id === active.id);
      const newIndex = users.findIndex((user) => {

        console.log(`user._id: ${user._id}  over.id: ${over.id} equal : ${over.id == user._id}`, user._id === over.id)
        return user._id === over.id;
      });

      console.log("new index ", newIndex, " oldIndex ", oldIndex);
      console.log("new and operator ", newIndex + 1 && oldIndex + 1);

      if (newIndex + 1 && oldIndex + 1) {

        console.log("oldIndex ", oldIndex)
        console.log("newIndex ", newIndex)

        console.log("subtitutes before ", subtitutes)
        setUsers((users) => {

          const arr = [...users]
          const temp = arr[oldIndex]
          arr[oldIndex] = arr[newIndex]
          arr[newIndex] = temp
          return arr
          //return arrayMove(users, oldIndex, newIndex);
        });
      } else
        console.log("something wrong nigga");
    }
    else if (fromSubtitutes && toSubtitutes) {

      const oldIndex = subtitutes.findIndex((user) => user._id === active.id);
      const newIndex = subtitutes.findIndex((user) => user._id === over.id);

      console.log("oldIndex ", oldIndex)
      console.log("newIndex ", newIndex)

      console.log("subtitutes before ", subtitutes)
      const arr = [...subtitutes]
      const temp = arr[oldIndex]
      arr[oldIndex] = arr[newIndex]
      arr[newIndex] = temp
      console.log("subtitutes after swap ", subtitutes)
      dispatch(setSubtitutes(arr));


    }
    else if (fromUsers && toSubtitutes) {


      const oldIndex = users.findIndex((user) => user._id === active.id);
      const newIndex = subtitutes.findIndex((user) => user._id === over.id);

      console.log("oldIndex ", oldIndex)
      console.log("newIndex ", newIndex)

      const usersCopy = [...users]
      const subtitutesCopy = [...subtitutes]

      const temp = usersCopy[oldIndex]
      usersCopy[oldIndex] = subtitutesCopy[newIndex]
      subtitutesCopy[newIndex] = temp

      setUsers(usersCopy)

      dispatch(
        setSubtitutes(
          sortSubtitutes(subtitutesCopy)
        )
      );

    }
    else if (fromSubtitutes && toUsers) {

      if (users.filter(u => u.avatar != null).length >= 11)
        return;
      const oldIndex = subtitutes.findIndex((user) => user._id === active.id);
      const newIndex = users.findIndex((user) => user._id === over.id);

      console.log("oldIndex ", oldIndex)
      console.log("newIndex ", newIndex)

      const usersCopy = [...users]
      const subtitutesCopy = [...subtitutes]

      const temp = subtitutesCopy[oldIndex]
      subtitutesCopy[oldIndex] = usersCopy[newIndex]
      usersCopy[newIndex] = temp

      setUsers(usersCopy)

      dispatch(
        setSubtitutes(
          sortSubtitutes(subtitutesCopy)
        )
      );
    }
  };


  const sortSubtitutes = (subtitutes) => {
    return subtitutes.sort((a, b) => {
      if (a.playerNumber > 0 && b.playerNumber < 0) {
        return -1;
      } else if (a.playerNumber < 0 && b.playerNumber > 0) {
        return 1;
      } else {
        return 0;
      }
    });
  }



  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor),

  )

  const handleDragStart = ({ active }) => {
    setActiveId(active.id);
  };



  return (
    <div className="users"
      style={{
        height: "fit-content",
        width: "fit-content",
        zIndex: "999 !important",
      }} >

      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragEnd={onDragEnd}
        onDragStart={handleDragStart}
      >
        <SortableContext
          items={[users]}
          // items={[...users, ...subtitutes.subtitutes]}
          strategy={rectSwappingStrategy}
        >
          <Container>

            <Row
              style={{
                width: "1000px",
                height: "1200px",
                backgroundImage: "url('../../../images/stadium.png')",
                backgroundSize: "cover", // Cover the entire div
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >

              {users.map((user, index) => (
                <SortableUser
                  key={Math.random()}
                  user={user}
                  type="player"
                  onMouseDown={() => console.log("clicked")}
                  onClick={() => alert(`Player clicked: ${user.playerNumber}`)}
                />
              ))}
            </Row>

            <Container fluid style={{ position: 'fixed', right: 0, top: "10%", bottom: 0, width: '250px' }}>

              <Row>

                <Col className="bg-dark" style={{
                  height: "100vh",
                  width: "250px",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}>



                  <Button className="col-12 my-3 glow-button" onClick={handleShowModal}>
                    {/* <Button className="col-12 my-3 glow-button" onClick={async () => {
                    dispatch(setSubtitutes([]));
                  }}>*/}
                    Add player +
                  </Button>


                  <AddPlayerModal addPlayerToSubtitutes={() => console.log("added")} showAddPlayer={showAddPlayer} handleCloseModal={handleCloseModal} />

                  {Array.isArray(subtitutes) && subtitutes.length > 0 && subtitutes.map((subtitute) => (
                    // <h1 className="text-white" key={Math.random()}>{JSON.stringify(subtitute)}</h1>
                    <SortableUser key={subtitute._id} user={subtitute} type="subtitute" onClick={() => console.log("clicked")} />
                  ))}


                </Col>
              </Row>
            </Container>
            {/* </Row> */}
          </Container>
        </SortableContext>

        <DragOverlay>
          <div className="position-relative">
            {activeId ? (
              <div

                className="border rounded p-2 bg-light" // Add Bootstrap classes for border, rounded corners, padding, and light background
              >
                <img className="img-fluid" src="https://static-00.iconduck.com/assets.00/drag-icon-2048x2048-l70ogpuu.png" alt="" />
              </div>
            ) : null}
          </div>
        </DragOverlay>

      </DndContext>
    </div>




  );
};
export default Team;















// const handleDragMove = (event) => {
//   const { active, over } = event;
//   console.log("active id ", active.id, " over id ", over.id);
// };



// const handleDragEnd = () => {
//   setActiveId(null);
// };
