const Property = require('../models/property.model')
const Property_type = require('../models/property_type.model')
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
    "propertyType": async (req , res , next) =>{
        try {
            var result = await Property_type.find()
            if(!result)
                console.log('no data')
            console.log(result);
            res.render('propertyType',{result : JSON.parse(JSON.stringify(result)),title:'Add Property',page_title_1:'Property Type',page_title_2:'Property',layout:'dashboard_layout', isProperty: true})
        } catch (error) {
            
        }
       
    },
    "propertyTypeCreate": (req , res , next) =>{
        
        res.render('propertyType_add',{title:'Add Property',page_title_1:'Property Type Add',page_title_2:'Property',layout:'dashboard_layout', isProperty: true})
    },
    "propertyType_add":async (req , res , next) =>{
        
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
         res.redirect("/property/properTytype");
        
       } catch (error) {
            console.log("Error : ",error);
       }

    }
    
}