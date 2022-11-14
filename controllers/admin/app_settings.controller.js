const AppSetting = require('../../models/app_setting.model');
const states = require('../../models/states.model');
const { validationResult } = require('express-validator')
const fs = require('fs')
const path = require('path')
const dirname = require('../../dirname')
module.exports = {
    'index' : async(req, res)=>{
        try {
            const data = await AppSetting.find().populate('state');
            return res.render('admin/appSettings/list',{data : JSON.parse(JSON.stringify(data)),title:'App Setting',page_title_1:'App Setting',page_title_2:'Setting',layout:'dashboard_layout', isSetting: true})
        } catch (error) {
            console.log(error);
        }

    },
    'create' : async(req, res)=>{
        try {
            
            const data = await states.find();
            return res.render('admin/appSettings/add',{data:data, title:'App Setting',page_title_1:'App Setting',page_title_2:'Setting',layout:'dashboard_layout', isSetting: true})
        } catch (error) {
            console.log(error);
            
        }
    },
    'add' : async(req, res)=>{
        const logo = req.file;
        const error = validationResult(req); 
        if(error.errors.length > 0){
            req.flash("form1",[{
                "mobile" : req.body.mobile,
                "email" : req.body.email,
                "addres" : req.body.address,
                "state" : req.body.state,
                "city" : req.body.city,
                "pin_code" : req.body.pin_code,
                "instagram" : req.body.instagram,
                "facebook" : req.body.facebook,
                "linkedin" : req.body.linkedin,
                "twitter" : req.body.twitter,
                "description" : req.body.description
            }]);
            req.flash('setting_error',error.errors)
            return res.redirect('/admin/setting/add')
        }
        try {
            const logo_data = base64_encode(logo);
             function base64_encode(img) {
                console.log('file_name:',img)
                // read binary data
                // console.log('data in base 64 is--'+JSON.stringify(image.filename));
                var bitmap = fs.readFileSync(path.join(dirname + '/uploads/' + img.filename));
                // // convert binary data to base64 encoded string
                const data = new Buffer(bitmap).toString('base64');
                return data
            }
            await AppSetting.create({
                "phone" : req.body.mobile,
                "email" : req.body.email,
                "addres" : req.body.address,
                "state" : req.body.state,
                "city" : req.body.city,
                "pin_code" : req.body.pin_code,
                "lnstagram_link" : req.body.instagram,
                "facebook_link" : req.body.facebook,
                "linkedin_link" : req.body.linkedin,
                "Twitter_link" : req.body.twitter,
                "description" : req.body.description,
                "logo" : logo_data
            });
            return res.redirect('/admin/setting/');
        } catch (error) {
            console.log(error)
        }
        res.send('hallo');
    },
    'create_edit' : (req, res)=>{

    },
    'update' : (req,res)=>{

    }

}