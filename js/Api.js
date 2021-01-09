async function GetApi(url,data) {
    if(data){       
        let response = await fetch(url, data)
        return response.json()
    }
    let response = await fetch(url)
    return response.json()
}


