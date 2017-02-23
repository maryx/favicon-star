// console.log('in inject');
// let canvas = document.createElement('canvas');
// let link = getFavicon();
// console.log(link);
// let context = null;
// let originalHref = link.href

// let image = new Image();
// // image.setAttribute('crossorigin', 'anonymous');
// // image.src = link.href;

// if (canvas.getContext) {
//     image.onload = function() {
//         canvas.height = canvas.width = 32;
//         context = canvas.getContext('2d');

//         context.drawImage(this, 0, 0);

//         context.fillStyle = 'rgba(0, 225, 0, 0.3)';
//         context.fillRect(0, 0, 32, 32);

//         context.fillStyle = 'rgba(0, 0, 0, 1.0)';
//         context.font = '26px serif';
//         context.fillText('h', 2, 32);

//         link.id = 'favicon';
//         link.rel = 'shortcut icon';
//         link.type = 'image/x-icon';
//         link.href = canvas.toDataURL('image/png');

//         // console.log(link.href);
//         // document.head.appendChild(link);
//     };
//     // image.src = link.href
// }
let favicon = getFavicon()
favicon.href = href;

function getFavicon() {
    console.log(document.querySelectorAll('link'));
    let favicon = document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]') || document.createElement('link');
    console.log(favicon)
    return favicon;
}
