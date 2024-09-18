const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultsSchema = new Schema(
    {

        name: {
            type: String,
            required: true
          },
          marks: {
            type: String,
            required: true
          },
          subject: {
            type: String,
            required: true
          }


    
});

const Results = mongoose.model("results", resultsSchema);
module.exports = Results;