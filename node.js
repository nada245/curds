let title=document.getElementById("title");
let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let total=document.getElementById("total");
let count=document.getElementById("count");
let catagory=document.getElementById("catagory");
let submit=document.getElementById("submit");
let mood='create';
// get toalal
function getTotal()
{
    if(price.value !='')
    {
        let result=(+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML=result;
        total.style.background='brown';
    }
    else {
        total.innerHTML='';
        total.style.background='red';
    }
}




// create product
let dataPro;
if(localStorage.product !=null)
{
    dataPro=JSON.parse(localStorage.product)
}
else {
    dataPro=[];
}
submit.onclick=function()
{
    let newPro={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.value,
        count:count.value,
        catagory:catagory.value,
        

    }
    if(newPro.count>1)
    {
        for(let i=0;i<newPro.count;i++)
        {
            dataPro.push(newPro);
        }
    }
else
{
    dataPro.push(newPro)
}

    localStorage.setItem('product',JSON.stringify(dataPro))
    console.log(dataPro)
    clearData();
    showData();
}
showData();
// clear input
function clearData()
{
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    catagory.value='';
}

// read
function showData()
{
let table='';
for(let i=0;i<dataPro.length;i++)
{
    table+=`
    <tr>
    <td>${i} </td>
    <td>${dataPro[i].title} </td>
    <td>${dataPro[i].price} </td>
    <td>${dataPro[i].taxes} </td>
    <td>${dataPro[i].ads} </td>
    <td>${dataPro[i].discount} </td>
    <td>${dataPro[i].total} </td>
    <td>${dataPro[i].count} </td>
    <td>${dataPro[i].catagory} </td>
    <td><button  onclick="updateData(${i})id="updata">updata</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
</tr>
    `

}
document.getElementById('tbody').innerHTML=table;
let btnDelete = document.getElementById('deleteAll');
if(dataPro.length>0)
{
btnDelete.innerHTML=`<button onclick="deleteAll()"> delete All</button>
`
}
else{
    btnDelete.innerHTML='';  
}
}


// delete

function deleteData(i)
{
dataPro.splice(i,1);
localStorage.product=JSON.stringify(dataPro)
showData();
}


// delete all
function deleteAll()
{
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

// count

// update
function updateData(i)
{
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
getTotal()
count.style.display='none';
catagory.value=dataPro[i].catagory;
submit.innerHTML='Update';
mood='Update';
}