
window.addEventListener('load',()=>{
    document.getElementById('button-mood').addEventListener('click',()=>{
        let mood= document.getElementById('today-mood').value;
        console.log(mood);

        let obj = {"Today I am": mood};

        let jsonData = JSON.stringify(obj);

        fetch('/new-data',{
            method: 'POST',
            headers:{
                "Content-type":"application/json"
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {console.log(data)});

    })
    document.getElementById('get-tracker').addEventListener('click',()=>{
        fetch('/data')
        .then(resp => resp.json())
        .then(data =>{
            document.getElementById('mood-info').innerHTML = '';
            for(let i=0; i<data.data.length; i++){
                let string =data.data[i].date +': I am feeling ' + data.data[i].Mood;
                let elt = document.createElement('p');
                elt.innerHTML = string;
                document.getElementById('mood-info').appendChild(elt);
            }
        })
    })
})