const Property = require('../models/property.model')
const { validationResult } = require('express-validator')

module.exports = {
    "index" : ( req , res ,next) => {
        res.render('listing',{title:'listing',page_title_1:'Home Page',page_title_2:'Listing',layout:'dashboard_layout', isproduct: true})
    },
    "addListing": (req , res , next) =>{
        res.render('add_listing',{title:'Add Listing',page_title_1:'Add Listing Page',page_title_2:'Listing',layout:'dashboard_layout', isproduct: true})
    },
    
    "add_new_property" : (req,res,next)=>{
        
        const error = validationResult(req)
        if(error){
            
            var error_field_name = error.errors[0]['param']
            console.log(error.errors[0]['param'])
            req.flash('validation_error',JSON.stringify(error.errors))
           
            res.redirect('/product/add')
        }

        else{
            const property = new Property({
                property_title : req.body.property_title ,
                area : req.body.area ,
                address : req.body.address ,
                amount : req.body.amount ,
                min_price : req.body.min_price ,
                max_price : req.body.max_price ,
                description : req.body.description
            })
            
            property.save();
            
            res.send('add_new_property function working')
        }
        
    }
    
}