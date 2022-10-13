const Property = require('../models/property.model')
const { validationResult } = require('express-validator')

module.exports = {
    "index" : ( req , res ,next) => {
        res.render('property',{title:'Property',page_title_1:'Property Page',page_title_2:'Property',layout:'dashboard_layout', isproduct: true})
    },
    "addListing": (req , res , next) =>{
        res.render('add_property',{title:'Add Property',page_title_1:'Add Property Page',page_title_2:'Property',layout:'dashboard_layout', isproduct: true})
    },
    
    "add_new_property" : (req,res,next)=>{
        
        const error = validationResult(req)
        // console.log(error)
        if(error.errors.length > 0){
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
        
    }
    
}