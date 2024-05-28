document.addEventListener('DOMContentLoaded', async (e) => {
    console.log('Start');

    const apiKey = 'vs37YB5EtzhXT3g0QtFHmkJV4vKf4cnj1Cf3vAOF';
    const quantity = 3;
    let apiCount = `count=${quantity}`;
    let webPath = `https://api.nasa.gov/planetary/apod?${apiCount}&api_key=${apiKey}`;

    let objApi = await getObjApi(webPath);

    if(objApi.ok){
        console.log(await objApi.json());
    }
    else{
        throw 'Error!\nDates are not recieved!'
    }
})

const getObjApi = async (webPath) => {

    // console.log('function getObkApi');
    // let objApi = await fetch(webPath);
    // console.log(objApi.status, objApi.ok, objApi.statusText, objApi.text())

    return (await fetch(webPath));
}