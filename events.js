

chrome.tabs.onUpdated.addListener(function(tabId) {
    updateFavicon(tabId);
})

chrome.tabs.onCreated.addListener(function(tabId) {
    updateFavicon(tabId);
})

function updateFavicon(tabId) {
    chrome.tabs.get(tabId, function(tab) {

        let canvas = document.createElement('canvas');
        let link = document.createElement('link');

        let context = null;


        console.log(tab.faviconUrl)

        // if (tab.faviconUrl == undefined) {
        //     return;
        // }

        if (tab.faviconUrl && tab.faviconUrl.startsWith('data')) {
            return;
        }

        if (!tab.title || tab.title == undefined) {
            return;
        }

        if (tab.title &&
            (tab.title.startsWith('http') || tab.title.startsWith('www'))) {
            return;
        }

        let originalHref = link.href
        console.log(originalHref)

        let image = new Image();
        image.setAttribute('crossorigin', 'anonymous');
        image.src = tab.favIconUrl;
        console.log(image.src);

        if (canvas.getContext) {
            image.onload = function() {
                canvas.height = canvas.width = 32;
                context = canvas.getContext('2d');

                context.drawImage(this, 0, 0);

                context.fillStyle = getFillStyle(tab.url);
                context.fillRect(0, 10, 0, 32);

                context.font = '20px sans-serif';
                context.fillStyle = 'rgba(0, 0, 0, 1.0)';
                console.log(tab.title)
                context.fillText(tab.title, 0, 32);

                link.id = 'favicon';
                link.rel = 'shortcut icon';
                link.type = 'image/x-icon';
                link.href = canvas.toDataURL('image/png');

                chrome.tabs.executeScript(tabId, {'code': 'let href = "' + link.href + '"; console.log(href);'}, function(cb) {
                    // not sure
                });

                chrome.tabs.executeScript(tabId, {file: './inject.js'}, function(cb) {
                    // not sure what im doing here
                });

                // document.head.appendChild(link);
                // chrome.tabs.sendMessage(tabId, {'favicon': link.href}, null, function(cb) {
                //     console.log('idk');
                // });

            };
        }
    })
}

function getFillStyle(url) {
    var color = 'rgba('
        + getRandomColor() + ', '
        + getRandomColor() + ', '
        + getRandomColor() + ', '
        + '0.7)';
    return color
}

function getRandomColor() {
    return Math.floor(Math.random() * 255);
}


// chrome.tabs.onUpdated.addListener(function(tabId) {
//     console.log('updated');
//     console.log(tabId);


//     chrome.tabs.executeScript(tabId, {file: './inject.js'}, function(cb) {
//         console.log('finished the thing');
//     });

//     // chrome.tabs.sendMessage(tabId, {'message': 'updated'}, {}, function(cb) {
//     //     console.log('sent the message');
//     // });
// })
