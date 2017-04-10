import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  // code to run on server at startup
  Accounts.onCreateUser(function(options,user){
    let email ;
    let existeUser;
    let currentUser;

    if(user.services){
      if(user.services.facebook){
        email = user.services.facebook.email;
      }else if(user.services.twitter){
        email = user.services.twitter.email;
      }
    }

    const newUser = {services:{password:{}},
      userProfile:{}
    };
    newUser.CreatedAt= new Date();
    if(user.services.facebook){
      let fb= user.services.facebook;
      newUser.userProfile.first_name = fb.first_name;
      newUser.userProfile.last_name = fb.last_name;
      newUser.userProfile.age = fb.age_range.max;
      newUser.userProfile.gender = fb.gender;

      newUser.services.facebook = fb;
      newUser.emails = [{address: fb.email, verified: true}];
    }else if(user.services.twitter){
    }
    return newUser;
  });
});

Accounts.urls.resetPassword = function(token) {
   return Meteor.absoluteUrl('/ResetPassword/' + token);
};
  process.env.MAIL_URL="smtp://EstofadoConAzucar%40gmail.com:mamemimo@smtp.gmail.com:465/";
