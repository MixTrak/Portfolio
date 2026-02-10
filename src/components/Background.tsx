import React from "react";

const Background = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full z-[-1] overflow-hidden pointer-events-none">
            {/* Base Dark Background - Changed to pure black for better contrast */}
            <div className="absolute inset-0 bg-black"></div>

            {/* Grid Pattern - Subtled down slightly */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            {/* Triplet of Blurred Lights - Higher contrast and slightly more focused */}
            {/* 1. Red Light (Top Center-Left) */}
            <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-red-600/30 rounded-full blur-[120px] animate-pulse mix-blend-screen"></div>

            {/* 2. Green Light (Top Center-Right) */}
            <div className="absolute top-[25%] right-[20%] w-[450px] h-[450px] bg-green-500/30 rounded-full blur-[120px] animate-pulse delay-1000 mix-blend-screen"></div>

            {/* 3. Blue Light (Bottom Center) */}
            <div className="absolute top-[60%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[150px] animate-pulse delay-2000 mix-blend-screen"></div>
        </div>

    );
};

export default Background;
