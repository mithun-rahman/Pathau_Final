
import { v4 as uuidv4 } from 'uuid';

import mysql from 'mysql';
import { response } from 'express';

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "userlist"
});

function findUser (tag) {
    const data = [tag];
    let val ;
    let p = new Promise(function (res, rej) {
        con.query(
            "SELECT id FROM taglist WHERE tagName = ?",
            data,
            function (err, data) { 
                let list = []
                for(let dd of data) {
                    list.push(dd.id)
                 }
                if (err) rej(err);
                else res(list);
            }
        );
      } );
    return p;
}

export const gettagUsers  =  (req, res) => {
    const tagList = req.query.tags.split(",");
    
   // console.log(tagList);
 
    let userTag = findUser(tagList[0])
    userTag.then(function(result) {
        let idset = new Set();
        for(let id of result) {
            idset.add(id);
        }
        for(let id of idset) {
            let data = [id]
            console.log(data)
            con.query(
                "SELECT tagName FROM taglist WHERE id = ?",
                data,
                function (err, data) { 
                    if(err) res.status(404).json({status:"not found"})
                    let tagset = new Set();
                    for(let tag of data) {
                        tagset.add(tag.tagName)
                     }
                     console.log(tagset)
                     let list = []
                     for(let tag of tagset) {
                        list.push(tag)
                     }
                     let restult = {id: id, tags: list}
                     console.log(list)
                     res.status(200).json(
                     {
                        status: "users",
                        id:id,
                        tags: list
                      });
                   //  res.send(restult)
                }
            );
        }
     })

}
