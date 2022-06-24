//#region Global Variables
var container_id
var count = 0
var counter_treewiew = 0
var partner_counter = 0
var arrow_count = 0
var container_conut = 0
var opt = getFormId('options')
var opt_note = getFormId('options_note')
var btn_param = getFormId('submit_btn')
var btn_edit = getFormId('edit_btn')
var btn_delete = getFormId('btn_delete')
var btn_delete_note = getFormId('btn_delete_note')
var btn_init = getFormId('btn_init')
var btn_delete_partner = getFormId('btn_delete_partner')
var btn_key = getFormId('btnradio1')
var btn_json = getFormId('json')
var btn_anb = getFormId('anb')
var btn_pv = getFormId('build-pv')
var btn_spdl = getFormId('spdl')
var btn_build = getFormId('BuildApp')
var open_file = getFormId('open_file')
let currentShape;
var line_hg = 200
var shape_id = ''
var parent_shape = document.getElementById('parent-shape').addEventListener('dragstart', (e) => {
    shape_id = e.target.id
})

var protocol_name = ''
var spdl_file_name = ''

var MAX_WIDTH = 3000;
var MAX_HEIGHT = 3000;
// index for array partner use in RUN function
var array_partner
var array_partner_index

var currentGroupName = {};

var target = ''
var tr_target = ''

var group_ = {
    x: {},
    y: {},
    name,
}
var obj_partner = {}
    //--------- هنگام ویرایش پیام آی دی پیام و آی دی نوت به ایونت ثبت فرم ارسال می شوند ------------//
var from_index = {
        arrow_index: '',
        rect_index: ''
    }
    // var connect_node2 = {
    //     id: 1000,
    //     from: '',
    //     to: '',
    //     arrow: '',
    //     message: {},
    //     note: {}
    // }

//---------- اندیس گروه کلیک شده ------------//
// این فلگ برای ثبت فرم مورد استفاده قرار می گیرد
var flag_cliced_group
    //-----------------------------------------//
    //#endregion

//#region Global Arrays
var rect_list = []
var send_list = []
var arrow_list = []
var params_dictinary = []
var init_list = []
var params_arr = []
var array_json = []
var macro_list = []
var function_array = []
var nonce_array = []
var array_state_note = []
var key_word_list = ["Hash(message)", "Mac(message,key)", "Enc(message,key)", "Dec(message,key)", "Sign(message,privateKey)", "VerifyMac(message,key)", "VerifySign(sign,publicKey)", "AEnc(message,publicKey)", "ADec(message,privateKey)"]
var default_function_name = ["Hash", "Mac", "Enc", "Dec", "Sign", "VerifyMac", "VerifySign", "AEnc", "ADec", "inv", "sk", "pk"]
var global_partner_list = {
        partners: []
    }
    // for tagify reciver 
var reciver_list = []
var undo_redo_list = []
var undo_redo_index = undo_redo_list.length - 1
const CONST_CLIPBOARD_SIZE = 10

// آرایه ای از کلیدها با مشخصه پارتنرهای مربوطه
// این آرایه برای تبدیل کلیدها به فرمت ANBX استفاده می شوند. =====> shk(A,B)
// obj_key_from_to_list = {key: '', from: '', to: ''}
var key_from_to_list = []
    // Knowledge List
var knowledge_list = []

// پس از اجرای دکمه run تمام خطاها در این لیست ذخیره می شود
var result_error_array = []
var result_error_array_tmp = []

//#region Cryptogaraphic Function List
// آرایه های توابع رمزنگاری
// encrypt_obj = {plainText: '', symKey: '', cipherText: ''}
var encrypt_list = []
    // decrypt_obj = {cipherText: '', symKey: '', plainText: ''}
var decrypt_list = []
    // mac_obj = {plainText: '', symKey: '', mac: ''}
var mac_list = []
    // verfyMac_obj = {mac: '', symKey: '', plainText: '', verify: ''}
var verify_mac_list = []
    // aencryp_obj = {plainText: '', Pkey: '', cipherText: ''}
var Aencryp_list = []
    // adecrypt_obj = {cipherText: '', Skey: '', plainText: ''}
var ADecrypt_list = []
    // sign_obj = {plainText: '', Skey: '', sign: ''}
var sign_list = []
    // verifySign_obj = {sign: '', Pkey: '', plainText: '', verify: ''}
var verify_sign_list = []
    // hash_obj = {plainText: '', hash: ''}
var hash_list = []
    // keyPair_obj = {privateKey: '', publicKey: '', ID: ''}
var keyPair_list = []
    // symKey_obj = {key: '', ID: []}
var key_list = []
    // Asym_key_obj = {privateKey: '', publicKey: '', ID: ''}
var Asym_key_list = []
    // counter for encrypt functions 
var encrypt_counter = 0
var decrypt_counter = 0
var mac_counter = 0
var Aencryp_counter = 0
var sign_counter = 0
var hash_counter = 0
var keyPair_counter = 0
var sym_key_counter = 0

const INVALID_VALUE_ENC = 1010
const INVALID_KEY_ENC = 1020

const INVALID_VALUE_DEC = 2010
const INVALID_KEY_DEC = 2020


const INVALID_VALUE_HASH = 3010

const INVALID_VALUE_MAC = 4010
const INVALID_KEY_MAC = 4020

const INVALID_VALUE_SIGN = 5010
const INVALID_KEY_SIGN = 5020

const INVALID_VALUE_AENC = 6010
const INVALID_KEY_AENC = 6020

const INVALID_VALUE_ADEC = 7010
const INVALID_KEY_ADEC = 7020

const INVALID_VALUE_VERIFY_MAC = 8010
const INVALID_KEY_VERIFY_MAC = 8020

const INVALID_VALUE_VERIFY_SIGN = 9010
const INVALID_KEY_VERIFY_SIGN = 9020


const INVALID_KEY_LIST = 10
const INVALID_COMPATIBILITY = 20
const INVALID_VALUE = 30
const UNDEFINE_VALUE = 40
const DUBLICATE_VALUE = 50
const SUCCESSFULL = 0
var stage

//#endregion
//#endregion

//#region Stage Design
// var width = document.getElementById('container').offsetWidth;
// var height = document.getElementById('container').offsetHeight;
var GUIDELINE_OFFSET = 5;

stage = new Konva.Stage({
    container: "container-main",
    // width: 3000,
    width: MAX_WIDTH,
    height: MAX_HEIGHT
});



var project_name
$('#create-project').click(function() {
    project_name = $('#project-name').val();
    new_Project(project_name)

    // delete prop of element
    $('#file-input-label').removeClass('disabled')
    $('#open-file').removeProp("aria-disabled")

    $('.dropdown').find('a').click(function() {
            if ($(this).hasClass('active')) {
                var active_tab = $(this).attr('href')
                stage.container($(this).attr('href').replace('#', ''))
                console.log("active_tab ", active_tab)
            }
        })
        // ---------------------- tree view -------------------------//
    // $('.tree-view').append(`
    //         <details class="tree-nav__item is-expandable my_font" id="detail-${project_name}">
    //         <summary class="tree-nav__item-title"><i class="icon ion-android-folder"></i>${project_name}</summary>
    //         </details>`)
        // ---------------------------------------------------------//

    setTimeout(() => {
        TreeView()
        // var listFile = getListFiles(`${project_name}`);
        // var getfileElements = $(`#pFile-${project_name}`).attr('id')
        // if (getfileElements === undefined || getfileElements === null) {
        //     listFile.forEach((element, idx) => {
        //         if (element !== 'output') {
        //             $(`#detail-${project_name}`).append(`
        //             <div class="tree-nav__item" id="pFile-${project_name}">
        //             <a class="tree-nav__item-title"><i class="icon ion-android-document"></i>${element}</a>
        //             </div>
        //             `)
        //         }

        //     });

        // }
    }, 1000);

    $('#NewProjectModal').modal('toggle')
    $('#project-name').val('');

})



// var contents

function readSingleFile(e) {
    // files that user has chosen
    var all_files = this.files;
    if (all_files.length == 0) {
        alert('Error : No file selected');
        return;
    }

    // first file selected by user
    var file = all_files[0];
    // files types allowed
    // var allowed_types = ['application/json'];
    // if (allowed_types.indexOf(file.type) == -1) {
    //     alert('Error : Incorrect file type');
    //     return;
    // }

    // Max 5 MB allowed
    var max_size_allowed = 5 * 1024 * 1024
    if (file.size > max_size_allowed) {
        alert('Error : Exceeded size 5MB');
        return;
    }

    var reader = new FileReader();


    // file reading finished successfully
    reader.addEventListener('load', function(e) {
        var text = e.target.result;
        var splite_name = file.name.split('.')
        protocol_name = splite_name[0]
        project_name = splite_name[0]
        var extension = ''


        // ---------------------- add treeview ----------------------//
        // delete prop of element
        $('#file-input-label').removeClass('disabled')
        $('#open-file').removeProp("aria-disabled")

        $('.dropdown').find('a').click(function() {
                if ($(this).hasClass('active')) {
                    var active_tab = $(this).attr('href')
                    stage.container($(this).attr('href').replace('#', ''))
                    console.log("active_tab ", active_tab)
                }
            })
            // ---------------------- tree view -------------------------//

            // ---------------------------------------------------------//


        if (splite_name.length > 1) {
            extension = splite_name[splite_name.length - 1]
        }
        if (!(extension == 'project')) {
            alert("Error : Incorrect file type" + extension)
            return
        } else {
            setTimeout(() => {
                TreeView()
            }, 300);

            var protocolName = new Konva.Label({
                x: 10,
                y: 5,
                opacity: 0.75,
            });

            protocolName.add(
                new Konva.Tag({
                    fill: 'yellow',
                })
            );

            protocolName.add(
                new Konva.Text({
                    text: `Protocol Name : ${project_name}`,
                    fontFamily: 'consolas',
                    fontSize: 13,
                    padding: 5,
                    fill: 'black',
                })
            );
            layer.add(protocolName);
        }
        // if (extension === 'AnBx') {
        //     text = AnbxToJson(text)
        // }
        // if (extension === 'pv') {
        //     console.log("pv -======> ", project_name);
        //     $.each($('.main-content > ul > li > a'), function(index, value) {
        //         if ($(this).attr('href') === `#${splite_name[1]}_viewer`) {
        //             console.log("value ====> ", $(this).attr('href'));
        //             // remove active class from all tabs
        //             $('.nav-tabs > li > a').removeClass('active');
        //             $('.tab-pane').removeClass('active');
        //             $(this).addClass('active');
        //             $(`#${splite_name[1]}_viewer`).addClass('active');
        //         }
        //     })
        //     var Output = CodeMirror(document.querySelector("#output_pv"), {
        //         lineNumbers: true,
        //         lineWrapping: true,
        //         tabSize: 2,
        //         value: text,
        //         mode: "javascript",
        //         theme: "material-darker",
        //         keyword: {
        //             "Protocol:": "style4",
        //             "Types:": "style4",
        //             "Definitions:": "style4",
        //             "Knowledge:": "style4",
        //             "Actions:": "style4",
        //             "Goals:": "style4",
        //             "Agent": "style2",
        //             "Number": "style2",
        //             "Symmetric_key": "style2",
        //             "Function": "style2",
        //             "word3": "style3",
        //             "example\.com": "style4",
        //             "abc\\d+": "style2",

        //         }
        //     });



        // }
        // if (extension === 'json') {
        //     var json_text = JSON.parse(text);
        //     open_from_clipboard(json_text)
        //     $('.tree-view').append(`
        //     <details class="tree-nav__item is-expandable my_font" id="detail-${project_name}">
        //     <summary class="tree-nav__item-title"><i class="icon ion-android-folder"></i>${project_name}</summary>
        //     </details>`)

        //     // To Do : show AnBx and pv

        //     TreeView()
        // }
        // if (extension === 'project') {

        //     setTimeout(() => {
        //         var listFile = getListFiles(`${project_name}`);
        //         var getfileElements = $(`#pFile-${project_name}`).attr('id')
        //         if (getfileElements === undefined || getfileElements === null) {
        //             listFile.forEach((element, idx) => {
        //                 if (element !== 'output') {
        //                     $(`#detail-${project_name}`).append(`
        //                 <div class="tree-nav__item" id="pFile-${project_name}">
        //                 <a class="tree-nav__item-title"><i class="icon ion-android-document"></i>${element}</a>
        //                 </div>
        //                 `)
        //                 }

        //             });

        //         }
        //     }, 300);

        // }
        // To Do : show AnBx and pv

        // TreeView()


        // if (text == "") {
        //     alert('Error :File Is Empty!')
        // }

    });

    // file reading failed
    reader.addEventListener('error', function() {
        alert('Error : Failed to read file');
    });



    // read as text file
    reader.readAsText(file);
};


function readpvFile(e) {
    // files that user has chosen
    var all_files = this.files;
    if (all_files.length == 0) {
        alert('Error : No file selected');
        return;
    }

    // first file selected by user
    var file = all_files[0];
    // files types allowed
    // var allowed_types = ['application/json'];
    // if (allowed_types.indexOf(file.type) == -1) {
    //     alert('Error : Incorrect file type');
    //     return;
    // }

    // Max 5 MB allowed
    var max_size_allowed = 5 * 1024 * 1024
    if (file.size > max_size_allowed) {
        alert('Error : Exceeded size 5MB');
        return;
    }

    var reader = new FileReader();

    // var path_file = reader.readAsDataURL(file);
    // console.log("path_file ====> ", path_file);
    // file reading finished successfully
    reader.addEventListener('load', function(e) {
        var text = e.target.result;
        var splite_name = file.name.split('.')
            // path file

        // protocol_name = splite_name[0]
        // project_name = splite_name[0]
        var extension = ''
        if (splite_name.length > 1) {
            extension = splite_name[splite_name.length - 1]
        }
        console.log("extension ====> ", extension);
        if (!(extension == 'AnBx' || extension == 'json' || extension == 'pv' || extension == 'spdl')) {
            alert("Error : Incorrect file type" + extension)
            return
        }
        if (extension === 'AnBx') {
            text = AnbxToJson(text)
        }
        if (extension === 'pv') {
            spdl_file_name = splite_name[0]
            console.log("pv -======> ", project_name);
            $.each($('.main-content > ul > li > a'), function(index, value) {
                if ($(this).attr('href') === `#${splite_name[1]}_viewer`) {
                    // $('#build-pv').removeClass('disabled')
                    // $('#build-pv').removeProp('aria-disabled')
                    console.log("value ====> ", $(this).attr('href'));
                    // remove active class from all tabs
                    $('.nav-tabs > li > a').removeClass('active');
                    $('.tab-pane').removeClass('active');
                    $(this).addClass('active');
                    $(`#${splite_name[1]}_viewer`).addClass('active');
                }
            })


            var Output = CodeMirror(document.querySelector("#output_pv"), {
                lineNumbers: true,
                lineWrapping: true,
                tabSize: 2,
                value: text,
                mode: "javascript",
                theme: "material-darker",
                keyword: {
                    "Protocol:": "style4",
                    "Types:": "style4",
                    "Definitions:": "style4",
                    "Knowledge:": "style4",
                    "Actions:": "style4",
                    "Goals:": "style4",
                    "Agent": "style2",
                    "Number": "style2",
                    "Symmetric_key": "style2",
                    "Function": "style2",
                    "word3": "style3",
                    "example\.com": "style4",
                    "abc\\d+": "style2",

                }
            });



        }

        if (extension === 'spdl') {
            // console.log("spdl -======> ", text);
            spdl_file_name = splite_name[0]
                // setTimeout(() => {
            createFileSpdl(project_name, spdl_file_name, text)
                // }, 500);
            $('#spdl').removeClass('disabled')
            $('#spdl').removeProp('aria-disabled')
                // TreeViewFile()
            $.each($('.main-content > ul > li > a'), function(index, value) {
                if ($(this).attr('href') === `#${splite_name[1]}_viewer`) {
                    console.log("value ====> ", $(this).attr('href'));
                    // remove active class from all tabs
                    $('.nav-tabs > li > a').removeClass('active');
                    $('.tab-pane').removeClass('active');
                    $(this).addClass('active');
                    $(`#${splite_name[1]}_viewer`).addClass('active');
                }
            })
            var OutputSpdl = CodeMirror(document.querySelector("#output_scyther"), {
                lineNumbers: true,
                lineWrapping: true,
                tabSize: 2,
                value: text,
                mode: "javascript",
                theme: "material-darker",
                keyword: {
                    "Protocol:": "style4",
                    "Types:": "style4",
                    "Definitions:": "style4",
                    "Knowledge:": "style4",
                    "Actions:": "style4",
                    "Goals:": "style4",
                    "Agent": "style2",
                    "Number": "style2",
                    "Symmetric_key": "style2",
                    "Function": "style2",
                    "word3": "style3",
                    "example\.com": "style4",
                    "abc\\d+": "style2",

                }
            });



        }

        setTimeout(() => {
            TreeView()
        }, 1000);
        // if (text == "") {
        //     alert('Error :File Is Empty!')
        // }

    });

    // file reading failed
    reader.addEventListener('error', function() {
        alert('Error : Failed to read file');
    });



    // read as text file
    reader.readAsText(file);
};

document.getElementById('open-file').addEventListener('change', readpvFile, false);

document.getElementById('open_project')
    .addEventListener('change', readSingleFile, false);

// $('#open_project').click((e) => {

//     var file = e.target.files;
//     if (!file) {
//         return;
//     }
//     var reader = new FileReader();
//     reader.onload = function(e) {
//         contents = e.target.result;
//         console.log("content ====> ", contents)

//     };
//     reader.readAsText(file);

// })



var layer = new Konva.Layer();
stage.add(layer)
var container = stage.container()
var containerRect = stage.container().getBoundingClientRect();
//#endregion


//#region Form



//#region Send Form
// function transformTag(tagData) {
//     var check_valid = error_handler_func(tagData.value)
//     if (check_valid == false) {
//         tagData.__isValid = false
//         tagData.color = "hsl(353.4,40.5%,69%)"
//         tagData.style = "--tag-bg:" + tagData.color;
//     } else {
//         tagData.__isValid = true
//         tagData.color = "hsl(218, 100%, 58%)"
//     }
// }
function transformTag(tagData) {
    tagData.color = "hsl(230.9,98.8%,66.1%)";
    tagData.style = "--tag-bg:" + tagData.color + ";" + "--tag-text-color:#FFF" + ";" + "--tag-remove-btn-color:#FFF" + ";" + "--tag-hover:#1A237E" + ";" + "--tag-remove-bg:rgba(179, 9, 9, 0.3)";

}
var input_reciver = new Tagify(document.querySelector('input[name=reciver]'), {
    // whitelist: reciver_list,
    // maxTags: 10,
    userInput: false,
    transformTag: transformTag,
    dropdown: {
        maxItems: 20, // <- mixumum allowed rendered suggestions
        classname: "tags-look", // <- custom classname for this dropdown, so it could be targeted
        enabled: 0, // <- show suggestions on focus
        closeOnSelect: false // <- do not hide the suggestions dropdown once an item has been selected
    }
})
var input_def = new Tagify(document.querySelector('input[name=define]'), {
    whitelist: key_word_list,
    // maxTags: 10,
    transformTag: transformTag,
    dropdown: {
        maxItems: 20, // <- mixumum allowed rendered suggestions
        classname: "tags-look", // <- custom classname for this dropdown, so it could be targeted
        enabled: 0, // <- show suggestions on focus
        closeOnSelect: false // <- do not hide the suggestions dropdown once an item has been selected
    }
})
var input_params = new Tagify(document.querySelector('input[name=params]'), {
    whitelist: key_word_list,
    // maxTags: 10,
    transformTag: transformTag,
    dropdown: {
        maxItems: 20, // <- mixumum allowed rendered suggestions
        classname: "tags-look", // <- custom classname for this dropdown, so it could be targeted
        enabled: 0, // <- show suggestions on focus
        closeOnSelect: false // <- do not hide the suggestions dropdown once an item has been selected
    }
})



var input_sym = new Tagify(document.querySelector('input[name=sym]'), {
    whitelist: key_word_list,
    maxTags: 10,
    transformTag: transformTag,
    dropdown: {
        maxItems: 20, // <- mixumum allowed rendered suggestions
        classname: "tags-look", // <- custom classname for this dropdown, so it could be targeted
        enabled: 0, // <- show suggestions on focus
        closeOnSelect: false // <- do not hide the suggestions dropdown once an item has been selected
    }
})
var input_Asym = new Tagify(document.querySelector('input[name=Asym]'), {
    // whitelist: test_whitelist,
    userInput: false,
    maxTags: 10,
    transformTag: transformTag,
    dropdown: {
        maxItems: 20, // <- mixumum allowed rendered suggestions
        classname: "tags-look", // <- custom classname for this dropdown, so it could be targeted
        enabled: 0, // <- show suggestions on focus
        closeOnSelect: false // <- do not hide the suggestions dropdown once an item has been selected
    }
})

//#endregion

let inputs = [input_reciver, input_def, input_params]

function remove_all_tag(inputs) {

    if (inputs != null) {
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].removeAllTags()
        }
    }
}

//#region Form Edit
// ----- دکمه ثبت تغییرات در فرم ------//
btn_param.addEventListener('click', (e) => {
    var msg_obj = {}
    var reciver_value = $('input[name=reciver]').val()
    var define_value = $('input[name=define]').val()
    var params_value = $('input[name=params]').val()
    let index_arrow
    let flag = false
    let flag_new_message = false

    var check_reciver = JSON.parse(reciver_value).map(function(elem) {
        return elem.value;
    })

    rect_list.filter(ex => {
        if (ex.children[1].text() === check_reciver[0]) {
            flag = true
        }

    })

    if ((check_reciver[0] !== '') && flag && (check_reciver[0] !== rect_list[from_index.rect_index].children[1].text())) {

        let define = define_value != '' ? JSON.parse(define_value).map(function(elem) {
            return elem.value;
        }) : []

        let params = params_value != '' ? JSON.parse(params_value).map(function(elem) {
            return elem.value;
        }) : []

        function_array = []
        nonce_array = []
        var err = SUCCESSFULL

        if ((define_value != '' || params_value != '') && err === SUCCESSFULL) {
            write_to_undo_redo_list()

            if (from_index.arrow_index != -1) {
                index_arrow = from_index.arrow_index
                    // arrow_list[index_arrow].arrow.destroy()
            } else {
                flag_new_message = true
                var connect_node2 = {
                    id: -1,
                    from: '',
                    to: '',
                    arrow: '',
                    message: {},
                    abstract_msg: []
                }
                connect_node2.id = arrow_list.length
                index_arrow = connect_node2.id
                arrow_list.push(connect_node2)
                connect_node2.from = rect_list[from_index.rect_index].children[1].text()
            }

            rect_list.forEach((rc, idx) => {

                if (rc.children[1].attrs.text === check_reciver[0]) {
                    if (NotEmpty(obj_partner))
                        obj_partner = {}

                    obj_partner.reciver = reciver_value != '' ? JSON.parse(reciver_value).map(function(elem) {
                        return elem.value;
                    }) : []
                    arrow_list[index_arrow].to = rc.children[1].attrs.text
                }
            })
            obj_partner.define = define_value != '' ? JSON.parse(define_value).map(function(elem) {
                return elem.value;
            }) : []

            msg_obj.define = obj_partner.define
            obj_partner.params = params_value != '' ? JSON.parse(params_value).map(function(elem) {
                return elem.value;
            }) : []
            msg_obj.params = obj_partner.params
            arrow_list[index_arrow].message = msg_obj
            obj_partner.partnerName = arrow_list[index_arrow].from
            obj_partner.sender = arrow_list[index_arrow].from
            send_list.push(obj_partner)

            if (flag_new_message) {
                draw_arrow_from_arrow_list(index_arrow)
            } else {
                macro_list = []
                for (let i = 0; i < arrow_list.length; i++) {
                    console.log("i ))))))> ", i)
                    arrow_list[i].arrow.destroy()
                    draw_arrow_from_arrow_list(i)
                }
            }
            line_height += 50

            $('#staticBackdrop').modal('toggle')
            opt.style.display = 'none'
            opt_note.style.display = 'none';
            tr.nodes([])
            remove_all_tag(inputs)
        } else {

            Swal.fire({
                icon: 'error',
                title: err,
                text: '! مقادیر ورودی خالی است ',
            })
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'خطا',
            text: 'گیرنده نامعتبر است',
        })
    }

})


//#endregion


//#region Delete arrow
function delete_arrow(index) {
    var index_connect_node = arrow_list[index]
    index_connect_node.arrow.destroy()
    arrow_list.splice(index, 1)
    for (let i = 0; i < arrow_list.length; i++) {
        arrow_list[i].arrow.destroy()
        draw_arrow_from_arrow_list(i)
    }
}
//#endregion

//#region Delete Function
function delete_function(btn_id) {
    var delete_index = []
    btn_id.addEventListener('click', (e) => {
        Swal.fire({
            title: 'آیا از حذف مورد اطمینان دارید؟',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                write_to_undo_redo_list()
                if (from_index.arrow_index !== -1) {
                    macro_list = []
                    delete_arrow(from_index.arrow_index)
                } else {
                    let rect_index = rect_list[from_index.rect_index]
                    let partner_name = rect_index.children[1].text()
                    arrow_list.forEach((a, idx) => {
                        if (a.from === rect_index.children[1].text() || a.to === rect_index.children[1].text()) {
                            a.arrow.destroy()
                            delete_index.push(idx)
                        }
                    })

                    var filtered = []
                    filtered = arrow_list.filter(function(a) {
                        return !(a.from === rect_index.children[1].text() || a.to === rect_index.children[1].text())
                    });
                    arrow_list = filtered
                    macro_list = []
                    arrow_list.forEach((a, idx) => {
                        draw_arrow_from_arrow_list(idx)
                    })

                    rect_index.destroy()
                    rect_list.splice(from_index.rect_index, 1)
                    partner_flag = true
                    var sk_index
                    key_list.filter((sk, idx) => {
                        if (sk.partner === partner_name) {
                            partner_flag = true
                            sk_index = idx
                        }
                    })
                    if (partner_flag == true) {
                        key_list.splice(sk_index, 1)
                    }

                }

                opt.style.display = 'none'
                opt_note.style.display = 'none'
                tr.nodes([])
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                })

                Toast.fire({
                    icon: 'success',
                    title: 'حذف انجام شد'
                })
            }
        })

    })
}

