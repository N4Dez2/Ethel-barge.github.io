// pet.js - pet route module.
import express from "express";
var router = express.Router();
import { client } from "../config/prismicConfig.js"; //Get the prismic client

// Home page route.
router.get('/', function (req, res) {
  
  res.send('pet home page');
})

router.get("/:id", async (req, res) => {
  const pet = await client.getByUID("pet", req.params.id, 
    {
    graphQuery: `{
     pet {
       ...petFields
       species {
         ...speciesFields
       }
       traits {
         trait{
           ...on trait{
             ...traitFields
           }
         }
      }
    }
  }`
  }).catch(
    error =>{ //if there is an error finding the page
      res.status(500);
      res.render("500", {error});  
    }
  );;
  res.render("pet", { pet });
});

/*
router.get("/:id", async (req, res) => {
  const pet = await client.getByUID("pet", req.params.id, 
    {
    graphQuery: `{
     pet {
       name
       image
       age
       species {
         name
       }
       traits {
         trait{
           name
         }
       }
    }
  }`
  });
  res.render("pet", { pet });
});


*/
export { router as petroutes }