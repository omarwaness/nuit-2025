// ===== TIME-BASED SCORING SYSTEM =====

// Level data with score effects (must match globe.js)
const levelScoreEffects = {
    1: { awareness: 10, independence: 10 },
    2: { budget: 10, awareness: 10 },
    3: { independence: 30, budget: 20, eco: 20 },
    4: { privacy: 30, independence: 20 },
    5: { independence: 25, budget: 15 },
    6: { eco: 30 },
    7: { eco: 30, budget: 20 },
    8: { security: 30, privacy: 20 },
    9: { independence: 30, collaboration: 20 },
    10: { privacy: 30, independence: 20 },
    11: { certification: 100 }
};

// Calculate time multiplier based on elapsed time
function getTimeMultiplier(elapsedSeconds) {
    if (elapsedSeconds < 120) return 1.0;        // < 2 minutes: 100%
    if (elapsedSeconds < 300) return 0.8;        // 2-5 minutes: 80%
    if (elapsedSeconds < 600) return 0.6;        // 5-10 minutes: 60%
    return 0.4;                                   // > 10 minutes: 40%
}

// Format time for display
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Get time performance rating
function getTimeRating(elapsedSeconds) {
    if (elapsedSeconds < 120) return { text: 'Lightning Fast!', emoji: '⚡', color: '#00ff88' };
    if (elapsedSeconds < 300) return { text: 'Good Speed', emoji: '✨', color: '#00d4ff' };
    if (elapsedSeconds < 600) return { text: 'Steady Pace', emoji: '🎯', color: '#ffd700' };
    return { text: 'Take Your Time', emoji: '🐢', color: '#ff8800' };
}

// Complete level with time-based scoring
function completeLevelWithScoring(levelId) {
    // Get start time
    const startTime = parseInt(localStorage.getItem(`level${levelId}StartTime`) || Date.now());
    const endTime = Date.now();
    const elapsedMs = endTime - startTime;
    const elapsedSeconds = Math.floor(elapsedMs / 1000);

    // Calculate time multiplier
    const multiplier = getTimeMultiplier(elapsedSeconds);

    // Get base scores for this level
    const baseScores = levelScoreEffects[levelId] || {};

    // Calculate final scores with time multiplier
    const finalScores = {};
    for (const [category, baseValue] of Object.entries(baseScores)) {
        finalScores[category] = Math.round(baseValue * multiplier);
    }

    // Load current player scores
    const playerScores = JSON.parse(localStorage.getItem('playerScores') || JSON.stringify({
        privacy: 0,
        independence: 0,
        budget: 0,
        eco: 0,
        security: 0,
        collaboration: 0,
        awareness: 0,
        certification: 0
    }));

    // Add final scores to player scores
    for (const [category, value] of Object.entries(finalScores)) {
        playerScores[category] = (playerScores[category] || 0) + value;
    }

    // Save updated scores
    localStorage.setItem('playerScores', JSON.stringify(playerScores));

    // Save completion time
    const levelTimes = JSON.parse(localStorage.getItem('levelTimes') || '{}');
    levelTimes[levelId] = elapsedSeconds;
    localStorage.setItem('levelTimes', JSON.stringify(levelTimes));

    // Mark level as completed
    const completedLevels = JSON.parse(localStorage.getItem('completedLevels') || '[]');
    if (!completedLevels.includes(levelId)) {
        completedLevels.push(levelId);
        localStorage.setItem('completedLevels', JSON.stringify(completedLevels));
    }

    // Clear start time
    localStorage.removeItem(`level${levelId}StartTime`);

    // Return completion data for display
    return {
        elapsedSeconds,
        elapsedTime: formatTime(elapsedSeconds),
        multiplier,
        multiplierPercent: Math.round(multiplier * 100),
        rating: getTimeRating(elapsedSeconds),
        baseScores,
        finalScores,
        totalPoints: Object.values(finalScores).reduce((sum, val) => sum + val, 0)
    };
}

// Show completion modal with time-based scoring info
function showCompletionModal(levelId, completionData) {
    const modal = document.getElementById('success-overlay');
    const successBox = modal.querySelector('.success-box');

    // Update success message with time info
    const descElement = successBox.querySelector('.success-desc');
    if (descElement) {
        descElement.innerHTML = `
            <div style="margin-bottom: 15px;">
                <div style="font-size: 1.2rem; color: ${completionData.rating.color}; margin-bottom: 5px;">
                    ${completionData.rating.emoji} ${completionData.rating.text}
                </div>
                <div style="font-size: 0.9rem; color: #8b949e;">
                    Time: ${completionData.elapsedTime} • Score Multiplier: ${completionData.multiplierPercent}%
                </div>
            </div>
            <div style="background: rgba(0, 212, 255, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                <div style="font-size: 0.85rem; color: #8b949e; margin-bottom: 5px;">Points Earned:</div>
                <div style="font-size: 1.3rem; color: #00ff88; font-weight: bold;">+${completionData.totalPoints}</div>
            </div>
        `;
    }

    modal.classList.add('visible');
}
