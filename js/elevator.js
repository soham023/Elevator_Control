

const elevatorStopTime = 2500;
const elevatorMoveTime = 5000;

let buttons_pressed = {
  'up': {
    0: false,
    1: false
  },
  'down': {
    1: false,
    2: false
  }
};


let isTransitioning = false;
let currentLevel = 0;
const elevatorImg = document.getElementById('elevatorImg');
const buttons = {
  'up': {
    0: document.getElementById('button-up-0'),
    1: document.getElementById('button-up-1')
  },
  'down': {
    1: document.getElementById('button-down-1'),
    2: document.getElementById('button-down-2')
  }
};

const elevator0 = document.getElementById('elevator0');
const elevator1 = document.getElementById('elevator1');
const elevator2 = document.getElementById('elevator2');
const elevatorMusic = document.getElementById('elevator-music');

elevatorImg.addEventListener('transitionstart', () => {
  isTransitioning = true;
});

elevatorImg.addEventListener('transitionend', () => {
  isTransitioning = false;
});

elevatorImg.addEventListener('transitioncancel', () => {
  isTransitioning = false;
});


function playMusic() {
  elevatorMusic.play();
}

function pauseMusic() {
  elevatorMusic.pause();
  elevatorMusic.currentTime = null;
}

function setButton(dir, level) {
  buttons_pressed[dir][level] = true;
  buttons[dir][level].classList.add('arrow-green');
}

function resetButton(dir, level) {
  buttons_pressed[dir][level] = false;
  buttons[dir][level].classList.remove('arrow-green');
}


function moveElevator(dir, level) {
  if(level == 0) {
    if(isTransitioning || currentLevel > 0) {
      // elevator is already transitioning or above level 0, ignoring the request
      return;
    }
    setButton('up', 0);
    //level 0 has only up button
    moveImage(elevator0, elevator1); //reach level 1 from level 0
    playMusic();
    // and then check if level 1 up button is pressed or not
    setTimeout(() => {
      resetButton('up', 0);
      currentLevel = 1;
      // level 1 up button is pressed
      // let's stop elevator at level 1 for elevatorStopTime
      // and then move to level 2.
      if(buttons_pressed['up'][1])
        pauseMusic(); 
      setTimeout(() => {
        moveImage(elevator1, elevator2);
        playMusic();
        resetButton('up', 1);
        currentLevel = 2;
        setTimeout(() => {
          pauseMusic();
        }, elevatorMoveTime);
      }, buttons_pressed['up'][1] ? elevatorStopTime: null);
    }, elevatorMoveTime);
  }
  else if(level == 2) {
    if(isTransitioning || currentLevel < 2) {
      // elevator is already transitioning or below level 2, ignoring the request
      return;
    }
    setButton('down', 2);
    //level 2 has only down button
    moveImage(elevator2, elevator1); //reach level 1 from level 2
    playMusic();
    // and then wait if level 1 down button is pressed
    setTimeout(() => {
      resetButton('down', 2);
      currentLevel = 1;
      // if level 1 up button is pressed
      // then stop elevator at level 1 for elevatorStopTime
      // and then move to level 2.
      if(buttons_pressed['down'][1])
        pauseMusic(); 
      setTimeout(() => {
        moveImage(elevator1, elevator0);
        playMusic();
        resetButton('down', 1);
        currentLevel = 0;
        setTimeout(() => {
          pauseMusic();
        }, elevatorMoveTime);
      }, buttons_pressed['down'][1] ? elevatorStopTime: null);
    }, elevatorMoveTime);
  }
  else {
    // level 1 button
    // we are not moving elevator based on level 1 buttons
    // as this is not part of assignment
    setButton(dir, level);
  }

}

function moveImage(start, end) {

  // clone the element (we need the clone for positioning)
  let imageClone = elevatorImg.cloneNode();
  imageClone.style.visibility = 'hidden';
  end.appendChild(imageClone);

  // calculate the new position, relative to the current position
  let elevatorImgTop = elevatorImg.getBoundingClientRect().top;
  let elevatorImgLeft = elevatorImg.getBoundingClientRect().left;
  let imageCloneTop = imageClone.getBoundingClientRect().top;
  let imageCloneLeft = imageClone.getBoundingClientRect().left;
  let newPositionTop = (imageCloneTop - elevatorImgTop);
  let newPositionLeft = (imageCloneLeft - elevatorImgLeft);

  // remove the clone (we do not need it anymore)
  imageClone.parentNode.removeChild(imageClone);

  // position the original at the clone's position (this triggers the transition)
  elevatorImg.classList.add('elevator-transition');
  elevatorImg.style.top = newPositionTop + 'px';
  elevatorImg.style.left = newPositionLeft + 'px';

  // trigger after the transition time
  setTimeout(() => {
    // reset the positioning
    elevatorImg.style.position = 'scroll';
    elevatorImg.classList.remove('elevator-transition');
    elevatorImg.style.removeProperty("top");
    elevatorImg.style.removeProperty("left");

    // move the image element in the DOM (from start to end)
    end.appendChild(elevatorImg);
  }, elevatorMoveTime);
}
