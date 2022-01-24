document.addEventListener('DOMContentLoaded', function () {

  const allCards = [
    { src: 'img/card1.png', title: 'Шестірка пентаклів' },
    { src: 'img/card2.png', title: 'Вісімка пентаклів' },
    { src: 'img/card3.png', title: 'Двійка пентаклів' },
    { src: 'img/card4.png', title: 'Дев’ятка пентаклів' },
    { src: 'img/card5.png', title: 'Десятка пентаклів' },
    { src: 'img/card6.png', title: 'Паж пентаклів' },
    { src: 'img/card7.png', title: 'Сімка пентаклів' },
    { src: 'img/card8.png', title: 'Трійка пентаклів' },
    { src: 'img/card9.png', title: 'Туз пентаклів' },
    { src: 'img/card10.png', title: 'Четвірка пентаклів' },
    { src: 'img/card11.png', title: 'Королева пентаклів' },
    { src: 'img/card12.png', title: 'Король пентаклів' },
    { src: 'img/card13.png', title: 'Лицар пентаклів' },
    { src: 'img/card14.png', title: 'П’ятірка пентаклів' },
  ];

  const $gamePlaceholderImg = document.querySelectorAll(
      '.game__placeholder-img'
    ),
    $gameColodas = document.querySelectorAll('.game__coloda'),
    $gameAllColodas = document.querySelector('.game__colodas'),
    $popUp = document.querySelector('.popUp_holder'),
    randomNumbers = [];
  let count = 0;

  const getRandomIntInclusive = function (max) {
    return Math.floor(Math.random() * max);
  };
  const addRandomCard = function (parent) {
    let randomCard = getRandomIntInclusive(allCards.length);

    if (randomNumbers.some((i) => i === randomCard)) {
      addRandomCard(parent);
    } else {
      let img = new Image();
      text = document.createElement('p');

      img.src = allCards[randomCard].src;
      text.className = 'game__placeholder-img-text';
      text.textContent = allCards[randomCard].title;
      parent.appendChild(img);
      parent.appendChild(text);
      img.onload = function () {
        parent.closest('.game__placeholder').style.height = img.height + 'px';
      };
      randomNumbers.push(randomCard);
    }
  };

  const addClickedCard = function (parent) {
    let parentElem = parent.closest('.game__placeholder');
    setTimeout(function () {
      parentElem.classList.add('active');
    }, 50);
    setTimeout(function () {
      parentElem.querySelector('.game__placeholder-img-text').style.opacity =
        '1';
    }, 1000);

    if (count === 2) {
      setTimeout(function () {
        $popUp.style.cssText = 'opacity: 1; z-index: 20';
      }, 2500);
    }
  };

  const addCardsToColoda = function (item) {
    let i = 1;
    let addCardsInterval = setInterval(
      function () {
        if (i < 9) {
          let img = new Image();
          img.src = 'img/card0.png';
          img.style.cssText =
            'position: absolute; z-index: ' +
            i +
            '; top:' +
            7 * i +
            '%; left: 0';
          item.appendChild(img);
          i++;
        } else {
          clearInterval(addCardsInterval);
        }
      }.bind(this),
      100
    );
  };

  $gamePlaceholderImg.forEach(function (item) {
    addRandomCard(item);
  });
  if (window.matchMedia('(min-width: 992px)').matches) {
    $gameColodas.forEach(function (item) {
      addCardsToColoda(item);
    });
    $gameAllColodas.addEventListener('click', function (e) {
      const t = e.target;
			$gameColodas.forEach((coloda, i) => {
				if (
          t &&
          t.tagName.toLowerCase() === 'img' &&
          !t.parentNode.classList.contains('clicked') &&
          t.closest('.game__coloda') === coloda &&
          count < 3
        ) {
					addClickedCard($gamePlaceholderImg[i]);
          t.style.opacity = '0';
          coloda.classList.add('clicked');
          count++;
				}
			})
      // for (let i = 0; i < $gameColodas.length; i++) {
      //   if (
      //     t &&
      //     t.tagName.toLowerCase() === 'img' &&
      //     !t.parentNode.classList.contains('clicked') &&
      //     t.closest('.game__coloda') === $gameColodas[i] &&
      //     count < 3
      //   ) {
      //     addClickedCard($gamePlaceholderImg[i]);
      //     t.style.opacity = '0';
      //     t.closest('.game__coloda').classList.add('clicked');
      //     count++;
      //   }
      // }
    });
  } else {
    $gameColodas[0].addEventListener('click', function (e) {
      if (count < 3) {
        addClickedCard($gamePlaceholderImg[count]);
        count++;
      }
    });
  }
});
