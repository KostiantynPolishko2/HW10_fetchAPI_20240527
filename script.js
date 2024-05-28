

document.addEventListener('DOMContentLoaded', async (e) => {
    console.log('Start');

    const apiKey = 'vs37YB5EtzhXT3g0QtFHmkJV4vKf4cnj1Cf3vAOF';
    const quantity = 3;
    let apiCount = `count=${quantity}`;
    let webPath = `https://api.nasa.gov/planetary/apod?${apiCount}&api_key=${apiKey}`;

    fillApiObjs(await getApiObj(webPath));
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

const layoutCardPlanet = (dictDiv, dictP, tags) => {
    dictDiv.get('container').appendChild(dictDiv.get('none')).appendChild(tags.imgEmpty);
    dictDiv.get('container').appendChild(dictDiv.get('text'));


    for(let className of ['copyright', 'date', 'title']){
        dictDiv.get('text').appendChild(dictP.get(className));
    }

    dictDiv.get('text').appendChild(tags.hrEmpty);
    dictDiv.get('text').appendChild(dictP.get('explanation'));
}

const addTxtNode = (element, txt) => {
    element.insertBefore(document.createTextNode(txt), element.firstElementChild);
}

const setImgAttr = (element, src, alt = 'logo') => {
    element.setAttribute('src', src);
    element.setAttribute('alt', alt);
}

const getIdName = (indentifier) => {

    return indentifier.replaceAll(' ', '_');
}

const createCardPlanet = (element) => {
    const classNames = ['copyright', 'date', 'title', 'explanation'];

    return (apiObject) => {

        const dictDiv = createDictTags('div', ['container', 'text', 'none']);
        const dictP = createDictTags('p', classNames);
    
        let tags = {imgEmpty: createTag('img'), hrEmpty: createTag('hr')};
        layoutCardPlanet(dictDiv, dictP, tags);       

        for(let className of classNames){
            addTxtNode(dictP.get(className), apiObject[className]);
        }

        setImgAttr(tags.imgEmpty, apiObject['url'], apiObject['title']);
        dictDiv.get('container').id = getIdName(apiObject['title']);

        element.appendChild(dictDiv.get('container'));
    }
}

const fillApiObjs = async (apiObjs) => {
    if(apiObjs.ok){
        let planets = await apiObjs.json();
        const cardPlanet = createCardPlanet(document.getElementsByTagName('main')[0]);

        for(let planet of planets){
            cardPlanet(planet);
        }
    }
    else{
        throw 'Error!\nDates are not recieved!'
    }
}