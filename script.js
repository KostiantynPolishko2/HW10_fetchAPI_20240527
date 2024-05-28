

document.addEventListener('DOMContentLoaded', async (e) => {
    console.log('Start');

    const apiKey = 'vs37YB5EtzhXT3g0QtFHmkJV4vKf4cnj1Cf3vAOF';
    const quantity = 3;
    let apiCount = `count=${quantity}`;
    let webPath = `https://api.nasa.gov/planetary/apod?${apiCount}&api_key=${apiKey}`;

    // testApiObjs(await getApiObj(webPath));
    const cardPlanet = createCardPlanet(document.getElementsByTagName('main')[0]);
    // cardPlanet();
    cardPlanet();
})

const getApiObj = async (webPath) => {
    return (await fetch(webPath));
}

const createTag = (tagName, _className = '') => {
    let element = document.createElement(tagName);
    if (_className != undefined){
        element.className = _className;
    }

    return element;
}

const createDictTags = (tagName, classNames) => {
    let dictElements = new Map();

    for(let className of classNames){
        dictElements.set(className, createTag(tagName, className));
    }

    return dictElements;
}

const createCardPlanet = (element) => {

    const dictDiv = createDictTags('div', ['container', 'text', 'none']);
    const dictP = createDictTags('p', ['copyright', 'date', 'title', 'explanation']);

    let tags = {imgEmpty: createTag('img'), hrEmpty: createTag('hr')};

    layoutCardPlanet(dictDiv, dictP, tags);

    return (apiObject) => {
        element.appendChild(dictDiv.get('container'));
    }
}

const layoutCardPlanet = (dictDiv, dictP, tags) => {
    dictDiv.get('container').appendChild(dictDiv.get('none')).appendChild(tags.imgEmpty);
    dictDiv.get('container').appendChild(dictDiv.get('text'));


    for(let className of ['copyright', 'date', 'title']){
        dictDiv.get('text').appendChild(dictP.get(className));
    }

    dictDiv.get('text').appendChild(tags.hrEmpty);
    dictDiv.get('text').appendChild(dictP.get('explanation'));
}

// const testApiObjs = async (apiObjs) => {
//     if(apiObjs.ok){
//         let planets = await apiObjs.json();
//         console.log(planets[0]['date']);
//         console.log(Object.keys(planets[0]));
//         console.log(planets[0]);
//     }
//     else{
//         throw 'Error!\nDates are not recieved!'
//     }
// }