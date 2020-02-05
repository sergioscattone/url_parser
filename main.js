/**
 * Create a hash object from URL 
 * @param  {String} urlFormat   The scructure of the URL
 * @param  {String} urlData     The URL itself
 * @return {Object} hash        The object with the parameters
 */
function getHashFromUrlParser(urlFormat, urlData) {
    const urlFormatSections = urlFormat.split('/');
    urlFormatSections.shift();

    const urlSeparated = urlData.split('?');
    const urlSectionsNoParams = urlSeparated[0];
    const urlSectionsParams = urlSeparated[1];
    const urlSections = urlSectionsNoParams.split('/');
    urlSections.shift();

    const hash = {};
    for (i = 0; i < urlFormatSections.length; i++) { 
        if (urlFormatSections[i].includes(':')) {
            const key = urlFormatSections[i].replace(':', '');
            hash[key] = urlSections[i];
        }
    }

    const parameters = urlSectionsParams.split('&');
    for (i = 0; i < parameters.length; i++) {
        parameterParts = parameters[i].split('=');
        hash[parameterParts[0]] = parameterParts[1];
    }

    return hash;
}


// Test 1 - valid format & valid data
{
    console.log('Test 1 - valid format & valid data');
    const urlFormat = '/:version/api/:collection/:id';
    const urlData = '/6/api/listings/3?sort=desc&limit=10';
    console.log(`URL ${urlFormat} with format ${urlData} should return: `);
    const mockHashResponse = { version: '6', collection: 'listings', id: '3', sort: 'desc', limit: '10' };
    const hash = getHashFromUrlParser(urlFormat, urlData);
    if (JSON.stringify(hash) === JSON.stringify(mockHashResponse)) {
        console.log('Test passed');
    } else {
        console.log('Test failed');
    }
    console.log('Response Mocked: ');
    console.log(mockHashResponse);
    console.log("");
    console.log('Actual Response: ');
    console.log(hash);
    console.log("");
    console.log("-------------------------------------------------------------------------------------------------------");
    console.log("");
    console.log("");
}


// Test 2 - invalid format & valid data
{
    console.log('Test 2 - valid format & invalid data');
    const urlFormat = '/:version/api/:collection/:id';
    const urlData = '/6/api/technology/listings/3?sort=desc&limit=10';
    console.log(`URL ${urlFormat} with format ${urlData} should return: `);
    const mockHashResponse = { version: '6', collection: 'listings', id: '3', sort: 'desc', limit: '10' };
    const hash = getHashFromUrlParser(urlFormat, urlData);
    if (JSON.stringify(hash) !== JSON.stringify(mockHashResponse)) {
        console.log('Test passed');
    } else {
        console.log('Test failed');
    }
    console.log('Response Mocked: ');
    console.log(mockHashResponse);
    console.log("");
    console.log('Actual Response: ');
    console.log(hash);
    console.log("");
    console.log("-------------------------------------------------------------------------------------------------------");
    console.log("");
    console.log("");
}


// Test 3 - valid format & invalid data
{
    console.log('Test 3 - invalid format & valid data');
    const urlFormat = '/:version/api/:technology/:collection/:id';
    const urlData = '/6/api/listings/3?sort=desc&limit=10';
    console.log(`URL ${urlFormat} with format ${urlData} should return: `);
    const mockHashResponse = { version: '6', technology: 'nodejs', collection: 'listings', id: '3', sort: 'desc', limit: '10' };
    const hash = getHashFromUrlParser(urlFormat, urlData);
    if (JSON.stringify(hash) !== JSON.stringify(mockHashResponse)) {
        console.log('Test passed');
    } else {
        console.log('Test failed');
    }
    console.log('Response Mocked: ');
    console.log(mockHashResponse);
    console.log("");
    console.log('Actual Response: ');
    console.log(hash);
    console.log("");
    console.log("-------------------------------------------------------------------------------------------------------");
    console.log("");
    console.log("");
}
