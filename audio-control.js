// audio-control.js
// Audio management system untuk website birthday

document.addEventListener('DOMContentLoaded', function() {
    // Audio management
    const audio = document.getElementById('backgroundAudio');
    const audioToggle = document.getElementById('audioToggle');
    const audioIndicator = document.getElementById('audioIndicator');
    const clickOverlay = document.getElementById('clickOverlay');
    
    let isPlaying = false;
    let hasInteracted = false;
    
    // Function to play audio
    function playAudio() {
        if (!audio) return;
        
        audio.play().then(() => {
            isPlaying = true;
            if (audioToggle) audioToggle.innerHTML = '🔊 Pause Music';
            if (audioIndicator) {
                audioIndicator.innerHTML = 'Music: Playing';
                audioIndicator.style.display = 'block';
                setTimeout(() => {
                    audioIndicator.style.display = 'none';
                }, 2000);
            }
        }).catch(error => {
            console.log('Audio play failed:', error);
            if (audioToggle) audioToggle.innerHTML = '🔇 Play Music';
        });
    }
    
    // Function to pause audio
    function pauseAudio() {
        if (!audio) return;
        
        audio.pause();
        isPlaying = false;
        if (audioToggle) audioToggle.innerHTML = '🔇 Play Music';
        if (audioIndicator) {
            audioIndicator.innerHTML = 'Music: Paused';
            audioIndicator.style.display = 'block';
            setTimeout(() => {
                audioIndicator.style.display = 'none';
            }, 2000);
        }
    }
    
    // Handle first user interaction
    function handleFirstInteraction() {
        if (!hasInteracted) {
            hasInteracted = true;
            if (clickOverlay) clickOverlay.classList.add('hidden');
            playAudio();
        }
    }
    
    // Event listeners
    if (clickOverlay) {
        clickOverlay.addEventListener('click', handleFirstInteraction);
    }
    
    // Also handle other interactions
    document.addEventListener('click', function(e) {
        if (e.target !== audioToggle && !hasInteracted) {
            handleFirstInteraction();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (!hasInteracted) {
            handleFirstInteraction();
        }
    });
    
    // Audio toggle button
    if (audioToggle) {
        audioToggle.addEventListener('click', function() {
            if (!hasInteracted) {
                handleFirstInteraction();
                return;
            }
            
            if (isPlaying) {
                pauseAudio();
            } else {
                playAudio();
            }
        });
    }
    
    // Handle audio events
    if (audio) {
        audio.addEventListener('play', function() {
            isPlaying = true;
            if (audioToggle) audioToggle.innerHTML = '🔊 Pause Music';
        });
        
        audio.addEventListener('pause', function() {
            isPlaying = false;
            if (audioToggle) audioToggle.innerHTML = '🔇 Play Music';
        });
        
        audio.addEventListener('ended', function() {
            isPlaying = false;
            if (audioToggle) audioToggle.innerHTML = '🔇 Play Music';
        });
    }
    
    // Handle page visibility change (when user switches tabs)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && isPlaying) {
            // Optionally pause when tab is hidden
            // pauseAudio();
        }
    });
});