
import { v4 as uuidv4 } from 'uuid';

//let users = [];

import mysql from 'mysql';
import { response } from 'express';

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "userlist"
});


export const createUser = (req, res) => {
    const user = req.body;
  //  users.push({ ...user, id : uuidv4()});

    const values = [uuidv4(), user.firstName, user.lastName, user.password, user.phone];
    con.query(
        "INSERT INTO users (id, firstName, lastName, password, phone) VALUES(?)",
        [values],
        function (err, data, fields) {
           // if(err) res.send("error") 
            res.status(201).json({
            //  status: "success",
          //  message: "a new user added",
              id: uuidv4(),
        });    
   }
  );
   // res.send(`user with the name ${user.firstName} is added to database`);
}

export const getUser = (req, res)  => {

    con.query(
        "SELECT * FROM users WHERE id = ?",
        [req.params.id],
        function (err, data) {
         
        if(err) {
          return res.json({ status: "ERROR", err });
        }
        else {
            let id = data[0].id;
            let Name = data[0].firstName +data[0].lastName
            let phone = data[0].phone
            let person = {id:id, name: Name, phone:phone};
            res.send(person);
        } 

        }
        
      );
    
    /*
    const foundUser = users.find((users) => users.id == id);
    let name = foundUser.firstName + foundUser.lastName;
    let person = {name: name, phone:foundUser.phone};

    res.send(person);
    */

}
// today work (10/30/2022)
/*
i create a new data table for taglist and insert data when it hits POST /users/{id}/tags
*/
/*
export const setTag = (req, res) => {

   //  console.log(req.body.tags);
     const tagList = req.body.tags;
     for(let tag of tagList) {
          const values = [tag, req.params.id, req.body.expiry];
          con.query(
            "INSERT INTO taglist (tagName, id, expiry) VALUES(?)",
            [values],
            function (err, data, fields) {
               // if(err) res.send("error") 
                res.status(201).json({
                  status: "success",
              //  message: "a new user added",
                  
            });    
       }
      );
     }
     res.send("successully added");
}

// i could successfully able to work on POST /users/{id}/tags part
/*
This is my logic. some coding problem arise here.hope i will do it.

export const gettagUsers  = (req, res) => {

  tagList = req.body.tag;
  const idList = new Set();

  for(tag of tagList) {
      con.query("Select Id, tag =?", tag, function(err, data, fields) {
            idList.push(data.id);
      })
  }
  finalResult = []
  for(item of idList) {
    con.query(
        "SELECT * FROM users WHERE id = ?",
        item,
        function (err, data) {
        
        if(err) {
          return res.json({ status: "ERROR", err });
        }
        else {
            let id = data[0].id;
            let Name = data[0].firstName +data[0].lastName
            let phone = data[0].phone
            let person = {id:id, name: Name, phone:phone};
            finalResult.push(person)
        } 

      }
      
    );
    res.send(finalResult)
  }
}
*/

