import {ChangeEvent, useState} from "react";
import { Link , useNavigate } from 'react-router-dom';
import {SignupInput} from "@okaymahimasingh/medium-common";
import axios from "axios";
import { BACKEND_URL} from "../config"

export const Auth = ({type} : {type : "signup" | "signin"}) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email:" ",
        password:""

    });

    async function sendRequest () {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);

            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate ("/blogs")

        }catch(e) {
            //alert the user here that the requwest failed
            console.log(e)
            alert("error while signing up")
        }
      
    }
    return (
        <div className="h-screen flex items-center justify-center flex-col ">
            <div className="flex justify-center">
                <div pt-8>
                    <div className="px-10">
                    <div className="text-3xl font-extrabold text-left mt-4 ">Create an Account</div>
            <div className="text-slate-500">

                {type === "signin" ? "Don,t have an account ?" : "Already have an account"}
                <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                {type === "signin" ? "signup" : "signin"}
                </Link>

            </div>
            </div>
                 <div className="pt-8">
            <LabelledInput label="Name" placeholder="Mahima Singh..." onChange={(e) => {
        setPostInputs({
            ...postInputs,
            email: e.target.value
        })
       }}/>
                

                <LabelledInput label="Email" placeholder="Mahima Singh..." onChange={(e) => {
        setPostInputs({
            ...postInputs,
            email: e.target.value
        })
       }}/>
                 <LabelledInput label="Password" type={"password"} placeholder="8796" onChange={(e) => {
                    setPostInputs({
                     ...postInputs,
                    password: e.target.value
        })
       }}/>
         <div className="pt-4">
         <button onClick={sendRequest} type="button" className="pt-4 w-full text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
             {type === "signup" ? "Signup" : "Signin"}
       </button>
         </div>
       
            </div>
               
          </div>

        </div>
        </div>
      
              
)}

interface LabelledInputType {
    label: string;
    placeholder : string;  
    onChange: (e: ChangeEvent<HTMLInputElement> ) => void;
    type?: string;
}
function LabelledInput ({label, placeholder, onChange, type} : LabelledInputType ) {
    return <div>
       <label className="block mb-2 text-sm  text-black font-semibold pt-3 ">{label}</label>
       <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus: ring-blue-500 focus:border-blue w-full p-2.5 " placeholder={placeholder} required/>
    </div>
}