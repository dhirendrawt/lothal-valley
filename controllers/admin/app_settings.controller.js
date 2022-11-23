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
            return res.render('admin/appSettings/list',{data : JSON.parse(JSON.stringify(data)),title:'App Setting',banner:'App Setting' ,page_title_1:'App Setting',page_title_2:'Setting',layout:'dashboard_layout', isSetting: true})
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
    'create_edit' : async(req, res)=>{
        const id = req.params.id;
        const state_data = await states.find();
        if(req.query.isedit=='true'){
            const data = await AppSetting.findOne({ _id : id });
            console.log('result:',data);
            return res.render('admin/appSettings/edit',{data : state_data,result:data, title:'App Setting',page_title_1:'App Setting',page_title_2:'Setting',layout:'dashboard_layout', isSetting: true})
        }else{
            return res.render('admin/appSettings/edit',{data : state_data,result : {_id:id},title:'App Setting',page_title_1:'App Setting',page_title_2:'Setting',layout:'dashboard_layout', isSetting: true})
        }
        },
    'update' : async(req,res)=>{
        const id = req.params.id;
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
            return res.redirect('/admin/setting/edit/'+req.params.id+"?isedit=false")
        }
        try {
            const data = await AppSetting.findOne({ _id : id });
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
            console.log("data:", data);
            data.email = req.body.email;
            data.phone =req.body.mobile;
            data.addres = req.body.address;
            data.state = req.body.state;
            data.city = req.body.city;
            data.pin_code = req.body.pin_code;
            data.description = req.body.description;
            data.lnstagram_link = req.body.instagram;
            data.facebook_link = req.body.facebook;
            data.linkedin_link = req.body.linkedin;
            data.Twitter_link = req.body.twitter;
            data.logo = logo_data;
            await data.save();
            req.flash('message','  Record update successfully !');
            return res.redirect('/admin/setting');
        } catch (error) {
            console.log(error);
            req.flash('warning',' Something went wrong !');
            return res.redirect('/admin/setting/');
        }
    },
    'status_change' : async(req, res) => {
        try{
            const data = await AppSetting.findOne({_id : req.params.id})
            data.status = !data.status;
            await data.save();
            req.flash('message','  Status update successfully !');
            return res.redirect('/admin/setting/');
        }catch (error) {
            console.log(error);
            req.flash('warning',' Something went wrong !');
            return res.redirect('/admin/setting/');
        }
    },
    "delete" : async(req,res)=>{
        try {        
            await AppSetting.deleteOne({ _id : req.body.id });
            req.flash('message','Record delete successfull !');
             return res.redirect('/admin/setting/');
        } catch (error) {
            console.log(error);
            req.flash('warning',' Something went wrong !');
             return res.redirect('/admin/setting/');
        }
    },

}