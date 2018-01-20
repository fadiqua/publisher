import DOMPurify from 'dompurify';
import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import querystring from 'querystring';
import url from 'url';

export function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function validateUploadedImage(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        return 'You can only upload JPG file!';
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        return 'Image must smaller than 2MB!'
    }
    return isJPG && isLt2M;
}

export function slugify(str, ) {
    return str.replace(/\s/g, "-").toLowerCase();
}

export function sanitize(dirty) {
    return DOMPurify.sanitize(dirty);
}

export function stripTags(str, split) {
    return str.replace(/(<([^>]+)>)/ig, split || "");
}

export function importHTMLToDraft(html){
    let blocksFromHTML = htmlToDraft(html);
    const contentBlocks = blocksFromHTML.contentBlocks;
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    return EditorState.createWithContent(contentState);
}
function addSuffix(number) {
    number +='';
    let suf = '';
    if(number.length >=4 && number.length < 7){
        suf = `${number.slice(0,-4)}K`
    } else if(number.length >= 7){
        suf = `${number.slice(0,-6)}M`
    }
    return suf;
}
export function formatNumber(value) {
    value += '';
    const list = value.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    let suffix = addSuffix(num);
    if(num.length > 4) {
        return suffix;
    }
    while (num.length > 3) {
        result = `,${num.slice(-3)}${result}`;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

export const getUrlQuery = (search) => querystring.parse(url.parse(search).query);

export function arrayToMap(map=[]) {
    const newMap = new Map();
    map.map(item => {
        if(item._id){
            newMap.set(item._id, item)
        }
    });
    return newMap;
}

export function duplicate(map) {
    const newMap = new Map();
    if(map instanceof Map){
        map.forEach((item, key) => {
            if(item['_id']){
                newMap.set(item['_id'], item)
            }
        })
    }
    return newMap;
}

export function addMultipleItems (map, items) {
    const newMap = duplicate(map);
    items.forEach((item) => {
        if (item['_id']) {
            newMap.set(item['_id'], item);
        }
    });
    return newMap;
};
export function addItem(map, item) {
    let newMap = new Map();
    if(map instanceof Map) {
        newMap = duplicate(map);
    }
    newMap.set(item._id, item);
    return newMap;
}

export function deleteItem(map, key) {
    const newMap = duplicate(map);
    newMap.delete(key);
    return newMap;
}

export function sortMapByDate(map) {
    return new Map([...map.entries()].sort((a,b) => {
        return new Date(b[1].createdAt) - new Date(a[1].createdAt) ;
    }));
}

