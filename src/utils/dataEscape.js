const validator = require("validator");

exports.houseEscape = (body) => {
  return {
    name: validator.escape(body.name.trim()),
    type: validator.escape(body.type.trim()),
    yearBuilt: validator.escape(body.yearBuilt.trim()),
    location: validator.escape(body.location.trim()),
    imageUrl: body.imageUrl.trim(),
    description: validator.escape(body.description.trim()),
    availablePieces: validator.escape(body.availablePieces.trim()),
    isValidUrl: validator.isURL(body.imageUrl.trim()),
  };
};
