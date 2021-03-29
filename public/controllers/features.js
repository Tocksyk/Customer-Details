var origin = window.location.origin;
let arr = [];
getData(origin).then((data) => {
    arr = data;
    $(function () {
        console.log('arr is ', arr);
        if (arr.length > 0) {
            $("#custDetails").show();
            displayTable(arr);

            // Delete Button Event
            $('.Del').on("click", () => {
                let p = $(this.activeElement);
                deleteRow(p);
            });

            //Update Button Event
            $('.Edit').on('click', () => {
                let p = $(this.activeElement);
                updateFront(p);
            });

            $(".subBtn").on("click", () => {
                console.log('hello');
                let p = $(this.activeElement);
                addTo(p);
            })

            $('.down').bind("click", () => {
                let p = $(this.activeElement);
                downloadFile(p);
            })
        }
    })
});

async function addTo(p) {
    let data = [
        $(".firstDetail").children("input").val(),
        $(".secondDetail").children("input").val(),
        $("#attach")[0].files[0]
    ]
    let fd = new FormData();
    fd.append('name', data[0]);
    fd.append('email', data[1]);
    fd.append('file', data[2]);

    // Adding the data to server
    let url = origin + '/ops/add';

    $.ajax({
        url: url,
        type: 'post',
        data: fd,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response != '404') {
                console.log('file uploaded');
            }
            else {
                console.log('file not uploaded');
            }
        },
    });
}

function downloadFile(p) {
    let data = { path: "" };
    data.path = $(p).val();
    $(p).parent().attr("href", data.path);
}


async function getData(origin) {
    let arr = [];
    // Get Data From Server
    let url = origin + '/ops/get';
    await $.get(url, (r) => {
        arr = r;
    })
    return arr;
}

function displayTable(arr) {
    let el = $("#custDetails tr").last();
    let arr31 = ['name', 'email', 'file'];
    //Inserting Table Data in the last row
    arr.forEach(data => {
        var test = `
                    <tr class=${data.name}>
                        <td class="tdData" class="names"><input type="text" name="name" value=${data.name} readonly></input></td>
                        <td class="tdData" class="email"><input type="text" name="email" value=${data.email} readonly></input></td>
                        <td class="tdData"><a href=${data.file} class="fileName" download><input type="text" name="file" value=${data.file} readonly></input></a></td>
                        <td class="tdData">
                            <button type="button" class="Edit">Update</button>
                            <button type="button" class="Del">Delete</button>
                        </td>
                    </tr>
                `
        $(test).insertAfter(el);
    });

    // Styling
    $(".rowHead,.tdData").css({
        "border": "1px solid black",
        "padding": "10px",
    });
    $("#custDetails").css({
        "width": "100%",
    });
}


async function deleteRow(p) {
    let data = { name: $(p).parent().parent().attr("class") };
    //Updating Database
    let url = origin + '/ops/delete';
    $.post(url, data, (r, sta) => {
        console.log(r);
    })
    //Remove From Front End
    $(p).parent().parent().remove();
}

var oldData = {};
function updateFront(p) {
    let sibs = $(p).parent().siblings();
    let keyArr = ['name', 'email', 'file'];
    let newData = {};


    if (($(p).text()) == "Update") {
        console.log("Inside Update");
        $(p).text('Save');
        $(sibs).find('input').removeAttr("readonly");
        keyArr.forEach(element => {
            oldData[element] = $(sibs).find(`input[name=${element}]`).val()
        });
    } else {
        console.log("Inside Save");
        $(sibs).find('input').attr("readonly", "true");
        $(p).text('Update');
        keyArr.forEach(element => {
            newData[element] = $(sibs).find(`input[name=${element}]`).val()
        });
        updateDatabase(oldData, newData, keyArr);
    }
}

function updateDatabase(oldData, newData, keyArr) {
    let changes = 0;
    keyArr.forEach(element => {
        if (oldData[element] !== newData[element]) {
            console.log(oldData[element], "==", newData[element]);
            changes = 1;
        }
    })

    if (changes == 1) {
        console.log('Changes are made');
        data = { last: oldData.name };
        Object.assign(newData, data);
        let url = origin + '/ops/update';
        $.post(url, newData, (r) => {
            console.log(r);
        })
    }
}