delete_function(btn_delete_note)
delete_function(btn_delete_partner)

//#endregion
//#region Update Arrow List
//#region Update Arrow List
//--------- مختصات فلش، برچسب و نوت را تنظیم می کند ---------//
function arrow_group_coordinates(index) {

    var arrow_tmp = arrow_list[index]
        // console.log(arrow_tmp)
    arrow_tmp.arrow.children[0].y((2 * Dimensions.rect.height) * (index + 1))
    var labelArrow = arrow_tmp.arrow.children[1]
    var measure_text = labelArrow.measureSize(labelArrow.text())
    var arrow_getX = arrow_tmp.arrow.children[0].getX() + 10
    var distance_partner = arrow_tmp.arrow.children[0].points()[2]
    var noteX = arrow_getX
    var labelX = arrow_getX
    if (distance_partner >= 0) {
        noteX -= (arrow_tmp.arrow.children[2].children[0].getClientRect().width + 20)
    } else {

        labelX -= (measure_text.width + 20)
    }

    var updated_arrow_y = arrow_tmp.arrow.children[0].getY()
    arrow_tmp.arrow.children[1].y(updated_arrow_y - measure_text.height)
    arrow_tmp.arrow.children[2].y(updated_arrow_y - arrow_tmp.arrow.children[2].children[0].getClientRect().height)

    arrow_tmp.arrow.children[1].x(labelX)
    arrow_tmp.arrow.children[2].x(noteX)

}


//#endregion
//#endregion
//#endregion

//#region Save
function save_source_to_clipboard() {
    var output = {
        partners: [],
        arrows: [],
        key_list: key_list,
    }
    rect_list.forEach((rect, index) => {
        var partner = {
            name: '',
            pos: {
                x: '',
                y: '',
            },

        }
        partner.name = rect.children[1].text()
        partner.pos.x = rect.getX()
        partner.pos.y = rect.getY()
        output.partners.push(partner)
    })

    arrow_list.forEach((ar, index) => {
        var arrow = {
            from: '',
            to: '',
            message: ''
        }
        arrow.from = ar.from
        arrow.to = ar.to
        arrow.message = ar.message
        output.arrows.push(arrow)
    })

    return output
}

function save_source_to_file(path = '') {
    var src_from_clipboard = save_source_to_clipboard()
    var blob = new Blob([JSON.stringify(src_from_clipboard)], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, "sample.json");

}

function save_code_to_file(formatFile, textFile) {
    var blob = new Blob([textFile], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, `${project_name}\\${project_name}.${formatFile}`);

}


btn_json.addEventListener('click', (e) => {
        save_source_to_file()
    })
    //#endregion

//#region Open File
function open_from_clipboard(src_from_clipboard) {
    // stage.clear()
    // stage.clearCache()
    arrow_list.forEach((ar, index) => {
        ar.arrow.destroy()
    })
    rect_list.forEach((rect, index) => {
        rect.destroy()
    })
    arrow_list = []
    rect_list = []
    key_list = []
    macro_list = []
    var partner = src_from_clipboard.partners
    var arrow = src_from_clipboard.arrows
    key_list = src_from_clipboard.key_list
    partner.forEach((p, index) => {
        var make_partner = create_partner(p.name, p.pos)
        rect_list.push(make_partner)
        reciver_list.push(p.name)
    })

    console.log("macro list 1 ", macro_list)
    arrow.forEach((a, index) => {
        arrow_list.push({ "id": index, "from": a.from, "to": a.to, "arrow": '', "message": a.message })
        draw_arrow_from_arrow_list(index)
    })

    console.log("macro list 2 ", macro_list)
}

// function open_file() {
// document.querySelector("#file-input").addEventListener('change', function() {
//     // files that user has chosen
//     var all_files = this.files;
//     if (all_files.length == 0) {
//         alert('Error : No file selected');
//         return;
//     }

//     // first file selected by user
//     var file = all_files[0];
//     // files types allowed
//     var allowed_types = ['application/json'];
//     // if (allowed_types.indexOf(file.type) == -1) {
//     //     alert('Error : Incorrect file type');
//     //     return;
//     // }

//     // Max 5 MB allowed
//     var max_size_allowed = 5 * 1024 * 1024
//     if (file.size > max_size_allowed) {
//         alert('Error : Exceeded size 5MB');
//         return;
//     }

//     var reader = new FileReader();


//     // file reading finished successfully
//     reader.addEventListener('load', function(e) {
//         var text = e.target.result;
//         var splite_name = file.name.split('.')
//         var extension = ''
//         if (splite_name.length > 1) {
//             extension = splite_name[splite_name.length - 1]
//         }
//         if (!(extension == 'AnBx' || extension == 'json')) {
//             alert("Error : Incorrect file type" + extension)
//             return
//         }
//         if (extension === 'AnBx') {
//             text = AnbxToJson(text)
//         }
//         var json_text = JSON.parse(text);
//         open_from_clipboard(json_text)
//         console.log("********* 1 ", macro_list)

//         // اجرای توابع کامپایل
//         // Execute()

//         //-----------------------
//         protocol_name = json_text.protocol
//             // protocolName label
//         var protocolName = new Konva.Label({
//             x: 10,
//             y: 5,
//             opacity: 0.75,
//         });

//         protocolName.add(
//             new Konva.Tag({
//                 fill: 'yellow',
//             })
//         );

//         protocolName.add(
//             new Konva.Text({
//                 text: `Protocol Name : ${project_name}`,
//                 fontFamily: 'consolas',
//                 fontSize: 13,
//                 padding: 5,
//                 fill: 'black',
//             })
//         );
//         layer.add(protocolName);
//         if (text == "") {
//             alert('Error :File Is Empty!')
//         }
//     });

//     // file reading failed
//     reader.addEventListener('error', function() {
//         alert('Error : Failed to read file');
//     });

//     // read as text file
//     reader.readAsText(file);


// });

// }
// open_file()
//#endregion

//#region Undo & Redo
function write_to_undo_redo_list() {

    if (undo_redo_index < undo_redo_list.length - 1) {
        undo_redo_list.splice(undo_redo_index + 1, undo_redo_list.length - undo_redo_index - 1)
    }

    if (undo_redo_list.length > CONST_CLIPBOARD_SIZE)
        undo_redo_list.shift()

    undo_redo_list.push(save_source_to_clipboard())
    undo_redo_index = undo_redo_list.length - 1
}

function undo_redo(index) {
    var output = {
        partners: [],
        arrows: []
    }
    if (index >= 0 && index < undo_redo_list.length) {
        if (undo_redo_list[index] != null) {
            output = undo_redo_list[index]
        }
        open_from_clipboard(output)
    }
}
$("#redo").on('click', (e) => {
    if (undo_redo_index >= 0 && undo_redo_index < undo_redo_list.length) {
        undo_redo(undo_redo_index)
        if (undo_redo_index < undo_redo_list.length - 2)
            undo_redo_index++
    }
})
$("#undo").on('click', (e) => {
        if (undo_redo_index >= 0 && undo_redo_index < undo_redo_list.length) {
            undo_redo(undo_redo_index)
            if (undo_redo_index > 0)
                undo_redo_index--

        }
    })
    //#endregion
    //#region Global Functions
    //#region Capitalize First Letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
//#region Partner Shape  
//----- ساختن اشیا پارتنر ---------//
function create_partner(lbl, pos) {
    var labelName = new Konva.Text({
        fontFamily: 'Consolas',
        fontSize: 16,
        padding: 5,
        fill: 'black',
        text: lbl,
        align: 'center',

    })
    var rec = new Konva.Rect({
        width: Dimensions.rect.width,
        height: Dimensions.rect.height,
        fill: '#FFCCCC',
        stroke: '#5864bd',
        strokeWidth: 2,
        // shadowOpacity: 0.4,
        // shadowBlur: 2,
        // shadowColor: 'black',
        // shadowOffset: {
        //     x: 1,
        //     y: 1
        // },
        cornerRadius: [5, 5, 5, 5],
        id: "rect" + count,
    })
    var line = new Konva.Line({
        points: [50, 50, 50, 220, 50, line_hg],
        stroke: '#5864bd',
        strokeWidth: 3,
        lineJoin: 'round',
        dash: [33, 10],
        draggable: false,
    })
    var group = new Konva.Group({
        x: pos.x,
        y: pos.y,
        // draggable: true,
        name: "partner" + (partner_counter),
        rotation: 0,
        id: "rect" + count,
    })
    partner_counter++
    var resize_gr = new Konva.Transformer({
        ignoreStroke: true,
        borderDash: [3, 3],
        centeredScaling: true,
        rotationSnaps: [0, 90, 180, 270],
        padding: 5,
    })

    group.add(rec, labelName, line)
    var measure_text = labelName.measureSize(labelName.text())

    labelName.absolutePosition({
        x: group.attrs.x - (measure_text.width / 2) + (group.children[0].attrs.width / 2) - 5,
        y: group.attrs.y - (measure_text.height / 2) + (group.children[0].attrs.height / 2) - 5,
    })

    count++
    layer.add(group)

    return group
}
//#endregion
//#region Note
//----- اشیا داخل شکل نوت ---------//
function not_new() {
    var note_maker = {
        text_note: new Konva.Text({
            fontSize: 13,
            fontFamily: 'Calibri',
            fill: '#000',
            width: 130,
            padding: 5,
            align: 'left'
        }),

        base_node: new Konva.Rect({
            width: 165,
            fill: '#fdfd80',
            shadowOpacity: 0.4,
            shadowBlur: 2,
            cornerRadius: [0, 0, 0, 0],
            shadowColor: 'black',
            shadowOffset: {
                x: 1,
                y: 1
            },
            strokeWidth: 4,
        }),
        note_group: new Konva.Group({

            width: 130,
            height: 25,
            draggable: true,
            id: "note_" + arrow_count,
            name: "note_" + arrow_count
        })
    }
    return note_maker
}
//#endregion
function add_element_to_array_if_not_exist(array, partner_list, element, val, labelName) {
    var flag = false
    if (array.length !== 0) {
        array.forEach(a => {
            if (a.children[2].attrs.text === val) {
                flag = true
                return
            } else if (a.attrs.id === element.attrs.id && flag == false) {
                flag = true
                element.add(labelName)
                labelName.text(val)
                var measure_text = labelName.measureSize(labelName.text())
                labelName.absolutePosition({
                    x: element.attrs.x - (measure_text.width / 2) + (element.children[1].attrs.width / 2) - 5,
                    y: element.attrs.y - (measure_text.height / 2) + (element.children[1].attrs.height / 2) - 5,
                })
            }

        })
    }
    if (array.length === 0 || flag == false) {
        array.push(element)
        element.add(labelName)

        labelName.text(val)
        var measure_text = labelName.measureSize(labelName.text())
        labelName.absolutePosition({
            x: element.attrs.x - (measure_text.width / 2) + (element.children[1].attrs.width / 2) - 5,
            y: element.attrs.y - (measure_text.height / 2) + (element.children[1].attrs.height / 2) - 5,
        })
        array_json.push(element.toJSON())
    }
}

//#endregion

// // run exe file in js
// function run_exe(exe_path) {
//     var exec = require('child_process').exec;
//     exec(exe_path, function(error, stdout, stderr) {
//         if (error) {
//             console.log(error);
//         }
//         console.log(stdout);
//     });
// }

// var run = new ActiveXObject('WSCRIPT.Shell').Run("commands to run");

// var objShell = new ActiveXObject("WSCRIPT.Shell");
// objShell.ShellExecute("cmd.exe", "C: cd C:\\pr main.exe blablafile.txt auto", "C:\\WINDOWS\\system32", "open", "1");

//#region Event Handlers
container.addEventListener('dragover', (e) => {
    e.preventDefault()

})

container.addEventListener('drop', (e) => {
    e.preventDefault()
    stage.setPointersPositions(e)
    console.log("drop")
    var label = `Partner${partner_counter}`
    var pos = stage.getPointerPosition()
    if (shape_id == 'square') {
        write_to_undo_redo_list()
        var partner = create_partner(label, pos)
        rect_list.push(partner)

        // اضافه کردن نام پارتنرهای به لیست دریافت کننده ها
        reciver_list.push(partner.children[1].text())


    }
    if (shape_id == 'circle') {
        var circle = new Konva.Circle({
            x: pos.x,
            y: pos.y,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
        });

        console.log(circle)
            // add the shape to the layer
        layer.add(circle);
        stage.add(layer);
    }
})


btn_init.addEventListener('click', (e) => {
        var name_value = $('input[name=name]').val()
        var sym_value = $('input[name=sym]').val()
        var Asym_value = $('input[name=Asym]').val()
        var rc = rect_list[from_index.rect_index]
        var old_name = rc.children[1].attrs.text
        var new_name = old_name
        var flag = true
        var partner_flag = false
        reciver_list = []

        rect_list.filter((ex, idx) => {
            if (ex.children[1].attrs.text === name_value && idx != from_index.rect_index) {
                flag = false
            }

        })

        if (name_value !== "" && flag) {
            write_to_undo_redo_list()
            new_name = name_value
            arrow_list.filter(ar => {
                if (ar.from == old_name) {
                    ar.from = name_value
                }
                if (ar.to == old_name) {
                    ar.to = name_value
                }
            })

            var sym = sym_value != '' ? JSON.parse(sym_value).map(function(elem) {
                return elem.value;
            }) : []

            var Asym = Asym_value != '' ? JSON.parse(Asym_value).map(function(elem) {
                return elem.value;
            }) : []


            Asym_key_list = []

            Asym.forEach(a => {
                let sp = a.replace(/\(?\)?/g, '').split(',')
                Asym_key_list.push({ pk: sp[0].trim(), sk: sp[1].trim() })
            })

            write_to_undo_redo_list()

            if (key_list.length != 0) {

                var sk_index
                key_list.filter((sk, idx) => {
                    if (sk.partner === name_value) {
                        partner_flag = true
                        sk_index = idx
                    }
                })
                if (partner_flag == true) {
                    if (key_list[sk_index].sym !== sym) {
                        write_to_undo_redo_list()
                        key_list.splice(sk_index, 1)
                        key_list.push({
                            partner: name_value,
                            sym: sym,
                            Asym: Asym_key_list
                        })

                    }
                } else {
                    write_to_undo_redo_list()
                    key_list.push({
                        partner: name_value,
                        sym: sym,
                        Asym: Asym_key_list
                    })
                }

            } else {
                write_to_undo_redo_list()
                key_list.push({
                    partner: name_value,
                    sym: sym,
                    Asym: Asym_key_list
                })
            }



            $('#initial').modal('toggle')
            opt.style.display = 'none'
            opt_note.style.display = 'none';

        } else {
            opt.style.display = 'none'
            opt_note.style.display = 'none';
            Swal.fire({
                icon: 'error',
                title: 'خطا',
                text: 'لطفا مقادیر را به درستی وارد کنید',
            })
        }
        rc.children[1].text(new_name)
        var measure_text = rc.children[1].measureSize(rc.children[1].attrs.text)
        rc.children[1].absolutePosition({
            x: rc.attrs.x - (measure_text.width / 2) + (rc.children[0].attrs.width / 2) - 5,
            y: rc.attrs.y - (measure_text.height / 2) + (rc.children[0].attrs.height / 2) - 5,
        })

        rect_list.forEach(r => {
            reciver_list.push(r.children[1].text())
        })
        input_reciver.whitelist = reciver_list


    })
    //#region Transformer
var tr = new Konva.Transformer();
layer.add(tr);
//#endregion

stage.on('click', (e) => {
        e.evt.preventDefault();

        var circle = new Konva.Circle({
            x: stage.width() / 2,
            y: stage.height() / 2,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4,
        });

        layer.add(circle);

        if (e.target === stage) {
            opt.style.display = 'none'
            opt_note.style.display = 'none';
            tr.nodes([])
            if (from_index.rect_index != '') {
                rect_list[from_index.rect_index].draggable(false)
            }
            return;
        }

        var group
        if (e.target.parent.getClassName() === "Group") {
            if (e.target.parent.parent.name().includes('arrow')) {
                opt.style.display = 'none'
                arrow_list.filter((fil, index) => {
                    if (fil.arrow.attrs.name === e.target.parent.parent.attrs.name) {
                        tr.nodes([fil.arrow.children[2]])
                        input_reciver.removeAllTags()
                        input_def.removeAllTags()
                        input_params.removeAllTags()
                        from_index.arrow_index = index
                        rect_list.filter((rc, index) => {
                            if (rc.children[1].text() === fil.from) {
                                from_index.rect_index = index
                            }
                        })
                        opt_note.style.display = 'initial'
                        opt_note.style.top =
                            e.target.parent.attrs.y + 75 + 'px';
                        opt_note.style.left =
                            e.target.parent.attrs.x + 410 + 'px';
                        opt_note.addEventListener('click', () => {
                            opt_note.style.display = 'none';
                        })
                        input_reciver.addTags(fil.to)
                        input_def.addTags(fil.message.define)
                        input_params.addTags(fil.message.params)
                    }
                })
            } else if (e.target.parent.name().includes('partner')) {
                var reciver_list_tmp
                input_reciver.removeAllTags()
                input_def.removeAllTags()
                input_params.removeAllTags()
                opt_note.style.display = 'none';
                opt.style.display = 'initial'
                opt.style.left = e.target.parent.attrs.x + 370 + 'px';
                opt.style.top = e.target.parent.attrs.y + 75 + 'px';
                //--------- لیست دریافت کننده ها بجز پارنتر انتخاب شده
                reciver_list_tmp = reciver_list.filter((rec, index) => {
                    return rec !== e.target.parent.children[1].text()
                })
                input_reciver.whitelist = reciver_list_tmp
                    //---------------------------------------------------
                var Asym_array = []
                    // for (var i = 0; i < 4; i++) {
                let AsymKey_obj = {
                    pk: `pk(${e.target.parent.children[1].text()})`,
                    sk: `sk(${e.target.parent.children[1].text()})`
                }
                Asym_array.push(`(${AsymKey_obj.pk},${AsymKey_obj.sk})`)
                    // }

                input_Asym.whitelist = Asym_array

                rect_list.filter((fil, index) => {
                    if (fil.attrs.name === e.target.parent.attrs.name) {
                        tr.nodes([fil])
                        fil.draggable(true)
                            //-------مقدار دهی نود ابتدایی فلش ---------//
                            // connect_node2.from = fil.attrs.name
                            // ------ گرفتن شکل انتخاب شده ------------//
                        group = fil
                        from_index.rect_index = index
                        from_index.arrow_index = -1
                            // ----------- دکمه ثبت انتخاب یا تغییر نام پارتنر و وارد کردن کلیدها -----------//

                    }
                })

                $('input[name=name]').val(rect_list[from_index.rect_index].children[1].text())
                input_sym.removeAllTags()
                input_Asym.removeAllTags()
                key_list.forEach(key => {
                    if (key.partner === rect_list[from_index.rect_index].children[1].text()) {
                        input_sym.removeAllTags()
                        input_sym.addTags(key.sym)
                        if (key.Asym.length > 0) {
                            input_Asym.removeAllTags()
                            input_Asym.addTags(key.Asym.map(key => {
                                return `(${key.pk},${key.sk})`
                            }))
                        }
                    }
                })

                //------- بروز محل المان ها پس از جابجایی شکل انتخاب شده ------//
                group.on('dragmove', () => {
                    opt.style.left = e.target.parent.attrs.x + 370 + 'px';
                    opt.style.top = e.target.parent.attrs.y + 75 + 'px';
                    let rect_index = rect_list[from_index.rect_index]
                    arrow_list.filter((a, idx) => {
                        if (a.from === rect_index.children[1].text() || a.to === rect_index.children[1].text()) {
                            arrow_points(a.from, a.to, idx)
                        }
                    })

                })
                group.on('mouseleave', () => {
                    group.draggable(false)
                })

            }
        }

    })
    //#endregion

//#region Parser
var tmp_func_content
var split_array
var i = 0
var flag_error_func = 1000


