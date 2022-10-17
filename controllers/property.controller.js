const Property = require('../models/property.model')
const Property_type = require('../models/property_type.model')
const { validationResult } = require('express-validator');
const { json } = require('express');

module.exports = {
    "index" : async ( req , res ,next) => {
        
            var property_data= await Property.find().populate('property_type')
        
            res.render('property', {title:'Property',page_title_1:'Property Page',page_title_2:'Property',layout:'dashboard_layout', properties: property_data, isproduct: true})
        
       
    },
    "addProperty": async (req , res , next) =>{
        const property_types = await Property_type.find({'status':true}).select('property_type_name')

        res.render('add_property', {title:'Add Property',page_title_1:'Add Property Page',page_title_2:'Property',layout:'dashboard_layout', isproduct: true ,
        property_types:property_types})
    },
    
    "add_new_property" : async (req,res,next)=>{
        
        const error = validationResult(req)
     
        if(error.errors.length > 0){
            req.flash("form1",[{
                "property_title" : req.body.property_title ,
                "area" : req.body.area ,
                "address" : req.body.address ,
                "amount" : req.body.amount ,
                "min_price" : req.body.min_price ,
                "max_price" : req.body.max_price ,
                "description" : req.body.description,
                "property_type" : req.body.property_type
            }]);
            console.log(error.errors);
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
                description : req.body.description ,
                property_type : req.body.property_type
            })
            
            await property.save();   
            res.redirect('/property') 
        } catch (error) {
            console.log(error);
        }    
        
    },
    "delete_property" : async (req,res) =>{

        await Property.deleteOne({ _id : req.body.property_id })

        res.redirect('/property')
    },

    "edit_property" : async (req,res) =>{
        const id = req.params.id;      
        const data = await Property.findOne( { _id : id })
        const property_type_id = data.property_type
        const property_types = await Property_type.find({ 'status' : true })

        res.render('edit_property',{data : data , page_title_1 : 'Edit Property Details' , page_title_2 : 'Property Page' ,layout : 'dashboard_layout' , isproduct: true , property_types : property_types })
    },

    "update_property" : async  (req,res) =>{
       
        const id = req.body.update_id
        const error = validationResult(req)
        if( error.errors.length > 0 )
        {
            req.flash('product_error', error.errors)
            console.log('/property/edit_property/'+id)
            return res.redirect(`/property/edit_property/${id}?isedited=true`)
        }
        try 
        {
            var doc = await Property.findOne({ _id : id })
            doc.property_title = req.body.property_title
            doc.area = req.body.area
            doc.address = req.body.address
            doc.amount = req.body.amount
            doc.min_price = req.body.min_price
            doc.max_price = req.body.max_price
            doc.description = req.body.description
            doc.property_type = req.body.property_type
            await doc.save();

            res.redirect('/property') 
        } 
        catch (error) 
        {
            console.log(error);
        }    

    }
    
}