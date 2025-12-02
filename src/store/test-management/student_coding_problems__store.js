import {create} from "zustand"
import {persist} from "zustand/middleware"
import axios from "axios"

const api= axios.create({
    baseURL: "/api/v1/practice",
})
const initialState={
    output:null,
    code:null,
    language:'cpp',
    isRunning:false,
    problem:{
        problemStatement:null,
        inputExamples:{
            input:null,
            output:null,
            explaination:null
        },
        constraints:[],
        notes:[]
    },
}
const submitCode=(set)=> async(codeDataObj)=>{
    set({isRunning:true})
    try {
        const res = await 
    } catch (error) {
        
    }
}
const studentCodingProblemStore= create(
    persist((set,get)=>{
        return{
            ...initialState,
        }
    }),
    {name:"student-coding-data"}
);

export default studentCodingProblemStore;