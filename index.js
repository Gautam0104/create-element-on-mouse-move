  var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');

    var particles = [];

    // Particle constructor
    function Particle(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = 5;
        this.speed = { x: Math.random() * 4 - 2, y: Math.random() * 4 - 2 };
    }

    // Update and draw particles
    function drawParticles() {
        for (var i = 0; i < particles.length; i++) {
            var particle = particles[i];

            // Update position
            particle.x += particle.speed.x;
            particle.y += particle.speed.y;

            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            ctx.closePath();

            // Reduce particle radius over time
            particle.radius -= 0.1;

            // Remove dead particles
            if (particle.radius <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }
    }

    // Mouse move event
    canvas.addEventListener('mousemove', function (event) {
        var mouseX = event.clientX - canvas.getBoundingClientRect().left;
        var mouseY = event.clientY - canvas.getBoundingClientRect().top;

        // Create a new particle at the mouse position
        var particle = new Particle(mouseX, mouseY, getRandomColor());
        particles.push(particle);
    });

    // Click event
    canvas.addEventListener('click', function (event) {
        // Create an explosion of particles at the click position
        for (var i = 0; i < 30; i++) {
            var particle = new Particle(event.clientX - canvas.getBoundingClientRect().left, event.clientY - canvas.getBoundingClientRect().top, getRandomColor());
            particles.push(particle);
        }
    });

    // Get a random color
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawParticles();
    }

    // Start the animation
    animate();