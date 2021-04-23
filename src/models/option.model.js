const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const OptionSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    value: {
      type: String
    }
});
  
const Option = mongoose.model('Option', OptionSchema);
module.exports = Option;