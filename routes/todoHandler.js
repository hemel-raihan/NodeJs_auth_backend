const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const todoSchema = require('../schema/todoSchema')
const Todo = new mongoose.model("Todo", todoSchema)

//get all todo

// router.get('/', async (req,res) =>{
//      Todo.find({status: 'inactive'}, (err,data)=>{
//         if(err)
//         {
//             res.status(500).json({
//                 error: "there is some wrong..!!!"
//             })
//         }
//         else{
//             res.status(200).json({
//                 result: data,
//                 message: "successfully fetched",
//             })
//         }
//     })
// })

router.get("/", async (req, res) => {
    await Todo.find({ status: "active" })
      .select({
        _id: 0,
        __v: 0,
        date: 0,
      })
      .limit(2)
      .exec((err, data) => {
        if (err) {
          res.status(500).json({
            error: "There was a server side error!",
          });
        } else {
          res.status(200).json({
            result: data,
            message: "Success",
          });
        }
      });
  });

//get single todo

router.get('/:id', async (req,res) =>{
    Todo.find({_id: req.params.id}, (err,data)=>{
    if(err)
    {
        res.status(500).json({
            error: "there is some wrong..!!!"
        })
    }
    else{
        res.status(200).json({
            result: data,
            message: "successfully fetched",
        })
    }
})
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
    try{
        const result = await Todo.findByIdAndUpdate(
            { _id: req.params.id },
            {
              $set: {
                status: "inactive",
              },
            },
            {
              new: true,
              useFindAndModify: false,
            },
          );
          res.status(200).json({
              message: "Todo was updated successfully!",
          });
          console.log(result);
    }catch(e){
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
    
  })

// delete todo

router.delete('/:id', async (req,res) =>{
  await Todo.deleteOne({_id: req.params.id}, (err) =>{
    if(err){
      res.status(500).json({
        error: "there was a server side erro!!"
      })
    }
    else{
      res.status(200).json({
        message: "successfully delete todo"
      })
    }
  })
})

module.exports = router;
