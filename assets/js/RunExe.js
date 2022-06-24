// let $ = require('jquery')
// const btnRun = document.getElementById('testRun')

var child = require('child_process').execFile;
var executablePath = "C:\\Users\\reza\\Desktop\\vortexProject\\proverif2.00\\proverif.exe";

$('#testRun').on('click', ()=>{


    child(executablePath, ['-h'], function(err, data) {
        if(err){
        console.error("test ======> ", err);
        return;
        }
    
        console.log(data.toString());
        // alert("************** TEST ***************\n", data.toString())
    });

    // console.log("************** TEST ***************")
    alert("************** TEST ***************")
})
