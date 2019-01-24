const client_id = 'qLneyKfn9V2XEQ';   // client_id získáte po registraci OAuth účtu
const client_secret = '3gpnbeg_aKLi4ZxdZg20FtH5EDY'; // client_secret získáte po registraci OAuth účtu, doufám, že  
const baseWeb = 'https://www.reddit.com/r/';
const searchReddit = 'https://www.reddit.com/r/noveltranslations/search?q=' //zatím to prohledává jenom posty, ale v budoucnu to bude i umete samo zadat hledaní
const searchAPIReddit = 'https://api.reddit.com/r/'




/*
Zatím nepotřebuju, ale možná v budoucnnu, tak abych se tím nezdržoval 
*/
const postsPerRequests = 100; //bohuzel maximum které reddit povoluje, defaulne na 25
const maxPosttoFetch = 500; //tohle v budoucnu udelam nejak editovatelne v nejakem uzivatelsekm nastaveni
const maxRequests = maxPosttoFetch / postsPerRequests; //zaokrouhleno nahoru..:).

//tady budu ukladat vsechny data z fetchPostu
const responses = [];
var novelName = []
//vezme string z Inputu posle ho do fetchPost
const handleSubmit = e => {   //e!!!
    e.preventDefault();
    subreddit = document.getElementById('js-search').value;
    novelName[0] = document.getElementById('novel-search').value;
    novelName[1] = document.getElementById('chapters-read').value;
    novelName[2] = document.getElementById('Increment').value;
    novelName[3] = subreddit;
    fetchPosts(subreddit, novelName);
};
//var handleSubmit = fuction(params) { }

//zavola z fetchreqeust reditApi vysledek parseResult
const fetchPosts = async (subreddit, novelName, afterParam) => {
    //ceka to, nez se to udela nez se to pohne na dalsi radku kodu, abych nemusel delat .then().then()...

    //stára verze prohledavajici cele forum
    //const url = `${baseWeb}${subreddit}.json?limit=${postsPerRequests}${afterParam ? '&after=' + afterParam : ''}`;
    const url = `${searchAPIReddit}${subreddit}/search?q=${novelName[0]}&restrict_sr=1&sort=new&limit=${postsPerRequests}${afterParam ? '&after=' + afterParam : ''}`
    //const url = `${searchAPIReddit}${subreddit}/search?q=${novelName[0]}limit=${postsPerRequests}${afterParam ? '&after=' + afterParam : ''}`
    //https://www.reddit.com/r/noveltranslations/search?q=Phoenix&restrict_sr=1&sort=new
    //    https://api.reddit.com/r/noveltranslations/search?q=phoenix&after=t3_aiuqs7
    //.json?limit=${postsPerRequests}${afterParam ? '&after=' + afterParam : ''}`;


    //pokud nebude afterParam zadan, vrati ten poslední segment toho stringu jako prazdný.
    //console.log(url);
    const response = await fetch(url);

    const responseJSON = await response.json();
    //console.log(responseJSON);
    responses.push(responseJSON);
    //console.log(responses);
    if (responseJSON.data.after && responses.length < maxRequests) {
        fetchPosts(subreddit, novelName, responseJSON.data.after);
        return; //Pro jistotu, aby to pak neskakalo nekolikrat na radky pod tim.
    }
    //console.log(novelName);
    parseResults(responses, novelName);//tohle nastane až response.length => maxRequests, vzhledem k velikosti cílového subredittu...

};


