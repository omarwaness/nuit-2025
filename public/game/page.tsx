"use client";

export default function GamePage() {
    return (
        <div className="w-full h-screen overflow-hidden">
            <iframe
                src="/game/index.html"
                className="w-full h-full border-0"
                title="NIRD Educational Game"
            />
        </div>
    );
}
