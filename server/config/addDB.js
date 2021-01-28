const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// подключение
mongoose.connect("mongodb+srv://MedVED:MedVED@cluster0.girqq.mongodb.net/JWT?retryWrites=true&w=majority", { useNewUrlParser: true });

// установка схемы

const DoctorTime = mongoose.model(
  "DoctorTime",
  new mongoose.Schema({
    workTime: String,
    workDate: String
  })
);

module.exports = DoctorTime;

DoctorTime.create({workTime: "11:00", workDate: "20.01.200"}, function(err, doc){
    mongoose.disconnect();

    if(err) return console.log(err);

    console.log("Сохранен объект doctime", doc);
});
