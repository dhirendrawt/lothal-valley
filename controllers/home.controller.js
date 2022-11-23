const AppSetting = require('../models/app_setting.model');
module.exports = {
    "index" : async(req,res)=>{
      const app_settings = await AppSetting.findOne({status : true}).populate('state');
      console.log('app:',app_settings);
      return res.render('home/index',{app_settings : app_settings,layout:'home_layout'});
    },
    "about": async(req,res)=>{
      const app_settings = await AppSetting.findOne({status : true}).populate('state');
      return res.render('home/about',{app_settings : app_settings,layout:'home_layout'});
    },
    "contact" : async(req, res) => {
      const app_settings = await AppSetting.findOne({status : true}).populate('state');
      return res.render('home/contact',{app_settings : app_settings,layout:'home_layout'})
    },
    "properties" : async(req, res) => {
      const app_settings = await AppSetting.findOne({status : true}).populate('state');
      return res.render('home/properties',{app_settings : app_settings,layout:'home_layout'})
    },
    "blog" : async(req, res) => {
      const app_settings = await AppSetting.findOne({status : true}).populate('state');
      return res.render('home/blog',{app_settings : app_settings,layout:'home_layout'})
    }
    
}