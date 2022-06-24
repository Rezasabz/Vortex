// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// const { contextBridge, ipcRenderer } = require('electron')

// contextBridge.exposeInMainWorld('electronAPI', {
//     openFile: () => ipcRenderer.invoke('dialog:openFile')
// })

// contextBridge.exposeInMainWorld('electronAPI', {
//     openFile: (filename) => ipcRenderer.invoke(handleReadFile(filename))
// })

const { readFile, writeFile, promises: fsPromises } = require('fs');

var stdout_path = null;

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }
})

window.openGaeme = function(executablePath, args, ph = null) {
    var child = require('child_process').execFile;
    var stdout = null
    child(executablePath, args, function(err, data, stdout) {
        if (stdout != null) {
            // console.error(err);
            console.warn("===============> ", stdout)
                //read line by line stdout and parse to json
                // var lines = stdout.split('\n');
                // var json = [];
                // lines.forEach((line) => {
                //     var obj = {}
                //     obj.claims  = line.split('\t')[0]
                //     obj.evidence = line.split('\t')[1]
                //     obj.score = line.split('\t')[2]
                //     obj.status = line.split('\t')[3]
                //     obj.evidence_type = line.split('\t')[4]
                //     json.push(obj)
                // });
                // var st = stdout.split("\t")
                // console.warn("===============> ",json);
                // fs = require('fs');
                // fs.writeFile(__dirname, stdout, function(err) {
                //     // if (err) return console.log("ERRRRRRROOOORRR  ",err);
                //     console.log('create file successfully !!');
                //     if (err) {
                //         console.log("ERRRRRRROOOORRR  ", err);
                //         return;
                //     }
                // });
            return;
        }
        // alert(data.toString());
        // console.log(stdout);
        // contextBridge.exposeInMainWorld('ReadAPI', {
        //   Read_file: () => data.toString()
        // })
    });
};

window.run_cmd = function(executablePath, args) {
    var child = require('child_process').execFile;
    var stdout = null
    child(executablePath, args, function(err, data, stdout) {
        if (stdout != null) {
            // console.error(err);
            console.warn("===============> ", stdout)
                //read line by line stdout and parse to json
            var lines = stdout.split('\n');
            var json = [];
            lines.forEach((line) => {
                var obj = {}
                if (line.trim() != "") {
                    obj.roleName = line.split('\t')[1]
                    obj.claimName = line.split('\t')[2]
                    obj.parameters = line.split('\t')[3]
                    obj.result = line.split('\t')[4].indexOf('Ok') > -1 ? 'Ok' : 'Fail'
                    obj.attack = line.split('\t')[5]
                    json.push(obj)
                }
            });
            console.warn("===============> ", json);
            if (stdout_path != null) {
                fs = require('fs');
                fs.writeFile(stdout_path, JSON.stringify(json), function(err) {
                    // if (err) return console.log("ERRRRRRROOOORRR  ",err);
                    console.log('create file successfully !!');
                    if (err) {
                        console.log("error  ", err);
                        return;
                    }
                });
            }
            return;
        }
    });
};

window.setPath = function(pathdir) {
    stdout_path = pathdir
}

window.currentPath = function() {
    const path = require('path')
    return path.dirname(__dirname)
}

window.makedir = function(pathdir) {
    const fs = require("fs");
    const path = require('path')
    var st = null
    fs.access(pathdir, (error) => {
        // To check if the given directory 
        // already exists or not
        if (error) {
            // If current directory does not exist
            // then create it
            fs.mkdir(path.join(__dirname, pathdir), (error) => {
                if (error) {
                    console.log(error);
                } else {
                    st = false
                    console.log("New Directory created successfully !!");
                }
            });
        } else {
            st = true
            console.log("Given Directory already exists !!");
        }
    });
    return st;
    // return path.join(__dirname, pathdir);
}


window.makeFile = function(filename, contentfile) {

    // console.log("filename", filename)
    // console.log("contentfile", contentfile)

    fs = require('fs');
    fs.writeFile(filename, contentfile, function(err) {
        // if (err) return console.log("ERRRRRRROOOORRR  ",err);
        console.log('create file successfully !!');
        if (err) {
            console.log("ERRRRRRROOOORRR  ", err);
            return;
        }
    });
}


window.copyFile = function(filename, dest) {
    const fs = require("fs");
    fs.copyFile(filename, dest, (err) => {
        if (err) {
            console.log("Error Found:", err);
        } else {
            console.log("File Copied Successfully");
        }
    });
}

var contentFolder = [];