//zpracuje data podle toho jak chceme z parseResults
const parseResults = (responses, novelName) => {
    const allPosts = [];//zasobnik kam budu ukladat.
    //console.log(responses);
    responses.forEach(response => {
        allPosts.push(...response.data.children); // tím "..." rozbiju to pole, a budu je tam ukladat jako jednotlive argumenty, tím nám vznikne jednoduche pole a ne pole polí.
    });
    //console.log("KOUKEJ" + allPosts );
    //ted konecne zpracuju jednotliva data, tady to bude chtít jestě přepracovat

    posts = {}; //compoudni pole
    var rawTitles = [[], []]; //Multi pole, ted na permalink, více už asi nestihnu.
    var index6 = 0
    var theHighestCHCount = 0
    var theHighestCHDetails = [];
    var volume = 0;
    var maxvolume = 0;
    allPosts.forEach(({ data: { title, url } }) => {

        if ((title.search(novelName[0]) > 0)&&(title.search("Volume") > 0)) {
            volume = title.substring((title.search("Volume") + 7), title.length);
            volume = volume.split(" ");
            volume = volume[0];
            console.log(volume);
        };

        if ((title.search(novelName[0]) > 0)&&(title.search("Arc") > 0)) {
            volume = title.substring((title.search("Arc") + 5), title.length);
            volume = volume.split(" ");
            volume = volume[0];
            console.log(volume);
        };
        if ((title.search(novelName[0]) > 0)&&(title.search("Book") > 0)) {
            volume = title.substring((title.search("Book") + 6), title.length);
            volume = volume.split(" ");
            volume = volume[0];
            console.log(volume);
        };
        maxvolume=Number(maxvolume);
        volume=Number(volume);

        if ((title.search(novelName[0]) > 0)&&(title.search('Chapter') > 0)) {

            

            rawTitles[[index6][0]] = title;
            rawTitles[[index6][1]] = url;

            //  posts[index6] = {titleName: title,   titleURL: url};
            // console.log(posts[index6]: titleURL);

            index6 = index6 + 1;
            g = title.search('Chapter');
            var chapterCount = title.substring((g + 8), title.length);

           //console.log(title);
           //console.log(chapterCount);

            if (chapterCount.search("-") > 0) {
                chapterCount=chapterCount.substring(chapterCount.search("-")+2,chapterCount.length);
               // console.log(chapterCount);
               // console.log('opraveno');
            }; 

            if (chapterCount.search("&") > 0) {
                chapterCount=chapterCount.substring(chapterCount.search("&")+5,chapterCount.length);
               // console.log(chapterCount);
               // console.log('opraveno');
            };


            if (chapterCount.search("Part") > 0) {
                chapterCount=chapterCount.substring(0 , chapterCount.search("Part")-1);
               // console.log(chapterCount);
               // console.log('opraveno');
            }; 

            
            if (isNaN(chapterCount)) {
                chapterCount=chapterCount.trim();
                while((chapterCount.length>1)&&isNaN(chapterCount)){
                   //console.log(chapterCount);
                    chapterCount=chapterCount.substring(0 , chapterCount.length-1);
                };
            }

            if (isNaN(chapterCount)) {
                console.log(chapterCount);
                chapterCount = -1;
                //console.log("pokazilo se to");
                
            } else {
            };
            chapterCount=Number(chapterCount);
           // console.log('vol '+ volume +' ch '+chapterCount);

            if (((theHighestCHCount < chapterCount) && (volume == maxvolume))||(volume>maxvolume)) {
                maxvolume = volume;
                theHighestCHCount = chapterCount;
                theHighestCHDetails[0] = title;
                theHighestCHDetails[1] = url;
                theHighestCHDetails[2] = volume;
                theHighestCHDetails[3] = theHighestCHCount;
               // console.log('probehlo to');
            };
        };

    });



    //console.log('nejvysi chapter je ' + theHighestCHCount);



    displayTitles(rawTitles, theHighestCHCount, theHighestCHDetails, novelName);

};




