const axios = require("axios");
const fs = require("fs");

const image = fs.readFileSync("coinspic.webp", {
    encoding: "base64"
});

axios({
    method: "POST",
    url: "https://serverless.roboflow.com/countmycoins-in8ts/2",
    params: {
        api_key: "Cc4vrlSzZgkfj7J1qG6y"
    },
    data: image,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
.then(function(response) {
    const predictions = response.data.predictions;

    console.log("Detected coins:");
    predictions.forEach(pred => {
        console.log(`- ${pred.class} (${Math.round(pred.confidence * 100)}% confidence)`);
    });

})
.catch(function(error) {
    console.log(error.message);
});