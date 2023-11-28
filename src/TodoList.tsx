import { useForm } from "react-hook-form";

function TodoList(){

    interface IForm {
        toDo : string;
    }
    
    const { register, handleSubmit, setValue } = useForm<IForm>();

    const handleVaild = (data:IForm) => {
        console.log("add to do",data.toDo)
        setValue("toDo", "");
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit(handleVaild)}>
                <input {...register("toDo") } placeholder="write a todo"></input>
                <button>Add</button>
            </form>
        </div>
    )
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