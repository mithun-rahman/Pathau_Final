
import { v4 as uuidv4 } from 'uuid';

//let users = [];

import mysql from 'mysql';

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

export const getAll  = (req, res) => {
    con.query("SELECT * FROM users", (error, data) => {
        if (error) {
          return res.json({ status: "ERROR", error });
        }
    
        return res.json(data);
    });
   // res.send(users);
}

export const getUser = (req, res)  => {

    con.query(
        "SELECT * FROM users WHERE id = ?",
        [req.params.id],
        function (err, data) {
         
          //  if(err) res.send("error")
            let id = data[0].id;
            let Name = data[0].firstName +data[0].lastName
            let phone = data[0].phone
            let person = {id:id, name: Name, phone:phone};
            res.send(person);
        
          /*
          res.status(200).json({
          //  status: "success",
           
            result: person,
          });
          */
          

        }
        
      );
    
    /*
    const foundUser = users.find((users) => users.id == id);
    let name = foundUser.firstName + foundUser.lastName;
    let person = {name: name, phone:foundUser.phone};

    res.send(person);
    */

}

export const deleteUser = (req, res) => {
    /*
    const {id} = req.params;
    users = users.filter((users) => users.id != id);
    res.send(`${id} is deleted from the database`);
    */
    con.query(
        "DELETE FROM users WHERE id=?",
        [req.params.id],
        function (err, fields) {
          if(err) res.send("error")
          res.status(201).json({
            status: "success",
            message: "user deleted!",
          });
        }
      );
}
   

export const updateUser = (req, res) => {

    const data = [req.body.firstName, req.body.lastName, req.body.password, req.body.phone, req.params.id]

    con.query("UPDATE users SET firstName = ?, lastName = ?, password = ?, phone = ? where id = ?", data, (err, result) => {
        if(err) {
            res.send('error')
        }
        else {
            res.status(201).json({
                status: "success",
                message: "user updated"
            });
        }
    });
}
