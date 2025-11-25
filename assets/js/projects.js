function toggleFolder(folder) {
    document.querySelectorAll('.folder').forEach(f => {
        if (f !== folder) f.classList.remove('open');
    });

    folder.classList.toggle('open');
}
