import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('timeupdate', throttle(saveCurrentBrowsingTime, 1000));

function saveCurrentBrowsingTime(event) {
    localStorage.setItem(
        'videoplayer-current-time',
        JSON.stringify(event.seconds)
    );
}

try {
    const savedTime = JSON.parse(
        localStorage.getItem('videoplayer-current-time')
    );

    if (savedTime !== null) {
        player.setCurrentTime(savedTime);
    }
} catch (error) {
    console.error(error.name, error.message);
}