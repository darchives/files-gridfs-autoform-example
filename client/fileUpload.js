Template.afFileUpload.onCreated(function () {
  this.imageId = new ReactiveVar(false);
  this.currentUpload = new ReactiveVar(false);
});



Template.afFileUpload.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },
  imageId() {
    return Template.instance().imageId.get();
  },
  uploadedImage() {
    let imgId = Template.instance().imageId.get();
    let image = Images.find({_id: imgId});
    return image.cursor;
  }
});

Template.afFileUpload.events({
  'click [data-action="remove-image"]'(e, t) {
    t.imageId.set(false);
  },
  'change .af-file-upload-capture': function (e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case 
      // multiple files were selected
      var upload = Images.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          //alert('Error during upload: ' + error);
        } else {
          //alert('File "' + fileObj.name + '" successfully uploaded');
          template.imageId.set(fileObj._id);
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }
});