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

import { useDispatch, useSelector } from "react-redux";
import { getPlayers } from "../../../../services/PlayerService";
import { selectTeamReducer } from "../../../../redux/slices/teamsSlice";
import { setPopulatedTeams } from "../../../../redux/slices/teamsSlice";





const Team = () => {



  const [activeId, setActiveId] = useState(null);
  const [showAddPlayer, setShowAddPlayer] = useState(false);


  const selectedTeam = useSelector((state) => state.teams.selectedTeam);
  const teams = useSelector((state) => state.teams.teams);
  const dispatch = useDispatch();






  const handleShowModal = () => setShowAddPlayer(true);
  const handleCloseModal = () => setShowAddPlayer(false);



  // useEffect(() => {

  //   console.log("selected team ", selectedTeam);
  //   console.log("selected team ", teams);
  //   const teamsCopy = [...teams];

  //   teamsCopy[teamsCopy.findIndex(team => team.name === selectedTeam.name)] = selectedTeam;
  //   console.log("teams copy ", teamsCopy);
  //   dispatch(setPopulatedTeams(teamsCopy));
  // }, [selectedTeam]);




  const onDragEnd = async (event) => {
    const { active, over } = event;
    if (!over?.id || active.id === over.id) {
      return;
    }
    const subtitutes = selectedTeam.subtitutes;
    const players = selectedTeam.players;

    const fromPlayers = players.find(player => player._id === active.id);
    const toPlayers = players.find(player => player._id === over.id);

    const fromSubtitutes = subtitutes.find(player => player._id === active.id);
    const toSubtitutes = subtitutes.find(player => player._id === over.id);

    if (fromPlayers && toPlayers) {
      const oldIndex = players.findIndex((player) => player._id === active.id);
      const newIndex = players.findIndex((player) => player._id === over.id);


      if (newIndex !== -1 && oldIndex !== -1) {

        const arr = [...players]
        const temp = arr[oldIndex]
        arr[oldIndex] = arr[newIndex]
        arr[newIndex] = temp

        dispatch(selectTeamReducer({
          ...selectedTeam,
          players: arr
        }));


      }
    }
    else if (fromSubtitutes && toSubtitutes) {
      const oldIndex = subtitutes.findIndex((player) => player._id === active.id);
      const newIndex = subtitutes.findIndex((player) => player._id === over.id);

      const arr = [...subtitutes]
      const temp = arr[oldIndex]
      arr[oldIndex] = arr[newIndex]
      arr[newIndex] = temp
      dispatch(selectTeamReducer({
        ...selectedTeam,
        subtitutes: sortSubtitutes(arr)
      }));
    }
    else if (fromPlayers && toSubtitutes) {
      const oldIndex = players.findIndex((player) => player._id === active.id);
      const newIndex = subtitutes.findIndex((player) => player._id === over.id);

      const playersCopy = [...players]
      const subtitutesCopy = [...subtitutes]

      const temp = playersCopy[oldIndex]
      playersCopy[oldIndex] = subtitutesCopy[newIndex]
      subtitutesCopy[newIndex] = temp


      dispatch(selectTeamReducer({
        ...selectedTeam,
        subtitutes: sortSubtitutes(subtitutesCopy),
        players: playersCopy
      }));
    }
    else if (fromSubtitutes && toPlayers) {

      if (players.filter(u => u.avatar != null).length >= 11) {
        return;
      }
      const oldIndex = subtitutes.findIndex((player) => player._id === active.id);
      const newIndex = players.findIndex((player) => player._id === over.id);

      const playersCopy = [...players]
      const subtitutesCopy = [...subtitutes]

      const temp = subtitutesCopy[oldIndex]
      subtitutesCopy[oldIndex] = playersCopy[newIndex]
      playersCopy[newIndex] = temp



      dispatch(selectTeamReducer({
        ...selectedTeam,
        subtitutes: sortSubtitutes(subtitutesCopy),
        players: playersCopy
      }));


      const teamsCopy = [...teams];
      console.log("teams before change ", teamsCopy);

      teamsCopy.forEach((team) => {
        if (team.name === selectedTeam.name) {
          console.log("here team found ", team.name, " ", selectedTeam.name);
          console.log("team perfect ",
            {
              ...selectedTeam,
              subtitutes: subtitutesCopy,
              players: playersCopy
            }
          );
          return {
            ...selectedTeam,
            subtitutes: subtitutesCopy,
            players: playersCopy
          };
        }


        return team;
      })


      console.log("teams after change ", teamsCopy);


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
          items={[selectedTeam.players]}
          strategy={rectSwappingStrategy}
        >
          <Container>

            <Row
              style={{
                width: "1000px",
                height: "1200px",
                backgroundImage: "url('images/stadium.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >

              {/* {selectedTeam?.players.map((player, index) => (
                <SortableUser
                  key={index}
                  user={player}
                  type="player"
                  onMouseDown={() => console.log("clicked")}
                  onClick={() => alert(`Player clicked: ${player.playerNumber}`)}
                />
              ))} */}
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
                    Add player +
                  </Button>


                  <AddPlayerModal addPlayerToSubtitutes={() => console.log("added")} showAddPlayer={showAddPlayer} handleCloseModal={handleCloseModal} />
                  {/* 
                  {Array.isArray(selectedTeam?.subtitutes) && selectedTeam?.subtitutes.length > 0 && selectedTeam?.subtitutes.map((subtitute) => (
                    <SortableUser key={subtitute._id} user={subtitute} type="subtitute" />
                  ))} */}

                </Col>
              </Row>
            </Container>

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



// import "./Team.css";
// import { useState, useEffect } from "react";
// import {
//   DndContext,
//   KeyboardSensor,
//   PointerSensor,
//   TouchSensor,
//   useSensors,
//   useSensor,
//   DragOverlay,
//   pointerWithin
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   rectSwappingStrategy,
//   sortableKeyboardCoordinates,
// } from "@dnd-kit/sortable";
// import SortableUser from "./SortableUser";
// import AddPlayerModal from "./AddPlayerModal"
// import { Container, Row, Col, Button } from 'react-bootstrap';

// import { useDispatch, useSelector } from "react-redux";
// import { getPlayers } from "../../../../services/PlayerService";
// import { selectTeamReducer, setPopulatedTeams } from "../../../../redux/slices/teamsSlice";




// const Team = () => {



//   const [activeId, setActiveId] = useState(null);
//   const [showAddPlayer, setShowAddPlayer] = useState(false);


//   const selectedTeam = useSelector((state) => state.teams.selectedTeam);
//   const teams = useSelector((state) => state.teams.teams);

//   const dispatch = useDispatch();






//   const handleShowModal = () => setShowAddPlayer(true);
//   const handleCloseModal = () => setShowAddPlayer(false);

//   const onDragEnd = async (event) => {
//     const { active, over } = event;
//     if (!over?.id || active.id === over.id) {
//       return;
//     }
//     const subtitutes = selectedTeam.subtitutes;
//     const players = selectedTeam.players;

//     const fromPlayers = players.find(player => player._id === active.id);
//     const toPlayers = players.find(player => player._id === over.id);

//     const fromSubtitutes = subtitutes.find(player => player._id === active.id);
//     const toSubtitutes = subtitutes.find(player => player._id === over.id);

//     if (fromPlayers && toPlayers) {
//       const oldIndex = players.findIndex((player) => player._id === active.id);
//       const newIndex = players.findIndex((player) => player._id === over.id);


//       if (newIndex !== -1 && oldIndex !== -1) {

//         const arr = [...players]
//         const temp = arr[oldIndex]
//         arr[oldIndex] = arr[newIndex]
//         arr[newIndex] = temp

//         dispatch(selectTeamReducer({
//           ...selectedTeam,
//           players: arr
//         }));

//         const teamsCopy = [...teams];
//         teamsCopy[teamsCopy.findIndex(team => team.name === selectedTeam.name)] = { ...selectedTeam };

//         dispatch(setPopulatedTeams(teamsCopy));

//       }
//     }
//     else if (fromSubtitutes && toSubtitutes) {
//       const oldIndex = subtitutes.findIndex((player) => player._id === active.id);
//       const newIndex = subtitutes.findIndex((player) => player._id === over.id);

//       const arr = [...subtitutes]
//       const temp = arr[oldIndex]
//       arr[oldIndex] = arr[newIndex]
//       arr[newIndex] = temp
//       dispatch(selectTeamReducer({
//         ...selectedTeam,
//         subtitutes: sortSubtitutes(arr)
//       }));

//       const teamsCopy = [...teams];
//       teamsCopy[teamsCopy.findIndex(team => team.name === selectedTeam.name)] = { ...selectedTeam };

//       dispatch(setPopulatedTeams(teamsCopy));

//     }
//     else if (fromPlayers && toSubtitutes) {
//       const oldIndex = players.findIndex((player) => player._id === active.id);
//       const newIndex = subtitutes.findIndex((player) => player._id === over.id);

//       const playersCopy = [...players]
//       const subtitutesCopy = [...subtitutes]

//       const temp = playersCopy[oldIndex]
//       playersCopy[oldIndex] = subtitutesCopy[newIndex]
//       subtitutesCopy[newIndex] = temp


//       dispatch(selectTeamReducer({
//         ...selectedTeam,
//         subtitutes: sortSubtitutes(subtitutesCopy),
//         players: playersCopy
//       }));

//       const teamsCopy = [...teams];
//       teamsCopy[teamsCopy.findIndex(team => team.name === selectedTeam.name)] = { ...selectedTeam };

//       dispatch(setPopulatedTeams(teamsCopy));
//     }
//     else if (fromSubtitutes && toPlayers) {

//       if (players.filter(u => u.avatar != null).length >= 11) {
//         return;
//       }
//       const oldIndex = subtitutes.findIndex((player) => player._id === active.id);
//       const newIndex = players.findIndex((player) => player._id === over.id);

//       const playersCopy = [...players]
//       const subtitutesCopy = [...subtitutes]

//       const temp = subtitutesCopy[oldIndex]
//       subtitutesCopy[oldIndex] = playersCopy[newIndex]
//       playersCopy[newIndex] = temp



//       dispatch(selectTeamReducer({
//         ...selectedTeam,
//         subtitutes: sortSubtitutes(subtitutesCopy),
//         players: playersCopy
//       }));

//       const teamsCopy = [...teams];
//       teamsCopy[teamsCopy.findIndex(team => team.name === selectedTeam.name)] = { ...selectedTeam };

//       dispatch(setPopulatedTeams(teamsCopy));
//     }
//   };

//   const sortSubtitutes = (subtitutes) => {
//     return subtitutes.sort((a, b) => {
//       if (a.playerNumber > 0 && b.playerNumber < 0) {
//         return -1;
//       } else if (a.playerNumber < 0 && b.playerNumber > 0) {
//         return 1;
//       } else {
//         return 0;
//       }
//     });
//   }



//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     }),
//     useSensor(TouchSensor),

//   )

//   const handleDragStart = ({ active }) => {
//     setActiveId(active.id);
//   };



//   return (
//     <div className="users"
//       style={{
//         height: "fit-content",
//         width: "fit-content",
//         zIndex: "999 !important",
//       }} >

//       <DndContext
//         sensors={sensors}
//         collisionDetection={pointerWithin}
//         onDragEnd={onDragEnd}
//         onDragStart={handleDragStart}
//       >
//         <SortableContext
//           items={[selectedTeam.players]}
//           // items={[...users, ...subtitutes.subtitutes]}
//           strategy={rectSwappingStrategy}
//         >
//           <Container>

//             <Row
//               style={{
//                 width: "1000px",
//                 height: "1200px",
//                 backgroundImage: "url('../../../images/stadium.png')",
//                 backgroundSize: "cover", // Cover the entire div
//                 backgroundPosition: "center",
//                 display: "flex",
//                 justifyContent: "center",
//                 flexWrap: "wrap",
//               }}
//             >

//               {selectedTeam?.players.map((player, index) => (
//                 <SortableUser
//                   key={Math.random()}
//                   user={player}
//                   type="player"
//                   onMouseDown={() => console.log("clicked")}
//                   onClick={() => alert(`Player clicked: ${player.playerNumber}`)}
//                 />
//               ))}
//             </Row>

//             <Container fluid style={{ position: 'fixed', right: 0, top: "10%", bottom: 0, width: '250px' }}>

//               <Row>

//                 <Col className="bg-dark" style={{
//                   height: "100vh",
//                   width: "250px",
//                   overflowY: "auto",
//                   overflowX: "hidden",
//                 }}>



//                   <Button className="col-12 my-3 glow-button" onClick={handleShowModal}>
//                     {/* <Button className="col-12 my-3 glow-button" onClick={async () => {
//                     dispatch(setSubtitutes([]));
//                   }}>*/}
//                     Add player +
//                   </Button>


//                   <AddPlayerModal addPlayerToSubtitutes={() => console.log("added")} showAddPlayer={showAddPlayer} handleCloseModal={handleCloseModal} />

//                   {Array.isArray(selectedTeam?.subtitutes) && selectedTeam?.subtitutes.length > 0 && selectedTeam?.subtitutes.map((subtitute) => (
//                     // <h1 className="text-white" key={Math.random()}>{JSON.stringify(subtitute)}</h1>
//                     <SortableUser key={subtitute._id} user={subtitute} type="subtitute" />
//                   ))}


//                 </Col>
//               </Row>
//             </Container>
//             {/* </Row> */}
//           </Container>
//         </SortableContext>

//         <DragOverlay>
//           <div className="position-relative">
//             {activeId ? (
//               <div

//                 className="border rounded p-2 bg-light" // Add Bootstrap classes for border, rounded corners, padding, and light background
//               >
//                 <img className="img-fluid" src="https://static-00.iconduck.com/assets.00/drag-icon-2048x2048-l70ogpuu.png" alt="" />
//               </div>
//             ) : null}
//           </div>
//         </DragOverlay>

//       </DndContext>
//     </div>




//   );
// };
// export default Team;