// آنالیز توابع رمزنگاری و قرار دادن در لیست های مربوطه
function crypto_func_analys(func) {
    var result = INVALID_VALUE
        // console.log("FFFFFFFFUNC : ", func)
    switch (func.name) {
        case 'Enc':
            if (func.content != '' && func.content.length > 1) {
                let sk = array_partner[array_partner_index]
                let plainText = func.content.slice(0, func.content.length - 1)
                let func_string = `${func.name}(${func.content.toString()})`
                let cipherText = {
                    name: func_string,
                    value: func_string
                }
                let macro_flag = false
                macro_list.forEach(mc => {
                    if (mc.value.replace(' ', '') === func_string) {
                        cipherText.name = mc.name
                        macro_flag = true
                    }

                })


                let encrypt_obj = { plainText: plainText, symKey: func.content[func.content.length - 1], cipherText: cipherText, funcString: func_string, AnbxFormat: `{|${plainText.toString()}|}${func.content[func.content.length - 1]}`, from: sk.name, to: '' }
                sk.messages.forEach(msg => {
                    msg.message.params.filter(fil => {
                        if (fil.includes(func_string)) {
                            encrypt_obj.to = msg.to
                        }
                    })
                    msg.message.define.forEach(def => {
                            if (def.includes(func_string)) {
                                // encrypt_obj.from = msg.from
                                encrypt_obj.to = msg.to
                            }
                        })
                        // if (msg.message.params.includes(func_string)) {
                        //     // encrypt_obj.from = msg.from
                        //     encrypt_obj.to = msg.to
                        // } else {

                    // }
                })

                var mac_value_symKey
                macro_list.filter(mc => mc.name === func.content[func.content.length - 1] ? mac_value_symKey = mc.value : mac_value_symKey = func.content[func.content.length - 1])
                let key_string = func.content[func.content.length - 1]
                    // console.log("IS FUNC :", is_function(mac_value_symKey))
                if (!(array_partner[array_partner_index].symKey.includes(func.content[func.content.length - 1])) && !array_partner[array_partner_index].nonces.var_array.includes(func.content[func.content.length - 1]) && !array_partner[array_partner_index].nonces.new_array.includes(func.content[func.content.length - 1]) && !is_function(mac_value_symKey)) {
                    array_partner[array_partner_index].symKey.push(func.content[func.content.length - 1])
                }
                if (array_partner[array_partner_index].symKey.includes(key_string)) {
                    encrypt_obj.AnbxFormat = `{|${plainText.toString()}|}${key_string}(${encrypt_obj.from},${encrypt_obj.to})`
                        // encrypt_obj.symKey = `${key_string}(${encrypt_obj.from},${encrypt_obj.to})`
                }
                encrypt_list.push(encrypt_obj)
                result = SUCCESSFULL

            } else {
                result = INVALID_VALUE_ENC
            }

            return result
        case 'Dec':

            if (func.content != '' && func.content.length == 2) {
                let sk = array_partner[array_partner_index]
                let func_string = `${func.name}(${func.content.toString()})`
                let cipherText = func.content[0]
                let decrypt_obj = {
                    cipherText: func.content[0],
                    symKey: func.content[1],
                    plainText: [],
                    name: {
                        name: func_string,
                        value: func_string
                    },
                    funcString: func_string
                }
                console.log("DEC FUNC : ", decrypt_obj)
                var compat_list = encrypt_list.filter(enc => enc.cipherText.name === cipherText || enc.cipherText.value === cipherText)
                if (compat_list.length > 0) {
                    if (compat_list[0].symKey === func.content[1] && compat_list[0].to === sk.name) {
                        decrypt_obj.plainText = compat_list[0].plainText
                        let macro_flag = false
                        macro_list.forEach(mc => {
                            if (mc.value === func_string) {
                                decrypt_obj.name.name = mc.name
                                macro_flag = true
                            }
                        })
                        decrypt_list.push(decrypt_obj)
                        if (!(array_partner[array_partner_index].symKey.includes(func.content[func.content.length - 1]))) {
                            array_partner[array_partner_index].symKey.push(func.content[func.content.length - 1])
                        }
                        result = SUCCESSFULL
                    } else {
                        result = INVALID_COMPATIBILITY
                    }

                } else {
                    result = INVALID_COMPATIBILITY
                }
                // encrypt_list.filter((enc, index) => {
                //     console.log("Conditions :", (enc.cipherText.name === cipherText || enc.cipherText.value === cipherText) && enc.symKey === func.content[1] && enc.to === sk.name)
                //     if ((enc.cipherText.name === cipherText || enc.cipherText.value === cipherText) && enc.symKey === func.content[1] && enc.to === sk.name) {
                //         decrypt_obj.plainText = enc.plainText
                //         let macro_flag = false
                //         macro_list.forEach(mc => {
                //             if (mc.value === func_string) {
                //                 decrypt_obj.name.name = mc.name
                //                 macro_flag = true
                //             }
                //         })
                //         decrypt_list.push(decrypt_obj)
                //         if (!(array_partner[array_partner_index].symKey.includes(func.content[func.content.length - 1]))) {
                //             array_partner[array_partner_index].symKey.push(func.content[func.content.length - 1])
                //         }
                //         result = SUCCESSFULL
                //     } else {
                //         result = INVALID_COMPATIBILITY
                //     }
                // })
            } else {

                result = INVALID_VALUE_DEC
            }
            console.log("DEC LIST :::> ", decrypt_list)
            return result
        case 'Hash':
            console.log(func)
            return (func.content != '' && func.content.length > 0) ? SUCCESSFULL : INVALID_VALUE_HASH
        case 'Mac':
            if (func.content != '' && func.content.length > 1) {
                let sk = array_partner[array_partner_index]
                    // if (sk.symKey.includes(func.content[func.content.length - 1])) {
                let plainText = func.content.slice(0, func.content.length - 1)
                let func_string = `${func.name}(${func.content.toString()})`
                let mac = {
                    name: func_string,
                    value: func_string
                }
                macro_list.forEach(mc => {
                    if (mc.value.replace(' ', '') === func_string) {
                        mac.name = mc.name
                    }
                })
                let mac_obj = { plainText: plainText, symKey: func.content[func.content.length - 1], mac: mac, funcString: func_string, AnbxFormat: `hmac((${plainText.toString()}),${func.content[func.content.length - 1]})`, from: '', to: '' }
                sk.messages.forEach(msg => {
                    if (msg.message.params.includes(func_string)) {
                        mac_obj.from = msg.from
                        mac_obj.to = msg.to
                    } else {
                        msg.message.define.forEach(def => {
                            if (def.includes(func_string)) {
                                mac_obj.from = msg.from
                                mac_obj.to = msg.to
                            }
                        })
                    }
                })
                mac_list.push(mac_obj)
                var mac_value_symKey
                let key_string = func.content[func.content.length - 1]
                macro_list.filter(mc => mc.name === func.content[func.content.length - 1] ? mac_value_symKey = mc.value : mac_value_symKey = func.content[func.content.length - 1])
                if (!(array_partner[array_partner_index].symKey.includes(func.content[func.content.length - 1])) && !array_partner[array_partner_index].nonces.var_array.includes(func.content[func.content.length - 1]) && !array_partner[array_partner_index].nonces.new_array.includes(func.content[func.content.length - 1]) && !is_function(mac_value_symKey)) {
                    array_partner[array_partner_index].symKey.push(func.content[func.content.length - 1])
                }
                if (array_partner[array_partner_index].symKey.includes(key_string)) {
                    mac_obj.AnbxFormat = `hmac((${plainText.toString()}),${key_string}(${mac_obj.from},${mac_obj.to}}))`
                        // mac_obj.symKey = `${key_string}(${mac_obj.from},${mac_obj.to})`
                }
                result = SUCCESSFULL
            } else {
                result = INVALID_VALUE_MAC
            }

            return result
        case 'VerifyMac':
            if (func.content != '' && func.content.length == 2 && key_list.length > 0) {
                let sk = array_partner[array_partner_index]
                let func_string = `${func.name}(${func.content.toString()})`
                let verify_mac_obj = {
                    mac: func.content[0],
                    symKey: func.content[1],
                    plainText: [],
                    name: {
                        name: func_string,
                        value: func_string
                    },
                    funcString: func_string
                }
                mac_list.filter(mc => {
                    if (sk.symKey.includes(mc.symKey) && (mc.mac.name === verify_mac_obj.mac || mc.mac.value === verify_mac_obj.mac)) {
                        verify_mac_obj.plainText = mc.plainText

                        macro_list.forEach(mcro => {
                            if (mcro.value === func_string) {
                                verify_mac_obj.name.name = mcro.name

                            }
                        })
                        verify_mac_list.push(verify_mac_obj)
                        if (!(array_partner[array_partner_index].symKey.includes(func.content[func.content.length - 1]))) {
                            array_partner[array_partner_index].symKey.push(func.content[func.content.length - 1])
                        }
                        result = SUCCESSFULL
                    } else {
                        result = INVALID_COMPATIBILITY
                    }
                })

            } else {
                result = INVALID_VALUE_VERIFY_MAC
            }
            return result
        case 'Sign':

            if (func.content != '' && func.content.length > 1) {
                let sk = array_partner[array_partner_index]
                console.log("----------------------- SIGN", sk)
                var privateKey = func.content[func.content.length - 1]
                var res = []
                array_partner.filter((a, idx) => {
                    if (idx != array_partner_index) {
                        a.AsymKey.filter(as => res.push(as.sk))
                    }
                })
                if (!res.includes(privateKey) && privateKey == `sk(${sk.name})`) {
                    var key_pair = sk.AsymKey.filter(k => k.sk == privateKey)
                    let tmp_kryPair = {
                        pk: `pk(${sk.name})`,
                        sk: privateKey
                    }
                    if (key_pair.length == 0) {

                        // const reg = /inv\(.*\)/
                        // if (privateKey.match(reg) != null) {
                        //     tmp_kryPair.pk = func_content(privateKey).content.toString()
                        // }
                        array_partner[array_partner_index].AsymKey.push(tmp_kryPair)

                        console.log("******* ", key_list)
                    }
                    let plainText = func.content.slice(0, func.content.length - 1)
                    let func_string = `${func.name}(${func.content.toString()})`
                    let sign = {
                        name: func_string,
                        value: func_string
                    }
                    macro_list.forEach(mc => {
                        if (mc.value.replace(' ', '') === func_string) {
                            sign.name = mc.name
                        }
                    })

                    let sign_obj = { plainText: plainText, kepair: tmp_kryPair, sign: sign, funcString: func_string, AnbxFormat: `{${plainText.toString()}}inv(${tmp_kryPair.pk})` }
                    sign_list.push(sign_obj)
                    result = SUCCESSFULL

                    console.log("------------------------------------")

                } else {
                    // کلید خصوصی تکراری استفاده شده است.
                    result = INVALID_KEY_SIGN
                }
            } else {
                result = INVALID_VALUE_SIGN
            }
            return result
        case 'VerifySign':
            if (func.content != '' && func.content.length == 2 && key_list.length > 0) {
                // var key_pair = Asym_key_list.filter(kl => kl.pk == func.content[func.content.length - 1])
                let partner = array_partner[array_partner_index]
                var publicKey = func.content[func.content.length - 1]
                    // var res = []
                    // array_partner.filter((a, idx) => {
                    //     if (idx != array_partner_index) {
                    //         a.AsymKey.filter(as => res.push(as.pk))
                    //     }
                    // })

                // if (!res.includes(publicKey)) {

                if (partner.nonces.var_array.includes(publicKey) || partner.AsymKey.publicKey.includes(publicKey)) {

                    // var key_pair = partner.AsymKey.filter(k => k.pk == publicKey)
                    let tmp_kryPair = {
                        pk: publicKey,
                        sk: ''
                    }

                    let func_string = `${func.name}(${func.content.toString()})`
                    let sign = func.content[0]
                    let verify_sign = {
                        sign: func.content[0],
                        pk: func.content[1],
                        plainText: [],
                        name: {
                            name: func_string,
                            value: func_string
                        },
                        funcString: func_string
                    }
                    sign_list.filter(sg => {
                        if ((sg.sign.name === sign || sg.sign.value === sign) && sg.pk == publicKey) {
                            tmp_kryPair.sk = sg.sk
                            verify_sign.plainText = sg.plainText
                            macro_list.forEach(mc => {
                                if (mc.value === func_string) {
                                    verify_sign.name.name = mc.name
                                }
                            })
                            verify_sign_list.push(verify_sign)
                            result = SUCCESSFULL
                        }
                    })
                    if (result == SUCCESSFULL) {
                        partner.AsymKey.push(tmp_kryPair)
                    } else {
                        result = INVALID_COMPATIBILITY
                    }

                } else {
                    result = INVALID_KEY_VERIFY_SIGN
                }
            } else {
                result = INVALID_VALUE_VERIFY_SIGN
            }
            return result
        case 'AEnc':
            console.log("AEnc *******")
            if (func.content != '' && func.content.length > 1) {
                let partner = array_partner[array_partner_index]
                var publicKey = func.content[func.content.length - 1]
                    // var res = []
                    // array_partner.filter((a, idx) => {
                    //     if (idx != array_partner_index) {
                    //         a.AsymKey.filter(as => res.push(as.pk))
                    //     }
                    // })

                let plainText = func.content.slice(0, func.content.length - 1)
                let func_string = `${func.name}(${func.content.toString()})`
                let cipherText = {
                    name: func_string,
                    value: func_string
                }
                macro_list.forEach(mc => {
                    if (mc.value.replace(' ', '') === func_string) {
                        cipherText.name = mc.name
                    }
                })

                var publickeyList = []
                var to_index = ''
                array_partner.filter(a => a.AsymKey.filter(k => publickeyList.push(k.pk)))
                var privateKey = array_partner.filter((a, idx) => a.AsymKey.filter(k => {
                    if (k.pk == publicKey) {
                        to_index = idx
                        return k.sk
                    }

                }))

                var check_macro
                macro_list.forEach(mc => mc.value == publicKey ? check_macro = mc.name : '')
                if (((partner.nonces.var_array.includes(publicKey) || partner.nonces.var_array.includes(check_macro)) || partner.AsymKey[0].pk == publicKey) && publickeyList.includes(publicKey)) {
                    let tmp_kryPair = {
                        pk: publicKey,
                        sk: privateKey
                    }
                    let Asym_obj = { plainText: plainText, keypair: tmp_kryPair, cipherText: cipherText, funcString: func_string, AnbxFormat: `{${plainText.toString()}}${publicKey}`, from: partner.name, to: array_partner[to_index].name }
                    Aencryp_list.push(Asym_obj)
                    result = SUCCESSFULL
                        // var key_pair = partner.AsymKey.filter(k => k.pk == publicKey)


                    console.log("AENC ===> ", Aencryp_list)
                        // if (key_pair.length == 0) {
                        //     partner.AsymKey.push(tmp_kryPair)
                        // }


                } else {
                    result = INVALID_KEY_AENC
                }






                // ---------------------------------------------------------------------------------------------
                // var key_pair = Asym_key_list.filter(kl => kl.pk == func.content[func.content.length - 1])
                // if (key_pair.length > 0) {
                // let plainText = func.content.slice(0, func.content.length - 1)
                // let func_string = `${func.name}(${func.content.toString()})`
                // let cipherText = {
                //     name: func_string,
                //     value: func_string
                // }
                // macro_list.forEach(mc => {
                //     if (mc.value.replace(' ', '') === func_string) {
                //         cipherText.name = mc.name
                //     }
                // })

                // let Asym_obj = { plainText: plainText, pk: key_pair[0].pk, cipherText: cipherText, funcString: func_string, AnbxFormat: `{|${plainText.toString()}|}${key_pair[0].pk}` }
                // Aencryp_list.push(Asym_obj)
                // result = SUCCESSFULL

                // } else {
                //     result = INVALID_KEY_AENC
                // }
            } else {
                result = INVALID_VALUE_AENC
            }
            return result
        case 'ADec':
            if (func.content != '' && func.content.length == 2 && key_list.length > 0) {
                let sk = array_partner[array_partner_index]
                var key_pair = sk.AsymKey.fiter(k => k.sk == func.content[func.content.length - 1])
                if (key_pair.length > 0) {
                    let func_string = `${func.name}(${func.content.toString()})`
                    let cipherText = func.content[0]
                    let Adecrypt_obj = {
                        cipherText: func.content[0],
                        AsymKey: func.content[1],
                        plainText: [],
                        name: {
                            name: func_string,
                            value: func_string
                        },
                        funcString: func_string
                    }
                    Aencryp_list.filter(Aenc => {
                        if (Aenc.kepair.pk == key_pair[0].pk && (Aenc.cipherText.name === cipherText || Aenc.cipherText.value === cipherText)) {
                            Adecrypt_obj.plainText = Aenc.plainText
                            macro_list.forEach(mc => {
                                if (mc.value === func_string) {
                                    Adecrypt_obj.name.name = mc.name
                                }
                            })
                            ADecrypt_list.push(Adecrypt_obj)
                            result = SUCCESSFULL
                        } else {
                            result = INVALID_COMPATIBILITY
                        }
                    })
                } else {
                    result = INVALID_KEY_ADEC
                }
            } else {
                result = INVALID_VALUE_ADEC
            }
            return result

        default:
            return SUCCESSFULL

    }
}


function is_function(str) {
    return str.includes("(") || str.includes(")")
}

function is_macro(str) {
    var res = null
    macro_list.forEach(mc => {
        if (mc.name == str) {
            res = mc.value
        }
    })
    return res
}

function error_handler_func(func) {
    var check_func = is_function(func)
    if (check_func == false) {
        return true
    } else {
        var out_func = func_content(func)
        switch (out_func.name) {
            case "Hash":
                if (out_func.content.length < 1) {
                    return false
                }
                break;
            case "Mac":
                if (out_func.content.length < 2) {
                    return false
                }
                break;
            case "Enc":
                if (out_func.content.length < 2) {
                    return false
                }
                break;
            case "Dec":
                if (out_func.content.length < 2) {
                    return false
                }
                break;
            case "Sign":
                if (out_func.content.length < 2) {
                    return false
                }
                break;
            case "Verify":
                if (out_func.content.length < 2) {
                    return false
                }
                break;
            case "AEnc":
                if (out_func.content.length < 2) {
                    return false
                }
                break;
            case "ADec":
                if (out_func.content.length < 2) {
                    return false
                }
                break;
            default:
                return true
        }
    }
}

function func_content(func) {
    var obj_function = {}
    var function_name
    var counter = 0
    var first_parantez = 0
    var end_parantez = 0
    for (var i = 0; i < func.length; i++) {
        var c = func[i]
        if (c == "(") {
            if (counter == 0) {
                function_name = func.slice(0, i).trim()
                first_parantez = i + 1
            }
            counter++
        }
        if (c == ")") {
            counter--
            if (counter == 0)
                end_parantez = i
        }
    }
    var cont = func.substring(first_parantez, end_parantez)
    obj_function.name = function_name.replace(',', '')
    obj_function.content = splite_content(cont)
    obj_function.funcString = func
    obj_function.AnbxFormat = func
    obj_function.key = ''

    return obj_function
}

function splite_content(content) {
    content.replace(' ', '')
    var split_array = []
    var split_array_tmp = []
    var counter = 0
    var index = 0
    for (var i = 0; i < content.length; i++) {

        var c = content[i]

        if (counter == 0 && (c == ",")) {
            let tmp = content.slice(index, i).trim()
            if (tmp[0] === ',') {
                tmp = tmp.slice(1)
            }
            split_array.push(tmp)
            index = i
        }
        if (c == "(") {
            counter++
        }
        if (c == ")") {
            counter--
        }
    }
    var tmp_content = content.substring(index, content.length)
    if (tmp_content[0] === ',') {
        tmp_content = tmp_content.slice(1)
    }
    if (tmp_content != '') {
        split_array.push(tmp_content)
    }

    return split_array
}


function splite_content2(content) {
    content.replace(' ', '')
    var split_array = []
    var split_array_tmp = []
    var counter = 0
    var index = 0
    for (var i = 0; i < content.length; i++) {

        var c = content[i]

        if ((counter == 0 && (c == ",")) || counter == -1) {
            let tmp = content.slice(index, i).trim()
            if (tmp[0] === ',') {
                tmp = tmp.slice(1)
            }
            split_array.push(tmp)
            index = i
        }
        if (c == "(") {
            counter++
        }
        if (c == ")") {
            counter--
        }
    }
    var tmp_content = content.substring(index, content.length)

    if (tmp_content[0] === ',') {

        tmp_content = tmp_content.slice(1)
    }
    if (tmp_content != '') {
        split_array.push(tmp_content)
    }

    return split_array
}
// 00/12/21
// تبدیل توابع با فرمت های Anbx به توابع با فرمت های معمولی
// برای توابعی که فقط شامل کروشه تنها هستند
// {x,y}sk



// 00/12/21
// تبدیل توابع با فرمت های Anbx به توابع با فرمت های معمولی
// برای توابعی که شامل کروشه و پایپ هستند
// {|x|}key
// function splite_content_bracket(content) {
//     content = content.replace(/\s+/g, '')
//     var regex1 = /\{\|/g
//     var regex2 = /\|\}/g

//     content = content.replace(regex1, '[')
//     content = content.replace(regex2, ']')

//     var split_array_tmp = []
//     var counter = 0
//     var index = 0
//     for (var i = 0; i < content.length; i++) {
//         var c = content[i]
//         if (counter == 1 && (c == "]")) {
//             let tmp = content.slice(index + 1, i).trim()
//             let tmp2 = content.slice(i + 1, content.length - 1).trim()
//             var obj = {
//                 content: tmp,
//                 key: splite_content(tmp2).length > 0 ? splite_content(tmp2)[0] : null,
//                 func_string: '',
//                 Anbx_string: ''
//             }
//             obj.Anbx_string = `{|${obj.content}|}${obj.key}`
//             split_array.push(obj)
//             if (tmp.includes('['))
//                 splite_content_bracket(tmp)
//         }
//         if (c == "[") {
//             if (counter == 0)
//                 index = i
//             counter++
//         }
//         if (c == "]") {
//             counter--
//         }
//     }
// }

var split_array = []

function splite_content_bracket_pyp(content) {
    content = content.replace(/\s+/g, '')
    var regex1 = /\{\|/g
    var regex2 = /\|\}/g

    content = content.replace(regex1, '[')
    content = content.replace(regex2, ']')

    // console.log(content)

    var split_array_tmp = []
    var counter = 0
    var index = 0
    for (var i = 0; i < content.length; i++) {
        var c = content[i]
        if (counter == 1 && (c == "]")) {
            let tmp = content.slice(index + 1, i).trim()
            let tmp2 = content.slice(i + 1, content.length).trim()
            var obj = {
                content: tmp,
                key: splite_content2(tmp2).length > 0 ? splite_content2(tmp2)[0] : null,
                func_string: '',
                Anbx_string: ''
            }

            obj.content = obj.content.replace('[', '{|').replace(']', '|}')
            obj.key = obj.key.replace('[', '{|').replace(']', '|}')

            obj.Anbx_string = `{|${obj.content}|}${obj.key}`
            obj.func_string = `Enc(${obj.content},${obj.key})`

            split_array.push(obj)
            if (tmp.includes('[')) {
                splite_content_bracket(tmp)
            }
        }
        if (c == "[") {
            if (counter == 0)
                index = i
            counter++
        }
        if (c == "]") {
            counter--
        }
    }

    //return split_array
}


function splite_content_bracket(content) {
    const rg = /\s+/ig
    content = content.replace(rg, '')
    var regex1 = /\{/g
    var regex2 = /\}/g

    // content = content.replace(regex1, '[')
    // content = content.replace(regex2, ']')


    var split_array_tmp = []
    var counter = 0
    var index = 0
    for (var i = 0; i < content.length; i++) {
        var c = content[i]
        if (counter == 1 && (c == "}")) {
            let tmp = content.slice(index + 1, i).trim()
            let tmp2 = content.slice(i + 1, content.length).trim()
            var obj = {
                content: tmp,
                key: splite_content2(tmp2).length > 0 ? splite_content2(tmp2)[0] : null,
                func_string: '',
                Anbx_string: ''
            }
            obj.Anbx_string = `{${obj.content}}${obj.key}`
                // console.log("******",obj.key.includes('inv') , obj.key)
            if (obj.key.includes('inv')) {
                obj.func_string = `Sign(${obj.content},${obj.key})`
            } else {
                obj.func_string = `AEnc(${obj.content},${obj.key})`
            }


            split_array.push(obj)
            if (tmp.includes('{')) {
                splite_content_bracket(tmp)
            }
        }
        if (c == "{") {
            if (counter == 0)
                index = i
            counter++
        }
        if (c == "}") {
            counter--
        }
    }
    return split_array
}




function splite_string(str) {
    var result = SUCCESSFULL
    str.forEach((sp) => {
        // ------------ for macro check
        // let res_macro = is_macro(sp)
        if (array_partner[array_partner_index].macro.new_array.length > 0) {
            array_partner[array_partner_index].macro.new_array.forEach(mac => {
                if (mac.name == sp) {
                    sp = mac.value
                }
            })
        }
        if (macro_list.length > 0) {
            macro_list.forEach(mac => {
                if (mac.value == sp && (array_partner[array_partner_index].nonces.var_array.includes(mac.name) || array_partner[array_partner_index].nonces.new_array.includes(mac.name))) {
                    sp = mac.name
                }
            })
        }
        //-----------------
        if (is_function(sp)) {
            var fn = func_content(sp)
            var func_exist_index = function_array.findIndex(f => f.name === fn.name)
            var obj_error = {
                id: '',
                function: '',
                result: ''
            }
            if ((func_exist_index > -1 && fn.content.length == function_array[func_exist_index].content.length) || func_exist_index == -1) {
                let res = crypto_func_analys(fn)
                    // if (res === SUCCESSFULL && fn.name.trim() != '') {
                if (res === SUCCESSFULL) {
                    function_array.push(fn)
                    result = SUCCESSFULL
                } else {
                    result = res
                    obj_error.function = `${fn.name}(${fn.content.toString()})`
                    obj_error.result = res
                    result_error_array_tmp.push(obj_error)
                }

            } else if (fn.content.length !== function_array[func_exist_index].content.length) {
                flag_error_func = func_exist_index
                result = INVALID_VALUE
                obj_error.function = `${fn.name}(${fn.content.toString()})`
                obj_error.result = result
                result_error_array_tmp.push(obj_error)

            }
            splite_string(func_content(sp).content)
        } else {
            nonce_array.push(sp.replace(',', ''))

        }
    })
    return result
}

//#region parser_msg_to_partner

// تابع قدیمی پارسر پیام
function parser_msg_to_partner(array_list) {
    array_partner = []
    array_list.forEach((s) => {
        var index = is_contain(array_partner, s.from)
        var new_message = {
            from: s.from,
            to: s.to,
            message: s.message,
        }
        if (index === array_partner.length) {
            var new_partner = {
                name: s.from,
                symKey: [],
                AsymKey: [],
                messages: [],
                nonces: {
                    new_array: [],
                    var_array: []
                },
                macro: {
                    new_array: [],
                    var_array: []
                }
            }

            key_list.forEach((k) => {
                    if (k.partner == s.from) {
                        new_partner.symKey.push.apply(new_partner.symKey, k.sym)
                        new_partner.AsymKey.push.apply(new_partner.AsymKey, k.Asym)
                    }
                })
                // new_partner.name = s.sender
            new_partner.messages.push(new_message)
            array_partner.push(new_partner)
        } else {

            array_partner[index].messages.push(new_message)
        }
        var index_1 = is_contain(array_partner, s.to)
        if (index_1 === array_partner.length) {

            var new_partner = {
                    name: s.to,
                    symKey: [],
                    AsymKey: [],
                    messages: [],
                    nonces: {
                        new_array: [],
                        var_array: []
                    },
                    macro: {
                        new_array: [],
                        var_array: []
                    }
                }
                // new_partner.name = s.to
            key_list.forEach((k) => {
                if (k.partner == s.to) {
                    new_partner.symKey.push.apply(new_partner.symKey, k.sym)
                    new_partner.AsymKey.push.apply(new_partner.AsymKey, k.Asym)
                }
            })
            new_partner.messages.push(new_message)
            array_partner.push(new_partner)
        } else {
            array_partner[index_1].messages.push(new_message)
        }

    })

    // arrow_list.forEach((a, indx) => {
    //     var idx
    //     var n = array_partner.forEach((ap, index0) => ap.name == a.from ? ap : null)
    // var n = array_partner.forEach((ap, index0) => {
    //         if (ap.name === a.from) {
    //             idx = index0
    //             return ap
    //         }
    //     })
    // })
    array_partner.forEach((n, idx) => {
        // console.log("N ", n)
        // console.log(n.messages, " ", indx)
        n.messages.forEach((m, index) => {
            if (n.name === m.from) {
                n.macro.new_array = []
                m.message.define.forEach(def => {
                    if (def.includes("=")) {
                        let split_mosavi = def.split("=")
                        let obj_macro = {
                            name: split_mosavi[0].trim(),
                            value: split_mosavi[1].trim(),
                            AnbxFormat: split_mosavi[1].trim(),
                        }

                        macro_list.filter(m => m.name).includes(obj_macro.name) ? null : n.macro.new_array.push(obj_macro)

                    } else if (!is_function(def)) {
                        if (!n.nonce.new_array.includes(def)) {
                            n.nonce.new_array.push(def)
                        }

                    }
                })
                array_partner_index = idx
                nonce_array = []
                result_error_array_tmp = []

                splite_string(m.message.params)
                    // آپدیت کردن آرایه خطا
                result_error_array_tmp.forEach((err, ix) => {
                    err.id = index
                    result_error_array.push(err)
                })
                macro_list.push.apply(macro_list, n.macro.new_array)
                var nonce = nonce_array



                nonce.forEach(ns => {
                    if (!n.nonces.var_array.includes(ns) && !n.nonces.new_array.includes(ns) && ns.trim() != '' && !n.symKey.includes(ns) && !is_macro(ns) && n.AsymKey.filter(k => k.sk == ns || k.pk == ns).length == 0 && ns !== n.name) {
                        if (n.name === m.from) {
                            n.nonces.new_array.push(ns)
                        }
                    }
                })
            }
            m.message.params.forEach(p => {
                if (n.name === m.to) {
                    if (!is_function(p)) {
                        if (!n.nonces.var_array.includes(p) && !n.nonces.new_array.includes(p) && p.trim() != '' && !n.symKey.includes(p) && n.AsymKey.filter(k => k.sk == p || k.pk == p).length == 0) {
                            n.nonces.var_array.push(p)
                        }
                    } else {
                        macro_list.filter(macro => {
                            if (macro.value === p && !n.nonces.var_array.includes(macro.name)) {
                                n.nonces.var_array.push(macro.name)
                            }
                        })
                    }
                }
                if (n.name === m.from) {
                    if (is_macro(p) == null) {
                        if (!n.nonces.new_array.includes(p) && p.trim() != '' && !n.symKey.includes(p) && n.AsymKey.filter(k => k.sk == p || k.pk == p).length == 0) {
                            n.nonces.new_array.push(p)


                        }
                    } else {
                        macro_list.filter(macro => {
                            if (macro.value === p && !n.nonces.var_array.includes(macro.name) && !n.nonces.new_array.includes(macro.name) && n.AsymKey.filter(k => k.sk == macro.name || k.pk == macro.name).length == 0) {
                                n.nonces.var_array.push(macro.name)
                            }
                        })
                    }
                }
            })
        })
    })
    return array_partner
}

