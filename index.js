const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer') 
const upload = multer() 
const cors = require('cors');
const data = require('./data.json');

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 

const searchData = function({email, phone} = d) {
    return this.filter(el => el.email === email && parseInt(phone) === el.number || el.email === email && phone === ''); 
}

let timeout;
let ms = 5000;

app.post("/getData", upload.array(), (req, res) => {
    clearTimeout(timeout);
    timeout = setTimeout(()=> {
        const searchResult = searchData.call(data, req.body)
        res.send(JSON.stringify(searchResult));
    }, ms);
});

app.listen(3205, ()=> console.log('back is running'))