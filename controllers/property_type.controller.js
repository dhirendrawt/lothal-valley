const Property_type = require('../models/property_type.model')
const { validationResult } = require('express-validator');
const { json } = require('express');

module.exports = {
    "index": async (req , res , next) =>{
        try {
            var result = await Property_type.find()
            if(!result)
                console.log('no data')
            //console.log(result);
            res.render('propertyType',{result : JSON.parse(JSON.stringify(result)),title:'Add Property',page_title_1:'Property Type',page_title_2:'Property',layout:'dashboard_layout', isProperty: true})
        } catch (error) {
        }
            
    },
    "propertyTypeCreate": (req , res , next) =>{

        res.render('propertyType_add',{title:'Add Property',page_title_1:'Property Type Add',page_title_2:'Property',layout:'dashboard_layout', isProperty: true})
    },
    "propertyType_add":async (req , res , next) =>{ 
        const error = validationResult(req)
        if(error.errors.length > 0){
            req.flash("form1",[{'property_type_name':req.body.Property_type}])
            req.flash('propery_type_error',error.errors)
            return res.redirect('/property_Type/propertyType_add')
        }
       try {
        
        var result = await Property_type.find({}).sort({serial_no: -1}).limit(1)
          console.log('result :',result[0].serial_no);
        //return res.send('hallo');

        const property_type = new  Property_type({
            serial_no: result[0].serial_no+1,
            property_type_name : req.body.property_type,
            status : true
        })
        console.log("data : ",property_type);
        property_type.save();
         res.redirect("/property_Type");
        
       } catch (error) {
            console.log("Error : ",error);
       }
   },
   "delete_property_type" : async (req,res) =>{

    await Property_type.deleteOne({ _id : req.body.property_id })

    res.redirect('/Property_type')
    },

    "edit_property_type" : async(req,res) =>{
        const id = req.params.id;
        var data = await Property_type.find({_id : id}); 
        res.render('property_Type_edit',{data:JSON.parse(JSON.stringify(data)),title:'Add Property',page_title_1:'Property Type Add',page_title_2:'Property',layout:'dashboard_layout', isProperty: true})
    },
    "update_property_type": async (req,res) =>{
        const error = validationResult(req)
        if(error.errors.length > 0){
            req.flash("form1",[{'property_type_name':req.body.Property_type}])
            req.flash('propery_type_error',error.errors)
            return res.redirect('/property_Type/edit_property_Type/'+req.params.id+"?isedit=false");
        }
        try {
            const id = req.params.id
            var data = await Property_type.findOne({_id : id}); 
            data.property_type_name = req.body.property_type_name;
            await data.save();
            req.flash('Update sucessfull');
            res.redirect('/Property_type');
        } catch (error) {
            res.send("somethis want's worng");
        }
        
        
    },
}