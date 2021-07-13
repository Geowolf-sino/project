 let fruits = [
     {id: 1, title: 'apple', price: 20, img: 'http://s1.iconbird.com/ico/2013/11/491/w256h2561384698911applered.png'},
     {id: 2, title: 'apelsin', price: 30, img: 'https://img3.zakaz.ua/m.1600865181.ad72436478c_2020-09-23_Svetlana/m.1600865181.SNCPSG10.obj.0.1.jpg.oe.jpg.pf.jpg.1350nowm.jpg.1350x.jpg'},
     {id: 3, title: 'mango', price: 40, img: 'http://xaoc-lab.ru/image/cache/catalog/FA/FA%20Mango-500x500.jpg'}
 ]
 const toHTML = fruit => `  
 <div class="col">
 <div class="card" style="width: 18rem;">
     <img src="${fruit.img}" class="card-img-top" style="height: 300px;" alt="${fruit.title}">
     <div class="card-body">
       <h5 class="card-title">${fruit.title}</h5>
        <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
        <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
     </div>
   </div>
</div>
`

 function render (){
     const html = fruits.map(toHTML).join('')
     document.querySelector('#fruits').innerHTML=html
 }
  render ()

  const priceModal = $.modal({

    title: 'Цeна на товар',
    closable: true,
    width: '400px',
    footerButtons: [
{text:'Закрыть',type: 'primary', handler(){
   priceModal.close()
}}
    ]    
   })

 

    document.addEventListener ('click', event => {
        event.preventDefault()
     const btnType = event.target.dataset.btn 
     const id = +event.target.dataset.id
     const fruit =fruits.find(f => f.id === id)
    
        if (btnType === 'price'){  
        priceModal.setContent(`
        <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)
            priceModal.open()
     }else if (btnType === 'remove'){
         $.confirm({
             title:'Вы уверены?',
             content:` <p>Удалить продукт: <strong>${fruit.title}</strong></p>`
         }).then(()=>{
             fruits = fruits.filter(f => f.id !==id)
             render ()
         }).catch(()=> {
             console.log('Cancel')
         })
    
    }
     } )
 

