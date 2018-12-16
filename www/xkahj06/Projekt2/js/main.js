const client_id = 'qLneyKfn9V2XEQ';   // client_id získáte po registraci OAuth účtu
const client_secret = '3gpnbeg_aKLi4ZxdZg20FtH5EDY'; // client_secret získáte po registraci OAuth účtu, Tohle bezny uzivatel uvidi? OMG lol
const baseWeb = 'https://www.reddit.com/r/';
const searchReddit = '  https://www.reddit.com/r/noveltranslations/search?q=' //zatím to prohledává jenom posty, ale v budoucnu to bude i umete samo zadat hledaní
/*
Zatím nepotřebuju, ale možná v budoucnnu, tak abych se tím nezdržoval 
*/
const postsPerRuests = 100; //bohuzel maximum které reddit povoluje, defaulne na 25
const maxPosttoFetch = 500; //tohle v budoucnu udelam nejak editovatelne v nejakem uzivatelsekm nastaveni
const maxRequests = maxPosttoFetch / postsPerRuests; //zaokrouhleno nahoru..:).

//tady budu ukladat vsechny data z fetchPostu
const responses = [];

//vezme string z Inputu posle ho do fetchPost
const handleSubmit = e => {   //e!!!
    e.preventDefault();
    const subreddit = document.getElementById('js-search').value;
    const novelName = document.getElementById('novel-search').value;
    console.log(novelName);
    fetchPosts(subreddit, novelName);
};
//var handleSubmit = fuction(params) { }

//zavola z fetchreqeust reditApi vysledek parseResult
const fetchPosts = async (subreddit, novelName, afterParam) => {
    //ceka to, nez se to udela nez se to pohne na dalsi radku kodu, abych nemusel delat .then().then()...
    const url = `${baseWeb}${subreddit}.json?limit=${postsPerRuests}${afterParam ? '&after=' + afterParam : ''}`;
    //pokud nebude afterParam zadan, vrati ten poslední segment toho stringu jako prazdný.
    //console.log(url);
    const response = await fetch(url);

    const responseJSON = await response.json();
    responses.push(responseJSON);

    if (responseJSON.data.after && responses.length < maxRequests) {
        fetchPosts(subreddit, novelName, responseJSON.data.after);
        return; //pro jistotu aby se mi tam neudelalo nejaký cyklus...
    }
    console.log(novelName);
    parseResults(responses, novelName);//tohle nastane až response.length => maxRequests, vzhledem k velikosti cílového subredittu...

};


//zpracuje data podle toho jak chceme z parseResults
const parseResults = (responses, novelName) => {
    const allPosts = [];//zasobnik kam budu ukladat.
    responses.forEach(response => {
        allPosts.push(...response.data.children); // tím "..." rozbiju to pole, a budu je tam ukladat jako jednotlive argumenty, tím nám vznikne jednoduche pole a ne pole polí.
    });
    //ted konecne zpracuju jednotliva data, tady to bude chtít jestě přepracovat

    statsByUser = {};

    allPosts.forEach(({ data: { author, score } }) => { //tímhle jsem si usetřil práci to dělat zvlást pro author a zvlášt pro score.
        statsByUser[author] = !statsByUser[author]
            ? { postCount: 1, score: score } //pokud neexistuje zalozíme nové
            : {
                postCount: statsByUser[author].postCount + 1,
                score: statsByUser[author].score + score,
            }
    });
    var rawTitles = [];
    var index6 = 0
    var theHighestCHCount = 0
    allPosts.forEach(({ data: { title } }) => {
        if (title.search(novelName) > 0) {

            rawTitles[index6] = title;
            index6 = index6 + 1;
            g = title.search('Chapter');
            var chapterCount = title.substring((g + 8), title.length);
            //console.log(chapterCount);
            if (theHighestCHCount < chapterCount) {
                theHighestCHCount = chapterCount;
            }
        }

    });

    console.log('nejvysi chapter je ' + theHighestCHCount)



    DisplayTitles(rawTitles, theHighestCHCount);

};




const DisplayTitles = (rawTitles, theHighestCHCount) => {
    const container = document.getElementById('js-output');
    //console.log(rawTitles);

    const userCard = document.createElement('a'); //vyrvori ahref element.
    userCard.href = `https://www.reddit.com`
    userCard.classList.add('user-card');
    userCard.innerText = `nejvysi chapter je ${theHighestCHCount}`;
    container.appendChild(userCard);



    rawTitles.forEach(function (element) {
        // rank = index + 1;
        const userCard = document.createElement('a'); //vyrvori ahref element.
        userCard.href = `https://www.reddit.com`
        userCard.classList.add('user-card');
        userCard.innerText = `${element}`;
        container.appendChild(userCard);
    });




};

const subredditSelectForm = document.getElementById('subreddit-select-form')
subredditSelectForm.addEventListener('submit', handleSubmit);

///mozna vymaz novelName protoze nekde bude zbytecny!!!!