//#endregion

//#region pareser_msg_to_partner_new
// تابع جدید پارسر پیام
function parser_msg_to_partner_new(array_list) {
    // macro_list = []
    array_partner = []
    array_list.forEach((s) => {
        var index = is_contain(array_partner, s.from)
        var new_message = {
            from: s.from,
            to: s.to,
            message: s.message,
            fresh: []
        }
        if (index === array_partner.length) {
            var new_partner = {
                name: s.from,
                symKey: [],
                AsymKey: [],
                messages: [],
                nonces: {
                    new_array: [],
                    var_array: []
                },
                macro: {
                    new_array: [],
                    var_array: []
                }
            }
            var keypair = {
                pk: `pk(${s.from})`,
                sk: `sk(${s.from})`,
            }

            new_partner.AsymKey.push(keypair)
            key_list.forEach((k) => {
                    if (k.partner == s.from) {

                        new_partner.symKey.push.apply(new_partner.symKey, k.sym)

                    }
                })
                // new_partner.name = s.sender
                // new_partner.messages.push(new_message)
            array_partner.push(new_partner)
        }

        // else {

        array_partner[index].messages.push(new_message)
            // }
        var index_1 = is_contain(array_partner, s.to)
        if (index_1 === array_partner.length) {

            var new_partner = {
                name: s.to,
                symKey: [],
                AsymKey: [],
                messages: [],
                nonces: {
                    new_array: [],
                    var_array: []
                },
                macro: {
                    new_array: [],
                    var_array: []
                }
            }

            var keypair = {
                pk: `pk(${s.to})`,
                sk: `sk(${s.to})`,
            }

            new_partner.AsymKey.push(keypair)
                // new_partner.name = s.to
            key_list.forEach((k) => {
                if (k.partner == s.to) {

                    k.sym.forEach((s) => {
                            new_partner.symKey.includes(s) ? null : new_partner.symKey.push(s)
                        })
                        // new_partner.symKey.push.apply(new_partner.symKey, k.sym)
                        // new_partner.AsymKey.push.apply(new_partner.AsymKey, k.Asym)
                }
            })
            new_partner.messages.push(new_message)
            array_partner.push(new_partner)

        } else {
            array_partner[index_1].messages.push(new_message)
        }
        if (array_partner[index].name === s.from) {
            array_partner[index].macro.new_array = []
            new_message.message.define.forEach(def => {
                if (def.includes("=")) {
                    let split_mosavi = def.split("=")
                    let obj_macro = {
                        name: split_mosavi[0].trim(),
                        value: split_mosavi[1].trim(),
                        AnbxFormat: split_mosavi[1].trim(),
                    }

                    macro_list.filter(m => m.name).includes(obj_macro.name) ? null : array_partner[index].macro.new_array.push(obj_macro)

                } else if (!is_function(def)) {
                    if (!array_partner[index].nonce.new_array.includes(def)) {
                        array_partner[index].nonce.new_array.push(def)

                        //// ------- 01/03/03 -------///
                        array_partner[index].messages[array_partner[index].messages.length - 1].fresh.push(def)
                    }

                }
            })
            array_partner_index = index
            nonce_array = []
            result_error_array_tmp = []

            splite_string(new_message.message.params)
                // آپدیت کردن آرایه خطا
            result_error_array_tmp.forEach((err, ix) => {
                err.id = index
                result_error_array.push(err)
            })
            array_partner[index].macro.new_array.forEach(macro => {
                    var len_map = macro_list.filter(m => m.value == macro.value && m.name == macro.name ? m : null)
                    console.log("LEN ====> ", len_map, "MACRO ====> ", macro)
                    if (len_map.length == 0) {
                        macro_list.push(macro)
                    }
                    // if (m.value != macro.value && m.name != macro.name) {
                    //     macro_list.push(macro)
                    // }
                    // })

                })
                // macro_list.push.apply(macro_list, array_partner[index].macro.new_array)
            var nonce = nonce_array


            nonce.forEach(ns => {
                if (!array_partner[index].nonces.var_array.includes(ns) && !array_partner[index].nonces.new_array.includes(ns) && ns.trim() != '' && !array_partner[index].symKey.includes(ns) && !is_macro(ns) && array_partner[index].AsymKey.filter(k => k.sk == ns || k.pk == ns).length == 0 && !array_partner.map(a => a.name).includes(ns)) {
                    if (array_partner[index].name === s.from) {
                        array_partner[index].nonces.new_array.push(ns)
                            //// ------- 01/03/03 -------///
                        array_partner[index].messages[array_partner[index].messages.length - 1].fresh.push(ns)

                    }
                }
            })
            new_message.message.params.forEach(p => {
                console.log(index, " ", index_1)

                if (array_partner[index_1].name === s.to) {
                    if (!is_function(p)) {
                        if (!array_partner[index_1].nonces.var_array.includes(p) && !array_partner[index_1].nonces.new_array.includes(p) && p.trim() != '' && !array_partner[index_1].symKey.includes(p) && array_partner[index_1].AsymKey.filter(k => k.sk == p || k.pk == p).length == 0) {
                            array_partner[index_1].nonces.var_array.push(p)
                        }
                    } else {
                        macro_list.filter(macro => {
                            if (macro.value === p && !array_partner[index_1].nonces.var_array.includes(macro.name)) {
                                array_partner[index_1].nonces.var_array.push(macro.name)
                            }
                        })
                    }
                }
                if (array_partner[index].name === s.from) {
                    if (is_macro(p) == null) {
                        if (!array_partner[index].nonces.new_array.includes(p) && !array_partner[index].nonces.var_array.includes(p) && p.trim() != '' && !array_partner[index].symKey.includes(p) && array_partner[index].AsymKey.filter(k => k.sk == p || k.pk == p).length == 0) {
                            array_partner[index].nonces.var_array.push(p)
                            if (!is_function(p)) {
                                array_partner[index].messages[array_partner[index].messages.length - 1].fresh.push(p)
                            }
                        }
                    } else {
                        macro_list.filter(macro => {
                            if (macro.value === p && !array_partner[index].nonces.var_array.includes(macro.name) && !array_partner[index].nonces.new_array.includes(macro.name) && array_partner[index].AsymKey.filter(k => k.sk == macro.name || k.pk == macro.name).length == 0) {
                                array_partner[index].nonces.var_array.push(macro.name)
                                if (!is_function(p)) {
                                    array_partner[index].messages[array_partner[index].messages.length - 1].fresh.push(macro.name)
                                }
                            }
                        })
                    }
                }
            })
        }
    })

    console.log("1 ============= Key List =============== 1 ", key_list)

    array_partner.forEach(partner => {
        // console.log("FOREACH ====> ")
        if (key_list.length > 0) {
            var key_partner = key_list.map(key => key.partner)
            console.log("KEY PARTNER ====> ", key_partner)
            if (key_partner.includes(partner.name)) {
                var idx = key_partner.findIndex(find => find == partner.name)
                console.log("IF 1 ====> ", idx)
                partner.symKey.forEach(akey => {
                    if (!key_list[idx].sym.includes(akey)) {
                        console.log("IF 2 ====> ", akey)
                        key_list[idx].sym.push(akey)
                    }
                })
            } else {
                console.log("ELSE 1 ====> ", key_list)
                key_list.push({
                    partner: partner.name,
                    sym: partner.symKey,
                    Asym: partner.AsymKey
                })
            }
        } else {
            console.log("ELSE 2 ====> ", key_list)
            key_list.push({
                partner: partner.name,
                sym: partner.symKey,
                Asym: partner.AsymKey
            })
        }
    })
    console.log("2 ============= Key List =============== 2 ", key_list)

    var sym_key_list_all = []
    key_from_to_list = []
    array_partner.forEach(partner => {
        partner.symKey.forEach(key => {
            if (!sym_key_list_all.includes(key)) {
                sym_key_list_all.push(key)
            }
        })
    })

    sym_key_list_all.forEach(key => {
        var obj_key_from_to = { key: key, AnbxFormat: '', partners: [], ScytherFormat: '' }
        array_partner.forEach(partner => {
            if (partner.symKey.includes(key)) {
                obj_key_from_to.partners.push(partner.name)
            }
        })
        key_from_to_list.push(obj_key_from_to)
    })
    console.log("2 ============= Key List FROM TO =============== 2 ", key_from_to_list)

    // array_partner.forEach(partner => {
    //     partner.symKey.forEach(key => {
    //         var enc_filter_list = encrypt_list.filter(enc => enc.symKey === key)
    //         console.log("ENC FILTER LIST ====> ", enc_filter_list, "KEY ====> ", key)
    //         if (enc_filter_list.length > 0) {
    //             var enc_filter = enc_filter_list[0]
    //             if (key_from_to_list.length > 0) {
    //                 if (key_from_to_list.filter(k => k.key === key && k.from === enc_filter.from && k.to === enc_filter.to).length == 0) {
    //                     key_from_to_list.push({ key: key, from: enc_filter.from, to: enc_filter.to })
    //                 }
    //             } else {
    //                 key_from_to_list.push({ key: key, from: enc_filter.from, to: enc_filter.to })
    //             }
    //         }

    //     })
    // })

    // console.log("2 ============= Key List FROM TO =============== 2 ", key_from_to_list)
    // key_list.push({
    //     partner: a.name,
    //     sym: a.symKey,
    //     Asym: a.AsymKey
    // })
    // })

    // arrow_list.forEach((a, indx) => {
    //     var idx
    //     var n = array_partner.forEach((ap, index0) => ap.name == a.from ? ap : null)
    // var n = array_partner.forEach((ap, index0) => {
    //         if (ap.name === a.from) {
    //             idx = index0
    //             return ap
    //         }
    //     })
    // })
    // array_partner.forEach((n, idx) => {
    //     // console.log("N ", n)
    //     // console.log(n.messages, " ", indx)
    //     n.messages.forEach((m, index) => {
    //         if (n.name === m.from) {
    //             n.macro.new_array = []
    //             m.message.define.forEach(def => {
    //                 if (def.includes("=")) {
    //                     let split_mosavi = def.split("=")
    //                     let obj_macro = {
    //                         name: split_mosavi[0].trim(),
    //                         value: split_mosavi[1].trim(),
    //                         AnbxFormat: split_mosavi[1].trim(),
    //                     }

    //                     macro_list.filter(m => m.name).includes(obj_macro.name) ? null : n.macro.new_array.push(obj_macro)

    //                 } else if (!is_function(def)) {
    //                     if (!n.nonce.new_array.includes(def)) {
    //                         n.nonce.new_array.push(def)
    //                     }

    //                 }
    //             })
    //             array_partner_index = idx
    //             nonce_array = []
    //             result_error_array_tmp = []

    //             splite_string(m.message.params)
    //                 // آپدیت کردن آرایه خطا
    //             result_error_array_tmp.forEach((err, ix) => {
    //                 err.id = index
    //                 result_error_array.push(err)
    //             })
    //             macro_list.push.apply(macro_list, n.macro.new_array)
    //             var nonce = nonce_array



    //             nonce.forEach(ns => {
    //                 if (!n.nonces.var_array.includes(ns) && !n.nonces.new_array.includes(ns) && ns.trim() != '' && !n.symKey.includes(ns) && !is_macro(ns) && n.AsymKey.filter(k => k.sk == ns || k.pk == ns).length == 0) {
    //                     if (n.name === m.from) {
    //                         n.nonces.new_array.push(ns)
    //                     }
    //                 }
    //             })
    //             m.message.params.forEach(p => {
    //                 if (n.name === m.to) {
    //                     if (!is_function(p)) {
    //                         if (!n.nonces.var_array.includes(p) && !n.nonces.new_array.includes(p) && p.trim() != '' && !n.symKey.includes(p) && n.AsymKey.filter(k => k.sk == p || k.pk == p).length == 0) {
    //                             n.nonces.var_array.push(p)
    //                         }
    //                     } else {
    //                         macro_list.filter(macro => {
    //                             if (macro.value === p && !n.nonces.var_array.includes(macro.name)) {
    //                                 n.nonces.var_array.push(macro.name)
    //                             }
    //                         })
    //                     }
    //                 }
    //                 if (n.name === m.from) {
    //                     if (is_macro(p)) {
    //                         if (!n.nonces.new_array.includes(p) && p.trim() != '' && !n.symKey.includes(p) && n.AsymKey.filter(k => k.sk == p || k.pk == p).length == 0) {
    //                             n.nonces.var_array.push(p)
    //                         }
    //                     } else {
    //                         macro_list.filter(macro => {
    //                             if (macro.value === p && !n.nonces.var_array.includes(macro.name) && !n.nonces.new_array.includes(macro.name) && n.AsymKey.filter(k => k.sk == macro.name || k.pk == macro.name).length == 0) {
    //                                 n.nonces.var_array.push(macro.name)
    //                             }
    //                         })
    //                     }
    //                 }
    //             })
    //         }

    //     })
    // })
    return array_partner
}
//#endregion

function is_contain(arr, partner) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].name === partner) {
            return i
        }
    }
    return arr.length

}

// کامپایل محتوای شماتیک و مقدار دهی آرایه پارتنرها
function Execute() {
    function_array = []
    macro_list = []
    key_list = []
        // arrow_list.forEach(a => {
        //     console.log(a)
        //     if (a.abstract_msg != null) {
        //         a.abstract_msg.forEach(ab => {
        //             macro_list.push(ab)
        //         })
        //     }

    // })
    // parser_msg_to_partner_new(arrow_list)
    array_partner.forEach(a => {
        key_list.push({
            partner: a.name,
            sym: a.symKey,
            Asym: a.AsymKey
        })
    })
    console.log("AROW LIST", arrow_list)
    console.log("ARR PAR", array_partner)
}

// $('#btn_run').click(function() {
//         console.log("########")
//         function_array = []
//         macro_list = []
//         arrow_list.forEach(a => {
//             console.log(a)
//             a.abstract_msg.forEach(ab => {
//                 macro_list.push(ab)
//             })

//         })
//         var parse = parser_msg_to_partner_new(arrow_list)
//         console.log("********* ", array_partner)
//             // ------------------------------- پارسر اصلی برای تنظیم مقادیر پارتنرها --------------------------//
//         var code = $('#console').val(JSON.stringify(parse));

//         eval(code);
//     })
//#endregion

//#region Arrow Points
function arrow_points(from, to, arrow_index, msg) {
    //------------- مختصات رسم فلش ------------//
    var offset = {
        width: Dimensions.rect.width,
        height: (2 * Dimensions.rect.height) * (arrow_index + 1)
    }
    var arrow_dimention = {
        first_x: offset.width / 2,
        first_y: offset.height,
        second_x: offset.width / 2,
        second_y: offset.height,
        width_arrow: 0,
        height_arrow: 0,
    }


    rect_list.forEach(el => {
        if (el.children[1].attrs.text === from) {
            arrow_dimention.first_x += el.getX()
            arrow_dimention.first_y += el.getY()
        } else if (el.children[1].attrs.text === to) {
            arrow_dimention.second_x += el.getX()
            arrow_dimention.second_y += el.getY()
        }
    })

    arrow_dimention.width_arrow = arrow_dimention.second_x - arrow_dimention.first_x
    arrow_dimention.height_arrow = arrow_dimention.second_y - arrow_dimention.first_y

    var arrow_group = arrow_list[arrow_index].arrow
    var labelArrow = arrow_group.children[1]
    var arrow = arrow_group.children[0]
    var note_group = arrow_group.children[2]
    var base_node = note_group.children[0]



    arrow.absolutePosition({
        x: arrow_dimention.first_x,
        y: arrow_dimention.first_y
    })



    if (labelArrow.text().trim() != '') {
        arrow.points([0, 0, arrow_dimention.width_arrow, arrow_dimention.height_arrow])
    } else {
        arrow.points([0, 0, 0, 0])
        arrow.pointerLength(0)
        arrow.pointerWidth(0)
    }

    var measure_text = labelArrow.measureSize(labelArrow.text())
    var noteX = arrow.getX() + 10
    var labelX = arrow.getX() + 10

    if (arrow_dimention.width_arrow >= 0) {
        noteX -= (base_node.getClientRect().width + 20)
    } else {

        labelX -= (measure_text.width + 20)
    }
    // console.log(labelX)
    note_group.absolutePosition({
        x: noteX,
        y: arrow.getY() - base_node.getClientRect().height
    })

    labelArrow.absolutePosition({
        x: labelX,
        y: arrow.getY() - measure_text.height,
    })

    // line_hg = arrow.getY()

}
//#endregion

//#region Send Messages
function send_msg(msg, arrow_index, arrow_fill = '#5864bd', lbl_fontSize = 20, lbl_fill = '#F50057', y2 = null) {
    var arrow_group = new Konva.Group({
        name: "arrow_" + (arrow_count),
        draggable: true,
    })
    var arrow = new Konva.Arrow({
        x: 0,
        y: 0,
        points: [0, 0, 0, 0],
        pointerLength: 10,
        pointerWidth: 10,
        fill: '#5864bd',
        stroke: arrow_fill,
        strokeWidth: 2,
    });
    var labelArrow = new Konva.Text({
        fontSize: lbl_fontSize,
        fontFamily: 'Consolas',
        fill: lbl_fill,
        fontSize: 15,
        fontStyle: 'bold',
    });


    let note_group = new Konva.Group({
        width: 130,
        height: 25,
        draggable: true,
        id: "note_" + arrow_count,
        name: "note_" + arrow_count
    })

    let text_note = new Konva.Text({
        fontSize: 13,
        fontFamily: 'Consolas',
        fontStyle: 'bold',
        fill: '#000',
        padding: 10,
        align: 'left',
        lineHeight: 1.4
    })

    let base_node = new Konva.Rect({
        fill: '#CCFFCC',
        // shadowOpacity: 0.4,
        // shadowBlur: 2,
        stroke: '#000',
        strokeWidth: 1,
        cornerRadius: [5, 5, 5, 5],
        // shadowColor: 'black',
        // shadowOffset: {
        //     x: 1,
        //     y: 1
        // },
        // strokeWidth: 4,
    })
    note_group.add(base_node, text_note)
    arrow_group.add(arrow, labelArrow, note_group)
    layer.add(arrow_group)

    // console.log("arrow list => ", arrow_list)
    arrow_count++;
    return { arrow: arrow_group, lbl_arrow: labelArrow }
}

// ------------ پارس کردن پارامترهای ورودی به برچسب فلش و محتوای نوت ----------//
function params_to_note_parser(input_params, index) {
    var p = {
        func: [],
        nonce: []
    }
    var length_params = input_params.length
    for (var i = 0; i < length_params; i++) {
        if (is_function(input_params[i])) {
            let label_message = {
                name: "P" + (index) + i.toString(),
                value: input_params[i]
            }
            if (macro_list.length == 0)
                macro_list.push(label_message)
                // } else {

            macro_list.forEach(el => {
                if (el.value === label_message.value) {
                    label_message.name = el.name
                }
            })
            macro_list.filter(el => el.value == label_message.value).length > 0 ? null : macro_list.push(label_message)
                // }
            p.func.push(label_message)
        } else {
            p.nonce.push(input_params[i])
        }

    }
    return p
}

function draw_arrow_from_arrow_list(index) {

    let idx_arrow_list = arrow_list[index]
        // console.log(index)

    let drawed_arrow = send_msg(idx_arrow_list.message, index)
    arrow_list[index].arrow = drawed_arrow.arrow
        //------------- تبدیل پارمترهای ورودی به آبجکت --------//
    var msg = idx_arrow_list.message
    let lbl_msg = ''
    let note_msg = msg.define.length > 0 ? msg.define.join("\n") : ''
        // note_msg += "\n"
    let array_obj_params = params_to_note_parser(msg.params, index)
    array_obj_params.func.forEach(ar => {
        lbl_msg += `(${ar.name})  `
        note_msg += `\n${ar.name} = ${ar.value}`
    })
    array_obj_params.nonce.forEach(ar => {
        lbl_msg += `(${ar})  `
    })




    //---------- تنظیم مقادیر برچسب و پیام --------------//
    var note_group = idx_arrow_list.arrow.children[2]
    note_group.children[1].text(note_msg.trim())
    idx_arrow_list.arrow.children[1].text(lbl_msg)

    if (note_msg.trim() != '') {
        note_group.children[0].width(note_group.children[1].width())
        note_group.children[0].height(note_group.children[1].height())
    } else {
        note_group.children[0].width(0)
        note_group.children[0].height(0)
    }


    arrow_list[index].abstract_msg = array_obj_params

    // if (lbl_msg.trim() != '') {
    arrow_points(idx_arrow_list.from, idx_arrow_list.to, index)
        // ------  بروز رسانی اندازه خط هر پارتنر -------------//
    rect_list.forEach(el => {
            el.children[2].attrs.points[5] = arrow_list.slice(-1)[0].arrow.children[0].getY() + 50
        })
        // }
}
//#endregion


//#region File Manager
//#endregion

//#region Toobox
//#region NotEmpty
function NotEmpty(obj) {
    return Object.keys(obj).length !== 0;
}
//#endregion
function getFormId(id) {
    var btn_param = document.getElementById(id)
    return btn_param
}

function draw_arrow(stage, layer, tex = null) {

    let arrow;
    stage.on('mousedown', () => {
        const pos = stage.getPointerPosition();
        arrow = new Konva.Arrow({
            points: [pos.x, pos.y],
            stroke: '#3399FF',
            fill: '#3399FF',
            id: "arr_id",
            draggable: true,
            dragBoundFunc: function(pos) {
                return {
                    x: this.absolutePosition().x,
                    y: pos.y,
                };
            },
        });
        layer.add(arrow);
        layer.batchDraw();



        arrow.on('mouseover', () => {
            stage.container().style.cursor = 'text';
        })

        arrow.on('dblclick dbltap', (e) => {
            write_text(stage, layer, e.evt.layerX / 2, e.evt.layerY - 15)
        });

        var resize_arr = new Konva.Transformer({
            nodes: [arrow],
            // ignore stroke in size calculations
            ignoreStroke: true,
            borderDash: [3, 3],
            centeredScaling: true,
            rotationSnaps: [0, 90, 180, 270],
            // manually adjust size of transformer
            padding: 5,
        });
        resize_arr.on('transform', (e) => {
            resize_arr.setAttrs({
                width: Math.max(arrow.width() * arrow.scaleX(), 5),
                height: Math.max(arrow.height() * arrow.scaleY(), 5),
                scaleX: 1,
                scaleY: 1,

            })
        })
        arrow.on('click', (e) => {
            layer.add(resize_arr)
        })
        stage.on('click', (e) => {
            if (e.target.parent == null) {
                resize_arr.remove()
            }
        })
        menuBar(stage, arrow, resize_arr)
    });



    stage.on('mousemove', () => {
        if (arrow) {
            const pos = stage.getPointerPosition();
            stage.container().style.cursor = 'crosshair';
            const points = [arrow.points()[0], arrow.points()[1], pos.x, pos.y];
            arrow.points(points);
            layer.batchDraw();
        }
    });

    stage.on('mouseup', () => {
        arrow = null
        stage.container().style.cursor = 'default';
        stage.off('mousedown')
    });


    stage.add(layer);
    layer.draw();


}

