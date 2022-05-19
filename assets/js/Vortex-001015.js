//#region Global Variables
var count = 0
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
var btn_save = getFormId('save')
let currentShape;
var line_hg = 200
var shape_id = ''
var parent_shape = document.getElementById('parent-shape').addEventListener('dragstart', (e) => {
    shape_id = e.target.id
})

var protocol_name = ''

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


//#endregion
//#endregion

//#region Stage Design
// var width = document.getElementById('container').offsetWidth;
// var height = document.getElementById('container').offsetHeight;
var GUIDELINE_OFFSET = 5;

var stage = new Konva.Stage({
    container: "container1",
    // width: 3000,
    width: MAX_WIDTH,
    height: MAX_HEIGHT
});
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
                arrow_list[index_arrow].arrow.destroy()
            } else {
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

            if (index_arrow == arrow_list.length - 1) {
                draw_arrow_from_arrow_list(index_arrow)
            } else {
                macro_list = []
                for (let i = 0; i < arrow_list.length; i++) {
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
btn_save.addEventListener('click', (e) => {
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
document.querySelector("#file-input").addEventListener('change', function() {
    // files that user has chosen
    var all_files = this.files;
    if (all_files.length == 0) {
        alert('Error : No file selected');
        return;
    }

    // first file selected by user
    var file = all_files[0];
    // files types allowed
    var allowed_types = ['application/json'];
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
        var extension = ''
        if (splite_name.length > 1) {
            extension = splite_name[splite_name.length - 1]
        }
        if (!(extension == 'AnBx' || extension == 'json')) {
            alert("Error : Incorrect file type" + extension)
            return
        }
        if (extension === 'AnBx') {
            text = AnbxToJson(text)
        }
        var json_text = JSON.parse(text);
        open_from_clipboard(json_text)
        console.log("********* 1 ", macro_list)

        // اجرای توابع کامپایل
        // Execute()

        //-----------------------
        protocol_name = json_text.protocol
            // protocolName label
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
                text: `Protocol Name : ${json_text.protocol}`,
                fontFamily: 'consolas',
                fontSize: 13,
                padding: 5,
                fill: 'black',
            })
        );
        layer.add(protocolName);
        if (text == "") {
            alert('Error :File Is Empty!')
        }
    });

    // file reading failed
    reader.addEventListener('error', function() {
        alert('Error : Failed to read file');
    });

    // read as text file
    reader.readAsText(file);


});

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


//#region Event Handlers

