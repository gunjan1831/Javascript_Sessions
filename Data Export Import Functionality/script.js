let CSV = document.getElementById('csv');
let button = document.getElementById('btn');
CSV.addEventListener('change',(event)=> {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        const content = e.target.result;
        const rows = content.split('\n').map(row => row.split(','));
        console.log(rows.length);
        for (let i =0;i<rows.length;i++){
            console.log(rows[i]);
        }
        const table  = document.getElementById('table');
        table.innerHTML = '';

       for (let i =0;i<rows.length;i++) {
            let tr = document.createElement('tr');
            for(let j =0;j<rows[i].length;j++)
                {
                    let td = document.createElement('td');
                    td.textContent = rows[i][j];
                    tr.appendChild(td);
                }
                table.appendChild(tr);
        }
    CSV.style.display = 'none';
    button.style.display = 'block';
    }
    reader.readAsText(file);
});

button.addEventListener('click',() => {
    const rows = document.querySelectorAll('#table tr');
    let csvContent = '';
    for(let i = 0;i<rows.length ;i++)
        {
            let row = rows[i];
            let cols = row.querySelectorAll('td');
            let rowContent = '';

            for(let j=0;j<cols.length;j++){
                let col = cols[j];
                rowContent += col.textContent + ',';

            }

            csvContent += rowContent.slice(0,-1) + '\n';


        }


        const blob = new Blob([csvContent],{type : 'type/csv'});
        const  url = window.URL.createObjectURL(blob);
        print(url);

        const a = document.createElement('a');
        a.href = url;
        a.download = "exported_data.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
});
