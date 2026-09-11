const API_URL = "https://script.google.com/macros/s/AKfycbzjds1YzR-LXiWR0-S9K7ghVqPUVlbClPfuYTqsuuR_icdKE6QZvLXR48KVXvQMF3Ru2w/exec";

async function getResult() {
    const admissionInput = document.getElementById("admissionNo").value.trim();
    const resultDiv = document.getElementById("result");
    
    if(admissionInput === "") {
        resultDiv.innerHTML = "<p style='color:red'>Pehle Admission No likho</p>"; 
        return;
    }
    
    resultDiv.innerHTML = "<p>Loading...</p>";
    
    try{
        const res = await fetch(`${API_URL}?admissionNo=${admissionInput}`);
        const data = await res.json();
        
        if(data.status === "found"){
            let html = `<h3>Result: ${data.StudentName}</h3><table>`;
            for(let key in data){ 
                if(key!=="status") 
                    html += `<tr><td>${key}</td><td>${data[key]}</td></tr>`; 
            }
            html += "</table>"; 
            resultDiv.innerHTML = html;
        } else { 
            resultDiv.innerHTML = `<p style='color:red'>Record not found. Admission No check karein</p>`; 
        }
    } catch(e){ 
        resultDiv.innerHTML = `<p style='color:red'>Error: API se connect nahi ho pa raha</p>`; 
    }
}
