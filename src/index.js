import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

ReactDOM.render(<Main/>,
  document.getElementById('root')
);

const url = 'https://pdfmergery.herokuapp.com'

function Main(props) {
  const [files, setFiles] = useState([])
  const [success, setSuccess] = useState("")
  const handleFile = (event) => {
    setFiles(event.target.files)
  }
  const upload = () => {
    const data = unload()
    console.log(files)
    axios.post(url + '/upload', data, {}).then(res => {
      if (res.data === "ok") {
        setSuccess("Ready for Download!")
      }
    })
  }
  const download = () => {
    setSuccess("")
    axios(url + '/retrieve', {
      method: "GET",
      responseType: 'blob'
    }).then(response => {
      const file = new Blob([response.data], {
        type: "application/pdf"
      });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL)
    })
  }
  const unload = () => {
    const data = new FormData()
    for (var i = 0; i < files.length; i++) {
      data.append('files', files[i])
    }
    return data
  }
  return (
    <div>
    <input type='file' multiple onChange={handleFile}/>
    <button onClick={upload}>Submit</button>
    <button onClick={download}>Download</button>
    <h1>{success}</h1>
    </div>
  )
}