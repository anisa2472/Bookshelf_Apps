const notification = document.getElementById('notification');
const notificationIcon = document.querySelector('.notification-content--icon');
const notificationTitle = document.querySelector('.notification-content--message__title');
const notificationMessage = document.querySelector('.notification-content--message__subtitle');
const notificationClose = document.querySelector('.notification-close');
const notificationTimeout = document.querySelector('.notification-timeout');

function errorNotification(msg) {
    notificationIcon.innerHTML = '<span class="iconify" data-icon="ep:close-bold"></span>';
    notificationTitle.innerHTML = 'Error';
    notificationMessage.innerHTML = msg;

    notificationIcon.style.background = 'rgba(222, 60, 99, 1)';
    notification.style.borderLeft = '5px solid rgba(222, 60, 99, 1)';
    notificationTimeout.style.background = 'rgba(222, 60, 99, 1)';

    notification.classList.add('notification-show');
    notificationTimeout.classList.add('notification-show')

    setTimeout(() => {
        notification.classList.remove('notification-show');
    }, 5000);

    notificationClose.addEventListener('click', () => {
        notification.classList.remove('notification-show');
    });
};

function successNotification(msg) {
    notificationIcon.innerHTML = '<span class="iconify" data-icon="akar-icons:check"></span>';
    notificationTitle.innerHTML = 'Succes';
    notificationMessage.innerHTML = msg;

    notificationIcon.style.background = 'rgba(55, 203, 149, 1)';
    notification.style.borderLeft = '5px solid rgba(55, 203, 149, 1)';
    notificationTimeout.style.background = 'rgba(55, 203, 149, 1)';

    notification.classList.add('notification-show');
    notificationTimeout.classList.add('notification-show')

    setTimeout(() => {
        notification.classList.remove('notification-show');
        notificationTimeout.classList.remove('notification-show');
    }, 5000);

    notificationClose.addEventListener('click', () => {
        notification.classList.remove('notification-show');
        notificationTimeout.classList.remove('notification-show');
    });
};

export { errorNotification, successNotification };