var axios = require("axios");


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
    
    await axios.get("http://sleepy-bastion-52779.herokuapp.com");
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


// async function fbcall () {
//     const res = await axios.get("https://graph.accountkit.com/v1.3/me/?access_token=EMAWexlbxaP8cAY3uckxTA4cHizhA0w0QTJIZBb5kLUO36H76qbaqwinZBVfD6nZCjC6btchFfbw33Az4Rajc0SG6PviZBinDkoNuM3yWYZBQZDZD");
//     console.log(res.data)
// }

// fbcall()