
// Splash screen delay and transition
// setTimeout(() => {
//   const splash = document.getElementById('splashScreen');
//   splash.classList.add('fade-out');
//   setTimeout(() => {
//     document.getElementById('homePage').classList.add('show');
//   }, 800);
// }, 5500);
 // Redirect to home page after animation
        setTimeout(() => {
            document.getElementById('splashScreen').classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'home.html'; // Replace with your homepage file name
            }, 700);
        }, 5500);
