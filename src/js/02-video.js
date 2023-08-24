import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player.Player(iframe);

player.on('timeupdate', throttle(saveCurrentBrowsingTime, 1000));

function saveCurrentBrowsingTime(event) {
    localStorage.setItem(
        'video-current-time',
        JSON.stringify(event, seconds)
    );
}
try {
    const savedTime = JSON.parse(
        localStorage.getItem('video-current-time')
    );

    if (savedTime) {
        player.saveCurrentTime(savedTime);
    }
} catch (error) {
        console.error(error.name, error.message);
    }