window.getListFilesInDir = function(pathdir, flag = true) {
    const fs = require("fs");
    const path = require('path')
    var readDir = fs.readdirSync(pathdir)
    // pathdir = pathdir.replace(__dirname, "")
    if(flag){
        contentFolder = []
        contentFolder.push({
            name: pathdir.replace(__dirname+"\\", ""),
            parrent: __dirname,
            files: readDir,
            isFile: false,
        })
    }
    // const files = fs.readdirSync(path.join(__dirname, pathdir));
    // var contentFolder = []
    // var obj = {
        // files: [],
      var folders = []
    // }


    // console.log("pathdir ======> ", pathdir)

    readDir.filter(fileName => {
       var obj = {
            name: fileName,
            parrent: pathdir,
            files: [],
            isFile: true
        }
        if (fs.statSync(path.join(pathdir, fileName)).isFile()) {
            contentFolder.push(obj)
        }else{
            obj.files = fs.readdirSync(path.join(pathdir, fileName))
            obj.isFile = false
            contentFolder.push(obj)
            // if (obj.files.length > 0) {
                getListFilesInDir(path.join(pathdir, fileName), false)
            // }
                
            
        }
        // if (fs.statSync(fileName).isDirectory()) {
        //     if(fs.statSync(fileName).isDirectory() == true ){
        //     obj_nested.folder = fileName
        //     }
        // }

        // folders.push(obj_nested)

        // folders.forEach(folder => {
        //     if (fs.readdirSync(folder).length > 0) {
        //         if (fs.statSync(folder).isDirectory()) {
        //             folders.folders.push(folder)
        //         }else{
        //             folders.files.push(folder)
        //         }
        //     }
        // })

        });


        // contentFolder.push(obj)

    // const isFile = fileName => {
    //     return fs.lstatSync(fileName).isFile();
    //   };
      
    // fs.readdirSync(path.join(__dirname, pathdir))
    //     .map(fileName => {
    //       return path.join(folderPath, fileName);
    //     })
    //     .filter(isFile);
      
    // console.log("files ----> ", files)
    return contentFolder;
}



window.editFilePv = function(file) {
    readFile(file, 'utf-8', function(err, contents) {
        if (err) {
            console.log(err);
            return;
        }

        const replaced = contents.replace('set traceDisplay = none.', 'set traceDisplay = long.');

        writeFile(file, replaced, 'utf-8', function(err) {
            console.log(err);
        });
    });
}


// is file locked
window.isFileLocked = function(file) {
    const fs = require("fs");
    const path = require('path')
    try {
        fs.accessSync(path.join(__dirname, file), fs.constants.F_OK);
        console.log("file is not locked");
    } catch (e) {
        console.log("file is locked", e);
        return true;
    }
    return false;
}

window.get_file_data = function(file) {
    fs = require('fs');
    fs.readFile(file, 'utf-8', function(err, contents) {
        if (err) {
            console.log(err);
            return;
        }
        return contents;
        // console.log(contents);
    });
}


window.exec_spdl = function(ph, filename, contentfile) {
    fs = require('fs');
    const path = require('path')
        // create output_${file} dir
    fs.mkdir(path.join(__dirname, `${ph}\\output_${filename}`), (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`output_${filename} New Directory created successfully !!`);
            // create spdl file
            fs.writeFile(path.join(__dirname, `${ph}\\output_${filename}\\${filename}.spdl`), contentfile, function(err, contents) {
                if (contents) {

                    console.log("create spdl file successfully !!", contents);
                }
                if (err) {
                    console.log("create spdl file failed.  ", err);
                    return;
                }
            });
            fs.access(__dirname + `${ph}\\output_${filename}\\`, (error) => {
                // To check if the given directory 
                // already exists or not
                if (error) {
                    // If current directory does not exist
                    // then create it
                    // create output dir
                    fs.mkdir(path.join(__dirname + `\\${ph}\\output_${filename}\\`, `output`), (error) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log("output Directory created successfully !!");
                            return fs.readdirSync(path.join(__dirname, ph));
                        }
                    });

                } else {
                    console.log("Given Directory already exists !!");
                }
            });

        }
    });

}

// window.file_exists = function(filename){
//     const fs = require("fs");
//     const path = require('path')

//     try {

//         if

//     } catch (error) {

//     }
// }
// window.read_file = function(filename) {
//     fs = require('fs');
//     const path = require('path')
//     var dataF
//     fs.readFile(path.join(__dirname, filename), 'utf8', (err, data) => {
//         if (err) {
//             console.log(err)
//             return
//         } else {
//             console.log(data)
//             return data
//         }
//     })
// // }

// contextBridge.exposeInMainWorld('myAPI', {
//     read_file: (filename) => {
//         const fs = require('fs');
//         const path = require('path')
//         fs.readFile(path.join(__dirname, filename), 'utf8', (err, data) => {
//             if (err) {
//                 console.log(err)
//                 return
//             } else {
//                 console.log(data)
//                 return data
//             }
//         })
//     }
// })