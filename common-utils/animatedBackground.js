// animatedBackground.js - Fondo animado tipo scouter HUD con paleta verde-azul
function initAnimatedBackground() {
    const canvas = document.getElementById("techCanvas");
    const ctx = canvas.getContext("2d");
    
    let w, h;
    
    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    
    window.addEventListener("resize", resize);
    resize();
    
    const rand = (a,b) => Math.random()*(b-a)+a;
    
    /* ===== PALETA VERDE-AZUL ===== */
    const GREEN1  = "rgba(111, 191, 115, 0.75)";    // #6FBF73
    const GREEN2  = "rgba(76, 175, 80, 0.55)";      // #4CAF50
    const BLUE1   = "rgba(111, 174, 217, 0.75)";    // #6FAED9
    const BLUE2   = "rgba(159, 200, 230, 0.55)";    // #9FC8E6
    
    /* ===== RINGS ===== */
    const rings = [];
    const COUNT = Math.min(6, (w*h)/140000);
    
    for(let i=0;i<COUNT;i++){
        rings.push({
            x: rand(0,w-100),
            y: rand(0,h-10),
            r: rand(20,180),
            rot: rand(0,Math.PI*2),
            speed: rand(0.0008,0.01)*(Math.random()>0.5?1:-1),
            pulse: rand(0,Math.PI*2),
    
            arcs: Math.floor(rand(2,4)),
            arcLengths: Array.from({length:3},()=>rand(Math.PI/10,Math.PI/3)),
            triAngle: rand(0,Math.PI*2),
            triSpeed: rand(0.003,0.008)*(Math.random()>0.5?1:-1),
    
            colorType: Math.random() > 0.5 ? 'green' : 'blue' // Alternar entre verde y azul
        });
    }
    
    /* ===== DRAW ===== */
    function drawRing(r){
        r.rot += r.speed;
        r.triAngle += r.triSpeed;
        r.pulse += 0.01;
        
        // Seleccionar color basado en el tipo
        const primaryColor = r.colorType === 'green' ? GREEN1 : BLUE1;
        const secondaryColor = r.colorType === 'green' ? GREEN2 : BLUE2;
        const accentColor = r.colorType === 'green' ? '#8BC34A' : '#6FAED9'; // Verde lima o azul

        /* outer ring */
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI*2);
        ctx.stroke();

        /* middle ring */
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r*0.74, 0, Math.PI*2);
        ctx.stroke();

        /* inner ring */
        ctx.lineWidth = 1.1;
        ctx.strokeStyle = secondaryColor;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r*0.55, 0, Math.PI*2);
        ctx.stroke();

        /* arcs with variable length */
        ctx.strokeStyle = r.colorType === 'green' ? accentColor : primaryColor;
        ctx.lineWidth = 3.5;
        ctx.shadowBlur = 10;
        ctx.shadowColor = r.colorType === 'green' ? 'rgba(139, 195, 74, 0.7)' : 'rgba(111, 174, 217, 0.7)';

        for(let i=0;i<r.arcs;i++){
            const off = (Math.PI*2/r.arcs)*i;
            const len = r.arcLengths[i % r.arcLengths.length];
            ctx.beginPath();
            ctx.arc(
                r.x, r.y, r.r*0.88,
                r.rot+off,
                r.rot+off+len
            );
            ctx.stroke();
        }
        
        ctx.shadowBlur = 0; // Reset shadow

        /* pointer/triangle indicator */
        const ox = r.x + Math.cos(r.triAngle)*r.r*0.88;
        const oy = r.y + Math.sin(r.triAngle)*r.r*0.88;
        const rot = Math.atan2(r.y-oy, r.x-ox)+Math.PI/2;

        drawTriangle(ox, oy, rot, secondaryColor);
    }
    
    function drawTriangle(x, y, rot, color){
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rot);

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, -5);
        ctx.lineTo(5.5, 6);
        ctx.lineTo(-5.5, 6);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }
    
    /* ===== LOOP ===== */
    function animate(){
        // Fondo con gradiente sutil
        const gradient = ctx.createLinearGradient(0, 0, w, h);
        gradient.addColorStop(0, 'rgba(22, 35, 71, 0.25)'); // #162347
        gradient.addColorStop(1, 'rgba(30, 47, 91, 0.15)'); // #1E2F5B
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);

        
        for(const r of rings) drawRing(r);
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initAnimatedBackground);