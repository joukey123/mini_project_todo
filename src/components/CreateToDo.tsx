import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categotyState, toDoAtom } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const category = useRecoilValue(categotyState);
  const setToDos = useSetRecoilState(toDoAtom);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleVaild = (data: IForm) => {
    setToDos((oldTodo) => [
      { text: data.toDo, id: Date.now(), category },
      ...oldTodo,
    ]);
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(handleVaild)}>
      <input {...register("toDo")} placeholder="write a todo"></input>
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
