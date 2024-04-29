// Saves options to chrome.storage
const saveOptions = () => {
    const color = document.getElementById('color').value;
    const likesColor = document.getElementById('like').checked;

    chrome.storage.sync.set({
        favoriteColor: color,
        likesColor: likesColor
    }, () => {
        // Update status to let user know options were saved.
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(() => {
            status.textContent = '';
        }, 750);
    });
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
