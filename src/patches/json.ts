let originalParse = JSON.parse;

JSON.parse = function (text: string) {
    return originalParse.call(JSON, text, camelCaseReviver);
}

function camelCaseReviver(key: any, value: any) {
    if (value && typeof value === 'object') {
        for (var k in value) {
            if (/^[A-Z]/.test(k) && Object.hasOwnProperty.call(value, k)) {
                value[k.charAt(0).toLowerCase() + k.substring(1)] = value[k];
                delete value[k];
            }
        }
    }
    return value;
}