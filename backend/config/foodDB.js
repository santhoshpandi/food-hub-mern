const mongoose = require('mongoose')

// const foodDB =async ()=>{
//  await mongoose.connect(process.env.FOOD_DB_URL).then((con)=>{
//   console.log('Database Connected to : '+con.connection.host+'🔥')
//  })
// }
const foodDB =async ()=>{
 await mongoose.connect(process.env.FOOD_DB_URL).then((con)=>{
  console.log('Database Connected to : '+con.connection.host+'🔥')
 })
}

module.exports = foodDB