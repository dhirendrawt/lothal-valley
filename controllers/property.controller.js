const Property = require('../models/property.model')
const { validationResult } = require('express-validator');
const { json } = require('express');

module.exports = {
    "index" : async ( req , res ,next) => {
        
            var data= await Property.find({});
        
            res.render('property',{title:'Property',page_title_1:'Property Page',page_title_2:'Property',layout:'dashboard_layout', properties: data, isproduct: true})
        
       
    },
    "addListing": (req , res , next) =>{
        res.render('add_property',{title:'Add Property',page_title_1:'Add Property Page',page_title_2:'Property',layout:'dashboard_layout', isproduct: true})
    },
    
    "add_new_property" : (req,res,next)=>{
        
        const error = validationResult(req)
        // console.log(error)
        // var form1 ={
        //     "property_title" : req.body.property_title ,
        //     "area" : req.body.area ,
        //     "address" : req.body.address ,
        //     "amount" : req.body.amount ,
        //     "min_price" : req.body.min_price ,
        //     "max_price" : req.body.max_price ,
        //     "description" : req.body.description
        // };
        if(error.errors.length > 0){
            // console.log(JSON.stringify(form1));
            req.flash("form1",[{
                "property_title" : req.body.property_title ,
                "area" : req.body.area ,
                "address" : req.body.address ,
                "amount" : req.body.amount ,
                "min_price" : req.body.min_price ,
                "max_price" : req.body.max_price ,
                "description" : req.body.description
            }]);
            req.flash('product_error',error.errors)
            return res.redirect('/property/add')
        }
      
        try {
            const property = new Property({
                property_title : req.body.property_title ,
                area : req.body.area ,
                address : req.body.address ,
                amount : req.body.amount ,
                min_price : req.body.min_price ,
                max_price : req.body.max_price ,
                description : req.body.description
            })
            console.log(property);
            property.save();   
            res.redirect('/property') 
        } catch (error) {
            console.log(error);
        }    
        
    },
    "delete_property" : async (req,res) =>{

        await Property.deleteOne({ _id : req.body.property_id })

        res.redirect('/property')
    },

    "edit_property" : (req,res) =>{
        const id = req.params.id;
        console.log(id); 
        res.redirect('/property')
    },
    
    
}