function write_text(stage, layer, x = null, y = null, text = null, group = null) {

    var textNode = new Konva.Text({
        // text: 'name',
        // x: 0,
        y: 17,
        fontSize: 14,
        draggable: true,
        width: 100,
        align: 'center'
    });

    if (x != null && y != null) {

        textNode.absolutePosition({
            x: x,
            y: y
        })
    }

    if (text == null) {
        textNode.text("message")
    } else {
        textNode.text(text)
    }


    layer.add(textNode);

    var tr = new Konva.Transformer({

        enabledAnchors: ['middle-left', 'middle-right'],
        borderDash: [3, 3],
        centeredScaling: true,
        rotationSnaps: [0, 90, 180, 270],
        // set minimum width of text
        boundBoxFunc: function(oldBox, newBox) {
            newBox.width = Math.max(30, newBox.width);
            return newBox;
        },
    });

    tr.nodes([textNode]);
    if (group != null) {
        group.add(textNode)
            // return textNode
    }
    textNode.on('transform', function() {
        // reset scale, so only with is changing by transformer
        textNode.setAttrs({
            width: textNode.width() * textNode.scaleX(),
            scaleX: 1,
        });
    });
    textNode.on('click', () => {
        layer.add(tr);
    })



    textNode.on('dblclick dbltap', (e) => {
        // hide text node and transformer:
        textNode.hide();
        tr.hide();

        // at first lets find position of text node relative to the stage:
        // var textPosition = textNode.getAbsolutePosition();
        // var gr = group.getAbsolutePosition()
        var areaPosition = {
            x: e.evt.x - 41,
            y: e.evt.y - 8

        };


        var textarea = document.createElement('textarea');
        document.body.appendChild(textarea);

        // apply many styles to match text on canvas as close as possible
        // remember that text rendering on canvas and on the textarea can be different
        // and sometimes it is hard to make it 100% the same. But we will try...
        textarea.value = textNode.text();
        textarea.style.position = 'absolute';
        textarea.style.top = areaPosition.y + 'px';
        textarea.style.left = areaPosition.x + 'px';
        textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
        textarea.style.height = textNode.height() - textNode.padding() * 2 + 5 + 'px';
        textarea.style.fontSize = textNode.fontSize() + 'px';
        textarea.style.border = 'none';
        textarea.style.padding = '0px';
        textarea.style.margin = '0px';
        textarea.style.overflow = 'hidden';
        textarea.style.background = 'none';
        textarea.style.outline = 'none';
        textarea.style.resize = 'none';
        textarea.style.lineHeight = textNode.lineHeight();
        textarea.style.fontFamily = textNode.fontFamily();
        textarea.style.transformOrigin = 'left top';
        textarea.style.textAlign = textNode.align();
        textarea.style.color = textNode.fill();
        rotation = textNode.rotation();
        var transform = '';
        if (rotation) {
            transform += 'rotateZ(' + rotation + 'deg)';
        }

        var px = 0;
        // also we need to slightly move textarea on firefox
        // because it jumps a bit
        var isFirefox =
            navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isFirefox) {
            px += 2 + Math.round(textNode.fontSize() / 20);
        }
        transform += 'translateY(-' + px + 'px)';

        textarea.style.transform = transform;

        // reset height
        textarea.style.height = 'auto';
        // after browsers resized it we can set actual value
        textarea.style.height = textarea.scrollHeight + 3 + 'px';

        textarea.focus();

        function removeTextarea() {
            textarea.parentNode.removeChild(textarea);
            window.removeEventListener('click', handleOutsideClick);
            textNode.show();
            tr.show();
            tr.forceUpdate();
        }

        function setTextareaWidth(newWidth) {
            if (!newWidth) {
                // set width for placeholder
                newWidth = textNode.placeholder.length * textNode.fontSize();
            }
            // some extra fixes on different browsers
            var isSafari = /^((?!chrome|android).)*safari/i.test(
                navigator.userAgent
            );
            var isFirefox =
                navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            if (isSafari || isFirefox) {
                newWidth = Math.ceil(newWidth);
            }

            var isEdge =
                document.documentMode || /Edge/.test(navigator.userAgent);
            if (isEdge) {
                newWidth += 1;
            }
            textarea.style.width = newWidth + 'px';
        }

        textarea.addEventListener('keydown', function(e) {
            // hide on enter
            // but don't hide on shift + enter
            if (e.keyCode === 13 && !e.shiftKey) {
                textNode.text(textarea.value);
                removeTextarea();
                tr.remove()
            }
            // on esc do not set value back to node
            if (e.keyCode === 27) {
                removeTextarea();
            }
            if (e.keyCode == 46) {
                removeTextarea();
                textNode.remove()
                tr.remove()
            }
        });


        textarea.addEventListener('keydown', function(e) {
            scale = textNode.getAbsoluteScale().x;
            setTextareaWidth(textNode.width() * scale);
            textarea.style.height = 'auto';
            textarea.style.height =
                textarea.scrollHeight + textNode.fontSize() + 'px';
        });



        function handleOutsideClick(e) {
            if (e.target !== textarea) {
                textNode.text(textarea.value);
                removeTextarea();
                tr.remove()
            }
        }
        setTimeout(() => {
            window.addEventListener('click', handleOutsideClick);
        });
    });

    stage.add(layer);
    stage.on('click', (e) => {
        if (e.target.parent == null) {
            tr.remove()
        }
    })
    menuBar(stage, textNode, tr)
}

function self_arrow(stage, layer) {
    var arrow = new Konva.Arrow({
        x: stage.width() / 4,
        y: stage.height() / 4,
        points: [10, 40, 65, 40, 65, 90, 10, 90],
        pointerLength: 10,
        pointerWidth: 10,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 2,
        draggable: true
    });
    layer.add(arrow)
    stage.add(layer)

    var resize_arr = new Konva.Transformer({
        nodes: [arrow],
        // ignore stroke in size calculations
        ignoreStroke: true,
        borderDash: [3, 3],
        centeredScaling: true,
        rotationSnaps: [0, 90, 180, 270],
        // manually adjust size of transformer
        padding: 5,
    });
    resize_arr.on('transform', (e) => {
        resize_arr.setAttrs({
            width: Math.max(arrow.width() * arrow.scaleX(), 5),
            height: Math.max(arrow.height() * arrow.scaleY(), 5),
            scaleX: 1,
            scaleY: 1,

        })
    })
    arrow.on('click', (e) => {
        layer.add(resize_arr)

    })
    stage.on('click', (e) => {
        if (e.target.parent == null) {
            resize_arr.remove()
        }
    })
    menuBar(stage, arrow, resize_arr)
}

function toolbox_manager(type) {
    switch (type) {
        case 'rect':

            break;
        case 'arrow':
            // free_drawing(stage, layer, true);
            draw_arrow(stage, layer);
            break;
        case 'text':
            // free_drawing(stage, layer, true);
            write_text(stage, layer);

            break;
        case 'break_arrow':
            // free_drawing(stage, layer, true);
            self_arrow(stage, layer);

            break;
        case 'palet':
            break;
        case 'pen':
            free_drawing(stage, layer, 'brush', false);
            // $('body').awesomeCursor('pencil')
            break;
        case 'eraser':
            free_drawing(stage, layer, '', false);
            break;
        default:
            console.log("default")
    }
}

//#endregion

//#region add tab
var counter_tab = 0;
var tab_list = [];


function functionFormatToAnbxFormat() {
    if (function_array.length > 0) {
        function_array.forEach(fn => {
            switch (fn.name) {
                case "Enc":
                    encrypt_list.filter(a => {
                        if (a.funcString === fn.funcString) {
                            fn.AnbxFormat = a.AnbxFormat
                            fn.key = a.symKey
                        }

                    })
                    break
                case "AEnc":
                    Aencryp_list.filter(a => a.funcString === fn.funcString ? fn.AnbxFormat = a.AnbxFormat : null)
                    break
                case "Sign":
                    sign_list.filter(a => a.funcString === fn.funcString ? fn.AnbxFormat = a.AnbxFormat : null)
                    break
                case "Dec":
                    decrypt_list.filter(a => a.funcString === fn.funcString ? fn.AnbxFormat = a.plainText : null)
                    break;
                case "ADec":
                    ADecrypt_list.filter(a => a.funcString === fn.funcString ? fn.AnbxFormat = a.plainText : null)
                    break;
            }

        })

        function_array.reverse().forEach(fn => {
            fn.content.forEach((content, idx) => {
                if (is_function(content)) {
                    let tmp = function_array.find(a => a.funcString === content)
                    if (tmp != null) {
                        fn.content[idx] = tmp.AnbxFormat
                        fn.AnbxFormat = fn.AnbxFormat.replace(content, tmp.AnbxFormat)
                    }
                }
            })
        })

        function_array.forEach(fn => {
            if (fn.name === "Dec" || fn.name === "ADec") {
                let anbx_list = []
                fn.AnbxFormat.forEach(anbx => {
                    let Anbx_filter = function_array.filter(a => a.funcString === anbx)
                    console.log(" Anbx_filter ----------> ", fn.AnbxFormat)
                    if (Anbx_filter.length > 0) {
                        anbx_list.push(Anbx_filter[0].AnbxFormat)
                    } else {
                        anbx_list.push(anbx)
                    }
                })

                fn.AnbxFormat = `(${anbx_list.toString()})`

            }
        })
    }

    console.log("FUNCTION ARRAY ========> ", function_array)
}


function fideRepeade(array) {
    var result = [];
    array.filter(firstEl => array.filter(secodEl => secodEl == firstEl).length > 1 && !result.includes(firstEl) ? result.push(firstEl) : null)
    return result
}
// $('.nav-item').find('a').click(function() {
//     if ($(this).hasClass('active')) {
//         console.log("active ", $(this).attr('href'))

//     }
//     //         console.log("%%%%%% ", $(this).tabs())
//     //         if ($(this).hasClass('active')) {
//     //             console.log("lcm,dlmcd", $(this).attr('href'))
//     //         }
// })

function get_active_tabs() {
    var active_tabs = []
    $('.nav-item').find('a').each(function() {
        if ($(this).hasClass('active')) {
            active_tabs.push($(this).attr('href'))
        }
    })
    console.log("active_tabs ", active_tabs)
    return active_tabs
}



