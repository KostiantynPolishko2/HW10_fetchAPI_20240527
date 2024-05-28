document.addEventListener('DOMContentLoaded', async (e) => {
    console.log('Start');

    const apiKey = 'vs37YB5EtzhXT3g0QtFHmkJV4vKf4cnj1Cf3vAOF';
    const quantity = 3;
    let apiCount = `count=${quantity}`;
    let webPath = `https://api.nasa.gov/planetary/apod?${apiCount}&api_key=${apiKey}`;

    let apiObj = await getObjApi(webPath);
    console.log(apiObj);
})

const getObjApi = async (webPath) => {

    return (await fetch(webPath)).json();
}