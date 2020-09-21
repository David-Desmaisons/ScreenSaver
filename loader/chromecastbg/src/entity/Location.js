class Location {
  constructor({ title, city=null, country=null, latitude=null, longitude=null }){
    this.title = title;
    this.city = city;
    this.country = country;
    this.position = ((latitude!=null) && (longitude!=null)) ? {
      latitude,
      longitude
    } : null;
  }
}

module.exports = {
  Location
}