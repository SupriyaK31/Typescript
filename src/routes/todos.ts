import  {Router}  from "express";
import {Todo} from "../modules/todos";

const router=Router();

let todos:Todo[]=[];

type RequestBody={text:string};
type RequestParams={todoId:string};
router.get('/',(req,res,next)=>{
res.status(200).json({todos: todos})
});

router.post('/todo',(req,res,next)=>{
    const body= req.body as RequestBody;
    const newTodo:Todo={
        id:new Date().toISOString(),
        text:body.text
    };
    todos.push(newTodo);
    res.status(201).json({message: 'Todo Added',todo:newTodo })
});

router.put('/todo/:todoId',(req,res,next)=>{
    const body= req.body as RequestBody;
    const params=req.params as RequestParams;
    const tid=params.todoId;
    const todoIndex=todos.findIndex(todoItem=>todoItem.id === tid);
    if(todoIndex>=0){
       todos[todoIndex]={id:todos[todoIndex].id,text:body.text};
       return res.status(200).json({Message:'Updated Todos',todos:todos})
    }
    res.status(400).json({message:'could not find'})
});

router.delete('/todo/:todoId',(req,res,next)=>{
    const params=req.params as RequestParams;
 todos=todos.filter(todoItem=>todoItem.id !== params.todoId);
 res.status(200).json({message:'Deleted Todo',todo:todos});
});
export default router;