container.addEventListener('drop', (e) => {
    e.preventDefault()
    stage.setPointersPositions(e)

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


                let encrypt_obj = { plainText: plainText, symKey: func.content[func.content.length - 1], cipherText: cipherText, funcString: func_string, AnbxFormat: `{|${plainText.toString()}|}${func.content[func.content.length - 1]}`, from: '', to: '' }
                sk.messages.forEach(msg => {
                    if (msg.message.params.includes(func_string)) {
                        encrypt_obj.from = msg.from
                        encrypt_obj.to = msg.to
                    } else {
                        msg.message.define.forEach(def => {
                            if (def.includes(func_string)) {
                                encrypt_obj.from = msg.from
                                encrypt_obj.to = msg.to
                            }
                        })
                    }
                })
                encrypt_list.push(encrypt_obj)
                if (!(array_partner[array_partner_index].symKey.includes(func.content[func.content.length - 1]))) {
                    array_partner[array_partner_index].symKey.push(func.content[func.content.length - 1])
                }
                result = SUCCESSFULL

            } else {
                result = INVALID_VALUE_ENC
            }

            return result
        case 'Dec':
            if (func.content != '' && func.content.length == 2 && key_list.length > 0) {
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
                encrypt_list.filter((enc, index) => {
                    if (enc.cipherText.name === cipherText || enc.cipherText.value === cipherText) {
                        decrypt_obj.plainText = enc.plainText
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
                })
            } else {
                result = INVALID_VALUE_DEC
            }
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
                let mac_obj = { plainText: plainText, symKey: func.content[func.content.length - 1], mac: mac, funcString: func_string }
                mac_list.push(mac_obj)
                if (!(array_partner[array_partner_index].symKey.includes(func.content[func.content.length - 1]))) {
                    array_partner[array_partner_index].symKey.push(func.content[func.content.length - 1])
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

            obj.Anbx_string = `{|${obj.content.replace('[', '{|').replace(']', '|}')}|}${obj.key.replace('[', '{|').replace(']', '|}')}`

            obj.func_string = `Enc(${obj.content.replace('[', '{|').replace(']', '|}')},${obj.key.replace('[', '{|').replace(']', '|}')})`
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
                    if (is_macro(p)) {
                        if (!n.nonces.new_array.includes(p) && p.trim() != '' && !n.symKey.includes(p) && n.AsymKey.filter(k => k.sk == p || k.pk == p).length == 0) {
                            n.nonces.var_array.push(p)
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

            var keypair = {
                pk: `pk(${s.to})`,
                sk: `sk(${s.to})`,
            }

            new_partner.AsymKey.push(keypair)
                // new_partner.name = s.to
            key_list.forEach((k) => {
                if (k.partner == s.to) {

                    new_partner.symKey.push.apply(new_partner.symKey, k.sym)
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
            macro_list.push.apply(macro_list, array_partner[index].macro.new_array)
            var nonce = nonce_array


            nonce.forEach(ns => {
                if (!array_partner[index].nonces.var_array.includes(ns) && !array_partner[index].nonces.new_array.includes(ns) && ns.trim() != '' && !array_partner[index].symKey.includes(ns) && !is_macro(ns) && array_partner[index].AsymKey.filter(k => k.sk == ns || k.pk == ns).length == 0 && !array_partner.map(a => a.name).includes(ns)) {
                    if (array_partner[index].name === s.from) {
                        array_partner[index].nonces.new_array.push(ns)

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
                    if (is_macro(p)) {
                        if (!array_partner[index].nonces.new_array.includes(p) && p.trim() != '' && !array_partner[index].symKey.includes(p) && array_partner[index].AsymKey.filter(k => k.sk == p || k.pk == p).length == 0) {
                            array_partner[index].nonces.var_array.push(p)
                        }
                    } else {
                        macro_list.filter(macro => {
                            if (macro.value === p && !array_partner[index].nonces.var_array.includes(macro.name) && !array_partner[index].nonces.new_array.includes(macro.name) && array_partner[index].AsymKey.filter(k => k.sk == macro.name || k.pk == macro.name).length == 0) {
                                array_partner[index].nonces.var_array.push(macro.name)
                            }
                        })
                    }
                }
            })
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
                    encrypt_list.filter(a => a.funcString === fn.funcString ? fn.AnbxFormat = a.AnbxFormat : null)
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
    }

}

function fideRepeade(array) {
    var result = [];
    array.filter(firstEl => array.filter(secodEl => secodEl == firstEl).length > 1 && !result.includes(firstEl) ? result.push(firstEl) : null)
    return result
}


function registerRunButtonEvent() {

    $('#runApp').click(() => {



                result_error_array = []
                encrypt_list = []
                function_array = []
                    // macro_list = []
                key_list = []
                console.log("********* ", macro_list)

                // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
                parser_msg_to_partner_new(arrow_list)

                counter_tab++
                if ($('.nav-item').find('a').hasClass('active')) {
                    $('.nav-item').find('a').removeClass('active')
                    $('.tab-pane').removeClass('active')
                    $('.nav-item').find('a').removeClass('active_tab')
                }
                $('#myTab').append('<li class="nav-item">' + `<a class="nav-link active c_tab active_tab" href="#Untiteld-${counter_tab}" data-bs-toggle="tab">` + `Untiteld-${counter_tab}</a>` + `<span class="custom-close-icon-2"><i class="c-icon 
        fas fa-times"></i></span>` + '</li>')
                $('.tab-content').append(`<div class="tab-pane fade show active" id="Untiteld-${counter_tab}">
        <div class="card custom_vh ">
            <div class="row">
                <div class="col">
                    <div class="card-header text-white bg-dark custom_header_code">
                        Protocol
                    </div>
                    <div id="html-${counter_tab}"></div>
                </div>
                <div class="col">
                    <div class="card-header text-white bg-dark">
                        Output
                    </div>
                    <div class="output" id="output-${counter_tab}"></div>
                </div>
            </div>
        </div>`)
                var Agent = array_partner.map(a => a.name)
                var public_key = array_partner.map(a => a.AsymKey.map(Ak => Ak.pk))


                // symetric key Type
                // var pre_symkey = []
                // array_partner.filter(a => a.symKey.length > 0 ? pre_symkey = pre_symkey.concat(a.symKey) : null)
                var pre_symkey = array_partner.filter(a => a.symKey.length > 0 ? a.symKey : null)


                var getTypeSym = []
                getTypeSym = encrypt_list.map(tp => !pre_symkey.includes(tp.symKey) ? tp.symKey : null).concat(mac_list.filter(mac => !pre_symkey.includes(mac.symKey) ? mac.symKey : null))

                console.log("getTypeSym ", getTypeSym)
                console.log("encrypt_list ", encrypt_list)

                var Nonces = array_partner.map(a => a.nonces.new_array.length > 0 ? a.nonces.new_array : null).toString().split(',').filter(a => a != null && !getTypeSym.includes(a) && !Agent.includes(a))
                var repeatedNunce = fideRepeade(Nonces)
                if (repeatedNunce.length > 0) {
                    repeatedNunce.forEach(a => {
                        result_error_array.push({
                            function: a,
                            result: DUBLICATE_VALUE
                        })
                    })
                }

                var tmp_Nonce = []
                Nonces.filter(n => !tmp_Nonce.includes(n) ? tmp_Nonce.push(n) : null)
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
                            if (getTypeSym.includes(content)) {
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

                var Functions = function_array.map(a => !default_function_name.includes(a.name) ? a.name : null).filter(a => a != null)
                var Knowledge = []
                array_partner.forEach(a => {
                    var obj_know = {
                        name: a.name,
                        value: Agent.concat(a.symKey, Functions)
                    }
                    if (a.AsymKey.length > 0) {
                        obj_know.value.push(a.AsymKey[0].pk, `inv(${a.AsymKey[0].pk})`)
                        console.log("AR => ", a)
                        Knowledge.push(obj_know)
                    }
                })
                var defineFuncString = user_define_function.map(a => `Function [${a.inType.toString()} -> ${a.outType}] ${a.name}`).join(`;\n\t\t`)
                    // var defineKnowledgeString = Knowledge.filter(a => `${a.name}: ${a.value.toString()}`).join(`;\n\t\t`)

                var defineKnowledgeString = ''
                Knowledge.filter(a => {
                    defineKnowledgeString += `${a.name}: ${a.value.filter(v => v.trim() != '').toString()};\n\t\t`
                })

                var Actions = []
                arrow_list.forEach((ar, index) => {
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
                var definitions = macro_list.map(a => `${a.name} : ${a.AnbxFormat}`).join(`\n\t\t`)

                console.log("MACRO LIST > ", macro_list)

                var str = "A -> B: {|A,({SA,exp(g,XxKEa),Na,Nb}inv(sk(A))),SA|}h(Na,Nb,SA,exp(exp(g,XxKEa),YxKEb))"
                    // var st = "{{dsofokdf}}"
                    // console.log(st.replaceAll("{", "["))

                // splite_content_bracket_pyp(str)
                // split_array.forEach(s => {
                //     str = str.replace(s.Anbx_string, s.func_string)
                // })
                splite_content_bracket_pyp(str)
                split_array.forEach(s => {
                    str = str.replace(s.Anbx_string, s.func_string)
                })

                splite_content_bracket(str)
                split_array.forEach(s => {
                    str = str.replace(s.Anbx_string, s.func_string)
                })

                // console.log("===============================>  ", split_array)
                console.log(function_array)
                    // console.log("===============================>  ", )


                var GoalsFunc = []
                array_partner.forEach(a => {
                    array_partner.forEach(b => {
                        if (a.name != b.name) {
                            a.nonces.new_array.forEach(n => {
                                GoalsFunc.push(`${a.name} authenticates ${b.name} on ${n}`)
                            })
                        }
                    })
                })

                encrypt_list.forEach(a => {
                    GoalsFunc.push(`${a.symKey} secret between ${a.from},${a.to}`)
                    a.plainText.forEach(p => {
                        GoalsFunc.push(`${p} secret between ${a.from},${a.to}`)
                    })
                })
                Aencryp_list.forEach(a => {
                    a.plainText.forEach(p => {
                        GoalsFunc.push(`${p} secret between ${a.from},${a.to}`)
                    })
                })

                console.log("ARRAY PARTNER => ", array_partner)
                var protocol = `
Protocol: ${protocol_name}

Types:
\t\tAgent ${Agent};
\t\tNumber ${Nonces};
\t\t${getTypeSym.length > 0 ? 'Symmetric_key ' : ''}${getTypeSym}${getTypeSym.length > 0 ? ';' : ''}
\t\tFunction [Agent,Agent ->* Symmetric_key] shk;
\t\tFunction [Agent ->* PublicKey] pk;
\t\tFunction hash;
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

        // A authenticates B on NxNB
        // B authenticates A on NxNB
        // NxNB secret between A,B
        // B *->* A: NxNB
        var Output = CodeMirror(document.querySelector("#output-" + counter_tab), {
            // width: "50%",
            lineNumbers: true,
            lineWrapping: true,
            tabSize: 2,
            value: JSON.stringify(result_error_array, null, ' '),
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
        var myCodeMirror = CodeMirror(document.querySelector('#html-' + counter_tab), {
            // width: "20%",
            lineNumbers: true,
            lineWrapping: true,
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
                "example\.com": "style4",
                "abc\\d+": "style2",
            }
        });

        console.log(macro_list)

        registerCloseEvent()

        const BASE_URL = 'http://localhost:8000/api/runExe'

        axios.post(BASE_URL, {
                file_name: protocol_name,
                file_content: protocol
            })
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });


        // fetch(BASE_URL, {
        //     method: "POST",
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         "file_name": "protocol",
        //         "file_content": protocol
        //     })
        // }).then(res => {
        //     console.log("Request complete! response:", res);
        // });

        // Execute()
        console.log("===============================>  key_list ", key_list)

    })


}

setInterval(function() {
    $('#myTab').children('li').each(function() {
        $(this).children().hasClass('active') ? $(this).children("a").addClass('active_tab') : $(this).children().removeClass('active_tab')
    })
}, 100)

function registerCloseEvent() {
    $('.custom-close-icon-2').click(function() {
        $(this).parent().remove()
        $('.tab-content').children($(this).parent().children('a').attr('href')).remove()
        $('#myTab a:first').addClass('active')
        $('.tab-content').find('div[id="' + $('#myTab a:first').attr('href').replace('#', '') + '"]').addClass('show active')
    })
}

$(function() {
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

//#region Build


// fetch("/post/data/here", {
//     method: "POST",
//     headers: {'Content-Type': 'application/json'}, 
//     body: JSON.stringify(data)
//   }).then(res => {
//     console.log("Request complete! response:", res);
//   });

// $('#BuildApp').on('click', () => {
//     const BASE_URL = 'http://localhost:8000/api/runExe'
//     fetch(BASE_URL, {
//         method: "POST",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             "file_name": "protocol",
//             "file_content": protocol
//         })
//     }).then(res => {
//         console.log("Request complete! response:", res);
//     });


//     // try {
//     //     fetch(BASE_URL).then(res => res.json()).then(data => console.log(data[0]))
//     // } catch (error) {
//     //     console.error(errors);
//     // }
// })

//#endregion

//#region Grapviz

//#endregion