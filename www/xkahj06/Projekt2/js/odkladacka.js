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