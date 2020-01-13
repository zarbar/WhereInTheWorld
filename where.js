let lat = document.getElementById("lat");
let lng = document.getElementById("lng");

function coordinatesReceived(event) {
    event.preventDefault();
    let coordinatesObject = {
        lat: +lat.value,
        lng: +lng.value
    }
    console.log(coordinatesObject);
    findWords(coordinatesObject);
}


function latitudeReceived(lat) {
    console.log(lat)
}

function findWords(coordinates) {
    what3words.api.convertTo3wa(coordinates)
        .then(function (response) {
            console.log("[convertTo3wa]", response);
            document.getElementById('threeWords').innerHTML = `///${response.words}`;
            let wordArray = response.words.split('.');
            wordArray.map(
                (word, index) => {
                    let request = `https://pixabay.com/api/?key=14901204-ee609757086580501c21b5786&q=${word}&image_type=photo&pretty=true`;
                    let num = index.toString();
                    let id = `#word${num}`;
                    $(id).html(word);

                    let settings = {
                        "async": true,
                        "crossDomain": true,
                        dataType: 'jsonp',
                        "url": request,
                        "method": "GET",
                        "headers": {
                            "Accept": "*/*",
                            "Cache-Control": "no-cache",
                            "Postman-Token": "7129ba86-6726-4db8-af2b-61df6244204f,cb8f1af0-c7c2-4b6b-974c-f258450029a8",
                            "cache-control": "no-cache",
                            'Access-Control-Allow-Headers': 'x-requested-with'
                        }
                    };
                    getImage(settings, index);
                }
            )
        });
}

function getImage(settings, index) {
    $.ajax(settings).done(function (response) {
        if (!response.hits[0]) {
            let src = './noImage.jpg';
            let imageSrc = '#image' + +index;
            $(imageSrc).attr('src', src);
        }
        else {
            let src = response.hits[0].largeImageURL;
            console.log(response.hits[0].largeImageURL);
            let imageSrc = '#image' + +index;
            $(imageSrc).attr('src', src);
        }
    });
}