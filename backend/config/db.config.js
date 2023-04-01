/*
I created a separate database config file to makes it easier to update the  application's database connection settings.
When the settings need to be changed, I  only need to update the configuration file instead of editing multiple files.
*/
module.exports = {
  url : "mongodb+srv://manal:manal123@cluster0.nnnj3ty.mongodb.net/goFlex?retryWrites=true&w=majority"
  //url: "mongodb+srv://qayoom:HELPPass@cluster0.hghlk3s.mongodb.net/flexis?retryWrites=true&w=majority"

};
