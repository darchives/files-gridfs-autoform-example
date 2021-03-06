Persons = new Mongo.Collection("persons");

Persons.helpers({
  profilePic() {
    return Images.find({_id: this.profilePicId}).cursor;
  },
  backgroundPic() {
    return Images.find({_id: this.backgroundPicId}).cursor;
  }
});

Persons.attachSchema({
  name: {
    type: String,
    label: "Name"
  },
  profilePicId: {
    type: String,
    label: "Profile Pic Id",
    autoform: {
      afFieldInput: {
        type: "fileUpload",
        collection: 'Images'
      }
    }
  },
  backgroundPicId: {
    type: String,
    label: "Background Pic Id",
    autoform: {
      afFieldInput: {
        type: "fileUpload",
        collection: 'Images'
      }
    }
  }
});