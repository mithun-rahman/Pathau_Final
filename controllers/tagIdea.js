
import { v4 as uuidv4 } from 'uuid';

import mysql from 'mysql';
import { response } from 'express';

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "userlist"
});

function findUserid (tag) {
    const data = [tag];
    let idList ;
    con.query(
        "SELECT id FROM taglist WHERE tagName = ?",
        data,
        function (err, data) { 
            idList = data;
        }
    );
    return idList;
 }

 function findUsername (id) 
 {
    let name;
    con.query(
      "SELECT * FROM users WHERE id = ?",
      [id],
      function (err, data) { 
          if(err) {
            return res.json({ status: "ERROR", err });
          }
          else {
              let id = data[0].id;
              let Name = data[0].firstName +data[0].lastName
              let phone = data[0].phone
              let person = {id:id, name: Name, phone:phone};
              name = person;
          } 
      }
    );
    return name;
 }

function findUsertags (id) {
  let tags ;
   con.query(
    "SELECT tagName FROM taglist WHERE id = ?",
    data,
    function (err, data) { 
        let tagset = new Set();
        for(let tag of data) {
            tagset.add(tag.tagName)
         }
         console.log(tagset)
         let list = []
         for(let tag of tagset) {
            list.push(tag)
         }
         tags = list;
        }
    );
    return tags;
}

export const gettagUsers  =  (req, res) => {
    const tagList = req.query.tags.split(",");
    let tagid = new Set();

    for(let tag of tagList) {
          let idList = findUserid(tag);
          for(let id of idList) {
              tagid.add(id);
          }
    }
    let userList = [];
    for(let id of tagid) {
        let user;
        user = {id:id, name:findUsername(id), tags:findUsertags(id)}
        userList.push(user)
    }
    res.send(userList);
}