const displayTitles = (rawTitles, theHighestCHCount, theHighestCHDetails, novelName) => {
    const container = document.getElementById('js-output');
    var counter = document.getElementById('js-counter');

    counter.innerHTML = Number(counter.innerHTML) + 1;
    // console.log(counter.innerHTML);

    //zjisteni zda to uz splnuje podminky pro upozorneni 10x nasobek novych kapitol zluta,2,5x nasobek fialova,1x nasobek modra
    var zvyseni = ((theHighestCHCount - novelName[1])+ ((theHighestCHDetails[2]-1)*100)) / novelName[2];
        if (zvyseni > 5) {
            extraColour = " violet";
        } else {
            extraColour = " blue";
        };

    

    if (zvyseni < 1) {
        extraColour = " ";
    };

if(theHighestCHDetails[2]>0){
    theHighestCHCount= 'vol '+theHighestCHDetails[2]+' ch '+theHighestCHCount;
};



    newHTML = `<!--START${counter.innerHTML}-->
      <div class="informations">
            <div class="profile__detail">
                <div class="profile__detailName">${novelName[0]}</div>
                <div class="profile__detailValue">${novelName[1]}</div>
                <div class="profile__detailValue${extraColour}"><a href=${theHighestCHDetails[1]}>${theHighestCHCount}</a></div>
                <div class="profile__detailValue">${novelName[2]}</div>
                <div class="profile__detailValue"><button class = "button button--submitSearch" onclick="deleteteLine(${counter.innerHTML})">Delete Novel</button></div>
                 
            </div>
        </div>
    <!--KONEC${counter.innerHTML}-->`//pro moznost jednoduse smazat radek

    container.innerHTML += `${newHTML}`;
    saveLine(counter.innerHTML, novelName);

    // <div class="profile__detailValue"><button class="button button--submitSearch" onclick="saveLine(${counter.innerHTML})">Save Novel</button></div>



};

const subredditSelectForm = document.getElementById('subreddit-select-form')//vyrvori ahref element.  Např: noveltranslations // Phoenix   (jmeno novely stačí pouze část, když jste si jistí, že ne nespojí s nějakou další..)
subredditSelectForm.addEventListener('submit', handleSubmit);

function deleteteLine(line) {
    const container = document.getElementById('js-output');
    var str = container.innerHTML
    var konec = `<!--KONEC${line}-->`;
    var start = `<!--START${line}-->`;
    var prefixWithChapter = str.split(konec, 2);
    var prefixWithouerChapter = str.split(start, 2);
    var newURL = prefixWithouerChapter[0].concat(prefixWithChapter[1]);
    container.innerHTML = newURL;
    var nName = 'N' + line;
    var gName = 'G' + line;
    var iName = 'I' + line;
    var sName = 'S' + line;

    localStorage.removeItem(nName);
    localStorage.removeItem(gName);
    localStorage.removeItem(iName);
    localStorage.removeItem(sName);

};

function saveLine(line, novelName) {
    var nName = 'N' + line;
    var gName = 'G' + line;
    var iName = 'I' + line;
    var sName = 'S' + line;
    //console.log(nName);
    //console.log(novelName);
    // localStorage.setItem(line, novelName);
    // var h = number(localStorage.getItem("numberOfNovels")) + 1
    // localStorage.setItem("numberOfNovels", h);
    // g = (localStorage.getItem(line));
    //console.log(h);
    localStorage.setItem(nName, novelName[0]);
    localStorage.setItem(gName, novelName[1]);
    localStorage.setItem(iName, novelName[2]);
    localStorage.setItem(sName, novelName[3]);


};

function LoadData() {



    var line = 1
    while (line < 21) {

        var nName = 'N' + line;
        var gName = 'G' + line;
        var iName = 'I' + line;
        var sName = 'S' + line;
        if ((localStorage.getItem(nName) != 'undefined') && (localStorage.getItem(gName) != null)) {
            var name0 = localStorage.getItem(nName);
            var name1 = localStorage.getItem(gName);
            var name2 = localStorage.getItem(iName);
            var name3 = localStorage.getItem(sName);
            var NovelName = [name0, name1, name2, name3];
            fetchPosts(name3, NovelName);
            //console.log(line);
        };




        /*
        
                console.log(name0);
                console.log(name1);
                console.log(name2);
                console.log(name3);
        */

        line = line + 1;
    };
};