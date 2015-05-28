Slingshot.fileRestrictions("myFileUploads", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited)
});

if (Meteor.isClient) {
  Template.uploader.events(
  { 'click button': function () {
      var uploader = new Slingshot.Upload("myFileUploads");
      uploader.send(document.getElementById('slingshot_upload').files[0], function (error, downloadUrl) {
        if (error) {
          // Log service detailed response
          console.error('Error uploading'); //, uploader.xhr.response);
          alert (error);
        } else {
          // Meteor.users.update(Meteor.userId(), {$push: {"profile.files": downloadUrl}});
        }
      });
    }
  });
}
if (Meteor.isServer) {
	Slingshot.createDirective("myFileUploads", Slingshot.S3Storage, {
	  bucket: Meteor.settings.AWSBucket,
	  region: Meteor.settings.AWSRegion,
	  acl: "public-read",

	  authorize: function () {
	    return true;
	    //Deny uploads if user is not logged in.
	    if (!this.userId) {
	      var message = "Please login before posting files";
	      throw new Meteor.Error("Login Required", message);
	    }
	  },

	  key: function (file) {
            return "the-one-and-only/" + file.name;
	    //Store file into a directory by the user's username.
	    var user = Meteor.users.findOne(this.userId);
	    return user.username + "/" + file.name;
	  }
	});
}
