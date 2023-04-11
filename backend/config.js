const env = require('dotenv')

env.config()

 const data =  {
    name: process.env.MONGODB_USER,
    password:process.env.MONGODB_PASS,
    cluster: process.env.MONGODB_CLUSTER
}



module.exports=data;


