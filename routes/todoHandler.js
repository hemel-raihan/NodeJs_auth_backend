const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const todoSchema = require('../schema/todoSchema')
const Todo = new mongoose.model("Todo", todoSchema)

//get all todo

router.get('/', async (req,res) =>{

})

//get single todo

router.get('/:id', async (req,res) =>{

})

// insert a todo

router.post('/', async (req,res) =>{
    const newTodo = new Todo(req.body)
    await newTodo.save((err)=>{
        if(err){
            res.status(500).json({
                error: "there was a server side errror!!"
            })
        }
        else{
            res.status(200).json({
                message: "Todo Insert successfully!",
                newTodo
            })
        }
    })
})

//insert multiple data

router.post('/all', async (req,res) =>{
    await Todo.insertMany(req.body, (err)=>{
        if(err){
            res.status(500).json({
                error: "there was a server side errror!!"
            })
        }
        else{
            res.status(200).json({
                message: "Todos Insert successfully!",
            })
        }
    })
})

//update todo

// router.put('/:id', async (req,res) =>{
//    const todo =  await Todo.findByIdAndUpdate({_id: req.params.id}, {
//         $set: {
//             status: 'inactive'
//         },
//     },
//     {
//         useFindAndModify: false,
//     },
//      (err) =>{
//         if(err){
//             res.status(500).json({
//                 error: "there was a server side errror!!"
//             })
//         }
//         else{
//             res.status(200).json({
//                 message: "Todos Updated successfully!",
//             })
//         }

//     })
//     console.log(todo)
// })

router.put("/:id", async (req, res) => {
    const result = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: "active",
        },
      },
      {
        new: true,
        useFindAndModify: false,
      },
      (err) => {
        if (err) {
          res.status(500).json({
            error: "There was a server side error!",
          });
        } else {
          res.status(200).json({
            message: "Todo was updated successfully!",
          });
        }
      }
    );
    console.log(result);
  });

router.delete('/:id', async (req,res) =>{

})

module.exports = router;
