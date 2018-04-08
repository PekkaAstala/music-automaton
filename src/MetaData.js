const sanitize = require('sanitize-filename');

class MetaData {

  constructor(title, composer, poet, rights) {
    this.title = title;
    this.composer = composer;
    this.poet = poet;
    this.right = rights;
    this.date = new Date().toISOString();
  }

  getSanitizedTitle(){
    const sanitizedTitle = './outputs/' + sanitize(this.getTitle(), { replacement: '-' }) + '.xml';
    return sanitizedTitle;    
  }
  
  getTitle() {
    
    return this.title;
  }

  getComposer() {
    return this.composer;
  }

  getPoet() {
    return this.poet;
  }

  getRights() {
    return this.rights;
  }

  getDate(){
    return this.date;
  }

}

module.exports = MetaData;