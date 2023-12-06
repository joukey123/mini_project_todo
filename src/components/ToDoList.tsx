import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import CreateToDo from "./CreateToDo";
import {
  Categoties,
  addCategoryState,
  categotyState,
  toDoAtom,
  toDoSelector,
} from "../atoms";
import ToDo from "./ToDo";
import { useForm } from "react-hook-form";

interface IAddCategory {
  category: string;
}

function TodoList() {
  const { register, handleSubmit } = useForm<IAddCategory>();
  const setCategorise = useSetRecoilState(addCategoryState);
  const addCategorise = useRecoilValue(addCategoryState);
  const onValid = (data: IAddCategory) => {
    if (data.category !== "")
      setCategorise((oldCategory) => [
        { category: data.category, id: Date.now() },
        ...oldCategory,
      ]);
  };

  const toDos = useRecoilValue(toDoSelector);
  const [categoty, setCategory] = useRecoilState(categotyState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={categoty} onInput={onInput}>
        <option value={Categoties.ToDo}>ToDo</option>
        <option value={Categoties.Doing}>Doing</option>
        <option value={Categoties.Done}>Done</option>
        {addCategorise?.map((item) => (
          <option key={item.id} value={item.category}>
            {item.category}
          </option>
        ))}
      </select>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("category")} placeholder="add categoty" />
        <button> Add </button>
      </form>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}
// interface IForm {
//     email: string;
//     password : string;
//     confirmPassword : string;
// }

// function TodoList() {

//     const { register, handleSubmit, formState:{errors}, setError } = useForm<IForm>({
//         defaultValues: {
//             email:"@naver.com"
//         }
//     });

//     const onValid = (data:IForm) => {
//         if( data.password !== data.confirmPassword) {
//             setError("confirmPassword", {message:"비밀번호가 일치하지 않습니다."}, {shouldFocus:true})
//         }
//     }

//     return (
//                 <div>
//                     <form style={{display:"flex", flexDirection:"column", maxWidth:500}}
//                     onSubmit={handleSubmit(onValid)}>

//                         <input {...register("email", {
//                             required:"필수 입력 사항입니다." ,
//                             pattern: {
//                                 value: /^[A-Za-z0-9._%+-]+@naver\.com$/,
//                                 message : "naver 주소만 입력이 가능합니다."
//                             }})}
//                             placeholder="email"/>
//                         <span> {errors?.email?.message} </span>

//                         <input {...register("password", {
//                             required:"필수 입력 사항입니다.",
//                             minLength:{
//                                 value:10,
//                                 message: "10자 이상 입력하세요."
//                             },
//                             validate: {
//                                 onletter: (value) => value.includes("!") ||  "! 포함되어야합니다.",
//                                 onlrtters: (value) => value.includes("@") || "@ 포함되어야합니다.",
//                             }
//                         })} placeholder="password"/>
//                         <span> {errors?.password?.message} </span>

//                         <input {...register("confirmPassword", {
//                             required:"필수 사항 입력입니다.",
//                             minLength:{
//                                 value:10,
//                                 message: "10자 이상 입력하세요."
//                             },
//                         })} placeholder="password"/>
//                         <span> {errors?.confirmPassword?.message} </span>
//                         <button>Add</button>
//                     </form>
//                 </div>

//             )
// }
export default TodoList;
