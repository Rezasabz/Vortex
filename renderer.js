// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var project_dir
var path
    //\ anbx file \//
var anbxFile = `${window.currentPath()}\\elctron-vortext-1.0.0\\analyz_engin\\anbx\\examples\\Amended_NSCK.AnBx`;

//\ proverif exe \//
var execProverif = `${window.currentPath()}\\elctron-vortext-1.0.0\\analyz_engin\\proverif2.00\\proverif.exe`;

//\ anbx exe \//
var execAnbx = `${window.currentPath()}\\elctron-vortext-1.0.0\\analyz_engin\\anbx\\anbxc.exe`;

//\ anbx config file \//
var anbxcfg = `${window.currentPath()}\\elctron-vortext-1.0.0\\analyz_engin\\anbx\\anbxc.cfg`;

//\ dot exe \//
var execDot = `${window.currentPath()}\\elctron-vortext-1.0.0\\analyz_engin\\dot\\dot.exe`;

//\ scyther \//
var exeScyther = `${window.currentPath()}\\elctron-vortext-1.0.0\\analyz_engin\\scyther\\scyther-w32.exe`;

function onClick(file) {
    //\ Run cmd \//
    window.openGaeme(execAnbx, [file, '-out:PV', '-cfg', anbxcfg, '-pvnomutual']);
    // window.openGaeme(execAnbx, ['-help']);
}

function runDot(path, typeFile) {
    var get_type
    var pathDir = `${window.currentPath()}\\elctron-vortext-1.0.0\\${path}\\`
    try {
        console.log("pathDir ", pathDir)
        var file_list = window.getListFilesInDir(path)
        if (file_list.length == 0) {
            return false
        }
    } catch (error) {
        console.log("error ", error)
        return false
    }

    console.log("file_list ", file_list)

    file_list.forEach(element => {
        console.log("element ", `${pathDir}${element.name}`)
        if (element.name.search('.dot') != -1) {
            // window.makedir(`${window.currentPath()}\\elctron-vortext-1.0.0\\${path}\\graph`)
            switch (typeFile) {
                case 'png':
                    get_type = '-Tpng'
                    break;
                case 'jpg':
                    get_type = '-Tjpg'
                    break;
                case 'pdf':
                    get_type = '-Tpdf'
                    break;
                case 'json':
                    get_type = '-Tjson'
                    break;
            }
            window.openGaeme(execDot, [get_type, '-O', `${pathDir}${element.name}`]);
        } else {
            console.log('no dot file')
        }
    });

    return true
}

function new_Project(filename) {
    path = `\\${filename}`
    var createDir = window.makedir(path);
    setTimeout(() => {
        window.makeFile(`${window.currentPath()}\\elctron-vortext-1.0.0\\${filename}\\${filename}.project`, 'test')
    }, 1000);
    console.log('dir not exist ', createDir)

    return createDir;
}

function runScyther(dotFile, file) {

    window.setPath(`${window.currentPath()}\\elctron-vortext-1.0.0\\${file}\\output_${dotFile}\\output\\${dotFile}.json`)

    window.run_cmd(exeScyther, ['-d', `--output=${window.currentPath()}\\elctron-vortext-1.0.0\\${file}\\output_${dotFile}\\output\\${dotFile}.dot`, `${window.currentPath()}\\elctron-vortext-1.0.0\\${file}\\output_${dotFile}\\${dotFile}.spdl`])

    setTimeout(() => {
        runDot(`${file}\\output_${dotFile}\\output`, 'pdf')
            // runDot(`${file}\\output`, 'pdf')
    }, 1000);
}

function createFile(path, filename, contentfile) {
    window.makeFile(`${window.currentPath()}\\elctron-vortext-1.0.0\\${path}\\${filename}.AnBx`, contentfile)
    project_dir = `${path}\\`
}

function createFileJSON(path, filename, contentfile) {
    window.makeFile(`${window.currentPath()}\\elctron-vortext-1.0.0\\${path}\\${filename}.json`, contentfile)
    project_dir = `${path}\\`
}

function createFileCss(path, filename, contentfile) {
    window.makeFile(`${window.currentPath()}\\elctron-vortext-1.0.0\\${path}\\outPV\\${filename}.css`, contentfile)
    project_dir = `${path}\\`
}

function createFileSpdl(ph, filename, contentfile) {

     window.exec_spdl(ph, filename, contentfile)

    // console.log("=================>", `${window.currentPath()}\\elctron-vortext-1.0.0\\${path}\\output`)
    // window.makedir(`${path}\\output_${path}`)
    // setTimeout(() => {
    //     window.makedir(`${path}\\output_${path}\\output`)
    // }, 350);
    // // window.copyFile(filename, `${window.currentPath()}\\elctron-vortext-1.0.0\\${path}\\${dest}`)
    // setTimeout(() => {
    //     window.makeFile(`${window.currentPath()}\\elctron-vortext-1.0.0\\${path}\\output_${path}\\${filename}`, contentfile)
    // }, 450);

}

function proverif(file, pth) {
    window.makedir(`${pth}\\outPV`)
    window.openGaeme(execProverif, ['-html', `${window.currentPath()}\\elctron-vortext-1.0.0\\${pth}\\outPV`, `${window.currentPath()}\\elctron-vortext-1.0.0\\${pth}\\${file}`]);
}

function getListFiles(ph) {
    return window.getListFilesInDir(`${window.currentPath()}\\elctron-vortext-1.0.0\\${ph}`)
}

function ReplaceCharInFile(file) {
    var flag = false
    var get_file_list = window.getListFilesInDir(file)

    get_file_list.forEach(element => {
        if (element.includes('.pv')) {
            window.editFilePv(`${file}\\${element}`)
            if (window.isFileLocked(`${file}\\${element}`)) {
                setTimeout(() => {
                    console.log('file locked')
                }, 1000);

            }
            flag = true
        } else {
            flag = false
        }
    })

    return flag
}

function readFile(file, pth) {
    return window.get_file_data(`${window.currentPath()}\\elctron-vortext-1.0.0\\${pth}\\${file}`)
}

function check_locked_file(file) {
    return window.isFileLocked(file)
}
// function create_dir(pathName) {
//     window.makedir(`${window.currentPath()}\\elctron-vortext-1.0.0\\${pathName}\\output`)
// }