import { useSetRecoilState } from "recoil";
import { Categoties, IToDo, toDoAtom } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoAtom);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = {
        text,
        id,
        category: name as IToDo["category"],
      };

      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
    // setToDos((prev) =>
    //   prev.map((oldToDos) => {
    //     if (oldToDos.id === id) {
    //       return { text, id, category: name as  IToDo["category"] };
    //     }
    //     return oldToDos;
    //   })
    // );
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categoties.Doing && (
        <button name={Categoties.Doing} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categoties.ToDo && (
        <button name={Categoties.ToDo} onClick={onClick}>
          ToDo
        </button>
      )}
      {category !== Categoties.Done && (
        <button name={Categoties.Done} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