function registerRunButtonEvent() {



    //     $('#runApp').click(() => {



    //                 result_error_array = []
    //                 encrypt_list = []
    //                 function_array = []
    //                     // macro_list = []
    //                     // key_list = []
    //                 console.log("********* ", macro_list)

    //                 // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
    //                 parser_msg_to_partner_new(arrow_list)

    //                 console.log("ARRAY PARTNER => ", array_partner)

    //                 counter_tab++
    //                 if ($('.nav-item').find('a').hasClass('active')) {
    //                     $('.nav-item').find('a').removeClass('active')
    //                     $('.tab-pane').removeClass('active')
    //                     $('.nav-item').find('a').removeClass('active_tab')
    //                 }
    //                 $('#myTab').append('<li class="nav-item">' + `<a class="nav-link active c_tab active_tab" href="#Untiteld-${counter_tab}" data-bs-toggle="tab">` + `Untiteld-${counter_tab}</a>` + `<span class="custom-close-icon-2"><i class="c-icon 
    //         fas fa-times"></i></span>` + '</li>')
    //                 $('.tab-content').append(`<div class="tab-pane fade show active" id="Untiteld-${counter_tab}">
    //         <div class="card custom_vh ">
    //             <div class="row">
    //                 <div class="col">
    //                     <div class="card-header text-white bg-dark custom_header_code">
    //                         Protocol
    //                     </div>
    //                     <div id="html-${counter_tab}"></div>
    //                 </div>
    //                 <div class="col">
    //                     <div class="card-header text-white bg-dark">
    //                         Output
    //                     </div>
    //                     <div class="output" id="output-${counter_tab}"></div>
    //                 </div>
    //             </div>
    //         </div>`)
    //                 var Agent = array_partner.map(a => a.name)
    //                 var public_key = array_partner.map(a => a.AsymKey.map(Ak => Ak.pk))


    //                 // symetric key Type
    //                 var pre_symkey = []
    //                     // array_partner.filter(a => a.symKey.length > 0 ? pre_symkey = pre_symkey.concat(a.symKey) : null)
    //                 array_partner.filter(a => a.symKey.length > 0 ? pre_symkey.push.apply(pre_symkey, a.symKey) : null)
    //                 console.log("PRYSYMKEY => ", pre_symkey)

    //                 var getTypeSym = []
    //                 getTypeSym = encrypt_list.map(tp => !pre_symkey.includes(tp.symKey) && !is_function(tp.symKey) ? tp.symKey : null).concat(mac_list.map(mac => !pre_symkey.includes(mac.symKey) && !is_function(mac.symKey) ? mac.symKey : null)).filter(a => a != null)

    //                 console.log("getTypeSym ", getTypeSym)
    //                 console.log("encrypt_list ", encrypt_list)

    //                 var Nonces = array_partner.map(a => a.nonces.new_array.length > 0 ? a.nonces.new_array : null).toString().split(',').filter(a => a != '' && !getTypeSym.includes(a) && !Agent.includes(a))
    //                 var repeatedNunce = fideRepeade(Nonces)
    //                 if (repeatedNunce.length > 0) {
    //                     repeatedNunce.forEach(a => {
    //                         result_error_array.push({
    //                             function: a,
    //                             result: DUBLICATE_VALUE
    //                         })
    //                     })
    //                 }
    //                 console.log("Nonces ---------------- ", Nonces)

    //                 var tmp_Nonce = []
    //                 var capitalize_nonces = []
    //                 Nonces.filter(n => !tmp_Nonce.includes(n) ? tmp_Nonce.push(n) && capitalize_nonces.push(capitalizeFirstLetter(n)) : null)
    //                 Nonces = tmp_Nonce
    //                 var user_define_function = []
    //                 function_array.forEach(fn => {
    //                     if (!default_function_name.includes(fn.name)) {
    //                         var obj = {
    //                             name: fn.name,
    //                             inType: [],
    //                             outType: ''
    //                         }
    //                         fn.content.forEach(content => {
    //                             if (getTypeSym.includes(content) || pre_symkey.includes(content)) {
    //                                 obj.inType.push("Symmetric_key")
    //                             } else if (Agent.includes(content)) {
    //                                 obj.inType.push("Agent")
    //                             } else if (Nonces.includes(content)) {
    //                                 obj.inType.push("Number")
    //                             } else if (public_key.includes(content)) {
    //                                 obj.inType.push("PublicKey")
    //                             } else {
    //                                 obj.inType.push("Number")
    //                             }


    //                         })
    //                         var fn_string = `${fn.name}(${fn.content.toString()})`
    //                         var fn_tmp = function_array.filter(mc => mc.funcString === fn_string ? mc.name : null).filter(mc => mc != null)
    //                         var mc_tmp = macro_list.filter(mc => mc.value === fn_string ? mc.name : null).filter(mc => mc != null)

    //                         getTypeSym.includes(fn_string) || getTypeSym.includes(mc_tmp.length > 0 ? mc_tmp[0].name : null) ? obj.outType = "Symmetric_key" : obj.outType = "Number"
    //                         if ((user_define_function.findIndex(a => a.name === fn.name) === -1) && obj.name != "inv")
    //                             user_define_function.push(obj)
    //                     }
    //                 })

    //                 console.log("####### ", macro_list)

    //                 var shk_list = []
    //                 var share_list = []
    //                 key_from_to_list.forEach((key, idx) => {
    //                     key.AnbxFormat = `${key.key}(${key.partners.toString()})`
    //                     key.ScytherFormat = `k(${key.partners.toString()})`
    //                     share_list.push(`${key.partners.toString()} share ${key.AnbxFormat};`)
    //                     shk_list.push(
    //                         `Function [${Array(key.partners.length).fill('Agent').toString()} ->* Symmetric_key] ${key.key};`)
    //                 })

    //                 var Functions = function_array.map(a => !default_function_name.includes(a.name) ? a.name : null).filter(a => a != null)
    //                 var Knowledge = []
    //                 array_partner.forEach(a => {
    //                     var obj_know = {
    //                         name: a.name,
    //                         value: Agent.concat(Functions)
    //                     }
    //                     if (a.symKey.length > 0) {
    //                         key_from_to_list.filter(k => a.symKey.includes(k.key) ? obj_know.value.push(k.AnbxFormat) : null)
    //                             // obj_know.value.push.apply(obj_know.value, a.symKey)
    //                     }
    //                     if (a.AsymKey.length > 0) {
    //                         obj_know.value.push(a.AsymKey[0].pk, `inv(${a.AsymKey[0].pk})`)
    //                     }
    //                     Knowledge.push(obj_know)
    //                 })
    //                 var defineFuncString = user_define_function.map(a => `Function [${a.inType.toString()} -> ${a.outType}] ${a.name}`).join(`;\n\t\t`)
    //                     // var defineKnowledgeString = Knowledge.filter(a => `${a.name}: ${a.value.toString()}`).join(`;\n\t\t`)

    //                 var defineKnowledgeString = ''
    //                 Knowledge.filter(a => {
    //                     defineKnowledgeString += `${a.name}: ${a.value.filter(v => v.trim() != '').toString()};\n\t\t`
    //                 })

    //                 // defineKnowledgeString += `${share_list.join(`\n\t\t`)}`
    //                 var Actions = []
    //                 arrow_list.forEach((ar, index) => {
    //                     ar.message.params.forEach((pr, idx) => {
    //                         if (Nonces.includes(pr)) {
    //                             var tmp_pr = capitalizeFirstLetter(pr)
    //                                 // var tmp_pr_idx = Nonces.indexOf(pr)
    //                                 // Nonces[tmp_pr_idx] = tmp_pr
    //                             ar.message.params[idx] = tmp_pr
    //                         }
    //                     })
    //                     Actions.push({
    //                         from: ar.from,
    //                         to: ar.to,
    //                         message: ar.message
    //                     })
    //                 })



    //                 // // var tmp_function_array = function_array
    //                 // function_array.forEach((fn, index) => {
    //                 //     // let out_func_content = func_content(fn.value)
    //                 //     if (fn.content.length > 0) {
    //                 //         fn.content.forEach((cnt, idx) => {
    //                 //             if (Nonces.includes(cnt)) {
    //                 //                 var tmp_cnt = capitalizeFirstLetter(cnt)
    //                 //                 // var tmp_cnt_idx = Nonces.indexOf(cnt)
    //                 //                 // Nonces[tmp_cnt_idx] = tmp_cnt
    //                 //                 fn.content[idx] = tmp_cnt
    //                 //             }
    //                 //         })
    //                 //         function_array[index].content = fn.content
    //                 //         function_array[index].funcString = `${fn.name}(${fn.content.toString()})`

    //                 //         switch (fn.name) {
    //                 //             case "Enc":
    //                 //                 function_array[index].AnbxFormat = `{|${fn.content.slice(0, fn.content.length - 1).toString()}|}${fn.key}`
    //                 //                 break
    //                 //             case "AEnc":
    //                 //                 Aencryp_list.filter(a => a.funcString === fn.funcString ? fn.AnbxFormat = `{${fn.content.slice(0, fn.content.length - 1).toString()}}${a.keypair.publicKey}` : null)
    //                 //                 break
    //                 //             case "Sign":
    //                 //                 sign_list.filter(a => a.funcString === fn.funcString ? fn.AnbxFormat = `{${fn.content.slice(0, fn.content.length - 1).toString()}}inv(${a.keypair.pk})` : null)
    //                 //                 break
    //                 //             case "Dec":
    //                 //                 decrypt_list.filter(a => a.funcString === fn.funcString ? fn.AnbxFormat = a.plainText : null)
    //                 //                 break;
    //                 //             case "ADec":
    //                 //                 ADecrypt_list.filter(a => a.funcString === fn.funcString ? fn.AnbxFormat = a.plainText : null)
    //                 //                 break;
    //                 //         }

    //                 //     }
    //                 // })

    //                 // function_array.reverse().forEach(fn => {
    //                 //     fn.content.forEach((content, idx) => {
    //                 //         if (is_function(content)) {
    //                 //             let tmp = function_array.find(a => a.funcString === content)
    //                 //             if (tmp != null) {
    //                 //                 fn.content[idx] = tmp.AnbxFormat
    //                 //                 fn.AnbxFormat = fn.AnbxFormat.replace(content, tmp.AnbxFormat)
    //                 //             }
    //                 //         }
    //                 //     })
    //                 // })

    //                 // function_array.forEach(fn => {
    //                 //     if (fn.name === "Dec" || fn.name === "ADec") {
    //                 //         let anbx_list = []
    //                 //         fn.AnbxFormat.forEach(anbx => {
    //                 //             let Anbx_filter = function_array.filter(a => a.funcString === anbx)
    //                 //             console.log(" Anbx_filter ----------> ", fn.AnbxFormat)
    //                 //             if (Anbx_filter.length > 0) {
    //                 //                 anbx_list.push(Anbx_filter[0].AnbxFormat)
    //                 //             } else {
    //                 //                 anbx_list.push(anbx)
    //                 //             }
    //                 //         })

    //                 //         fn.AnbxFormat = `(${anbx_list.toString()})`

    //                 //     }
    //                 // })

    //                 // // functionFormatToAnbxFormat()
    //                 // console.log("Function ----------> ", function_array)





    //                 var defineActionString = Actions.map(a => `${a.from} -> ${a.to} : ${a.message.params.map(f => {
    //             let tmp = macro_list.find(m => m.value === f)
    //             if (tmp != null) {
    //                 return tmp.name
    //             } else {
    //                 return f
    //             }
    //         }).toString()}`).join(`\n\t\t`)




    //                 functionFormatToAnbxFormat()
    //                 console.log("SIGN LIST > ", sign_list)
    //                     // بروزرسانی ماکرو لیست و تبدیل به فرمت جدید
    //                 macro_list.forEach(a => {
    //                     let tmp = function_array.find(f => f.funcString === a.value)
    //                     if (tmp != null)
    //                         a.AnbxFormat = tmp.AnbxFormat
    //                 })
    //                 var definitions = macro_list.map(a => `${a.name} : ${a.AnbxFormat}`).join(`;\n\t\t`) + ';\n\t\t'


    //                 // // ----- 01/03/05 ----- //
    //                 // let tmp_macro_list = macro_list
    //                 // macro_list.forEach((mc, index) => {
    //                 //     // console.log("Macro ----------> ", mc)
    //                 //     if (mc.AnbxFormat.search("|") > -1) {
    //                 //         splite_content_bracket_pyp(mc.AnbxFormat)

    //                 //     }
    //                 //     else {
    //                 //         splite_content_bracket(mc.AnbxFormat)
    //                 //     }
    //                 //     // let mach_func = function_array.filter(fn => fn.funcString === mc.value)
    //                 //     // if(mach_func.length > 0){
    //                 //     //     macro_list[index].AnbxFormat = mach_func[0].AnbxFormat
    //                 //     // }

    //                 // })
    //                 // split_array.reverse().forEach((fn, index1) => {
    //                 //     split_array.forEach((f, index2) => {
    //                 //         if (index1 != index2) {
    //                 //             if (fn.content.search(f.AnbxFormat) > -1) {
    //                 //                 split_array[index1].func_string = fn.func_string.replace(f.AnbxFormat, f.func_string)
    //                 //                 console.log("Fn ----------> ", fn.func_string)
    //                 //             }
    //                 //         }
    //                 //     })
    //                 // })
    //                 console.log(" SPLIT ARRAY --------> ", split_array)


    //                 console.log("MACRO LIST > ", macro_list)

    //                 // var str = "A -> B: {|A,({SA,exp(g,XxKEa),Na,Nb}inv(sk(A))),SA|}h(Na,Nb,SA,exp(exp(g,XxKEa),YxKEb))"
    //                 // // var st = "{{dsofokdf}}"
    //                 // // console.log(st.replaceAll("{", "["))

    //                 // // splite_content_bracket_pyp(str)
    //                 // // split_array.forEach(s => {
    //                 // //     str = str.replace(s.Anbx_string, s.func_string)
    //                 // // })
    //                 // splite_content_bracket_pyp(str)
    //                 // split_array.forEach(s => {
    //                 //     str = str.replace(s.Anbx_string, s.func_string)
    //                 // })

    //                 // splite_content_bracket(str)
    //                 // split_array.forEach(s => {
    //                 //     str = str.replace(s.Anbx_string, s.func_string)
    //                 // })

    //                 // // console.log("===============================>  ", split_array)
    //                 // console.log(function_array)
    //                 // // console.log("===============================>  ", )


    //                 var GoalsFunc = []
    //                 array_partner.forEach(a => {
    //                     array_partner.forEach(b => {
    //                         if (a.name != b.name) {
    //                             a.nonces.new_array.forEach(n => {
    //                                 GoalsFunc.push(`${a.name} authenticates ${b.name} on ${capitalizeFirstLetter(n)}`)
    //                             })
    //                         }
    //                     })
    //                 })

    //                 encrypt_list.forEach(a => {
    //                     let tmp_key = key_from_to_list.filter(b => a.symKey == b.key)
    //                     let key = a.symKey
    //                     if (tmp_key.length > 0) {
    //                         key = tmp_key[0].AnbxFormat
    //                     }
    //                     GoalsFunc.push(`${key} secret between ${a.from},${a.to}`)
    //                     a.plainText.forEach(p => {
    //                         if (Nonces.includes(p)) {
    //                             p = capitalizeFirstLetter(p)
    //                         }
    //                         GoalsFunc.push(`${p} secret between ${a.from},${a.to}`)
    //                     })
    //                 })
    //                 Aencryp_list.forEach(a => {
    //                     a.plainText.forEach(p => {
    //                         if (Nonces.includes(p)) {
    //                             p = capitalizeFirstLetter(p)
    //                         }
    //                         GoalsFunc.push(`${p} secret between ${a.from},${a.to}`)
    //                     })
    //                 })

    //                 // function_array = tmp_function_array
    //                 // macro_list = tmp_macro_list


    //                 // ---------------------------- scyther --------------------------//
    //                 var Roles = []
    //                 array_partner.forEach(a => {
    //                     let msg_array = []
    //                     let stapt_msg
    //                     var obj_roles = {
    //                         name: a.name,
    //                         message: [],
    //                         fresh: [],
    //                         var: []
    //                     }
    //                     a.messages.forEach((msg, idx) => {
    //                         if (a.name == msg.from) {
    //                             stapt_msg = 'send_'
    //                             obj_roles.fresh.push.apply(obj_roles.fresh, msg.fresh)
    //                         } else if (a.name == msg.to) {
    //                             stapt_msg = 'recv_'
    //                             obj_roles.var.push.apply(obj_roles.var, msg.fresh)
    //                         }

    //                         msg_array.push(`${stapt_msg}${idx}(${msg.from},${msg.to},${msg.message.params.map(f => {
    //                     let tmp = macro_list.find(m => m.value === f)
    //                     if (tmp != null) {
    //                         return tmp.name
    //                     } else {
    //                         return f
    //                     }
    //                 })})`)
    //                     })
    //                     obj_roles.message = msg_array

    //                     Roles.push(obj_roles)
    //                 })



    //                 console.log("ROLES > ", Roles)


    //                 var macros = macro_list.map(a => `macro ${a.name} = ${a.AnbxFormat}`).filter(a => a != '' || a != null).join(`;\n`)
    //                 var define_func = `hashfunction ${user_define_function.map(d => d.name).filter(a => a != '' || a != null).join(',')};\n`
    //                 var protpcol_scyther_output = '\n'

    //                 if (macro_list.length > 0) {
    //                     protpcol_scyther_output += `${macros};\n\n`
    //                 }
    //                 if (user_define_function.length > 0) {
    //                     protpcol_scyther_output += `${define_func};\n\n`
    //                 }
    //                 protpcol_scyther_output += `protocol ${protocol_name}(${Agent.join(',')})\n{`

    //                 // `${macros}\n\n${define_func}\n\nprotocol ${protocol_name}(${Agent.join(',')})\n{\n`

    //                 Roles.forEach(a => {
    //                     var role = `\n\trole ${a.name}\n\t{\n\t\t`
    //                     if (a.fresh.length > 0) {
    //                         let tmp_fresh = a.fresh.filter(f => f != null || f != '')
    //                         if (tmp_fresh.length > 0) {
    //                             role += `fresh ${a.fresh.join(',')}: Nonce;\n\t\t`
    //                         }
    //                     }
    //                     if (a.var.length > 0) {
    //                         let tmp_var = a.var.filter(f => f != null || f != '')
    //                         if (tmp_var.length > 0) {
    //                             role += `var ${a.var.join(',')}: Nonce;\n\t\t`
    //                         }
    //                     }
    //                     if (a.message.length > 0) {
    //                         let tmp_msg = a.message.filter(f => f != null || f != '')
    //                         if (tmp_msg.length > 0) {
    //                             role += `${a.message.join(';\n\t\t')};\n\t`
    //                         }
    //                     }
    //                     role += `}\n`
    //                     protpcol_scyther_output += role
    //                 })
    //                 protpcol_scyther_output += `\n}`

    //                 protpcol_scyther_output = protpcol_scyther_output.replaceAll("|", "")
    //                 key_from_to_list.forEach(key => {
    //                     // console.log("key > ", protpcol_scyther_output.search('key'))
    //                     protpcol_scyther_output = protpcol_scyther_output.replace(key.AnbxFormat, key.ScytherFormat)

    //                 })

    //                 // `role ${a.name}\n\t{${a.fresh.join(',')}: Nonce;\n\t${a.var.join(',')}: Nonce;\n\t${a.message.join('\n\t;')}}\n\t`



    //                 console.log("OUTPUT SCY  ------> ", protpcol_scyther_output)

    //                 var scyther_protocol = `
    // protocol ${protocol_name}(${Agent.join(',')})
    // {
    //     role I
    //     {
    //         fresh ni: Nonce;
    //         var nr,nr2: Nonce;
    //         var kir: SessionKey;

    //         send_1(I,R, I,{ni}k(I,R) );
    //         recv_2(R,I, {succ(ni),nr}k(I,R) );
    //         send_3(I,R, {succ(nr)}k(I,R) );
    //         recv_4(R,I, {kir,nr2}k(I,R) );
    //         claim_I1(I,Secret,kir);
    //         claim_I2(I,Nisynch);
    //         claim_I3(I,Niagree);
    //         claim_I4(I,Empty,(Fresh,kir));
    //     }    

    //     role R
    //     {
    //         var ni: Nonce;
    //         fresh nr,nr2: Nonce;
    //         fresh kir: SessionKey;

    //         recv_1(I,R, I,{ni}k(I,R) );
    //         send_2(R,I, {succ(ni),nr}k(I,R) );
    //         recv_3(I,R, {succ(nr)}k(I,R) );
    //         send_4(R,I, {kir,nr2}k(I,R) );
    //         claim_R1(R,Secret,kir);
    //         claim_R2(R,Nisynch);
    //         claim_R3(R,Niagree);
    //         claim_R4(R,Empty,(Fresh,kir));
    //     }
    // }

    // `

    //                 var protocol = `
    // Protocol: ${project_name}

    // Types:
    // \t\tAgent ${Agent};
    // \t\tNumber ${capitalize_nonces};${getTypeSym.length > 0 ? '\n\t\tSymmetric_key ' : ''}${getTypeSym}${getTypeSym.length > 0 ? ';' : ''}${shk_list.length > 0 ? `\n\t\t${shk_list.join(`\n\t\t`)}` : ''}
    // \t\tFunction [Untyped,SymmetricKey -> Number] hmac;
    // \t\tFunction [Agent ->* PublicKey] pk;
    // \t\t${defineFuncString}

    // Definitions:
    // \t\t${definitions}

    // Knowledge:
    // \t\t${defineKnowledgeString}

    // Actions:
    // \t\t${defineActionString}

    // Goals:
    // \t\t${GoalsFunc.join(`\n\t\t`)}
    //         `
    //         // -------------------------End Anbx output-------------------------------

    //         var Pv_string = ''
    //         // btn_build.addEventListener('click', () => {
    //         //     console.log("8888888")
    //         //     createFile(project_name, 'sample-' + project_name, protocol)
    //         //     onClick(`${project_name}\\sample-${project_name}.Anbx`)
    //         //     proverif(`sample-${project_name}.pv`)
    //         //     fetch(`${project_name}\\sample-${project_name}.pv`)
    //         //         .then(response => response.text())
    //         //         .then(data => {
    //         //             // Do something with your data
    //         //             Pv_string = data
    //         //             console.log(data);
    //         //         });

    //         // })




    //         // ------------------------- Run code in AnBx analyzor -----------------//
    //         btn_anb.addEventListener('click', () => {
    //             // save_code_to_file('AnBx', protocol)
    //             createFile(project_name, 'sample-' + project_name, protocol)
    //             onClick(`${project_name}\\sample-${project_name}.Anbx`)
    //             // Anbx_string = read_file(`sample.Anbx`)

    //         })

    //         //--------------------------- Run code in PV analyzor ----------------------//
    //         btn_pv.addEventListener('click', () => {
    //             BulidProverifFile(protocol)

    //             // proverif(`sample-${project_name}.pv`)

    //             // fetch(`${project_name}\\sample-${project_name}.pv`)
    //             //     .then(response => response.text())
    //             //     .then(data => {
    //             //         // Do something with your data
    //             //         console.log(data);
    //             //     });

    //         })
    //         // -------------------------------------------------------------------------//



    //         // -----------------------Replace Nonces with Capitalized Nonces----------

    //         Nonces.forEach(nonce => {
    //             // let regex = /(,A,)|(,A\))|(\(A,)|(\(A\))/g

    //             let reg1 = `,${nonce},`
    //             let reg2 = `,${nonce})`
    //             let reg3 = `(${nonce},`
    //             let reg4 = `(${nonce})`

    //             let reg5 = `,${nonce}|`
    //             let reg6 = `|${nonce},`
    //             let reg7 = `|${nonce}|`

    //             let reg8 = `,${nonce}}`
    //             let reg9 = `{${nonce},`
    //             let reg10 = `{${nonce}}`

    //             protocol = protocol.replace(reg1, `,${capitalizeFirstLetter(nonce)},`)
    //             protocol = protocol.replace(reg2, `,${capitalizeFirstLetter(nonce)})`)
    //             protocol = protocol.replace(reg3, `(${capitalizeFirstLetter(nonce)},`)
    //             protocol = protocol.replace(reg4, `(${capitalizeFirstLetter(nonce)})`)

    //             protocol = protocol.replace(reg5, `,${capitalizeFirstLetter(nonce)}|`)
    //             protocol = protocol.replace(reg6, `|${capitalizeFirstLetter(nonce)},`)
    //             protocol = protocol.replace(reg7, `|${capitalizeFirstLetter(nonce)}|`)

    //             protocol = protocol.replace(reg8, `,${capitalizeFirstLetter(nonce)}}`)
    //             protocol = protocol.replace(reg9, `{${capitalizeFirstLetter(nonce)},`)
    //             protocol = protocol.replace(reg10, `{${capitalizeFirstLetter(nonce)}}`)


    //         })

    //         // A authenticates B on NxNB
    //         // B authenticates A on NxNB
    //         // NxNB secret between A,B
    //         // B *->* A: NxNB
    //         var Agent_style = []
    //         Agent.forEach(a => {
    //             Agent_style.push(`${a}: style2`)
    //         })
    //         var Agent_style_string = Agent_style.join(`,\n`)
    //         console.log("AGGGGGG ", Agent_style_string)
    //         var Output = CodeMirror(document.querySelector("#output-" + counter_tab), {
    //             // width: "50%",
    //             lineNumbers: true,
    //             lineWrapping: true,
    //             tabSize: 2,
    //             // value: JSON.stringify(result_error_array, null, ' '),
    //             value: JSON.stringify(Pv_string, null, ' '),
    //             mode: "javascript",
    //             theme: "material-darker",
    //             keyword: {
    //                 "Protocol:": "style4",
    //                 "Types:": "style4",
    //                 "Definitions:": "style4",
    //                 "Knowledge:": "style4",
    //                 "Actions:": "style4",
    //                 "Goals:": "style4",
    //                 "Agent": "style2",
    //                 "Number": "style2",
    //                 "Symmetric_key": "style2",
    //                 "Function": "style2",
    //                 "word3": "style3",
    //                 "example\.com": "style4",
    //                 "abc\\d+": "style2",

    //             }
    //         });

    //         var myCodeMirror = CodeMirror(document.querySelector('#html-' + counter_tab), {
    //             // width: "20%",
    //             lineNumbers: true,
    //             setSize: "50%,50%",
    //             // lineWrapping: true,
    //             tabSize: 2,
    //             value: protocol,
    //             mode: "javascript",
    //             theme: "material-darker",
    //             keyword: {
    //                 "Protocol:": "style4",
    //                 "Types:": "style4",
    //                 "Knowledge:": "style4",
    //                 "Definitions:": "style4",
    //                 "Actions:": "style4",
    //                 "Goals:": "style4",
    //                 "Agent": "style2",
    //                 "Number": "style2",
    //                 "Symmetric_key": "style2",
    //                 "Function": "style2",
    //                 "word3": "style3",
    //                 "share": "style2",
    //                 "example\.com": "style4",
    //                 "abc\\d+": "style2",
    //                 Agent_style_string
    //             }
    //         });


    //         // scyther

    //         // var myCodeMirror = CodeMirror(document.querySelector('#html-' + counter_tab), {
    //         //     // width: "20%",
    //         //     lineNumbers: true,
    //         //     setSize: "50%,50%",
    //         //     // lineWrapping: true,
    //         //     tabSize: 2,
    //         //     value: protpcol_scyther_output,
    //         //     mode: "javascript",
    //         //     theme: "material-darker",
    //         //     keyword: {
    //         //         "Protocol:": "style4",
    //         //         "Types:": "style4",
    //         //         "Knowledge:": "style4",
    //         //         "Definitions:": "style4",
    //         //         "Actions:": "style4",
    //         //         "Goals:": "style4",
    //         //         "Agent": "style2",
    //         //         "Number": "style2",
    //         //         "Symmetric_key": "style2",
    //         //         "Function": "style2",
    //         //         "word3": "style3",
    //         //         "share": "style2",
    //         //         "example\.com": "style4",
    //         //         "abc\\d+": "style2",
    //         //         Agent_style_string
    //         //     }
    //         // });

    //         console.log(myCodeMirror)

    //         registerCloseEvent()

    //         // const BASE_URL = 'http://localhost:8000/api/runExe'

    //         // axios.post(BASE_URL, {
    //         //     file_name: protocol_name,
    //         //     file_content: protocol
    //         // })
    //         //     .then(function (response) {
    //         //         console.log(response);
    //         //     })
    //         //     .catch(function (error) {
    //         //         console.log(error);
    //         //     });


    //         // fetch(BASE_URL, {
    //         //     method: "POST",
    //         //     headers: { 'Content-Type': 'application/json' },
    //         //     body: JSON.stringify({
    //         //         "file_name": "protocol",
    //         //         "file_content": protocol
    //         //     })
    //         // }).then(res => {
    //         //     console.log("Request complete! response:", res);
    //         // });

    //         // Execute()
    //         console.log("===============================>  ARRAY PARTNER 2>  ", array_partner)

    //     })
    var protocol

    btn_build.addEventListener('click', () => {
                result_error_array = []
                encrypt_list = []
                function_array = []
                    // macro_list = []
                    // key_list = []
                console.log("********* ", macro_list)

                // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
                parser_msg_to_partner_new(arrow_list)

                console.log("ARRAY PARTNER => ", array_partner)


                var Agent = array_partner.map(a => a.name)
                var public_key = array_partner.map(a => a.AsymKey.map(Ak => Ak.pk))


                // symetric key Type
                var pre_symkey = []
                    // array_partner.filter(a => a.symKey.length > 0 ? pre_symkey = pre_symkey.concat(a.symKey) : null)
                array_partner.filter(a => a.symKey.length > 0 ? pre_symkey.push.apply(pre_symkey, a.symKey) : null)
                console.log("PRYSYMKEY => ", pre_symkey)

                var getTypeSym = []
                getTypeSym = encrypt_list.map(tp => !pre_symkey.includes(tp.symKey) && !is_function(tp.symKey) ? tp.symKey : null).concat(mac_list.map(mac => !pre_symkey.includes(mac.symKey) && !is_function(mac.symKey) ? mac.symKey : null)).filter(a => a != null)

                console.log("getTypeSym ", getTypeSym)
                console.log("encrypt_list ", encrypt_list)

                var Nonces = array_partner.map(a => a.nonces.new_array.length > 0 ? a.nonces.new_array : null).toString().split(',').filter(a => a != '' && !getTypeSym.includes(a) && !Agent.includes(a))
                var repeatedNunce = fideRepeade(Nonces)
                if (repeatedNunce.length > 0) {
                    repeatedNunce.forEach(a => {
                        result_error_array.push({
                            function: a,
                            result: DUBLICATE_VALUE
                        })
                    })
                }
                console.log("Nonces ---------------- ", Nonces)

                var tmp_Nonce = []
                var capitalize_nonces = []
                Nonces.filter(n => !tmp_Nonce.includes(n) ? tmp_Nonce.push(n) && capitalize_nonces.push(capitalizeFirstLetter(n)) : null)
                Nonces = tmp_Nonce
                var user_define_function = []
                function_array.forEach(fn => {
                    if (!default_function_name.includes(fn.name)) {
                        var obj = {
                            name: fn.name,
                            inType: [],
                            outType: ''
                        }
                        fn.content.forEach(content => {
                            if (getTypeSym.includes(content) || pre_symkey.includes(content)) {
                                obj.inType.push("Symmetric_key")
                            } else if (Agent.includes(content)) {
                                obj.inType.push("Agent")
                            } else if (Nonces.includes(content)) {
                                obj.inType.push("Number")
                            } else if (public_key.includes(content)) {
                                obj.inType.push("PublicKey")
                            } else {
                                obj.inType.push("Number")
                            }


                        })
                        var fn_string = `${fn.name}(${fn.content.toString()})`
                        var fn_tmp = function_array.filter(mc => mc.funcString === fn_string ? mc.name : null).filter(mc => mc != null)
                        var mc_tmp = macro_list.filter(mc => mc.value === fn_string ? mc.name : null).filter(mc => mc != null)

                        getTypeSym.includes(fn_string) || getTypeSym.includes(mc_tmp.length > 0 ? mc_tmp[0].name : null) ? obj.outType = "Symmetric_key" : obj.outType = "Number"
                        if ((user_define_function.findIndex(a => a.name === fn.name) === -1) && obj.name != "inv")
                            user_define_function.push(obj)
                    }
                })

                console.log("####### ", macro_list)

                var shk_list = []
                var share_list = []
                key_from_to_list.forEach((key, idx) => {
                    key.AnbxFormat = `${key.key}(${key.partners.toString()})`
                    key.ScytherFormat = `k(${key.partners.toString()})`
                    share_list.push(`${key.partners.toString()} share ${key.AnbxFormat};`)
                    shk_list.push(
                        `Function [${Array(key.partners.length).fill('Agent').toString()} ->* Symmetric_key] ${key.key};`)
                })

                var Functions = function_array.map(a => !default_function_name.includes(a.name) ? a.name : null).filter(a => a != null)
                var Knowledge = []
                array_partner.forEach(a => {
                    var obj_know = {
                        name: a.name,
                        value: Agent.concat(Functions)
                    }
                    if (a.symKey.length > 0) {
                        key_from_to_list.filter(k => a.symKey.includes(k.key) ? obj_know.value.push(k.AnbxFormat) : null)
                            // obj_know.value.push.apply(obj_know.value, a.symKey)
                    }
                    if (a.AsymKey.length > 0) {
                        obj_know.value.push(a.AsymKey[0].pk, `inv(${a.AsymKey[0].pk})`)
                    }
                    Knowledge.push(obj_know)
                })
                var defineFuncString = user_define_function.map(a => `Function [${a.inType.toString()} -> ${a.outType}] ${a.name}`).join(`;\n\t\t`)
                    // var defineKnowledgeString = Knowledge.filter(a => `${a.name}: ${a.value.toString()}`).join(`;\n\t\t`)

                var defineKnowledgeString = ''
                Knowledge.filter(a => {
                    defineKnowledgeString += `${a.name}: ${a.value.filter(v => v.trim() != '').toString()};\n\t\t`
                })

                // defineKnowledgeString += `${share_list.join(`\n\t\t`)}`
                var Actions = []
                arrow_list.forEach((ar, index) => {
                    ar.message.params.forEach((pr, idx) => {
                        if (Nonces.includes(pr)) {
                            var tmp_pr = capitalizeFirstLetter(pr)
                                // var tmp_pr_idx = Nonces.indexOf(pr)
                                // Nonces[tmp_pr_idx] = tmp_pr
                            ar.message.params[idx] = tmp_pr
                        }
                    })
                    Actions.push({
                        from: ar.from,
                        to: ar.to,
                        message: ar.message
                    })
                })



                var defineActionString = Actions.map(a => `${a.from} -> ${a.to} : ${a.message.params.map(f => {
            let tmp = macro_list.find(m => m.value === f)
            if (tmp != null) {
                return tmp.name
            } else {
                return f
            }
        }).toString()}`).join(`\n\t\t`)




                functionFormatToAnbxFormat()
                console.log("SIGN LIST > ", sign_list)
                    // بروزرسانی ماکرو لیست و تبدیل به فرمت جدید
                macro_list.forEach(a => {
                    let tmp = function_array.find(f => f.funcString === a.value)
                    if (tmp != null)
                        a.AnbxFormat = tmp.AnbxFormat
                })
                var definitions = macro_list.map(a => `${a.name} : ${a.AnbxFormat}`).join(`;\n\t\t`) + ';\n\t\t'

                var GoalsFunc = []
                array_partner.forEach(a => {
                    array_partner.forEach(b => {
                        if (a.name != b.name) {
                            a.nonces.new_array.forEach(n => {
                                GoalsFunc.push(`${a.name} authenticates ${b.name} on ${capitalizeFirstLetter(n)}`)
                            })
                        }
                    })
                })

                encrypt_list.forEach(a => {
                    let tmp_key = key_from_to_list.filter(b => a.symKey == b.key)
                    let key = a.symKey
                    if (tmp_key.length > 0) {
                        key = tmp_key[0].AnbxFormat
                    }
                    GoalsFunc.push(`${key} secret between ${a.from},${a.to}`)
                    a.plainText.forEach(p => {
                        if (Nonces.includes(p)) {
                            p = capitalizeFirstLetter(p)
                        }
                        GoalsFunc.push(`${p} secret between ${a.from},${a.to}`)
                    })
                })
                Aencryp_list.forEach(a => {
                    a.plainText.forEach(p => {
                        if (Nonces.includes(p)) {
                            p = capitalizeFirstLetter(p)
                        }
                        GoalsFunc.push(`${p} secret between ${a.from},${a.to}`)
                    })
                })

                // function_array = tmp_function_array
                // macro_list = tmp_macro_list


                // ---------------------------- scyther --------------------------//
                var Roles = []
                array_partner.forEach(a => {
                    let msg_array = []
                    let stapt_msg
                    var obj_roles = {
                        name: a.name,
                        message: [],
                        fresh: [],
                        var: []
                    }
                    a.messages.forEach((msg, idx) => {
                        if (a.name == msg.from) {
                            stapt_msg = 'send_'
                            obj_roles.fresh.push.apply(obj_roles.fresh, msg.fresh)
                        } else if (a.name == msg.to) {
                            stapt_msg = 'recv_'
                            obj_roles.var.push.apply(obj_roles.var, msg.fresh)
                        }

                        msg_array.push(`${stapt_msg}${idx}(${msg.from},${msg.to},${msg.message.params.map(f => {
                    let tmp = macro_list.find(m => m.value === f)
                    if (tmp != null) {
                        return tmp.name
                    } else {
                        return f
                    }
                })})`)
                    })
                    obj_roles.message = msg_array

                    Roles.push(obj_roles)
                })



                console.log("ROLES > ", Roles)


                var macros = macro_list.map(a => `macro ${a.name} = ${a.AnbxFormat}`).filter(a => a != '' || a != null).join(`;\n`)
                var define_func = `hashfunction ${user_define_function.map(d => d.name).filter(a => a != '' || a != null).join(',')};\n`
                var protpcol_scyther_output = '\n'

                if (macro_list.length > 0) {
                    protpcol_scyther_output += `${macros};\n\n`
                }
                if (user_define_function.length > 0) {
                    protpcol_scyther_output += `${define_func};\n\n`
                }
                protpcol_scyther_output += `protocol ${protocol_name}(${Agent.join(',')})\n{`

                // `${macros}\n\n${define_func}\n\nprotocol ${protocol_name}(${Agent.join(',')})\n{\n`

                Roles.forEach(a => {
                    var role = `\n\trole ${a.name}\n\t{\n\t\t`
                    if (a.fresh.length > 0) {
                        let tmp_fresh = a.fresh.filter(f => f != null || f != '')
                        if (tmp_fresh.length > 0) {
                            role += `fresh ${a.fresh.join(',')}: Nonce;\n\t\t`
                        }
                    }
                    if (a.var.length > 0) {
                        let tmp_var = a.var.filter(f => f != null || f != '')
                        if (tmp_var.length > 0) {
                            role += `var ${a.var.join(',')}: Nonce;\n\t\t`
                        }
                    }
                    if (a.message.length > 0) {
                        let tmp_msg = a.message.filter(f => f != null || f != '')
                        if (tmp_msg.length > 0) {
                            role += `${a.message.join(';\n\t\t')};\n\t`
                        }
                    }
                    role += `}\n`
                    protpcol_scyther_output += role
                })
                protpcol_scyther_output += `\n}`

                protpcol_scyther_output = protpcol_scyther_output.replaceAll("|", "")
                key_from_to_list.forEach(key => {
                    // console.log("key > ", protpcol_scyther_output.search('key'))
                    protpcol_scyther_output = protpcol_scyther_output.replace(key.AnbxFormat, key.ScytherFormat)

                })

                // `role ${a.name}\n\t{${a.fresh.join(',')}: Nonce;\n\t${a.var.join(',')}: Nonce;\n\t${a.message.join('\n\t;')}}\n\t`



                console.log("OUTPUT SCY  ------> ", protpcol_scyther_output)

                var scyther_protocol = `
    protocol ${protocol_name}(${Agent.join(',')})
    {
    role I
    {
    fresh ni: Nonce;
    var nr,nr2: Nonce;
    var kir: SessionKey;
    
    send_1(I,R, I,{ni}k(I,R) );
    recv_2(R,I, {succ(ni),nr}k(I,R) );
    send_3(I,R, {succ(nr)}k(I,R) );
    recv_4(R,I, {kir,nr2}k(I,R) );
    claim_I1(I,Secret,kir);
    claim_I2(I,Nisynch);
    claim_I3(I,Niagree);
    claim_I4(I,Empty,(Fresh,kir));
    }    
    
    role R
    {
    var ni: Nonce;
    fresh nr,nr2: Nonce;
    fresh kir: SessionKey;
    
    recv_1(I,R, I,{ni}k(I,R) );
    send_2(R,I, {succ(ni),nr}k(I,R) );
    recv_3(I,R, {succ(nr)}k(I,R) );
    send_4(R,I, {kir,nr2}k(I,R) );
    claim_R1(R,Secret,kir);
    claim_R2(R,Nisynch);
    claim_R3(R,Niagree);
    claim_R4(R,Empty,(Fresh,kir));
    }
    }
    
    `

                protocol = `
    Protocol: ${project_name}
    
    Types:
    \t\tAgent ${Agent};
    \t\tNumber ${capitalize_nonces};${getTypeSym.length > 0 ? '\n\t\tSymmetric_key ' : ''}${getTypeSym}${getTypeSym.length > 0 ? ';' : ''}${shk_list.length > 0 ? `\n\t\t${shk_list.join(`\n\t\t`)}` : ''}
    \t\tFunction [Untyped,SymmetricKey -> Number] hmac;
    \t\tFunction [Agent ->* PublicKey] pk;
    \t\t${defineFuncString}
    
    Definitions:
    \t\t${definitions}
    
    Knowledge:
    \t\t${defineKnowledgeString}
    
    Actions:
    \t\t${defineActionString}
    
    Goals:
    \t\t${GoalsFunc.join(`\n\t\t`)}
    `
        // -------------------------End Anbx output-------------------------------

        var Pv_string
        var src = JSON.stringify(save_source_to_clipboard())
        createFileJSON(project_name, `${project_name}`, src)

        // -----------------------Replace Nonces with Capitalized Nonces----------

        Nonces.forEach(nonce => {
            // let regex = /(,A,)|(,A\))|(\(A,)|(\(A\))/g

            let reg1 = `,${nonce},`
            let reg2 = `,${nonce})`
            let reg3 = `(${nonce},`
            let reg4 = `(${nonce})`

            let reg5 = `,${nonce}|`
            let reg6 = `|${nonce},`
            let reg7 = `|${nonce}|`

            let reg8 = `,${nonce}}`
            let reg9 = `{${nonce},`
            let reg10 = `{${nonce}}`

            protocol = protocol.replace(reg1, `,${capitalizeFirstLetter(nonce)},`)
            protocol = protocol.replace(reg2, `,${capitalizeFirstLetter(nonce)})`)
            protocol = protocol.replace(reg3, `(${capitalizeFirstLetter(nonce)},`)
            protocol = protocol.replace(reg4, `(${capitalizeFirstLetter(nonce)})`)

            protocol = protocol.replace(reg5, `,${capitalizeFirstLetter(nonce)}|`)
            protocol = protocol.replace(reg6, `|${capitalizeFirstLetter(nonce)},`)
            protocol = protocol.replace(reg7, `|${capitalizeFirstLetter(nonce)}|`)

            protocol = protocol.replace(reg8, `,${capitalizeFirstLetter(nonce)}}`)
            protocol = protocol.replace(reg9, `{${capitalizeFirstLetter(nonce)},`)
            protocol = protocol.replace(reg10, `{${capitalizeFirstLetter(nonce)}}`)


        })

        // A authenticates B on NxNB
        // B authenticates A on NxNB
        // NxNB secret between A,B
        // B *->* A: NxNB
        var Agent_style = []
        Agent.forEach(a => {
            Agent_style.push(`${a}: style2`)
        })
        var Agent_style_string = Agent_style.join(`,\n`)
        console.log("AGGGGGG ", Agent_style_string)
        // createFileJSON(project_name,`project-${project_name}.json`,protocol)
        createAnbxFile(protocol)




        registerCloseEvent()
    })

    btn_pv.addEventListener('click', () => {

        $.each($('.nav-tabs > li > a'), function (index, value) {
            // get active tag
            if ($(value).hasClass('active') && $(value).attr('href') === '#pv_viewer') {

                proverif(`${project_name}.pv`, project_name)
                // setTimeout(() => {
                //     TreeView()
                // }, 3000);
                // TreeView()

            }

        })

    })

    btn_spdl.addEventListener('click', () => {
        console.log("SPDL ==> ", `${project_name}\\output_${spdl_file_name}\\${spdl_file_name}.spdl`)
        fetch(`${project_name}\\output_${spdl_file_name}\\${spdl_file_name}.spdl`)
        .then(response => response.text())
        .then(data => {
            // console.log("spdl ===> ", data)
            runScyther(spdl_file_name,project_name)
            setTimeout(() => {
                TreeView()
            }, 2000);
        }).catch(err => {
            console.log(err)
        });
        
    })

}

