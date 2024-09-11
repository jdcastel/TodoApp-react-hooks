import './CreateTodoButton.css';

function CreateTodoButton({setOpenModal}) {

  // const toggleModal = () => {
  //   if(children === true){
  //     setOpenModal(false);
  //   } else {
  //     setOpenModal(true);
  //   }
  // }

  return (
    <button
      className="CreateTodoButton"
      onClick={
        // (event) => {
        //   console.log('le diste click')
        //   console.log(event)
        //   console.log(event.target)
        // }
        () => {
          setOpenModal(state => !state)
        }
      }
    >+</button>
  );
}

export { CreateTodoButton };
