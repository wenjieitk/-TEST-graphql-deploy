var axios = require("axios");
var moment = require("moment")

// const getBreeds = async () => {
//     try {
//       return await axios.get("http://sleepy-bastion-52779.herokuapp.com")
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   getBreeds();
let count = 1;

callHeroku();

async function callHeroku(error) {
    if(error)
        console.log(error)
    
    await axios.get("https://taigo-backend.herokuapp.com");
    await axios.get("https://forwardertaigo.herokuapp.com");
    await axios.get("https://hauliertaigo.herokuapp.com");
    await axios.get("https://taigo-dev-563402dbee.herokuapp.com/taigo-dev/dev1")
    var d = new Date().toLocaleDateString().replace(/\//g, '')
    
    console.log( `${d} call liao ${count++}` )
}

setInterval(() => {
    try{
        callHeroku();
    }catch (error) {
        callHeroku("fail liao call again");
    }
}, 60000); // every 5 minutes (300000)

const startOfMonth = moment().endOf('month').format()
console.log(moment().subtract(24, "hours").format())