setInterval(function () {
    $('#myTab').children('li').each(function () {
        $(this).children().hasClass('active') ? $(this).children("a").addClass('active_tab') : $(this).children().removeClass('active_tab')
    })
}, 100)

function registerCloseEvent() {
    $('.custom-close-icon-2').click(function () {
        $(this).parent().remove()
        $('.tab-content').children($(this).parent().children('a').attr('href')).remove()
        $('#myTab a:first').addClass('active')
        $('.tab-content').find('div[id="' + $('#myTab a:first').attr('href').replace('#', '') + '"]').addClass('show active')
    })
}

$(function () {
    registerRunButtonEvent()
    registerCloseEvent()

})



function AnbxToJson(str) {
    var obj = {}

    var keywordList = ['Protocol', 'Definitions', 'Types', 'Knowledge', 'Actions', 'Goals']
    var index_list = []

    keywordList.forEach(k => {
        var obj = {
            name: k,
            index: str.indexOf(k),
            value: ''
        }
        index_list.push(obj)
    })

    index_list.sort((a, b) => {
        return a.index - b.index
    })

    for (var i = 0; i < index_list.length; i++) {
        var ii = ''
        if (i == index_list.length - 1) {
            ii = str.length - 1
        } else {
            ii = index_list[i + 1].index
        }
        index_list[i].value = str.substring(index_list[i].index + index_list[i].name.length + 1, ii).replace(/\t|;/g, '').replace(/\n\n+/g, '\n').trim().split('\n')
    }


    let protocol = index_list.find((i) => i.name === 'Protocol').value
    let actions = index_list.find((i) => i.name === 'Actions').value
    let definitions = index_list.find((i) => i.name === 'Definitions').value

    var output = {
        partners: [],
        arrows: [],
        key_list: [],
        protocol: protocol,
    }

    var x_pos = 200

    actions.forEach(e => {

        split_array = []
        splite_content_bracket_pyp(e)
        split_array.forEach(s => {
            e = e.replace(s.Anbx_string, s.func_string)
        })
        // console.log(split_array)
        split_array = []
        splite_content_bracket(e)
        split_array.forEach(s => {
            e = e.replace(s.Anbx_string, s.func_string)
        })
        // console.log(split_array)
        let tmp = e.split(':')
        let tmp2 = tmp[0].split('->')
        let tmp3 = splite_content(tmp[1].trim())




        if (output.partners.findIndex(p => p.name == tmp2[0].trim()) == -1) {
            output.partners.push({
                name: tmp2[0].trim(),
                pos: {
                    x: x_pos,
                    y: 50
                }
            })

            x_pos += 300
        }
        if (output.partners.findIndex(p => p.name == tmp2[1].trim()) == -1) {
            output.partners.push({
                name: tmp2[1].trim(),
                pos: {
                    x: x_pos,
                    y: 50
                }
            })

            x_pos += 300
        }


        output.arrows.push({
            from: tmp2[0].trim(),
            to: tmp2[1].trim(),
            message: {
                define: [],
                params: tmp3
            }
        })

    })

    definitions.forEach(d => {

        split_array = []
        splite_content_bracket_pyp(d)
        split_array.forEach(s => {
            d = d.replace(s.Anbx_string, s.func_string)
        })
        // console.log("SPLIT 1 : ", split_array)
        split_array = []
        splite_content_bracket(d)
        split_array.forEach(s => {
            d = d.replace(s.Anbx_string, s.func_string)
        })
        // console.log("SPLIT 2 : ", split_array)
        let tmp = d.split(':')


        let idx_param = output.arrows.findIndex(o => o.message.params.includes(tmp[0].trim()))
        if (idx_param > -1) {
            output.arrows[idx_param].message.define.push(d.replace(':', '='))
        }

    })



    return JSON.stringify(output)

    // console.log(output)

    // var blob = new Blob([JSON.stringify(output)], {
    //     type: "text/plain;charset=utf-8"
    // });
    // saveAs(blob, "sample.json");

}


//#endregion


function createAnbxFile(protocol) {
    createFile(project_name, project_name, protocol)
    console.log("*** create Anbx File ***")
    fetch(`${project_name}\\${project_name}.AnBx`)
        .then(response => response.text())
        .then(data => {
            console.log("Anbx ===> ", data)
            BuildAnbxFile(protocol)
        }).catch(err => {
            console.log(err)
        });
}

function BuildAnbxFile(protocol) {

    onClick(`${project_name}\\${project_name}.Anbx`)
    console.log("*** create pv file ***")
    setTimeout(() => {
        fetch(`${project_name}\\${project_name}.pv`)
            .then(data => {
                var edit_pv = ReplaceCharInFile(project_name)
                console.log("*** Replace pv file ***")
                // if(edit_pv == true)

            }).catch(err => {
                console.log(err)
            });
    }, 2000)
    setTimeout(() => {
        BulidProverifFile(protocol)
    }, 2000);

}

function BulidProverifFile(protocol) {

    proverif(`${project_name}.pv`, project_name)
    console.log("*** Build pv file ***")

    setTimeout(() => {
        FechContentFilePV(protocol)
    }, 2000);
}

function FechContentFilePV(protocol) {
    console.log("*** show pv file ***")
    fetch(`${project_name}\\${project_name}.pv`)
        .then(response => response.text())
        .then(data => {
            Pv_string = data
            // $(".loader").css("display", "block");

            setTimeout(() => {
    //             counter_tab++
    //             if ($('.nav-item').find('a').hasClass('active')) {
    //                 $('.nav-item').find('a').removeClass('active')
    //                 $('.tab-pane').removeClass('active')
    //                 $('.nav-item').find('a').removeClass('active_tab')
    //             }
    //             $('#myTab').append('<li class="nav-item">' + `<a class="nav-link c_tab active_tab" href="#Out-${counter_tab}" data-bs-toggle="tab">` + `Protocol-${counter_tab}</a>` + `<span class="custom-close-icon-2"><i class="c-icon 
    // fas fa-times"></i></span>` + '</li>'

    //             )
    //             $('#myTab').append('<li class="nav-item">' + `<a class="nav-link active c_tab active_tab" href="#pv-${counter_tab}" data-bs-toggle="tab">` + `pv-${counter_tab}</a>` + `<span class="custom-close-icon-2"><i class="c-icon 
    // fas fa-times"></i></span>` + '</li>')


    //             $('.tab-content').append(`<div class="tab-pane fade show" id="Out-${counter_tab}">
    // <div class="card custom_vh ">
    // <div class="row">
    //     <div class="col">
    //         <div class="card-header text-white bg-dark custom_header_code">
    //             Protocol
    //         </div>
    //         <div id="html-${counter_tab}"></div>
    //     </div>
    //     <div class="col">
    //         <div class="card-header text-white bg-dark">
    //             PV
    //         </div>
    //         <div class="output" id="output-${counter_tab}"></div>
    //     </div>
    // </div>
    // </div>`)

    //             $('.tab-content').append(`<div class="tab-pane fade show active" id="pv-${counter_tab}">
    // <div class="card custom_vh">
    // <iframe id="showhtmlpv" src="${project_name}\\outPV\\index.html" width="1000" height="1000"  frameborder="0">
    // </div>`)



                var Output = CodeMirror(document.querySelector("#output_pv"), {
                    // width: "50%",
                    lineNumbers: true,
                    lineWrapping: true,
                    tabSize: 2,
                    // value: JSON.stringify(result_error_array, null, ' '),
                    value: data,
                    mode: "javascript",
                    theme: "material-darker",
                    keyword: {
                        "Protocol:": "style4",
                        "Types:": "style4",
                        "Definitions:": "style4",
                        "Knowledge:": "style4",
                        "Actions:": "style4",
                        "Goals:": "style4",
                        "Agent": "style2",
                        "Number": "style2",
                        "Symmetric_key": "style2",
                        "Function": "style2",
                        "word3": "style3",
                        "example\.com": "style4",
                        "abc\\d+": "style2",

                    }
                });

                var myCodeMirror = CodeMirror(document.querySelector('#output_AnBx'), {
                    // width: "20%",
                    lineNumbers: true,
                    setSize: "50%,50%",
                    // lineWrapping: true,
                    tabSize: 2,
                    value: protocol,
                    mode: "javascript",
                    theme: "material-darker",
                    keyword: {
                        "Protocol:": "style4",
                        "Types:": "style4",
                        "Knowledge:": "style4",
                        "Definitions:": "style4",
                        "Actions:": "style4",
                        "Goals:": "style4",
                        "Agent": "style2",
                        "Number": "style2",
                        "Symmetric_key": "style2",
                        "Function": "style2",
                        "word3": "style3",
                        "share": "style2",
                        "example\.com": "style4",
                        "abc\\d+": "style2",
                    }
                });

                var proverifcss = `
        /* spacing between list items */
    
    li {
    margin-bottom: 20px;
    }
    
    /* occurrence class */
    
    .occ
    {
      color:green;
    }
    
    /* keywords */
    
    .keyword
    {
      color:blue;
    }
    
    /* connectives */
    
    .conn
    {
      font-weight:bold;
    }
    
    /* explanations of clauses */
    
    .explain
    {
      color:fuchsia;
    }
    
    /* Function symbols */
    
    .fun
    {
    }
    
    /* Predicates */
    
    .pred
    {
    }
    
    /* Variables */
    
    .var
    {
      font-style:italic;
    }
    
    /* Names */
    
    .name
    {
    }
    
    /* Types */
    
    .type
    {
    }
    
    /* Processes */
    
    .process
    {
        color:green
    }
    
    /* Results */
    
    .query
    { font-weight: bold;
      font-size: 120% }
    
    .result
    { font-weight: bold }
    
    .trueresult
    { color: green }
    
    .unknownresult
    { color: darkorange }
    
    .falseresult
    { color: red }
    
        `

                createFileCss(project_name, 'cssproverif', proverifcss)

            }, 2000);

            // $(".loader").css("display", "none");
            console.log(data);

            setTimeout(() => {
                TreeView()
            }, 3000);
        });
}

var outPv_file_list = []


function readFile(file_name, extension) {
    var path = window.location.pathname;
    var project_name = path.split('/');
    var name = project_name[project_name.length - 1];
    path = path.replace('/' + name, '')
    var result
        fetch(`${path}/${file_name}/${file_name}.${extension}`)
        .then(response => response.text())
        .then(data => {
            result =  data
        }).catch(err => {
            result = err
        });


        // var page = path.split("/").pop();

        console.log("read file ==> ", result);
        return result
}

