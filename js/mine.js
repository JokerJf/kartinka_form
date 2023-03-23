



let doc = document
let modal = doc.querySelector('.modal')
let forma = doc.querySelector('.forma')
let list = doc.querySelector('.list')
let aa = []
let nom = 0

function dell(fox) { // для удаления
    fetch(`http://localhost:3002/stata/${fox}`, {
        method: "DELETE",
    })
    zz()
}


function zest(Id, Name, age) {


    let ol = doc.createElement('ol')
    ol.classList.add('info_logot')
    let li_1 = doc.createElement('li')
    li_1.innerHTML = Id
    let li_2 = doc.createElement('li')
    li_2.innerHTML = Name
    let li_3 = doc.createElement('li')
    li_3.innerHTML = age
    let li_4 = doc.createElement('li')
    let div_1 = doc.createElement('div')
    div_1.classList.add('block_res')
    let div_2 = doc.createElement('div')
    div_2.classList.add('block_del')
    let img_1 = doc.createElement('img')
    img_1.src = './img/icon_down.svg'
    let img_2 = doc.createElement('img')
    img_2.src = './img/icon_delet.svg'

    div_1.append(img_1)
    div_2.append(img_2)
    li_4.append(div_1, div_2)
    ol.append(li_1, li_2, li_3, li_4)
    list.append(ol)

    // let del_list = doc.querySelectorAll('.list .block_del')

    // for (let it of del_list) {
    //     it.addEventListener('click', () => { 
    //         console.log(it);
    //     })
    // }
    img_2.addEventListener('click', () => { // удаление
        dell(li_1.innerHTML)

    })
    img_1.addEventListener('click', () => {
        modal.classList.remove('disp_none')
        list.classList.add('disp_none')
        forma.classList.add('disp_none')
        if (nom == 0) { // баг с клонированием пофиксел
            nom = 1
            let modal_izmeni = doc.querySelector('.modal .izmeni')
            modal_izmeni.addEventListener('click', () => {
                let modal_form = doc.querySelector('.modal_forma')
                PUT(li_1.innerHTML, modal_form[0].value, modal_form[1].value)
                modal_form[0].value = ''
                modal_form[1].value = ''
                modal.classList.add('disp_none')
                list.classList.remove('disp_none')
                forma.classList.remove('disp_none')
                alert('Данные изменены')
            })
        }


    })




}
// заглушка 
modal.addEventListener('submit', (ev) => {
    ev.preventDefault()
})


// выход в лобби
let modal_vihod = doc.querySelector('.modal .vihod')
modal_vihod.addEventListener('click', () => {
    modal.classList.add('disp_none')
    list.classList.remove('disp_none')
    forma.classList.remove('disp_none')
    let modal_form = doc.querySelector('.modal_forma')
    modal_form[0].value = ''
    modal_form[1].value = ''
})



function zz() {

    let list_arr = doc.querySelectorAll('.list .info_logot') // Система рестарта при повторном загрузке с сервера
    if (list_arr.length != 0) {
        for (let i of list_arr) {
            i.remove()
        }
    }

    fetch('http://localhost:3002/stata')
        .then(res => res.json())
        .then(res => {
            for (let item of res) {
                zest(item.id, item.Name, item.Age)
            }
        })



}
zz()





// function eva() {
//     id_zed = id_zed + 1
//     fetch('http://localhost:3002/stata', {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify({
//             "id":1,
//             "Name":"joker",
//             "are":"9999"
//         })
//     })
// }





// отправка на сервер
let forma_btn = doc.querySelector('.forma')
forma_btn.addEventListener('submit', (ev) => {
    ev.preventDefault()
    if (!Number(forma_btn[0].value) && forma_btn[0].value != '') { // проверка на числа и буквы
        if (Number(forma_btn[1].value) && forma_btn[0].value != '' && Number(forma_btn[1].value) <= 100 && Number(forma_btn[1].value) >= 0) {
            fetch('http://localhost:3002/stata', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    "id": "",
                    "Name": forma_btn[0].value,
                    "Age": forma_btn[1].value
                })
            })
            forma_btn[0].value = ''
            forma_btn[1].value = ''
            zz()
        } else alert('в возросте только цифры "min 1, max 100" - лет')
    } else alert('ведите имя')


})


function PUT(fox, Name, Age) { // для изменение обекта

    fetch(`http://localhost:3002/stata/${fox}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "id": "",
            "Name": Name,
            "Age": Age
        })

    })
    zz()
}













