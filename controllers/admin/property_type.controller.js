const Property_type = require('../../models/property_type.model')
const { validationResult } = require('express-validator');
const { json } = require('express');

module.exports = {
    "index": async (req , res , next) =>{
        try {
            var result = await Property_type.find()
            if(!result)
            {
                console.log('no data')
            }
            return res.render('admin/property_type/list',{result : result,title:'Add Property',page_title_1:'Property Type',page_title_2:'Property',layout:'dashboard_layout', isProperty: true})
        
        } 
        catch (error) {
            console.log(error);
        }
            
    },
    "create": (req , res , next) =>{
        return res.render('admin/property_type/add',{title:'Add Property',page_title_1:'Property Type Add',page_title_2:'Property',layout:'dashboard_layout', isProperty: true})
    },
    "add":async (req , res , next) =>{ 
        const error = validationResult(req)
        if(error.errors.length > 0){
            req.flash("form1",[{'property_type_name':req.body.Property_type}])
            req.flash('propery_type_error',error.errors)
            return res.redirect('/admin/property-type/add')
        }
       try {
        const isdata =await Property_type.find().count();
        if(isdata)
            var result = await Property_type.find({}).sort({serial_no: -1}).limit(1)
        const property_type = new  Property_type({
            serial_no:  isdata ? result[0].serial_no+1 : 1,
            property_type_name : req.body.property_type,
            status : true
        })
        console.log("data : ",property_type);
        await property_type.save();
         res.redirect("/admin/property-type");
        
       } catch (error) {
            console.log("Error : ",error);
       }
   },
   "delete" : async (req,res) =>{
    await Property_type.deleteOne({ _id : req.body.id })
    res.redirect('/admin/property-type')
    },

    "edit" : async(req,res) =>{
        console.log('isedit : ',req.query.isedit)
        const id = req.params.id;
        if(req.query.isedit=='true'){
            var data = await Property_type.find({_id : id}); 
            res.render('admin/property_type/edit',{data:JSON.parse(JSON.stringify(data)),title:'Add Property',page_title_1:'Property Type Add',page_title_2:'Property',layout:'dashboard_layout', isProperty: true})
        }else{
            res.render('admin/property_type/edit',{data:JSON.parse(JSON.stringify([{_id:id}])),title:'Add Property',page_title_1:'Property Type Add',page_title_2:'Property',layout:'dashboard_layout', isProperty: true})
        }
    },
    "update": async (req,res) =>{
        const error = validationResult(req)
        if(error.errors.length > 0){
            req.flash("form1",[{'property_type_name':req.body.Property_type}])
            req.flash('propery_type_error',error.errors)
            return res.redirect('/admin/property-type/edit/'+req.params.id+"?isedit=false");
        }
        try {
            const id = req.params.id
            var data = await Property_type.findOne({_id : id}); 
            data.property_type_name = req.body.property_type_name;
            await data.save();
            req.flash('Update sucessfull');
            res.redirect('/admin/property-type');
        } catch (error) {
            res.send("somethis want's worng");
        }
    },
    "status_change" : async (req,res) =>{
        var id = req.params.id;
        var data = await Property_type.findOne({_id : id});
        data.status = !data.status;
        await data.save();
        return res.redirect('/admin/property-type')
        },
}