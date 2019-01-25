const userCard = document.createElement('a'); //vyrvori ahref element.
userCard.href = theHighestCHDetails[1];
userCard.classList.add('user-card');
userCard.innerText = `nejvysi chapter je ${theHighestCHCount} v tomhle prispevku:`;
userCard.innerText += theHighestCHDetails[0];
container.appendChild(userCard);


index5 = 0;
rawTitles.forEach(function (element) {
    index5 = index5 + 1;
    const userCard = document.createElement('a'); //vyrvori ahref element.
    userCard.href = rawTitles[[index5][1]];
    userCard.classList.add('user-card');
    userCard.innerText = `${element}`;
    container.appendChild(userCard);
});

};

function deleteteLine(line) {
    const container = document.getElementById('js-output');
    str = container.innerHTML
    var res = str.split(`< !--KONEC${line} -->`, 1);
    console.log(str);
    console.log(container.innerHTML);

};

const userCard = document.createElement('a'); //vyrvori ahref element.
userCard.href = theHighestCHDetails[1];
userCard.classList.add('user-card');
userCard.innerText = `nejvysi chapter je ${theHighestCHCount} v tomhle prispevku:`;
userCard.innerText += theHighestCHDetails[0];
container.appendChild(userCard);


index5 = 0;
rawTitles.forEach(function (element) {
    index5 = index5 + 1;
    const userCard = document.createElement('a'); //vyrvori ahref element.
    userCard.href = rawTitles[[index5][1]];
    userCard.classList.add('user-card');
    userCard.innerText = `${element}`;
    container.appendChild(userCard);
});



const userCard = document.createElement('a'); //vyrvori ahref element.
userCard.href = theHighestCHDetails[1];
userCard.classList.add('user-card');
userCard.innerText = `nejvysi chapter je ${theHighestCHCount} v tomhle prispevku:`;
userCard.innerText += theHighestCHDetails[0];
container.appendChild(userCard);


index5 = 0;
rawTitles.forEach(function (element) {
    index5 = index5 + 1;
    const userCard = document.createElement('a'); //vyrvori ahref element.
    userCard.href = rawTitles[[index5][1]];
    userCard.classList.add('user-card');
    userCard.innerText = `${element}`;
    container.appendChild(userCard);
});



fetch('https://api.reddit.com/r/noveltranslations/search?q=Friendly%20Fire')
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        //console.log(JSON.stringify(myJson));
    });

fetch('https://api.reddit.com/r/noveltranslations/search?q=Friendly%20Fire')
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        console.log((myJson));
    });


const fetch('https://api.reddit.com/r/noveltranslations/search?q=Friendly%20Fire') 
    => (function (response) {
    return response.json();
})
        => (function (myJson) {
    console.log((myJson));
});


const fetchPosts = async (subreddit, novelName, afterParam) => {
    //ceka to, nez se to udela nez se to pohne na dalsi radku kodu, abych nemusel delat .then().then()...
    const url = `${baseWeb}${subreddit}.json?limit=${postsPerRequests}${afterParam ? '&after=' + afterParam : ''}`;
    //pokud nebude afterParam zadan, vrati ten poslední segment toho stringu jako prazdný.
    //console.log(url);
    const response = await fetch(url);

    const responseJSON = await response.json();
    responses.push(responseJSON);

    if (responseJSON.data.after && responses.length < maxRequests) {
        fetchPosts(subreddit, novelName, responseJSON.data.after);
        return; //Pro jistotu, aby to pak neskakalo nekolikrat na radky pod tim.
    }
    //console.log(novelName);
    parseResults(responses, novelName);//tohle nastane až response.length => maxRequests, vzhledem k velikosti cílového subredittu...

};