function TreeView() {


    var listFile = getListFiles(project_name);
    console.log("listFile ==> ", listFile);
    if ($(`#${project_name}`).attr('id')) {
        $(`#${project_name}`).remove();
    }
        listFile.forEach((element, idx) => {
                if(element.name === project_name){
                    $('.tree-view').append(`
                    <details class="tree-nav__item is-expandable my_font" id="${element.name}">
                    <summary class="tree-nav__item-title"><i class="icon ion-android-folder"></i>${element.name}</summary>

                    `)
                }
                element.files.forEach(f => {
                    if (f.split('.').length == 1) {
                        $(`#${element.name}`).append(`
                        <details class="tree-nav__item is-expandable my_font" id="${f}">
                        <summary class="tree-nav__item-title"><i class="icon ion-android-folder"></i>${f}</summary>

                        `)
                    }else{
                        $(`#${element.name}`).append(`
                        <div class="tree-nav__item" id="${f}">
                        <a class="tree-nav__item-title"><i class="icon ion-android-document"></i>${f}</a>
                        </div>
                        `)

                        var extension = f.split('.').pop();
                        var without_extension = f.split('.').slice(0, -1).join('.');
                        console.log("without_extension ==> ", without_extension);
                        
                // if(extension === 'pv'){

                // fetch(`${project_name}\\output_${spdl_file_name}\\output\\${spdl_file_name}.pv`)
                // .then(response => response.text())
                // .then(data => {
                //     var Output = CodeMirror(document.querySelector("#output_pv"), {
                //         // width: "50%",
                //         lineNumbers: true,
                //         lineWrapping: true,
                //         tabSize: 2,
                //         // value: JSON.stringify(result_error_array, null, ' '),
                //         value: data,
                //         mode: "javascript",
                //         theme: "material-darker",
                //         keyword: {
                //             "Protocol:": "style4",
                //             "Types:": "style4",
                //             "Definitions:": "style4",
                //             "Knowledge:": "style4",
                //             "Actions:": "style4",
                //             "Goals:": "style4",
                //             "Agent": "style2",
                //             "Number": "style2",
                //             "Symmetric_key": "style2",
                //             "Function": "style2",
                //             "word3": "style3",
                //             "example\.com": "style4",
                //             "abc\\d+": "style2",

                //         }
                //     });
                // }).catch(err => {
                //     return err
                // });
                // }

                // if (extension === 'AnBx') {
                //     fetch(`${project_name}\\output_${spdl_file_name}\\output\\${spdl_file_name}.AnBx`)
                //     .then(response => response.text())
                //     .then(data => {
                //         var myCodeMirror = CodeMirror(document.querySelector('#output_AnBx'), {
                //             // width: "20%",
                //             lineNumbers: true,
                //             setSize: "50%,50%",
                //             lineWrapping: true,
                //             tabSize: 2,
                //             value: data,
                //             mode: "javascript",
                //             theme: "material-darker",
                //             keyword: {
                //                 "Protocol:": "style4",
                //                 "Types:": "style4",
                //                 "Knowledge:": "style4",
                //                 "Definitions:": "style4",
                //                 "Actions:": "style4",
                //                 "Goals:": "style4",
                //                 "Agent": "style2",
                //                 "Number": "style2",
                //                 "Symmetric_key": "style2",
                //                 "Function": "style2",
                //                 "word3": "style3",
                //                 "share": "style2",
                //                 "example\.com": "style4",
                //                 "abc\\d+": "style2",
                //             }
                //         });

                //         console.log("==============--------> ", data)
                //     }).catch(err => {
                //         return err
                //     });
                // }

                // if (extension === 'json') {
                //     fetch(`${project_name}\\output_${spdl_file_name}\\output\\${spdl_file_name}.json`)
                //     .then(response => response.text())
                //     .then(data => {
                //         data = JSON.parse(data)
                //         var JsonViewer = CodeMirror(document.querySelector('#json_viewer'), {
                //             // width: "20%",
                //             lineNumbers: true,
                //             setSize: "50%,50%",
                //             lineWrapping: true,
                //             tabSize: 2,
                //             value: JSON.stringify(data, null,' '),
                //             mode: "javascript",
                //             theme: "material-darker",
                //             keyword: {
                //                 "Protocol:": "style4",
                //                 "Types:": "style4",
                //                 "Knowledge:": "style4",
                //                 "Definitions:": "style4",
                //                 "Actions:": "style4",
                //                 "Goals:": "style4",
                //                 "Agent": "style2",
                //                 "Number": "style2",
                //                 "Symmetric_key": "style2",
                //                 "Function": "style2",
                //                 "word3": "style3",
                //                 "share": "style2",
                //                 "example\.com": "style4",
                //                 "abc\\d+": "style2",
                //             }
                //         });
                

                //         console.log("==============--------> ", data)
                //     }).catch(err => {
                //         return err
                //     });
                // }
                // if (extension === 'spdl') {
                //     fetch(`${project_name}\\output_${spdl_file_name}\\${spdl_file_name}.spdl`)
                //     .then(response => response.text())
                //     .then(data => {
                //         data = JSON.parse(data)
                //     var OutputSpdl = CodeMirror(document.querySelector("#output_scyther"), {
                //         lineNumbers: true,
                //         lineWrapping: true,
                //         tabSize: 2,
                //         value: data,
                //         mode: "javascript",
                //         theme: "material-darker",
                //         keyword: {
                //             "Protocol:": "style4",
                //             "Types:": "style4",
                //             "Definitions:": "style4",
                //             "Knowledge:": "style4",
                //             "Actions:": "style4",
                //             "Goals:": "style4",
                //             "Agent": "style2",
                //             "Number": "style2",
                //             "Symmetric_key": "style2",
                //             "Function": "style2",
                //             "word3": "style3",
                //             "example\.com": "style4",
                //             "abc\\d+": "style2",

                //         }
                //     });
                // }).catch(err => {
                //     return err
                // });
                // }
                // $.each($('.nav-tabs > li > a'), function (index, value) {
                //     if ($(this).attr('href') === `#${extension}_viewer`) {
                //         console.log("value ====> ", $(this).attr('href'));
                //         // remove active class from all tabs
                //         $('.nav-tabs > li > a').removeClass('active');
                //         $('.tab-pane').removeClass('active');
                //         $(this).addClass('active');
                //         $(`#${extension}_viewer`).addClass('active');
                //     }
                // })

                    }
                })


        });

        // if(element.isFile == true){
            $(`#${project_name}`).find('a').click(function () {
                console.log("element.name ====> ",  $(this).text());
                // splite name without extension
                var fileName_without_extension = $(this).text().split('.')[0];
                var fileNameOrg = $(this).text().split('.').slice(-1)[0]
                //get last element array


                var fileExtensionForChange = $(this).text().split('.')[0];
                var fileName = $(this).text();
                fileName = fileName.split('.')[1];  

                console.log("==========================> ", fileNameOrg)

                if(fileName === 'pv'){

                fetch(`${project_name}\\output_${spdl_file_name}\\output\\${spdl_file_name}.pv`)
                .then(response => response.text())
                .then(data => {
                    var Output = CodeMirror(document.querySelector("#output_pv"), {
                        // width: "50%",
                        lineNumbers: true,
                        lineWrapping: true,
                        tabSize: 2,
                        // value: JSON.stringify(result_error_array, null, ' '),
                        value: data,
                        mode: "javascript",
                        theme: "material-darker",
                        keyword: {
                            "Protocol:": "style4",
                            "Types:": "style4",
                            "Definitions:": "style4",
                            "Knowledge:": "style4",
                            "Actions:": "style4",
                            "Goals:": "style4",
                            "Agent": "style2",
                            "Number": "style2",
                            "Symmetric_key": "style2",
                            "Function": "style2",
                            "word3": "style3",
                            "example\.com": "style4",
                            "abc\\d+": "style2",

                        }
                    });
                }).catch(err => {
                    return err
                });
                }

                if (fileName === 'AnBx') {
                    fetch(`${project_name}\\output_${spdl_file_name}\\output\\${spdl_file_name}.AnBx`)
                    .then(response => response.text())
                    .then(data => {
                        var myCodeMirror = CodeMirror(document.querySelector('#output_AnBx'), {
                            // width: "20%",
                            lineNumbers: true,
                            setSize: "50%,50%",
                            lineWrapping: true,
                            tabSize: 2,
                            value: data,
                            mode: "javascript",
                            theme: "material-darker",
                            keyword: {
                                "Protocol:": "style4",
                                "Types:": "style4",
                                "Knowledge:": "style4",
                                "Definitions:": "style4",
                                "Actions:": "style4",
                                "Goals:": "style4",
                                "Agent": "style2",
                                "Number": "style2",
                                "Symmetric_key": "style2",
                                "Function": "style2",
                                "word3": "style3",
                                "share": "style2",
                                "example\.com": "style4",
                                "abc\\d+": "style2",
                            }
                        });

                        console.log("==============--------> ", data)
                    }).catch(err => {
                        return err
                    });
                }

                if (fileName === 'json') {
                    fetch(`${project_name}\\output_${spdl_file_name}\\output\\${spdl_file_name}.json`)
                    .then(response => response.text())
                    .then(data => {
                        data = JSON.parse(data)
                        var JsonViewer = CodeMirror(document.querySelector('#json_viewer'), {
                            // width: "20%",
                            lineNumbers: true,
                            setSize: "50%,50%",
                            lineWrapping: true,
                            tabSize: 2,
                            value: JSON.stringify(data, null,' '),
                            mode: "javascript",
                            theme: "material-darker",
                            keyword: {
                                "Protocol:": "style4",
                                "Types:": "style4",
                                "Knowledge:": "style4",
                                "Definitions:": "style4",
                                "Actions:": "style4",
                                "Goals:": "style4",
                                "Agent": "style2",
                                "Number": "style2",
                                "Symmetric_key": "style2",
                                "Function": "style2",
                                "word3": "style3",
                                "share": "style2",
                                "example\.com": "style4",
                                "abc\\d+": "style2",
                            }
                        });
                

                        console.log("==============--------> ", data)
                    }).catch(err => {
                        return err
                    });
                }
                if (fileName === 'spdl') {
                    fetch(`${project_name}\\output_${spdl_file_name}\\${spdl_file_name}.spdl`)
                    .then(response => response.text())
                    .then(data => {
                        data = JSON.parse(data)
                    var OutputSpdl = CodeMirror(document.querySelector("#output_scyther"), {
                        lineNumbers: true,
                        lineWrapping: true,
                        tabSize: 2,
                        value: data,
                        mode: "javascript",
                        theme: "material-darker",
                        keyword: {
                            "Protocol:": "style4",
                            "Types:": "style4",
                            "Definitions:": "style4",
                            "Knowledge:": "style4",
                            "Actions:": "style4",
                            "Goals:": "style4",
                            "Agent": "style2",
                            "Number": "style2",
                            "Symmetric_key": "style2",
                            "Function": "style2",
                            "word3": "style3",
                            "example\.com": "style4",
                            "abc\\d+": "style2",

                        }
                    });
                }).catch(err => {
                    return err
                });
                }
                if(fileNameOrg === 'pdf'){
                    // document.getElementById('showfiles').remove()
                    
                    fileName = 'file'
                    // remove all tag from output_file
                    $('#output_file').empty()
                    $('#output_file').append(`
                    <iframe id="showfiles" src="${project_name}\\output_${spdl_file_name}\\output\\${spdl_file_name}.pdf" width="1212" height="1000"  frameborder="0"></iframe>
                    `)
                    }
                if(fileNameOrg === 'dot'){
                    fileName = 'file'
                    $('#output_file').empty()
                    fetch(`${project_name}\\output_${spdl_file_name}\\output\\${$(this).text()}`)
                    .then(response => response.text())
                    .then(data => {
                        var DotFile = CodeMirror(document.querySelector("#output_file"), {
                            lineNumbers: true,
                            lineWrapping: true,
                            tabSize: 2,
                            value: data,
                            mode: "javascript",
                            theme: "material-darker",
                            keyword: {
                                "Protocol:": "style4",
                                "Types:": "style4",
                                "Definitions:": "style4",
                                "Knowledge:": "style4",
                                "Actions:": "style4",
                                "Goals:": "style4",
                                "Agent": "style2",
                                "Number": "style2",
                                "Symmetric_key": "style2",
                                "Function": "style2",
                                "word3": "style3",
                                "example\.com": "style4",
                                "abc\\d+": "style2",
                            }
                        });
                    }).catch(err => {
                        console.log(err)
                    });
                }
                $.each($('.nav-tabs > li > a'), function (index, value) {
                    if ($(this).attr('href') === `#${fileName}_viewer`) {
                        console.log("value ====> ", $(this).attr('href'));
                        // remove active class from all tabs
                        $('.nav-tabs > li > a').removeClass('active');
                        $('.tab-pane').removeClass('active');
                        $(this).addClass('active');
                        $(`#${fileName}_viewer`).addClass('active');
                    }
                })
            })
        // }

    // }

    // var OutputList
//     var OutPVList = []
//     var fileList = getListFiles(`${project_name}`);
//     fetch(`${project_name}\\output_${spdl_file_name}\\output\\index.html`)
//     .then(response => response.text())
//     .then(data => {
//         //  OutputList = getListFiles(`${project_name}\\output_${spdl_file_name}\\output`);
//          OutPVList = getListFiles(`${project_name}\\outPV`);
//     }).catch(err => {
//         console.log(err)
//     });
//     // 

//     var getfileElements = $(`#general-${project_name}`).attr('id')
//     console.log("getfileElements ====> ", fileList);
//     if(getfileElements === undefined || getfileElements === null){
//     fileList.forEach((element, idx )=> {
//         if (element !== 'outPV') {

//             $(`#detail-${project_name}`).append(`
//         <div class="tree-nav__item" id="general-${project_name}">
//         <a class="tree-nav__item-title"><i class="icon ion-android-document"></i>${element}</a>
//         </div>
//         `)
           
//         }



//     });


//     $(`#detail-${project_name}`).find('a').click(function () {
//         var fileNameOrg = $(this).text().split('.')[1]
//         var fileName = $(this).text();
//         fileName = fileName.split('.')[1];

//         if(fileName === 'pv'){

//         fetch(`${project_name}\\${project_name}.pv`)
//         .then(response => response.text())
//         .then(data => {
//             var Output = CodeMirror(document.querySelector("#output_pv"), {
//                 // width: "50%",
//                 lineNumbers: true,
//                 lineWrapping: true,
//                 tabSize: 2,
//                 // value: JSON.stringify(result_error_array, null, ' '),
//                 value: data,
//                 mode: "javascript",
//                 theme: "material-darker",
//                 keyword: {
//                     "Protocol:": "style4",
//                     "Types:": "style4",
//                     "Definitions:": "style4",
//                     "Knowledge:": "style4",
//                     "Actions:": "style4",
//                     "Goals:": "style4",
//                     "Agent": "style2",
//                     "Number": "style2",
//                     "Symmetric_key": "style2",
//                     "Function": "style2",
//                     "word3": "style3",
//                     "example\.com": "style4",
//                     "abc\\d+": "style2",

//                 }
//             });
//         }).catch(err => {
//             return err
//         });
//         }

//         if (fileName === 'AnBx') {
//             fetch(`${project_name}\\${project_name}.AnBx`)
//             .then(response => response.text())
//             .then(data => {
//                 var myCodeMirror = CodeMirror(document.querySelector('#output_AnBx'), {
//                     // width: "20%",
//                     lineNumbers: true,
//                     setSize: "50%,50%",
//                     lineWrapping: true,
//                     tabSize: 2,
//                     value: data,
//                     mode: "javascript",
//                     theme: "material-darker",
//                     keyword: {
//                         "Protocol:": "style4",
//                         "Types:": "style4",
//                         "Knowledge:": "style4",
//                         "Definitions:": "style4",
//                         "Actions:": "style4",
//                         "Goals:": "style4",
//                         "Agent": "style2",
//                         "Number": "style2",
//                         "Symmetric_key": "style2",
//                         "Function": "style2",
//                         "word3": "style3",
//                         "share": "style2",
//                         "example\.com": "style4",
//                         "abc\\d+": "style2",
//                     }
//                 });

//                 console.log("==============--------> ", data)
//             }).catch(err => {
//                 return err
//             });
//         }

//         if (fileName === 'json') {
//             fetch(`${project_name}\\${project_name}.json`)
//             .then(response => response.text())
//             .then(data => {
//                 data = JSON.parse(data)
//                 var JsonViewer = CodeMirror(document.querySelector('#json_viewer'), {
//                     // width: "20%",
//                     lineNumbers: true,
//                     setSize: "50%,50%",
//                     lineWrapping: true,
//                     tabSize: 2,
//                     value: JSON.stringify(data, null,' '),
//                     mode: "javascript",
//                     theme: "material-darker",
//                     keyword: {
//                         "Protocol:": "style4",
//                         "Types:": "style4",
//                         "Knowledge:": "style4",
//                         "Definitions:": "style4",
//                         "Actions:": "style4",
//                         "Goals:": "style4",
//                         "Agent": "style2",
//                         "Number": "style2",
//                         "Symmetric_key": "style2",
//                         "Function": "style2",
//                         "word3": "style3",
//                         "share": "style2",
//                         "example\.com": "style4",
//                         "abc\\d+": "style2",
//                     }
//                 });
        

//                 console.log("==============--------> ", data)
//             }).catch(err => {
//                 return err
//             });
//         }
//         if (fileName === 'spdl') {
//             fetch(`${project_name}\\${fileNameOrg}.spdl`)
//             .then(response => response.text())
//             .then(data => {
//                 data = JSON.parse(data)
//             var OutputSpdl = CodeMirror(document.querySelector("#output_scyther"), {
//                 lineNumbers: true,
//                 lineWrapping: true,
//                 tabSize: 2,
//                 value: data,
//                 mode: "javascript",
//                 theme: "material-darker",
//                 keyword: {
//                     "Protocol:": "style4",
//                     "Types:": "style4",
//                     "Definitions:": "style4",
//                     "Knowledge:": "style4",
//                     "Actions:": "style4",
//                     "Goals:": "style4",
//                     "Agent": "style2",
//                     "Number": "style2",
//                     "Symmetric_key": "style2",
//                     "Function": "style2",
//                     "word3": "style3",
//                     "example\.com": "style4",
//                     "abc\\d+": "style2",

//                 }
//             });
//         }).catch(err => {
//             return err
//         });
//         }
//         $.each($('.nav-tabs > li > a'), function (index, value) {
//             if ($(this).attr('href') === `#${fileName}_viewer`) {
//                 console.log("value ====> ", $(this).attr('href'));
//                 // remove active class from all tabs
//                 $('.nav-tabs > li > a').removeClass('active');
//                 $('.tab-pane').removeClass('active');
//                 $(this).addClass('active');
//                 $(`#${fileName}_viewer`).addClass('active');
//             }
//         })
//     })

// }


// if (OutPVList.length > 0) {
    
//     var getfileElementsOutPv = $(`#outPVDir${project_name}`).attr('id')
//     if(getfileElementsOutPv === undefined || getfileElementsOutPv === null){
//     $(`#detail-${project_name}`).append(`
//     <details class="tree-nav__item is-expandable" id="outPVDir${project_name}">
//     <summary class="tree-nav__item-title"><i class="icon ion-android-folder"></i>outPV</summary>
//     <div class="tree-nav__item" id="outpv-${project_name}">
//     </div>
//     </details>
//     `)


//         OutPVList.forEach(element => {
//         $(`#outpv-${project_name}`).append(`
//         <a class="tree-nav__item-title"><i class="icon ion-android-document"></i>${element}</a>
//         `)
//     });

//     $(`#outpv-${project_name}`).find('a').click(function () {
//         var orgName = $(this).text()
//         var fileName = $(this).text();
//         var fileNameOrg = $(this).text().split('.')[1];
//         fileName = fileName.split('.')[1];

//         if(fileNameOrg === 'html'){
//             var checkExists = document.getElementById('showhtmlpv')
//             if(checkExists != null){
//                 document.getElementById('showhtmlpv').remove()
//                 $('#output_html').append(`
//                 <iframe id="showhtmlpv" src="${project_name}\\outPV\\${orgName}" width="1212" height="1000"  frameborder="0"></iframe>
//                 `)
//             }else{
//                 $('#output_html').append(`
//                 <iframe id="showhtmlpv" src="${project_name}\\outPV\\${orgName}" width="1212" height="1000"  frameborder="0"></iframe>
//                 `)
//             }
//         }

//         $.each($('.nav-tabs > li > a'), function (index, value) {
//             var types = ['pdf', 'jpeg', 'dot']
//             if(types.includes(fileName)){
//                 fileName = 'file'
//             }

//             // if(fileNameOrg === 'pdf' || fileNameOrg === 'dot'){

//                 var checkExists = document.getElementById('showfiles')
//                 if(checkExists != null){
//                     document.getElementById('showfiles').remove()
//                     if(fileNameOrg === 'pdf'){
//                     $('#output_file').append(`
//                     <iframe id="showfiles" src="${project_name}\\outPV\\${orgName}" width="1212" height="1000"  frameborder="0"></iframe>
//                     `)
//                     }
//                     if(fileNameOrg === 'dot'){
//                         fetch(`${project_name}\\outPV\\${orgName}`)
//                         .then(response => response.text())
//                         .then(data => {
//                             console.log("dot file ===> ", data)


//                             var DotFile = CodeMirror(document.querySelector("#output_file"), {
//                                 // width: "50%",
//                                 lineNumbers: true,
//                                 lineWrapping: true,
//                                 tabSize: 2,
//                                 // value: JSON.stringify(result_error_array, null, ' '),
//                                 value: data,
//                                 mode: "javascript",
//                                 theme: "material-darker",
//                                 keyword: {
//                                     "Protocol:": "style4",
//                                     "Types:": "style4",
//                                     "Definitions:": "style4",
//                                     "Knowledge:": "style4",
//                                     "Actions:": "style4",
//                                     "Goals:": "style4",
//                                     "Agent": "style2",
//                                     "Number": "style2",
//                                     "Symmetric_key": "style2",
//                                     "Function": "style2",
//                                     "word3": "style3",
//                                     "example\.com": "style4",
//                                     "abc\\d+": "style2",
            
//                                 }
//                             });


//                         }).catch(err => {
//                             console.log(err)
//                         });
//                     }
//                 }else{
//                     if(fileNameOrg === 'pdf'){
//                         // remove all tag from output_file
//                         $('#output_file').empty()
//                         $('#output_file').append(`
//                         <iframe id="showfiles" src="${project_name}\\outPV\\${orgName}" width="1212" height="1000"  frameborder="0"></iframe>
//                         `)
//                         }
//                         if(fileNameOrg === 'dot'){
//                             $('#output_file').empty()
//                             fetch(`${project_name}\\outPV\\${orgName}`)
//                             .then(response => response.text())
//                             .then(data => {
//                                 var DotFile = CodeMirror(document.querySelector("#output_file"), {
//                                     lineNumbers: true,
//                                     lineWrapping: true,
//                                     tabSize: 2,
//                                     value: data,
//                                     mode: "javascript",
//                                     theme: "material-darker",
//                                     keyword: {
//                                         "Protocol:": "style4",
//                                         "Types:": "style4",
//                                         "Definitions:": "style4",
//                                         "Knowledge:": "style4",
//                                         "Actions:": "style4",
//                                         "Goals:": "style4",
//                                         "Agent": "style2",
//                                         "Number": "style2",
//                                         "Symmetric_key": "style2",
//                                         "Function": "style2",
//                                         "word3": "style3",
//                                         "example\.com": "style4",
//                                         "abc\\d+": "style2",
//                                     }
//                                 });
//                             }).catch(err => {
//                                 console.log(err)
//                             });
//                         }
//                 }
//             // }

//             if ($(this).attr('href') === `#${fileName}_viewer`) {
//                 console.log("value ====> ", $(this).attr('href'));
//                 // remove active class from all tabs
//                 $('.nav-tabs > li > a').removeClass('active');
//                 $('.tab-pane').removeClass('active');
//                 $(this).addClass('active');
//                 $(`#${fileName}_viewer`).addClass('active');
//             }
//         })
//     })


// }

// }

// if (OutputList.length > 0) {
//     var getfileElementsOutPv = $(`#outSpdlDir${project_name}`).attr('id')
//     if(getfileElementsOutPv === undefined || getfileElementsOutPv === null){
//     $(`#detail-${project_name}`).append(`
//     <details class="tree-nav__item is-expandable" id="outSpdlDir${project_name}">
//     <summary class="tree-nav__item-title"><i class="icon ion-android-folder"></i>output</summary>
//     <div class="tree-nav__item" id="outspdl-${project_name}">
//     </div>
//     </details>
//     `)

//     OutputList.forEach(element => {
//         $(`#outspdl-${project_name}`).append(`
//         <a class="tree-nav__item-title"><i class="icon ion-android-document"></i>${element}</a>
//         `)
//     });

//     $(`#outpv-${project_name}`).find('a').click(function () {
//         var orgName = $(this).text()
//         var fileName = $(this).text();
//         var fileNameOrg = $(this).text().split('.')[1];
//         fileName = fileName.split('.')[1];

//         $.each($('.nav-tabs > li > a'), function (index, value) {
//             var types = ['pdf', 'jpeg', 'dot']
//             if(types.includes(fileName)){
//                 fileName = 'file'
//             }

//             // if(fileNameOrg === 'pdf' || fileNameOrg === 'dot'){

//                 var checkExists = document.getElementById('showfiles')
//                 if(checkExists != null){
//                     document.getElementById('showfiles').remove()
//                     if(fileNameOrg === 'pdf'){
//                     $('#output_file').append(`
//                     <iframe id="showfiles" src="${project_name}\\output\\${orgName}" width="1212" height="1000"  frameborder="0"></iframe>
//                     `)
//                     }
//                     if(fileNameOrg === 'dot'){
//                         fetch(`${project_name}\\output\\${orgName}`)
//                         .then(response => response.text())
//                         .then(data => {
//                             console.log("dot file ===> ", data)


//                             var DotFile = CodeMirror(document.querySelector("#output_file"), {
//                                 // width: "50%",
//                                 lineNumbers: true,
//                                 lineWrapping: true,
//                                 tabSize: 2,
//                                 // value: JSON.stringify(result_error_array, null, ' '),
//                                 value: data,
//                                 mode: "javascript",
//                                 theme: "material-darker",
//                                 keyword: {
//                                     "Protocol:": "style4",
//                                     "Types:": "style4",
//                                     "Definitions:": "style4",
//                                     "Knowledge:": "style4",
//                                     "Actions:": "style4",
//                                     "Goals:": "style4",
//                                     "Agent": "style2",
//                                     "Number": "style2",
//                                     "Symmetric_key": "style2",
//                                     "Function": "style2",
//                                     "word3": "style3",
//                                     "example\.com": "style4",
//                                     "abc\\d+": "style2",
            
//                                 }
//                             });


//                         }).catch(err => {
//                             console.log(err)
//                         });
//                     }
//                 }else{
//                     if(fileNameOrg === 'pdf'){
//                         // remove all tag from output_file
//                         $('#output_file').empty()
//                         $('#output_file').append(`
//                         <iframe id="showfiles" src="${project_name}\\output\\${orgName}" width="1212" height="1000"  frameborder="0"></iframe>
//                         `)
//                         }
//                         if(fileNameOrg === 'dot'){
//                             $('#output_file').empty()
//                             fetch(`${project_name}\\output\\${orgName}`)
//                             .then(response => response.text())
//                             .then(data => {
//                                 var DotFile = CodeMirror(document.querySelector("#output_file"), {
//                                     lineNumbers: true,
//                                     lineWrapping: true,
//                                     tabSize: 2,
//                                     value: data,
//                                     mode: "javascript",
//                                     theme: "material-darker",
//                                     keyword: {
//                                         "Protocol:": "style4",
//                                         "Types:": "style4",
//                                         "Definitions:": "style4",
//                                         "Knowledge:": "style4",
//                                         "Actions:": "style4",
//                                         "Goals:": "style4",
//                                         "Agent": "style2",
//                                         "Number": "style2",
//                                         "Symmetric_key": "style2",
//                                         "Function": "style2",
//                                         "word3": "style3",
//                                         "example\.com": "style4",
//                                         "abc\\d+": "style2",
//                                     }
//                                 });
//                             }).catch(err => {
//                                 console.log(err)
//                             });
//                         }
//                 }
//             // }

//             if ($(this).attr('href') === `#${fileName}_viewer`) {
//                 console.log("value ====> ", $(this).attr('href'));
//                 // remove active class from all tabs
//                 $('.nav-tabs > li > a').removeClass('active');
//                 $('.tab-pane').removeClass('active');
//                 $(this).addClass('active');
//                 $(`#${fileName}_viewer`).addClass('active');
//             }
//         })
//     })
// }

// }

}


// function TreeViewFile() {

//     // general folder

//     // all content general folder
//     // if file -> create file in treeview
//     // if dir -> create dir in treeview
//         // if dir -> create dir in treeview
//         // if file -> create file in treeview

    

//     var OutputList = []
//     var fileList = getListFiles(`${project_name}\\output_${spdl_file_name}`);
//     console.log("fileList ===>*********** ", fileList)
//     if(fileList.includes('output')){
//         console.log("output ===>*********** ", fileList)
//         OutputList = getListFiles(`${project_name}\\output_${spdl_file_name}\\output`);
//     }
//     var getfileElements = $(`#listFile-${project_name}`).attr('id')
//     // console.log("getfileElements ====> ", getfileElements);
//     if(getfileElements === undefined || getfileElements === null){
//     fileList.forEach((element, idx )=> {
//         if (element !== 'output') {

//             $(`#detail-${project_name}`).append(`
//         <div class="tree-nav__item" id="listFile-${project_name}">
//         <a class="tree-nav__item-title"><i class="icon ion-android-document"></i>${element}</a>
//         </div>
//         `)
           
//         }else{
//             $(`#detail-${project_name}`).append(`
//             <details class="tree-nav__item is-expandable" id="outSpdlDir${project_name}">
//             <summary class="tree-nav__item-title"><i class="icon ion-android-folder"></i>${element}</summary>
//             <div class="tree-nav__item" id="outspdl-${project_name}">
//             </div>
//             </details>
//             `)
//         }





//     });


//     $(`#detail-${project_name}`).find('a').click(function () {
//         var fileNameOrg = $(this).text().split('.')[0]
//         var fileName = $(this).text();
//         fileName = fileName.split('.')[1];
//         console.log("fileName ====================> ", fileName);




//         if (fileName === 'spdl') {
//             fetch(`${project_name}\\${fileNameOrg}.spdl`)
//             .then(response => response.text())
//             .then(data => {
//                 data = JSON.parse(data)
//             var OutputSpdl = CodeMirror(document.querySelector("#output_scyther"), {
//                 lineNumbers: true,
//                 lineWrapping: true,
//                 tabSize: 2,
//                 value: data,
//                 mode: "javascript",
//                 theme: "material-darker",
//                 keyword: {
//                     "Protocol:": "style4",
//                     "Types:": "style4",
//                     "Definitions:": "style4",
//                     "Knowledge:": "style4",
//                     "Actions:": "style4",
//                     "Goals:": "style4",
//                     "Agent": "style2",
//                     "Number": "style2",
//                     "Symmetric_key": "style2",
//                     "Function": "style2",
//                     "word3": "style3",
//                     "example\.com": "style4",
//                     "abc\\d+": "style2",

//                 }
//             });
//         }).catch(err => {
//             return err
//         });
//         }

//         $.each($('.nav-tabs > li > a'), function (index, value) {
//             if ($(this).attr('href') === `#${fileName}_viewer`) {
//                 console.log("value ====> ", $(this).attr('href'));
//                 // remove active class from all tabs
//                 $('.nav-tabs > li > a').removeClass('active');
//                 $('.tab-pane').removeClass('active');
//                 $(this).addClass('active');
//                 $(`#${fileName}_viewer`).addClass('active');
//             }
//         })
//     })

// }

//     if (OutputList.length > 0) {
//         var getfileElementsOutPv = $(`#outSpdlDir${project_name}`).attr('id')
//         if(getfileElementsOutPv === undefined || getfileElementsOutPv === null){
//         $(`#outSpdlDir${project_name}`).append(`
//         <details class="tree-nav__item is-expandable" id="outSpdlDir${project_name}">
//         <summary class="tree-nav__item-title"><i class="icon ion-android-folder"></i>output</summary>
//         <div class="tree-nav__item" id="out-${project_name}">
//         </div>
//         </details>
//         `)

//         OutputList.forEach(element => {
//             $(`#out-${project_name}`).append(`
//             <a class="tree-nav__item-title"><i class="icon ion-android-document"></i>${element}</a>
//             `)
//         });

//         $(`#out-${project_name}`).find('a').click(function () {
//             var orgName = $(this).text()
//             var fileName = $(this).text();
//             var fileName_split = $(this).text().split('.');
//             var fileNameOrg = fileName_split[fileName_split.length -1]
//             var splite_name = fileName.split('.');
//             fileName = splite_name[splite_name.length - 1];

//             $.each($('.nav-tabs > li > a'), function (index, value) {
//                 var types = ['pdf', 'jpeg', 'dot']
//                 if(types.includes(fileName)){
//                     console.log("fileName ====> ", fileName);
//                     fileName = 'file'
//                 }


//                 if (fileName === 'json') {
//                     fetch(`${project_name}\\output\\${orgName}`)
//                     .then(response => response.text())
//                     .then(data => {
//                         data = JSON.parse(data)
//                         var JsonViewer = CodeMirror(document.querySelector('#json_viewer'), {
//                             // width: "20%",
//                             lineNumbers: true,
//                             setSize: "50%,50%",
//                             lineWrapping: true,
//                             tabSize: 2,
//                             value: JSON.stringify(data, null,' '),
//                             mode: "javascript",
//                             theme: "material-darker",
//                             keyword: {
//                                 "Protocol:": "style4",
//                                 "Types:": "style4",
//                                 "Knowledge:": "style4",
//                                 "Definitions:": "style4",
//                                 "Actions:": "style4",
//                                 "Goals:": "style4",
//                                 "Agent": "style2",
//                                 "Number": "style2",
//                                 "Symmetric_key": "style2",
//                                 "Function": "style2",
//                                 "word3": "style3",
//                                 "share": "style2",
//                                 "example\.com": "style4",
//                                 "abc\\d+": "style2",
//                             }
//                         });
                
        
//                         console.log("==============--------> ", data)
//                     }).catch(err => {
//                         return err
//                     });
//                 }

//                     var checkExists = document.getElementById('showfiles')
//                     if(checkExists != null){
//                         document.getElementById('showfiles').remove()
//                         if(fileNameOrg === 'pdf'){
//                         $('#output_file').append(`
//                         <iframe id="showfiles" src="${project_name}\\output\\${orgName}" width="1212" height="1000"  frameborder="0"></iframe>
//                         `)
//                         }
//                         if(fileNameOrg === 'dot'){
//                             fetch(`${project_name}\\output\\${orgName}`)
//                             .then(response => response.text())
//                             .then(data => {
//                                 console.log("dot file ===> ", data)


//                                 var DotFile = CodeMirror(document.querySelector("#output_file"), {
//                                     // width: "50%",
//                                     lineNumbers: true,
//                                     lineWrapping: true,
//                                     tabSize: 2,
//                                     // value: JSON.stringify(result_error_array, null, ' '),
//                                     value: data,
//                                     mode: "javascript",
//                                     theme: "material-darker",
//                                     keyword: {
//                                         "Protocol:": "style4",
//                                         "Types:": "style4",
//                                         "Definitions:": "style4",
//                                         "Knowledge:": "style4",
//                                         "Actions:": "style4",
//                                         "Goals:": "style4",
//                                         "Agent": "style2",
//                                         "Number": "style2",
//                                         "Symmetric_key": "style2",
//                                         "Function": "style2",
//                                         "word3": "style3",
//                                         "example\.com": "style4",
//                                         "abc\\d+": "style2",
                
//                                     }
//                                 });


//                             }).catch(err => {
//                                 console.log(err)
//                             });
//                         }
//                     }else{
//                         if(fileNameOrg === 'pdf'){
//                             // remove all tag from output_file
//                             $('#output_file').empty()
//                             $('#output_file').append(`
//                             <iframe id="showfiles" src="${project_name}\\output\\${orgName}" width="1212" height="1000"  frameborder="0"></iframe>
//                             `)
//                             }
//                             if(fileNameOrg === 'dot'){
//                                 $('#output_file').empty()
//                                 fetch(`${project_name}\\output\\${orgName}`)
//                                 .then(response => response.text())
//                                 .then(data => {
//                                     var DotFile = CodeMirror(document.querySelector("#output_file"), {
//                                         lineNumbers: true,
//                                         lineWrapping: true,
//                                         tabSize: 2,
//                                         value: data,
//                                         mode: "javascript",
//                                         theme: "material-darker",
//                                         keyword: {
//                                             "Protocol:": "style4",
//                                             "Types:": "style4",
//                                             "Definitions:": "style4",
//                                             "Knowledge:": "style4",
//                                             "Actions:": "style4",
//                                             "Goals:": "style4",
//                                             "Agent": "style2",
//                                             "Number": "style2",
//                                             "Symmetric_key": "style2",
//                                             "Function": "style2",
//                                             "word3": "style3",
//                                             "example\.com": "style4",
//                                             "abc\\d+": "style2",
//                                         }
//                                     });
//                                 }).catch(err => {
//                                     console.log(err)
//                                 });
//                             }
//                     }
//                 // }

//                 if ($(this).attr('href') === `#${fileName}_viewer`) {
//                     console.log("value ====> ", $(this).attr('href'));
//                     // remove active class from all tabs
//                     $('.nav-tabs > li > a').removeClass('active');
//                     $('.tab-pane').removeClass('active');
//                     $(this).addClass('active');
//                     $(`#${fileName}_viewer`).addClass('active');
//                 }
//             })
//         })
//     }

//     }


// // }


// }




//#region Build

//#endregion

$('#Grapviz').click((e) => {
    console.log("click ")




    // $('.main-content').each(function () {
    //     console.log("this ====> ", $(this).find('li').find('a').attr('id'));
    // })
    runDot(`${project_name}\\output`, 'pdf');
    // e.preventDefault();
})

//#region Grapviz

// setInterval(() => {
//     $.each($('.nav-tabs > li > a'), function (index, value) {
//         //get active tab 
//         if ($(this).attr('href') === `#pv_viewer` && $('.nav-tabs > li > a').hasClass('active') === true) {
    
//             $('#build-pv').removeClass('disabled')
//             $('#build-pv').removeProp('aria-disabled')

//             console.log("value ====> ", $(this).attr('href'));
    
//         }else{
//             $('#build-pv').addClass('disabled')
//             $('#build-pv').attr('aria-disabled', 'true')
//         }
    
//         if ($(this).attr('href') === `#AnBx_viewer` && $('.nav-tabs > li > a').hasClass('active') === true) {
//             $('#build-anbx').removeClass('disabled')
//             $('#build-anbx').removeProp('aria-disabled')

//             console.log("value ====> ", $(this).attr('href'));
//         }else{
//             $('#build-anbx').addClass('disabled')
//             $('#build-anbx').attr('aria-disabled', 'true')
//         }
    
//         if ($(this).attr('href') === `#spdl_viewer` && $('.nav-tabs > li > a').hasClass('active') === true) {
//             $('#build-anbx').removeClass('disabled')
//             $('#build-anbx').removeProp('aria-disabled')

//             console.log("value ====> ", $(this).attr('href'));
//         }else{
//             $('#build-anbx').addClass('disabled')
//             $('#build-anbx').attr('aria-disabled', 'true')
//         }
    
//         if ($(this).attr('href') === `#json_viewer` && $('.nav-tabs > li > a').hasClass('active') === true) {
//             $('#build-anbx').removeClass('disabled')
//             $('#build-anbx').removeProp('aria-disabled')

//             console.log("value ====> ", $(this).attr('href'));
//         }else{
//             $('#build-anbx').addClass('disabled')
//             $('#build-anbx').attr('aria-disabled', 'true')
//         }
//     })
// }, 1000);



//#endregion